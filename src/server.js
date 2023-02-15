// const express = require('express');
import express from 'express';
const app = express();

const port = 8080;

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.get('/about', (req, res) => {
	res.send(`Nguyen Quoc Anh Quan`);
});

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`);
});