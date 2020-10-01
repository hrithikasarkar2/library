var mysql_conn     = require('../db_connection/db_connection');
//const bcrypt      =require("bcrypt");

/*bcrypt.compare(password, hash, function(err, result) {
   // result == true
});*/

exports.UserIdValidation = function(email,password,callback){

	mysql_conn.query('SELECT * FROM signup_table WHERE EMAIL_ID = ?',password,function(err,data){
		if(err){
			callback(0)
			console.log(err);
		}
		else if(data.length==0){
			callback(1)
		}
		else if(data[0].PASSWORD!=password){
				callback(2);    
			}
		else{
				callback(data);
		    }
	})
}

