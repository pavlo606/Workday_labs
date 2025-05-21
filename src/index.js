// In src/index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import UserRouter from "./routes/userRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import reportDetailsRouter from "./routes/reportDetailsRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import writeToDB from "./csv/import_csv.js";
import "./database/connect.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static("./public"));

app.use("/api/user", UserRouter);
app.use("/api/report", reportRouter);
app.use("/api/reportdetails", reportDetailsRouter);
app.use("/api/view", viewRoutes);

app.get("/api/database/generatedata", (req, res) => {
    writeToDB();
    res.status(200).send({
        status: "OK",
        data: "Generating data",
    });
});

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
