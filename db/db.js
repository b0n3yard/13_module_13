const sql = require('mysql2')
const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect ((err) =>{
    if (err) throw err;
    con.query("DROP DATABASE IF EXISTS ecommerce_db;", (err,res)=>{
        if (err) throw err;
        console.log('database droped')
    })
    con.query("CREATE DATABASE ecommerce_db;" , (err,res)=>{
        if (err) throw err;
        console.log('database created')
        process.exit();
    })
    // con.query("USE employee_db;" , (err,res)=>{
    //     if (err) throw err;
    //     console.log('roles created')
    // })
    // con.query("CREATE TABLE departments (name varchar(250));" , (err,res)=>{
    //     if (err) throw err;
    //     console.log('depts created')
    // })
    // con.query("CREATE TABLE role (name varchar(250));" , (err,res)=>{
    //     if (err) throw err;
    //     console.log('roles created')
    // })
    // con.query("CREATE TABLE employee (firest_name varchar(250));" , (err,res)=>{
    //     if (err) throw err;
    //     console.log('employee created')
    // })
})