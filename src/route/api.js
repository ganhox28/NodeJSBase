import express from "express";
import apiController from '../controller/apiController';

var router = express.Router();

const initAPI = (app) => {
	router.get('/users', apiController.apiRead);

    router.post('/create', apiController.apiCreate);

    router.put('/update', apiController.apiUpdate);

    router.delete('/delete/:id', apiController.apiDelete);

	return app.use('/api/v1', router);
}

export default initAPI;