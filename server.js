const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

//const star = require('./star')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '203rohith',
    database : 'notes'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//const m = 1;

const result = (res) => db.select('*').from('list').then((data)=>{res.json(data)});
//const nres = (res) => db.select('*').from('list').then((data)=>{res.json({num:m})});

app.get('/', (req, res)=>{result(res)});
//app.get('/num',(req, res)=>{nres(res)});

app.post('/saveNote', function(req,res){
	let {name,data} = req.body;
	let x = req.body;
	res.json(name)
	db('list')
	  .where('name', '=', name)
	  .update({data:data})
	  .then(count=>console.log(count))
})

app.post('/createNote', function(req,res){
	let {num} = req.body;
	//m = num;
	res.json("asd"+num)

	db('list')
	  .insert({name:"new"+num, data:"empty"})
	  .then(console.log)  
})

app.post('/deleteNote', function(req,res){
	let {noteName} = req.body;
	//res.json("asd"+num)
	db('list')
	  .where('name','=',noteName)
	  .del()
	  .then(console.log)  
})

app.post('/newName', function(req,res){
	let {curname,newName} = req.body;
	//res.json("asd"+num)
	db('list')
	  .where('name', '=', curname)
	  .update({name:newName})
	  .then(count=>console.log(count)) 
})


app.listen(3001, ()=>console.log('listening on 3001'));