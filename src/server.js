// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPI from './route/api';
import connection from './configs/connectDB';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

initAPI(app);

app.use((req, res) => {
	return res.render('404');
});

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`);
});