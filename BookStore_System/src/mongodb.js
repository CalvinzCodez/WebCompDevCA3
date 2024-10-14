const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const model = require("./server"); // Import your database model or functions

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/AddBook",function(req,res){
    res.sendFile(path.join(__dirname + "/components/screens/addbook"));
});

app.post('/AddBookSubmit', function (req, res){
        var bookData = req.body;
        model.SignUp(req,res,bookData);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
