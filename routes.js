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
    pool.query(`INSERT INTO recent (mbid) VALUES ($1::VARCHAR)`, [req.body.mbid]).then(response=>{
        res.json(req.body);
    })
})

module.exports = routes;
