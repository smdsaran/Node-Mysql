const express = require("express");
const mysql = require("mysql");

const app = express();

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'timetabling'
  });


  app.get("/create" , function(req , res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    
        var sql = "CREATE TABLE sub(id int(11) auto_increment , name varchar(255) , primary key(id))";
        connection.query(sql, function (error, results, fields) {
    
            connection.release();
    
            if (error) {
                console.log("Error occured on query .");
            }
             
            else {
                console.log(" table created .");
                res.send(results);
            }

        });

    });

});

app.get("/insert" , function(req , res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    

        var data = { id: 4 , name: 'MC'};
        var sql = "INSERT INTO sub SET ?";

        connection.query(sql, data ,  function (error, results, fields) {
    
            connection.release();
    
            if (error) throw error;

            else {
                console.log(" data inserted  .");
                res.send(results);
            }

        });

    });

});

app.get("/fetch/:id" , function(req , res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    

        //var data = { id: 4 , name: 'MC'};
        var sql = `SELECT * FROM sub WHERE id = ${ req.params.id }`;

        connection.query(sql, function (error, row, fields) {
    
            connection.release();
    
            if (error) throw error;

            else {
                console.log(row);
                res.send(" data  fetched  .");
            }

        });

    });

});

app.get("/fetch" , function(req , res) {


    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    

        //var data = 3;
        var sql = `SELECT * FROM admin_tbl`;

        connection.query(sql, function (error, row, fields) {
    
            connection.release();
    
            if (error) throw error;

            else {

                for(var i=0 ;  i < row.length ; i++) {

                if((row[i].password === "admin1@cse") && (row[i].id === 8001) ) {
                    res.send(" data matched  .");
                    console.log("validation successful .");
                }

                else {
                    console.log("validation unsuccessful .");
                }
                
            }
             
            }

        });

    });

});

app.get("/update/:id" , function(req , res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    

        var data = 'CE';
        var sql = `UPDATE sub SET name = '${data}' WHERE id = ${ req.params.id }`;

        connection.query(sql, function (error, row, fields) {
    
            connection.release();
    
            if (error) throw error;

            else {
                console.log(row);
                res.send(" data  updated  .");
            }

        });

    });

});



app.get("/delete" , function(req , res) {

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error occured on connection .");
        }

        else {
            console.log("connection success .");
        }
    

        var id = 4;
        var sql = `DELETE FROM sub WHERE id = ${ id }`;

        connection.query(sql, function (error, row, fields) {
    
            connection.release();
    
            if (error) throw error;

            else {
                console.log(row);
                res.send(" data  deleted  .");
            }

        });

    });

});



app.listen("3000" , function() {
    console.log(" server running on port 3000");
});