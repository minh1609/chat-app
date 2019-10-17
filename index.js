const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let users = {};

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "ci") {
    //If route do not match express round, try to match it with React Router
    app.use(express.static("client/build"));
    const path = require("path");

    //If route is not defined, send back HTML file
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
let server = app.listen(PORT, () => {
    console.log("app is running on" + PORT);
});

//set up socket io
let io = socket(server);

io.on("connection", socket => {
    console.log(`${socket.id} is connect`);

    socket.on("new user", (data, callback) => {
        //check if user name exist or not
        if (data in users) {
            callback(false);
        } else {
            callback(true);
            //set username for that socket
            socket.userName = data;
            users[socket.userName] = socket.id;
            io.emit("new user", socket.userName); //alert to all socket we have new user name list
            console.log(users);
        }
    });

    socket.on("send message", data => {
        io.emit("new message", data);
    });

    socket.on("private message", data => {
        io.to(users[data.receiver])
            .to(users[data.user])
            .emit("new message", data);
        console.log(users[data.receiver]);
    });

    socket.on("disconnect", data => {
        if (!socket.userName) return;
        delete users[socket.userName];
        io.emit("left room", socket.userName);
    });
});

app.get("/api/users", (req, res) => {
    let list = [];
    for (let key in users) {
        list.push(key);
    }
    res.send(list);
});
