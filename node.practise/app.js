
const express = require('express');

const app = express();

const User = require('./models/user');

const mongoose = require('mongoose');

const bodyparser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/project1');
mongoose.connection.on('connected',() => {
    console.log("database is connected now");
})

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

    const user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email
    })

    user.save().then(documents => {
        if(documents) {
            res.send({
                status:200,
                message:'data successfully created',
                user:user
            })
        }
    }).catch(err => {
        res.status(500).json({
            status:500,
            message:'data not saved' + err
        })
    })
    
    // if(req.body.name) {
    //     users.unshift(req.body);
    //     res.send({
    //         status:200,
    //         message: 'request added successfully',
    //         users:users
    //     })
    // }
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