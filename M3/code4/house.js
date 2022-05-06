import express, {response} from "express";
import pool from "./db.js";

let app = new express.Router();

app.get('/house', async (req, res) => {
    let id = req.query.id;
    if (id === undefined) {
        let client = await pool.connect();
        try {
            client.query('BEGIN');
            let result = await client.query('select id,title,image as cover from house limit 10');
            client.query('COMMIT');
            res.status(200).json({
                code: 0, msg: 'get house list success', data: result.rows
            });
        } catch (e) {
            client.query('ROLLBACK');
            res.status(500).json({
                code: -1, msg: 'get house list failed'
            });
        } finally {
            client.release();
        }
    } else {
        id = parseInt(id);
        let client = await pool.connect();
        try {
            client.query('BEGIN');
            const sql = `select id,
                                title,
                                image as          cover,
                                case
                                    when (select count(*) from fav where house = a.id and customer = $1) = 0 then false
                                    else true end fav
                         from house a`
            let result = await client.query(sql, [id]);
            client.query('COMMIT');
            res.status(200).json({
                code: 0, msg: 'get house list success', data: result.rows
            });
        } catch (e) {
            client.query('ROLLBACK');
            res.status(500).json({
                code: -1, msg: 'get house list failed'
            });
        } finally {
            client.release();
        }

    }
});

app.get('/house/:id', async (req, res) => {
    const sql = `select id, title, image as cover, rent, address from house where id=$1`
    const client = await pool.connect();
    try {
        client.query('BEGIN');
        const result = await client.query(sql,[req.params.id]);
        client.query('COMMIT');
        if (result.rowCount === 0) {
            res.status(404).json({
                code: -1, msg: 'house not found'
            });
        } else {
            res.status(200).json({
                code: 0, msg: 'get house success', data: result.rows[0]
            });
        }

    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).json({
            code: -1, msg: 'get house list failed'
        });
    } finally {
        client.release();
    }
});

app.get('/search', async (req, res) => {
    let keyword = req.query.keyword;
    let customerId = req.query.id;

    if (customerId === undefined) {
        let client = await pool.connect();
        try {
            client.query('BEGIN');
            let result = await client.query('select id,title,image as cover, false as fav from house where title like $1 limit 10', ['%' + keyword + '%']);
            client.query('COMMIT');
            res.status(200).json({
                code: 0, msg: 'get search result success', data: result.rows
            });
        } catch (e) {
            client.query('ROLLBACK');
            res.status(500).json({
                code: -1, msg: 'get search result failed'
            });
        } finally {
            client.release();
        }
    } else {
        let client = await pool.connect();
        try {
            client.query('BEGIN');
            let result = await client.query(`
                select id,
                       title,
                       image as cover,
                       (
                           case
                               when (select count(*) from fav where fav.house = h.id and customer = $2) > 0 then true
                               else false end
                           ) as fav
                from house h
                where lower(title) like $1 limit 10`, ['%' + keyword.toLowerCase() + '%', customerId]);
            client.query('COMMIT');
            res.status(200).json({
                code: 0, msg: 'get search result success', data: result.rows
            });
        } catch (e) {
            client.query('ROLLBACK');
            res.status(500).json({
                code: -1, msg: 'get search result failed'
            });
        } finally {
            client.release();
        }
    }
})
app.post('/favorite/:id', async (req, res) => {
    const houseId = parseInt(req.params.id);
    let customerId = req.body.customerId;

    let client = await pool.connect();
    try {
        client.query('BEGIN');
        const sql = `insert into fav (house, customer)
                     values ($1, $2)`
        await client.query(sql, [houseId, customerId]);
        client.query('COMMIT');
        res.status(200).json({
            code: 0, msg: 'add favourite success'
        });
    } catch (e) {
        res.status(500).json({
            code: -1, msg: 'add favourite failed'
        });
    } finally {
        client.release();
    }
});
app.delete('/favorite/:id', async (req, res) => {
    const houseId = parseInt(req.params.id);
    let customerId = req.body.customerId;
    let client = await pool.connect();
    try {
        client.query('BEGIN');
        const sql = `delete
                     from fav
                     where house = $1
                       and customer = $2`;
        await client.query(sql, [houseId, customerId]);
        client.query('COMMIT');
        res.status(200).json({
            code: 0, msg: 'delete favourite success'
        });
    } catch (e) {
        res.status(500).json({
            code: -1, msg: 'delete favourite failed'
        });
    } finally {
        client.release();
    }
});


app.post('/favourite', async (req, res) => {
    let customerId = req.body.customerId;
    const sql = `
        select h.id    as        id,
               h.title as        title,
               h.image as        cover,
               case
                   when (select count(*) from fav where house = h.id and customer = 4) = $1 then false
                   else true end fav
        from house h
                 join fav f on h.id = f.house
        where f.customer = $1
    `

    let client = await pool.connect();
    try {
        const result = await client.query(sql, [customerId]);
        res.status(200).json({
            code: 0, msg: 'get favourite list success', data: result.rows
        });
    } catch (e) {
        res.status(500).json({
            code: -1, msg: 'get favourite list failed'
        });
    } finally {
        client.release();
    }

});

export default app;