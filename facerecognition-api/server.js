const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const knex = require('knex');
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString:process.env.DATABASE_URL,
    ssl:true,
  }
});
// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//       console.log(hash)
//   });
const database = {
	users : [
		{
			id: '123',
			name: 'Ved',
			email: 'ved@gmail.com',
			password : 'lol',
			entries : 0,
			joined: new Date()
		},
		{
			id: '234',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'sally',
			entries : 0,
			joined : new Date()
		},

	]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
	res.send("It is working!");
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

/*

*/