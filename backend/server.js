import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoute from "./routes/ProductRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import router from "./routes/UserRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import uploadRoute from "./routes/UploadRoutes.js";

const port = process.env.PORT || 5000;

// connect to DB
connectDB();

// init express app
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("App is running...");
});

app.use("/api/products", productRoute);
app.use("/api/users", router);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use("/uploads", express.static("/var/data/uploads"));
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	const __dirname = path.resolve();
	app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`App is running on port ${port}`));
