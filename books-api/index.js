// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});
// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
// make a helper function that will get the name and descrition of all books
async function getAllBooks() {
  // read the data from books-data.json
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks;
}

// 2. getOneBook(index)
async function getOneBook(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);

  // return parsedBooks[index];
  const book = parsedBooks[index];

  if (!book) {
    throw new Error("Book was not found");
  }

  return book;
}

// 3. getOneBookTitle(index)

async function getOneBookTitle(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);

  const book = parsedBooks[index];
  return book.title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books

app.get("/get-all-books", async (req, res) => {
  const books = await getAllBooks();
  // res.send() sends text data
  // res.json() sends JSON data
  res.json(books);
});

// 2. GET /get-one-book/:index

app.get("/get-one-book/:index", async (req, res) => {
  // try all of this risky code. if there's an error, catch it
  try {
    // get the value of the dynamic parameter
    const index = req.params.index;
    // call the helper function
    const book = await getOneBook(index);
    // send the book as JSON in the response
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error. Something went wrong while getting the book",
    });
  }
});

// 3. GET /get-one-book-title/:index — try writing this one yourself!

app.get("/get-one-book-title/:index", async (req, res) => {
  const index = req.params.index;

  const title = await getOneBookTitle(index);

  res.json(title);
});
