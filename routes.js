"use strict";

// require the express module
const express = require("express");

// create a new Router object
const routes = express.Router();

const pool = require("./connection");
const { response } = require("express");

routes.get("/recent", (req, res)=>{
    pool.query(`SELECT * FROM recent`).then(response=>{
        res.json(response.rows);
    })
})

routes.post("/recent", (req, res)=>{
    pool.query(`INSERT INTO recent (name) VALUES ($1::VARCHAR)`, [req.body.name]).then(response=>{
        res.json(req.body);
    })
})

routes.get("/favorite-artists", (req, res)=>{
    pool.query(`SELECT * FROM favorite_artists`).then(response=>{
        res.json(response.rows);
    })
})

routes.post("/favorite-artists", (req, res)=>{
    pool.query(`INSERT INTO favorite_artists (name) VALUES ($1::VARCHAR)`, [req.body.name]).then(response=>{
        res.json(req.body);
    })
})

routes.delete("/favorite-artists/:id", (req, res)=>{
	pool.query(`DELETE FROM favorite_artists WHERE id=${req.params.id}`).then(response=>{
		res.sendStatus(204);
	})
})

module.exports = routes;
