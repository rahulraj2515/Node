
const express = require('express');

const app = express();

const bodyparser = require('body-parser');

app.use(bodyparser.json());

const users = [

    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

app.get ('/user',(req,res) => {

    console.log(req.body);
    res.send({
        status:200,
        message:"request successfully  fetched",
        users:users
    })
})

app.get ('/get-user/:id',(req,res) => {

    const index = users.findIndex(data =>{

        if(data.id == req.params.id) {
            res.send({
                status:200,
                message:'Details found',
                users:data
            })
        }
    })
})

app.post('/add-user',(req,res) => {

    console.log(req.body);
    if(req.body.name) {
        users.unshift(req.body);
        res.send({
            status:200,
            message: 'request added successfully',
            users:users
        })
    }
})

app.put ('/update/:id', (req,res) => {

    const index = users.findIndex(data => {
        if(data.id = req.params.id) {
            return data;
        }
    }) 
        if(index >= 0 && req.body) {
            users[index] = req.body;
        }
        res.send({
            status:200,
            message:'request updated successfully',
            users:users
        })
    

})

app.delete('/delete/:id', (req,res) => {

    const index = users.findIndex(data => {
        if(data.id == req.params.id) {
        return data;
        } 
    }) 
        if(index >= 0 ) {
        users.splice(index,1);
        res.send({
            status:200,
            message:'user deleted successfully',
            users:users
        })
    }

})


module.exports = app;