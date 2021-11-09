import express from "express";
import usersRoutes from "./routes/usersRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

dotenv.config();

// EXPRESS INIT
const app = express();

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE (To accept body data)
app.use(express.json({ extended: false }));

// DEFINE ROUTES
app.use("/api/users", usersRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/auth", authRoutes);

// HEROKU DEPLOY
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

// DEFINE PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
