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

let deleteUser = async (req, res) => {
	let userId = req.body.userId;
	
	await pool.execute('delete from users where Id = ?', [userId]);
	
	return res.redirect('/');
}

let editUser = async (req, res) => {
	let id = req.params.id;
	
	let [user] = await pool.execute('SELECT * FROM users WHERE Id = ?', [id]);
	
	return res.render("updateuser", {dataUser: user[0]});
}

let updateUser = async (req, res) => {
	let {firstName, lastName, email, address, id} = req.body;
	
	await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
	[firstName, lastName, email, address, id]);
	
	return res.redirect('/');
}

module.exports = {
	getHomepage,
	getDetailUser,
	createNewUser,
	deleteUser,
	editUser,
	updateUser
}