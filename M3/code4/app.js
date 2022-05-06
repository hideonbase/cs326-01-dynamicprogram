import express from "express";
import morgan from "morgan";
import house from "./house.js";
import pool from "./db.js";


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use("/", express.static("client"));

app.use("/house", house);
app.use('/signup', express.static('./signup'));
app.use('/signin', express.static('./signin'));
app.use('/userinfo', express.static('./userinfo'));
app.use('/script', express.static('./script'));


app.post('/user/create', async (request, response) => {
    const options = request.body;
    const [name, password] = [options.name, options.pass]

    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sameNumber = await client.query('select count(*) from customer where username = $1', [name]);
        await client.query('COMMIT');
        if (sameNumber.rows[0].count > 0) {
            const result = {
                code: 1, state: 'error', msg: "username already exists", data: null
            };
            response.json(result);
            return
        }
        await client.query('BEGIN');
        const result = await client.query('insert into customer (username, password) values ($1,$2)', [name, password]);
        await client.query('COMMIT');
        response.json({
            code: 0, state: 'ok', msg: 'ok', data: null
        })
    } catch (e) {
        await client.query('ROLLBACK');
        response.json({
            code: 1, state: 'error', msg: 'error', data: null
        })
    } finally {
        client.release();
    }

});

app.post('/user/login', async (request, response) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('select id,username,password from customer where username=$1', [request.body.name]);
        await client.query('COMMIT');
        if (result.rowCount === 0) {
            response.json({
                code: 1, state: 'error', msg: 'user not found', data: null
            })
        } else {
            if (result.rows[0].password === request.body.pass) {
                response.json({
                    code: 0, state: 'ok', msg: 'ok', data: result.rows[0].id
                })
            } else {
                response.json({
                    code: 1, state: 'error', msg: 'password is not correct', data: null
                })
            }
        }

    } catch (e) {
        client.query('ROLLBACK');
        response.json({
            code: 1, state: 'error', msg: 'server internal error', data: null
        })
    } finally {
        client.release();
    }

})

app.post('/IneedInfo', async (request, response) => {
    const client = await pool.connect();
    try {
        //query user by sql select id,username,password from customer where username=$1
        await client.query('BEGIN');
        const result = await client.query('select id,username,password from customer where id=$1', [request.body.id]);
        await client.query('COMMIT');
        if (result.rowCount === 0) {
            response.json({
                code: 1, state: 'error', msg: 'user not found', data: null
            })
        } else {
            delete result.rows[0].password;
            response.json({
                code: 0, state: 'ok', msg: 'ok', data: result.rows[0]
            })
        }

    } catch (e) {
        client.query('ROLLBACK');
        response.json({
            code: 1, state: 'error', msg: 'server internal error', data: null
        })
    } finally {
        client.release();
    }


})

app.post('/user/changename', async (request, response) => {
    let username = request.body.name;
    let id = request.body.id;

    //update customer set username=$1 where id=$2
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('update customer set username=$1 where id=$2', [username, id]);
        await client.query('COMMIT');
        if (result.rowCount === 0) {
            response.json({
                code: 1, state: 'error', msg: 'user not found', data: null
            })
        } else {
            response.json({
                code: 0, state: 'ok', msg: 'ok', data: result.rows[0]
            })
        }

    } catch (e) {
        client.query('ROLLBACK');
        response.json({
            code: 1, state: 'error', msg: 'server internal error', data: null
        })
    } finally {
        client.release();
    }


})

app.post('/user/deleteaccount', async (request, response) => {
    let body = request.body;
    let customerId = body.id;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('delete from customer where id=$1', [customerId]);
        await client.query('COMMIT');
        if (result.rowCount === 0) {
            response.json({
                code: 1, state: 'error', msg: 'user not found', data: null
            })
        } else {
            response.json({
                code: 0, state: 'ok', msg: 'ok', data: null
            })
        }

    } catch (e) {
        client.quality('ROLLBACK');
        response.json({
            code: 1, state: 'error', msg: 'server internal error', data: null
        })
    } finally {
        client.release();
    }


})


app.all("*", async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
