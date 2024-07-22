const express = require("express");
const { borrowBook, borrowedBooks } = require("../controllers/borrowedBooks");

const router = express.Router();

router.post("/borrow-book", borrowBook);
router.get("/borrowed-books", borrowedBooks);

module.exports = router;