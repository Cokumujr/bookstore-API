const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./Middleware/Auth');



const app = express();
const port = 7000;


//Database connection
const { connect_db } = require ("./db/config");
connect_db();

//middlewares
app.use (cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"));





//imported routes
const bookRoutes = require("./routes/Books");
const authRoutes = require("./routes/Auth");
const borrowRoutes = require("./routes/borrowedBooks");
const purchaseRoutes = require("./routes/purchase");
const customerRoutes = require("./routes/customer");


//base routes
app.get("/",(req,res)=>{
    res.json({
        "message": "server is running well..."}).status(200);
    });

// Auth routes
app.use("/auth", authRoutes);

// Book routes
app.use("/books", /*auth,*/ bookRoutes);

// Borrow routes
app.use("/borrow",/* auth,*/ borrowRoutes);

// Purchase routes
app.use("/purchase",/* auth*/ purchaseRoutes);

// Customer routes
app.use("/customers",/* auth,*/ customerRoutes);


//start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });