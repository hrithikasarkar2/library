var express       = require('express');
var bodyParser    = require('body-parser');
const mysql_conn   =  require('./db_connection/db_connection');
var UV            = require('./router/user_validation');
const bcrypt		=require('bcrypt');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 98);

app.get('/',function(req,resp){

	resp.render('first')
});
app.get('/signin',function(req,resp){

	resp.render('signin')
});
app.get('/index',function(req,resp){

	resp.render('index')
});
app.post('/signin',function(req,resp){

    var email =req.body.email
    var password = req.body.password
    //var password1=bcrypt.hashSync(req.body.password,10);
	console.log(req.body)
	var insert_data ={
		EMAIL_ID:email,
		PASSWORD:password	
	}
	var query = "insert into signup_table set ?"
	mysql_conn.query(query,insert_data,function(err){
		if(!err){
			console.log('data inserted')
		}else{
             console.log(err);
		}
	})
	resp.render('signin')
   
})
app.post('/login',function(req,resp){
    var email =req.body.email
    var password =req.body.password
    UV.UserIdValidation(email,password,function(data){
		if(data==0){
			console.log('Database Error');
			resp.render('success',{error_id:0,msg:'Database Error'});

		}else if(data==1){
			console.log('Invalid Email ID')
			resp.render('success',{error_id:1,msg:'Invalid Email ID'});
		}else if(data==2){
			console.log('Invalid Password');
			resp.render('success',{error_id:2,msg:'Invalid Password'});
		}
		else{
			resp.render('index');
		}
	})
})

app.listen('98',()=>console.log('Server running at port 98'));

