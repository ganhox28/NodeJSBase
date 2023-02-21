import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/img');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage });

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

let uploadFilePage = async (req, res) => {
	return res.render('uploadFile');
}

let handleUploadFile = async (req, res) => {
	const imageFilter = function(req, file, cb) {
		// Accept images only
		if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
			req.fileValidationError = 'Only image files are allowed!';
			return cb(new Error('Only image files are allowed!'), false);
		}
		cb(null, true);
	};
	 // 'profile_pic' is the name of our file input field in the HTML form
	 let upload = multer({ storage: storage, fileFilter: imageFilter }).single('fileUpload');

	 upload(req, res, function(err) {
		 // req.file contains information of uploaded file
		 // req.body contains information of text fields, if there were any
 
		 if (req.fileValidationError) {
			 return res.send(req.fileValidationError);
		 }
		 else if (!req.file) {
			 return res.send('Please select an image to upload');
		 }
		 else if (err instanceof multer.MulterError) {
			 return res.send(err);
		 }
		 else if (err) {
			 return res.send(err);
		 }
 
		 // Display uploaded image for user validation
		 res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
	 });
}

module.exports = {
	getHomepage,
	getDetailUser,
	createNewUser,
	deleteUser,
	editUser,
	updateUser,
	uploadFilePage,
	handleUploadFile
}