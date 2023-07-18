const express = require('express');
const connectDb = require('./config/db');
const dotenv = require('dotenv');
const productRoute = require('./routes/productRoute');
dotenv.config({path: "/.env"});

const app = express();
connectDb();

app.use(express.json());

app.use('/api/product', productRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`listening on ${PORT}`));