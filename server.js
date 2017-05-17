const express = require('express');
const bodyparser = require('body-parser');

const app = express();

//structure:
//data:
// [0] [ { id: 0,
// [0]     name: 'Bryan',
// [0]     post: 'first post',
// [0]     time: '2017/4/8 14:58:54',
// [0]     replies: [] },
// [0]   { id: 1,
// [0]     name: 'a',
// [0]     post: 'd',
// [0]     time: '2017/4/8 14:59:01',
// [0]     replies: [ {
//             id: 1-0,
//             name: Andrea,
//             reply: 'first comment',
//             time: '2017/5/8 22:20:32'
//         } ] } ]
const workers = [
    {
        name: "許秉鈞",
        ID: "b03901023",
        group: 1
    },
    {
        name: "王文謙",
        ID: "b03901041",
        group: 1
    },
    {
        name: "江庭瑋",
        ID: "b03901010",
        group: 2
    },
    {
        name: "袁培傑",
        ID: "b03901133",
        group: 3
    }
]
let user = {name: "", ID: ""};
// console.log(__dirname)
app.use(bodyparser.json());
app.use(express.static(__dirname+'/build'))
app.use(express.static(__dirname+'/public'))
app.get('/', (req,res)=>{res.sendFile(__dirname+'/public/index.html')})
// app.get('/api/comments', (req, res)=>{res.json(data)})
// app.post('/api/comments', (req,res) => {
//     id+=1;
//     console.log("GET POST")
//     console.log(req.body);
//     data.push({
//         id: id,
//         name: req.body.name,
//         post: req.body.post,
//         time: req.body.time,
//         replies: []
//     })
//     console.log(data);
//     res.json(data);
// })

app.post('/login', (req,res) => {
    console.log("GET REPLY");
    console.log(req.body);
    user = {
        name: req.body.stuName,
        ID: req.body.stuID
    }
})

const port = process.env.PORT || 3001;
app.listen(port, ()=>{console.log("listening...")});
