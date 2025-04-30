
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import planRoutes from "./routes/planRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/plan", planRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
