
const express = require('express');
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

const users = [

    {id : 1, name:'Course1'},
    {id : 2, name:'course2'},
    {id : 3, name:'course3'}
]

app.get('/users', (req,res) =>{

    console.log(users);

    res.send({
        status:200,
        message:'successfully fetched data',
        users:users
    })
});

app.post('/add-users', (req,res) => {

   console.log(req.body);

    if(req.body.name){
        users.push(req.body);
        res.send({
            status:200,
            message:'user successfully created',
            users:users
        })
    }

})

app.get('/get-details/:id', (req,res) => {

    console.log(req.params.id);  

    const details = users.findIndex(c => {

        if( c.id == req.params.id) {
            res.send({
                status:200,
                message:"Details got found",
                users:c
            })
        }
    })
})

app.delete('/deleteuser/:id', (req,res) => {

    const index = users.findIndex( data => {
        if (data.id == req.params.id) {
             return data;
        }
    })
        if(index >= 0) {
            console.log(index);
            users.splice(index,1);
            res.send({
                status:200,
                message:'successfully deleted',
                users:users
            })
        }
    })

    app.put('/update', (req,res) => {

        const index = users.findIndex(data => {

            if(data.c == req.body.c) {
                return data;
            }
        })

        if (index >= 0 && req.body){
            users[index] = req.body;
            res.send({
                status:200,
                message:"data updated successfully",
                users:users
            })
        }
    })

app.listen(3000, () => console.log('serve listening on port 3000'));
