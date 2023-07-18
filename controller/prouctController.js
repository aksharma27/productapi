const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/product');

const initDb = async (req, res) => {
    try {
        const jsonData = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const prodData = jsonData.data;

        // const product = new Product(prodData);
        const product = await Product.create(prodData);
        // await product.save();
        res.status(200).send('initialized db');
    } 
    catch(e) {
        console.log(e);
        res.status(500).send('error init db');
    }
};

const getSale = async (req, res) => {
    try {
        const {month} = req.query; //req.body
        
        const selectedMonth = new Date(month);
        
        const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
        const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0, 23, 59, 59);

        const totalSale = await Product.aggregate([
            {
                $match:{
                    sold: true,
                    dateOfSale: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
            {
                $group : {
                    _id : null, 
                    totalAmount: {$sum: "$price"},
                }
            }

        ]);

        res.json({totalSale: totalSale[0]?.totalAmount || 0 });
    }
    catch(e) {
        console.log(e);
        res.status(500).send("error");
    }
}

module.exports = {initDb, getSale};