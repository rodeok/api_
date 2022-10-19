import express from "express"
import mysql from "mysql"
const app = express()

import cors from "cors"
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"root",
    database: "booking"
})
app.use(express.json())
app.use(cors())
app.get("/", (res,req)=>{
    res.json("Hello ")
})
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err, data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]
    db.query(q,[values],(err, data)=>{
        if (err) return res.json(err)
        return res.json("Book added successfully..")
    })
})
app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId],(err, data)=>{
        if (err) return res.json("Book not found")
        return res.json("Book deleted successfully..")
    })
})
app.listen(8080, ()=>{
    console.log("connected..")
})