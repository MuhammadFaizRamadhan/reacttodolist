const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const db = require('./config')

//endpoint get all
app.get('/', (req, res) => {
    let sql = "select * from list"
    db.query(sql, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json  ({
                count : result.length,
                list : result
            })
        }
    })
})

//endpoint save data
app.post('/savelist', (req, res) => {
    let data ={
        catatan: req.body.catatan,
        status: req.body.status,
    }
    let sql = "insert into list set ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json ({
                message: result.affectedRows + " row inserted"
            })
        }
    })
})

//endpoint update data
app.post('/update', (req, res) => {
    let data =[{
            catatan: req.body.catatan,
            status: req.body.status,
        },
        req.body.id_list
        ]
    let sql = " update list set ? where id_list = ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json ({
                message: result.affectedRows + " row updated"
            })
        }
    })
})
//endpoint update status
app.post('/updatestatus', (req, res) => {
    let data =[{
            status: req.body.status
        },
        req.body.id_list
        ]
    let sql = " update list set ? where id_list = ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json ({
                message: result.affectedRows + " row updated"
            })
        }
    })
})
//endpoint delete data
app.delete('/:id_list', (req,res) => {
    let data ={
        id_list: req.params.id_list
    }
    let sql = "delete from list where ?"
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        } else {
            res.json ({
                message: result.affectedRows + " row deleted"
            })
        }
    })
})
//endpoint seacrh
app.post('/', (req, res) =>{
    let keyword = req.body.keyword
    let sql = "select * from list where catatan like '%"+keyword+"%' "
    db.query(sql, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json  ({
                count : result.length,
                list : result
            })
        }
    })
})
//endpoint status completed
app.get('/completed', (req, res) =>{
    let sql = "select * from list where status = 'completed' "
    db.query(sql, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json  ({
                count : result.length,
                list : result
            })
        }
    })
})
//endpoint status uncompleted
app.get('/uncompleted', (req, res) =>{
    let sql = "select * from list where status = 'uncompleted' "
    db.query(sql, (err, result) => {
        if (err) {
            res.json ({
                message: err.message
            })
        }
        else {
            res.json  ({
                count : result.length,
                list : result
            })
        }
    })
})
module.exports= app