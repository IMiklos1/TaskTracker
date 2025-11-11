import express from "express";
import cors from "cors";
import { TaskController } from "./controllers/task.controller";

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // your frontend dev URL
}));
app.use(express.json());
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Backend!');
});

app.use("/tasks", new TaskController().router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

