import pool from '../configs/connectDB';

let getHomepage = async (req, res) => {

	const [rows, fields] = await pool.execute('SELECT * FROM users');
	
	return res.render('index.ejs', {dataUser: rows});
}

let getDetailUser = async (req, res) => {

	let userId = req.params.userId;

	let [user] = await pool.execute('SELECT * FROM users WHERE ID = ?', [userId]);
	
	return res.send(JSON.stringify(user));
}

let createNewUser = async (req,res) => {
	let {firstName, lastName, mail, address} = req.body;
	await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', 
		[firstName, lastName, mail, address]);
	return res.redirect('/');
}

module.exports = {
	getHomepage,
	getDetailUser,
	createNewUser
}