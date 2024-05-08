// main.js
"use strict";

// Listing 12.3 (p. 176-177)
const port = 3000,
  layouts = require("express-ejs-layouts"), // Listing 12.7 (p. 179)
  express = require("express"),
  homeController = require('./controllers/homeController'),
  subscribersController = require('./controllers/subscribersController'),
  errorController = require('./controllers/errorController'),
  app = express();

/**
 * ========================================
 * @TODO:
 * Listing 16.1 (p. 228)
 * 애플리케이션에 Mongoose 설정
 * ========================================
 */
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://eodnjs9906:srRXWelx7bYeKx8L@ut-node.rkbl8lc.mongodb.net/?retryWrites=true&w=majority&appName=UT-node", // 데이터베이스 연결 설정, // 경로 lesson15
);
mongoose.connection;
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MONGODB!!!");
});

app.set("port", process.env.PORT || port);

// Listing 12.7 (p. 179)
app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static("public")); // 제목 12.5 (p. 181)

// Listing 12.4 (p. 177)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// homeController.js
// Listing 12.6 (p. 178)
app.get("/", homeController.showHome);
app.get("/transportation", homeController.showTransportation);

/**
 * ========================================
 * @TODO:
 * Listing 16.7 (p. 233)
 * 구독자 페이지를 위한 라우트 추가나 바꾸기
 * ========================================
 */
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers);

// Listing 12.12 (p. 184)
app.use(errorController.logErrors);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at: http://localhost:${app.get("port")}`);
});
