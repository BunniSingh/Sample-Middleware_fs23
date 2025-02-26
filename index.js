const express = require('express');
const fs = require('fs');
const userData = require('./userList.json');
const app = express();
let port = 3000;

app.use((req, res, next)=>{
    fs.appendFile("log.txt", `\n${Date.now()}: ${req.method}: ${req.path}`, (err)=>{
        if(err){
            console.log(`ERROR while calling: ${err}`);
        }else{
            if(req.method === 'GET'){
                next(); 
            }else{
                res.status(404).json({
                    success: false,
                    err: "Route not found",
                    data: []
                })
            }
        }
    })
})

app.get('/users', (req, res)=>{
    console.log("Data send successfully!!")
    res
    .status(200)
    .json({
        success: true,
        data: userData
    })
})


app.listen(port, () => console.log("Server stertad on port:", port));

