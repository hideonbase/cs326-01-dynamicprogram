import express, { request, response } from 'express';
import { readFile, writeFile } from 'fs/promises';
import morgan from 'morgan';
import house from './house.js';
import junming from './junmingser.js';
import pool from './db.js';

const rooms_path = 'rooms.json';

function readRooms( path ) {
  return async() => {
    const rooms_file = await readFile( path, 'utf-8' );
    console.log( rooms_file );
    return JSON.parse( rooms_file );
  };
}

const getRooms = readRooms( rooms_path );

/*8-16 return all rooms data */

function writeRooms( path ) {
  return async( room_id, room_data ) => {
    const room_old = await getRooms();
    if( room_id in room_old ) {
      room_old[ room_id ] = room_data;
      await writeFile( path, JSON.stringify( room_old ), 'utf8' );
      return true;
    } else {
      return false;
    }
  };
}

/*write room information, the argument passed is room_id,room_data */

const setRoom = writeRooms( rooms_path );

// Create the Express app and set the port number.
const app  = express();
const port = process.env.PORT || 5000;

// Add Middleware
// 1 使用app.use这个方法 添加中间件到express 实例中Use the app.use method to add middleware to an Express instance
// 2 其中添加的中间件有：The added middleware is:
//   1 json middleware: express.json()得到json中间件实例。json中间件可以把request的body解析为js对象
//   2 urlencoded(Add reference from the express website)
// ...

app.use( express.json() );
app.use( express.urlencoded( { extended : false } ) );
app.use( morgan( 'dev' ) );
app.use( '/', express.static( 'client' ) );
// used all 4 middlewares

//From JY
app.use( '/house', house );
app.use( '/signup', express.static( './signup' ) );
app.use( '/signin', express.static( './signin' ) );
app.use( '/userinfo', express.static( './userinfo' ) );
app.use( '/script', express.static( './script' ) );
//End from JY
//junming
app.use( '/junming', junming );
//junming

// From JY
let users       = [];
let currentuser = '';
const JSONfile  = 'users.json';

async function reload( filename ) {
  try {
    const data = await readFile( filename, { encoding : 'utf8' } );
    users      = JSON.parse( data );
  } catch( err ) {
    users = [];
  }
}

async function saveUsers() {
  try {
    const data = JSON.stringify( users );
    await writeFile( JSONfile, data, { encoding : 'utf8' } );
  } catch( err ) {
    console.log( err );
  }
}

function userExists( name ) {
  let returnthis = false;
  for( let i = 0; i < users.length; ++i ) {
    if( name in JSON.parse( users[ i ] ) ) {
      return JSON.parse( users[ i ] );
    }
  }
  return returnthis;
}

async function createuser( response, name, password ) {
  let client = await pool.connect();
  try {
    //query user count
    //using sql select count(*) from customer where username = $1
    await client.query( 'BEGIN' );
    const sameNumber = await client.query( 'select count(*) from customer where username = $1', [name] );
    await client.query( 'COMMIT' );
    if( sameNumber.rows[ 0 ].count > 0 ) {
      const result = {
        code  : 1,
        state : 'error',
        msg   : 'username already exists',
        data  : null,
      };
      console.log( result );
      response.json( result );
      return;
    }
    await client.query( 'BEGIN' );
    const result = await client.query( 'insert into customer (username, password) values ($1,$2)', [name, password] );
    await client.query( 'COMMIT' );
    response.json( {
      code  : 0,
      state : 'ok',
      msg   : 'ok',
      data  : null,
    } );
  } catch( e ) {
    await client.query( 'ROLLBACK' );
    response.json( {
      code  : 1,
      state : 'error',
      msg   : 'error',
      data  : null,
    } );
  } finally {
    client.release();
  }
}

async function changeusername( response, name ) {
  await reload( JSONfile );
  if( name === undefined ) {
    response.status( 404 )
            .json( { error : 'name is not valid' } );
  } else {
    for( let i = 0; i < users.length; ++i ) {
      if( currentuser in JSON.parse( users[ i ] ) ) {
        let obj                      = JSON.parse( users[ i ] );
        obj[ currentuser ][ 'name' ] = name;
        users[ i ]                   = JSON.stringify( obj );
        break;
      }
    }
    await saveUsers();
    response.json( { newname : name } );
  }
}

async function deleteaccountt( response, name ) {
  await reload( JSONfile );
  if( name === undefined ) {
    response.status( 404 )
            .json( { error : 'id is not valid' } );
  } else {
    for( let i = 0; i < users.length; ++i ) {
      console.log( currentuser );
      if( currentuser in JSON.parse( users[ i ] ) ) {
        users.splice( i, 1 );
        currentuser = '';
        break;
      }
    }
    await saveUsers();
    response.json( { deletename : currentuser } );
  }
}

async function addComment( response, room_id, user_id, content ) {
  let client = await pool.connect();
  try {
    await client.query( 'BEGIN' );
    const date   = new Date().getTime();
    const result = await client.query( 'insert into comment (customer_id, room_id, content, date) values ($1,$2,$3,$4)', [user_id, room_id, content, date] );
    await client.query( 'COMMIT' );
    response.status( 200 )
            .json( {
              code  : 0,
              state : 'ok',
              msg   : `Affect ${result.rowCount} Line`,
              data  : null,
            } );
  } catch( e ) {
    await client.query( 'ROLLBACK' );
    response.status( 500 )
            .json( {
              code  : 1,
              state : 'error',
              msg   : JSON.stringify( e ),
              data  : null,
            } );
  } finally {
    client.release();
  }
}

async function deleteComment( response, comment_index ) {
  let client = await pool.connect();
  try {
    await client.query( 'BEGIN' );
    const result = await client.query( 'DELETE FROM comment WHERE id = $1;', [comment_index] );
    await client.query( 'COMMIT' );
    response.status( 200 )
            .json( {
              code  : 0,
              state : 'ok',
              msg   : `Affect ${result.rowCount} Line`,
              data  : null,
            } );
  } catch( e ) {
    await client.query( 'ROLLBACK' );
    response.status( 500 )
            .json( {
              code  : 1,
              state : 'error',
              msg   : JSON.stringify( e ),
              data  : null,
            } );
  } finally {
    client.release();
  }
}

async function queryRoomDetails( response, id ) {
  // result = {...details,comment}
  let client = await pool.connect();
  try {
    let data = {};
    await client.query( 'BEGIN' );
    // 1. 'details' col of house_details table
    const details     = await client.query( 'select details from house_details where id = $1', [id] );
    data              = details.rows[ 0 ].details;
    // 2. 'comment_id,content,date,customer_id' cols of comment table
    const comment     = await client.query( 'select * from comment where room_id = $1;', [id] );
    data[ 'comment' ] = comment.rows.map( value => {
      return {
        'comment_id' : value.id,
        'user_id'    : value.customer_id,
        'content'    : value.content,
        'date'       : value.date,
      };
    } );
    await client.query( 'COMMIT' );
    response.status( 200 )
            .json( {
              code  : 0,
              state : 'ok',
              msg   : `Affect ${1} Line`,
              data  : data,
            } );
  } catch( e ) {
    await client.query( 'ROLLBACK' );
    response.status( 500 )
            .json( {
              code  : 1,
              state : 'error',
              msg   : JSON.stringify( e ),
              data  : null,
            } );
  } finally {
    client.release();
  }

}

app.post( '/user/create', async( request, response ) => {
  const options = request.body;
  await createuser( response, options.name, options.pass );
} );

app.post( '/user/login', async( request, response ) => {
  const client = await pool.connect();
  try {
    //query user by sql select id,username,password from customer where username=$1
    await client.query( 'BEGIN' );
    const result = await client.query( 'select id,username,password from customer where username=$1', [request.body.name] );
    await client.query( 'COMMIT' );
    if( result.rowCount === 0 ) {
      response.json( {
        code  : 1,
        state : 'error',
        msg   : 'user not found',
        data  : null,
      } );
    } else {
      if( result.rows[ 0 ].password === request.body.pass ) {
        response.json( {
          code  : 0,
          state : 'ok',
          msg   : 'ok',
          data  : result.rows[ 0 ].id,
        } );
      } else {
        response.json( {
          code  : 1,
          state : 'error',
          msg   : 'password is not correct',
          data  : null,
        } );
      }
    }

  } catch( e ) {
    client.query( 'ROLLBACK' );
    response.json( {
      code  : 1,
      state : 'error',
      msg   : 'server internal error',
      data  : null,
    } );
  } finally {
    client.release();
  }

} );

app.post( '/IneedInfo', async( request, response ) => {
  const client = await pool.connect();
  try {
    //query user by sql select id,username,password from customer where username=$1
    await client.query( 'BEGIN' );
    const result = await client.query( 'select id,username,password from customer where id=$1', [request.body.id] );
    await client.query( 'COMMIT' );
    if( result.rowCount === 0 ) {
      response.json( {
        code  : 1,
        state : 'error',
        msg   : 'user not found',
        data  : null,
      } );
    } else {
      delete result.rows[ 0 ].password;
      response.json( {
        code  : 0,
        state : 'ok',
        msg   : 'ok',
        data  : result.rows[ 0 ],
      } );
    }

  } catch( e ) {
    client.query( 'ROLLBACK' );
    response.json( {
      code  : 1,
      state : 'error',
      msg   : 'server internal error',
      data  : null,
    } );
  } finally {
    client.release();
  }

} );

app.post( '/user/changename', async( request, response ) => {
  let username = request.body.name;
  let id       = request.body.id;

  //update customer set username=$1 where id=$2
  const client = await pool.connect();
  try {
    await client.query( 'BEGIN' );
    const result = await client.query( 'update customer set username=$1 where id=$2', [username, id] );
    await client.query( 'COMMIT' );
    if( result.rowCount === 0 ) {
      response.json( {
        code  : 1,
        state : 'error',
        msg   : 'user not found',
        data  : null,
      } );
    } else {
      response.json( {
        code  : 0,
        state : 'ok',
        msg   : 'ok',
        data  : result.rows[ 0 ],
      } );
    }

  } catch( e ) {
    client.query( 'ROLLBACK' );
    response.json( {
      code  : 1,
      state : 'error',
      msg   : 'server internal error',
      data  : null,
    } );
  } finally {
    client.release();
  }

} );

app.post( '/user/deleteaccount', async( request, response ) => {
  let body       = request.body;
  let customerId = body.id;

  //sql delete from customer  where id=$1
  const client = await pool.connect();
  try {
    await client.query( 'BEGIN' );
    const result = await client.query( 'delete from customer where id=$1', [customerId] );
    await client.query( 'COMMIT' );
    if( result.rowCount === 0 ) {
      response.json( {
        code  : 1,
        state : 'error',
        msg   : 'user not found',
        data  : null,
      } );
    } else {
      response.json( {
        code  : 0,
        state : 'ok',
        msg   : 'ok',
        data  : null,
      } );
    }

  } catch( e ) {
    client.quality( 'ROLLBACK' );
    response.json( {
      code  : 1,
      state : 'error',
      msg   : 'server internal error',
      data  : null,
    } );
  } finally {
    client.release();
  }

} );

app.post( '/user/logoutaccount', async( request, response ) => {
  currentuser = '';
  response.status( 201 )
          .json( { usern : currentuser } );
} );
//the end from JY

// add comments API
// Manage the post request, post url is /comment.
app.post( '/comment', async( request, response ) => {
  // 房间ID
  // 用户ID, merge with JY
  // 评论
  const {
          room_id,
          user_id,
          content,
        } = request.body; //decapsulate the data from body package
  await addComment( response, room_id, user_id, content );
} );

// Delete comments API
// Manage the post request, post url is /comment.
app.delete( '/comment', async( request, response ) => {
  const {
          comment_index,
        } = request.body; //decapsulate the data from body package

  await deleteComment( response, comment_index );
} );

// Get house's details by room_id
// response.json stringify all text
app.get( '/rooms', async( request, response ) => {
  const id = request.query.room_id;//get data through url
  await queryRoomDetails( response, id );
} );

// This matches all routes that are not defined.
app.all( '*', async( request, response ) => {
  response.status( 404 )
          .send( `Not found: ${request.path}` );
} );

// Start the server. Listen the port that is indicated by the admin.
app.listen( port, () => {
  console.log( `Server started on http://localhost:${port}` );
} );
