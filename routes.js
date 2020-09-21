"use strict";

// require the express module
const express = require("express");

// create a new Router object
const routes = express.Router();

const pool = require("./connection");
const { response } = require("express");

routes.get("/recent", (req, res)=>{
    pool.query(`SELECT * FROM recent ORDER BY id DESC`).then(response=>{
        res.json(response.rows);
    })
})

routes.post("/recent", (req, res)=>{
    pool.query(`INSERT INTO recent (name) VALUES ($1::VARCHAR)`, [req.body.name]).then(response=>{
        res.json(req.body);
    })
})

routes.delete("/recent/:id", (req, res)=>{
	pool.query(`DELETE FROM recent WHERE id=${req.params.id}`).then(response=>{
		res.sendStatus(204);
	})
})

routes.get("/favorite-artists", (req, res)=>{
    pool.query(`SELECT * FROM favorite_artists ORDER BY id DESC`).then(response=>{
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

routes.get("/favorite-videos", (req, res)=>{
    pool.query(`SELECT * FROM favorite_videos ORDER BY id DESC`).then(response=>{
        res.json(response.rows);
    })
})

routes.post("/favorite-videos", (req, res)=>{
    pool.query(`INSERT INTO favorite_videos (title, thumbnail, artist, videoId) VALUES ($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR)`, [req.body.title, req.body.thumbnail, req.body.artist, req.body.videoId]).then(response=>{
        res.json(req.body);
    })
})

routes.delete("/favorite-videos/:id", (req, res)=>{
	pool.query(`DELETE FROM favorite_videos WHERE id=${req.params.id}`).then(response=>{
		res.sendStatus(204);
	})
})

module.exports = routes;
