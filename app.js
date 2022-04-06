const express = require('express');
const res = require('express/lib/response');
let { nanoid } = require("nanoid");
let ID = nanoid();
const app = express();

let users = [
    { name: 'hassan', email: 'hassan_alshrif@gmail.com', age: 21, id: 1 },
    { name: 'ahmed', email: 'ahmed_ashraf@gmail.com', age: 25, id: 2 },
    {
        name: 'ali',
        email: 'ahmed_ali@gmail.com',
        age: 24,
        id: 3
    }
]
console.log(users);
app.use(express.json());

app.post('/addUser', (req, res) => {

    let { name, email, age } = req.body;

    const mailCheck = users.find((ele) => {
        return ele.email == email
    });

    if (mailCheck) {
        res.json({ message: 'mail already exist' });
    } else {
        req.body.id = ID;
        users.push(req.body);
        res.json({ message: 'done' });
        console.log(users);
    }
})


app.delete('/deleteUser/:id', (req, res) => {

    const id = req.params.id

    const resault = users.find((ele) => {
        return ele.id == id;
    })
    console.log(resault);

    if (resault) {
        users = users.filter((ele) => {
            return ele.id != id;
        });
        console.log(users)
        res.json({ 'message': 'deleted' })
    } else {
        res.json({
            'message': 'nothing to delete'
        })
    }

})


app.get('/getAllUsers', (req, res) => {
    res.json({ users });
})

app.patch('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    const nameUpdated = req.body.name;
    users = users.map((ele) => {
        if (ele.id == id) {
            ele.name = nameUpdated;
            console.log(users);
            res.json({ message: 'done' })
        } else {
            return ele;
        }
    })

})

app.get('/search/:keyword', (req, res) => {
    const { keyword } = req.params;
    const resault = users.find((ele) => {
        if (keyword == ele.id || keyword == ele.name || keyword == ele.age || keyword == ele.email) {
            return res.json({ ele });
        } else {
            res.json({ message: 'no search resualt ' })
        }


    })
})

app.listen(3000, () => {
    console.log('runniiiiiing');
})