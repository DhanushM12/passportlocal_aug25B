const express = require('express')
const app= express();
const port = 8080;

app.listen(port, function(err){
    if(err){
        console.log(`Error in setting up the server : ${err}`)
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})