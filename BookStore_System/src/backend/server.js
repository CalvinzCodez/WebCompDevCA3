const express = require('express');
const app = express();
const port = 3000;

const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // Further MongoDB operations go here
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit in case of connection failure
  }
}

run().catch(console.dir);

app.use(express.json()); // for parsing application/json

app.post('/add', async (req, res) => {
  try {
    const database = client.db("bookstore");
    const collection = database.collection("books");
    const book = {
      title: req.body.title,
      ISBN: req.body.ISBN,
      author: req.body.author,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock
    };
    const result = await collection.insertOne(book);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/books', async (req, res) => {
  try {
    const database = client.db("bookstore");
    const collection = database.collection("books");
    const books = await collection.find({}).toArray();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/search', async (req, res) => {
  try {
    const database = client.db("bookstore");
    const collection = database.collection("books");

    let query = {};
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: 'i' };
    }
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' };
    }
    if (req.query.ISBN) {
      query.ISBN = { $regex: req.query.ISBN, $options: 'i' };
    }
    const books = await collection.find(query).toArray();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to update book stock
app.put('/books/:id/updateStock', async (req, res) => {
  try {
    const { id } = req.params;
    const quantityToSubtract = req.body.quantity;

    const database = client.db("bookstore");
    const collection = database.collection("books");

    // Retrieve current stock
    const book = await collection.findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Calculate new stock and prevent it from going below zero
    const newStock = Math.max(0, book.stock - quantityToSubtract);

    // Update the stock in the database
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { stock: newStock } }
    );

    res.status(200).send(`Stock updated for book ${id}`);
  } catch (error) {
    console.error('Error updating book stock:', error);
    res.status(500).send(error.message);
  }
});

app.put('/edit/:id', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('bookstore');
    const collection = database.collection('books');

    const { id } = req.params;
    let updatedData = req.body;

    // Remove _id from updatedData if it exists
    if (updatedData._id) {
      delete updatedData._id;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      res.status(404).send('No book found with the specified ID.');
    } else {
      res.status(200).send(`Successfully updated the book with ID ${id}`);
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.delete('/delete/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const database = client.db("bookstore");
    const collection = database.collection("books");
    const result = await collection.deleteOne({ title: title });

    if (result.deletedCount === 1) {
      res.status(200).send(`Successfully deleted one document.`);
    } else {
      res.status(404).send(`No documents matched the query. Deleted 0 documents.`);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});

