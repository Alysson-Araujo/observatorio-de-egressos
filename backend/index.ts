import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv"
import route from "./routes";
import path from "path";
import { downloadPlanilha } from "./src/services/survey-answered/DownloadPlanilha";
import cron from "node-cron";
import { AddSurveyAnsweredService } from "./src/services/survey-answered/AddSurveyAnsweredService";
dotenv.config()
const app = express();  
app.use(express.json());
app.use(cors());
app.use(route)



app.use(
  "/files",
  express.static(path.resolve(__dirname, "..","tmp"))
)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});


const PORT = process.env.PORT || 3003;

const taskUpdateSurveyAnswered = new AddSurveyAnsweredService()
async function runTaskUpdateSurveyAnswered() {
  await taskUpdateSurveyAnswered.execute();
}

// runTaskUpdateSurveyAnswered();
cron.schedule("0 0 */15 * * *", runTaskUpdateSurveyAnswered);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});