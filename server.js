const app = require("express")();
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const chat = require("./chat");

// Connect database
connectDB();

// init middleware
app.use(bodyParser.json());

global.socket_clients = [];

// Socket.io
io.on("connection", function(socket) {
  let handshake = socket.request;
  global.socket_clients.push({
    user_id: handshake._query["user_id"],
    socket
  });

  // Chat handler
  chat(socket, handshake._query["user_id"]);
});

// Enable CORS
app.use(cors());

// routes
app.use("/api/sessions", require("./routes/api/sessions"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// // server static assets if in production
// if (process.env.NODE_ENV === "production") {

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
