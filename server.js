const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const messageSchema = require("./messageSchema.js");
var Message = mongoose.model("Message", messageSchema);

const mongoURI = "mongodb+srv://chatuser:chatpass@akumacloud-r2091.mongodb.net/ChatNode?retryWrites=true&w=majority";
mongoose.connect(mongoURI, err => {
    console.log("Mongo connected", err);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post("/messages", (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if(err) sendStatus(500);
        io.emit("message", req.body);
        res.sendStatus(200);
    });
});

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

http.listen(port, hostname, () => {
    console.log(`Server is up at http://${hostname}:${port}/`);
});