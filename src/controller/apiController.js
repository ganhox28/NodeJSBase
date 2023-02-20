import pool from '../configs/connectDB';

let apiRead = async (req, res) => {

	const [rows, fields] = await pool.execute('SELECT * FROM users');
	
	return res.status(200).json ({
        message: "ok",
        data: rows
    });
}

let apiCreate = async (req, res) => {

	let {firstName, lastName, email, address} = req.body;

    if(!firstName || !lastName || !email || !address) {
        return res.status(200).json ({
            message: "Missing required params"
        })
    }

	await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', 
		[firstName, lastName, email, address]);
	
	return res.status(200).json ({
        message: "ok"
    });
}

let apiUpdate = async (req, res) => {
    let {id, firstName, lastName, email, address} = req.body;

    if(!id || !firstName || !lastName || !email || !address) {
        return res.status(200).json ({
            message: "Missing required params"
        })
    }

    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
	[firstName, lastName, email, address, id]);

    return res.status(200).json ({
        message: "ok"
    });
}

let apiDelete = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            message: "Missing required params"
        });
    }
	
	await pool.execute('delete from users where Id = ?', [id]);

    return res.status(200).json ({
        message: "ok"
    });
}

module.exports = {
    apiRead,
    apiCreate,
    apiUpdate,
    apiDelete
}