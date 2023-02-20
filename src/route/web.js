import express from "express";
import homeController from '../controller/homeController'
var router = express.Router();

const initWebRoute = (app) => {
	router.get('/', homeController.getHomepage);

	router.get('/detail/user/:userId', homeController.getDetailUser);

	router.post('/create-new-user', homeController.createNewUser);

	router.post('/delete-user', homeController.deleteUser);

	router.get('/edit-user/:id', homeController.editUser);

	router.post('/update-user', homeController.updateUser);

	router.get('/about', (req, res) => {
		res.send(`Nguyen Quoc Anh Quan`);
	});

	return app.use('/', router)
}

export default initWebRoute;