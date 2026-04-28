import express from "express";
import Database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const { PORT = 3000 } = process.env;

const bootstrap = async () => {
  try {
    await Database.connect();

    app.use(express.json());

    app.get("/", (req, res) => {
      res.status(200).json({ message: "Node MVC API is running" });
    });

    app.use("/api/users", userRoutes);

    app.use((err, req, res, next) => {
      return res.status(500).json({ message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Application bootstrap failed:", error.message);
    process.exit(1);
  }
};

bootstrap();