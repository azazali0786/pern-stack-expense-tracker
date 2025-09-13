import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors("*"));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.status(200).json({
        status: "success",
        message: "Welcome to Expense Tracker API"
    });
});

app.use("/api-v1", routes);  

app.use("*",(req, res)=>{
    res.status(404).json({
        status: "404 Not found", 
        message: "Route not found"
    });
});

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})
