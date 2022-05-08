import pg from 'pg';
const { Pool } = pg;

const pool = new Pool( {
  user     : 'dev',
  host     : 'localhost',
  database : 'dev',
  password: '123456',
  port : 5432,
} );

const destroy = () => {
  pool.end();
  process.exit( 0 );
};

process.on( 'exit', destroy );
process.on( 'SIGINT', destroy );
process.on( 'SIGTERM', destroy );

process.on( 'exit', () => {
  console.log( 'exit' );
} );
process.on( 'SIGINT', () => {
  console.log( 'SIGINT' );
} );
process.on( 'SIGTERM', () => {
  console.log( 'SIGTERM' );
} );
process.on( 'uncaughtException', ( e, p ) => {
  console.log( 'uncaughtException', e );
  console.log( e );
} );
process.on( 'uncaughtException', destroy );

export default pool;
