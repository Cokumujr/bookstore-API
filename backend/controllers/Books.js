const Book = require("../models/Books");

const getBooks = async(req, res) => {
  const books = await Book.find({})

    return res.send({"count": books.length, "books": books}).status(200)
};


 const addBook = async (req, res) => {
    try {
        const { title, author, description, price, category } = req.body;

        if (!title || !author || !description || !price || !category) {
            return res.status(400).send({
                message: 'Please send all required fields: title, author, description, price, category'
            });
        }

        const newBook = {
            title,
            author,
            description,
            price,
            category
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log( error);
        return res.status(500).send({
            message: 'Failed to add book'
        });
    }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({
        message: 'Book not found'
      });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error('Error getting book:', error.message);
    return res.status(500).send({
      message: 'Failed to get book'
    });
  }
};

const updateBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({
        message: 'Book not found'
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.status(200).send(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error.message);
    return res.status(500).send({
      message: 'Failed to update book'
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({
        message: 'Book not found'
      });
    }
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      message: 'Book deleted'
    });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return res.status(500).send({
      message: 'Failed to delete book'
    });
  }
};


module.exports = {
  getBooks,
  addBook,
  getBookById,
  updateBookById,
  deleteBook,
}
