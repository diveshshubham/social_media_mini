const cors = require("cors");
const express = require("express");
const compression=require('compression');
const viewEngine  = require('./config/viewEngine');

const app = express();
app.use(express.json());
app.use(compression())


var corsOptions = {
  origin: "http://localhost:8086"
};
app.use(cors(corsOptions));
viewEngine(app);
const commentRoutes = require('./router/index').commentRoutes;
const contentRoutes = require('./router/index').contentRoutes;
const friendsRoutes = require('./router/index').friendsRoutes;
const likeRoutes = require('./router/index').likeRoutes;
const userRoutes = require('./router/index').userRoutes;
const welcome = require('./router/index').welcome;
const upload = require('./router/index').uploadRoutes

app.use(express.urlencoded({ extended: true }));

commentRoutes(app)
contentRoutes(app)
friendsRoutes(app)
likeRoutes(app)
userRoutes(app)
welcome(app)
upload(app)

function initializeDatabaseConnection(){
  require('./database/mongo/connection')
}

initializeDatabaseConnection()

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});