'use strict';


import express from "express";
import { PeopleDatabase } from './db.js';


const app = express();

app.use(express.static('.'));



// put /customer register
app.put('/customer', (req, res) => {
    res.status(200).json({
        code: 0, message: 'register success'
    })
});

//post /customer login
app.post('/customer', (req, res) => {
    res.status(200).json({
        code: 0, message: 'login success'
    })
});

// get /customer/username get user detail
app.get('/customer/:username', (req, res) => {
    res.status(200).json({
        code: 0, msg: 'get user detail success', data: {
            username: 'test', password: '123456', telephone: '12345678901', nickname: 'test\'s nickname',
        }
    });
});
// put /customer/id  update user info
app.put('/customer/:username', (req, res) => {
    res.status(200).json({
        code: 0, message: 'update user info success'
    })
});

//get /house get house list
app.get('/house', (req, res) => {
    res.status(200).json({
        code: 0, msg: 'get house list success', data: [{
            id: 1,
            cover: '/imgs/2.jpg',
            title: 'Kendrick Place',
            address: 'beijin hai ding',
            type: '3 house 2 halls',
            typeImage: '/imgs/details/KP1B.JPG',
            area: '100',
            floor: '1',
            price: '100000',
            fav: true,
        }, {
            id: 2,
            cover: '/imgs/3.jpg',
            title: 'Aspen Heights',
            address: 'ShangHai',
            type: '3 house 2 halls',
            typeImage: 'imgs/details/AS3B2B.PNG',
            area: '120',
            floor: '8',
            price: '2000',
            fav: false,
        }, {
            id: 3,
            cover: '/imgs/4.jpg',
            title: 'North square',
            address: 'JiangSu',
            type: '3 house 2 halls',
            typeImage: 'imgs/details/AS3B2B.PNG',
            area: '130',
            floor: '20',
            price: '9876',
            fav: false,
        }, {
            id: 4,
            cover: '/imgs/5.jpg',
            title: 'Olympia Place',
            address: 'ChnagZhou',
            type: '3 house 2 halls',
            typeImage: 'imgs/details/AS3B2B.PNG',
            area: '88',
            floor: '6',
            price: '1234',
            fav: true,
        },

        ]
    });
});

//get /house get house list
app.get('/house/:id', (req, res) => {
    res.status(200).json({
        code: 0,
        msg: 'get house list success',
        id: 4,
        cover: '/imgs/5.jpg',
        title: 'Olympia Place',
        address: 'ChangZhou',
        type: '3 house 2 halls',
        typeImage: 'imgs/details/AS3B2B.PNG',
        area: '88',
        floor: '6',
        price: '1234'
    });
});

// search /search get search result
app.get('/search', (req, res) => {
    res.status(200).json({
        code: 0, msg: 'get house list success', data: [{
            id: 3,
            cover: '/imgs/1.jpg',
            title: 'North square',
            address: 'JiangSu',
            type: '3 house 2 halls',
            typeImage: 'imgs/details/AS3B2B.PNG',
            area: '130',
            floor: '20',
            price: '9876',
        },

        ]
    });
})
//	post /favorite add favourite
app.post('/favorite/:id', (req, res) => {
    res.status(200).json({
        code: 0, message: 'add favourite success'
    })
});
//delete /favorite delete favourite
app.delete('/favorite/:id', (req, res) => {
    res.status(200).json({
        code: 0, message: 'delete favourite success'
    })
});


//get /favorite get favourite list
app.post('/favourite', (req, res) => {
    res.status(200).json({
        code: 0, msg: 'get favourite list success', data: [{
            id: 1,
            cover: '/imgs/2.jpg',
            title: 'Kendrick Place',
            address: 'beijin hai ding',
            type: '3 house 2 halls',
            typeImage: '/imgs/details/KP1B.JPG',
            area: '100',
            floor: '1',
            price: '100000',
            fav: true,
        }, {
            id: 4,
            cover: '/imgs/5.jpg',
            title: 'Olympia Place',
            address: 'ChnagZhou',
            type: '3 house 2 halls',
            typeImage: 'imgs/details/AS3B2B.PNG',
            area: '88',
            floor: '6',
            price: '1234',
            fav: true,
        },

        ]
    })
});
const db = new PeopleDatabase(process.env.DATABASE_);
await db.connect();
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


