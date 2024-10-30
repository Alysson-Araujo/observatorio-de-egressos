/**
 * @author ALYSSON ARAUJO
 * @access 09/09/2013
 */


import {Router} from "express"
import multer from "multer"
import uploadConfig from "./src/config/multer"
import { AddManyEgressosByPDFController } from "./src/controllers/egresso/AddManyEgressosByPDFController"
import { AuthUserController } from "./src/controllers/user/AuthUserController"
import { CreateUserController } from "./src/controllers/user/CreateUserController"
import { AddSurveyController } from "./src/controllers/survey/AddSurveyController"
import { GetAllSurveysController } from "./src/controllers/survey/GetAllSurveysController"
import { AddOneEgressoController } from "./src/controllers/egresso/AddOneEgressoController"
import { ForgotPasswordController } from "./src/controllers/user/ForgotPasswordController"
import { isValided } from "./src/middleware/isValided"
import { RedefinePasswordController } from "./src/controllers/user/RedefinePasswordController"
import { isAuthenticated } from "./src/middleware/isAuthenticated"
import { MetabaseController } from "./src/controllers/dashboard/DashboardController"
import { UserAuthenticatedController } from "./src/controllers/user/UserAuthenticatedController"

const route = Router()


const upload = multer(uploadConfig.upload("./tmp"))

route.get("/home-dashboard", new MetabaseController().handle)
route.post("/egressos/pdf",upload.single('file'), new AddManyEgressosByPDFController().handle) //OK parcialmente -
route.post("/egressos", isAuthenticated,new AddOneEgressoController().handle) //OK parcialmente -
route.post("/login", new AuthUserController().handle) //OK parcialmente -
route.post("/users", new CreateUserController().handle) 
route.post("/surveys", isAuthenticated,new AddSurveyController().handle) //OK parcialmente 
route.get("/surveys/historico", isAuthenticated,new GetAllSurveysController().handle) //OK parcialmente -
// Fazer o logout
route.post("/forgot-password",new ForgotPasswordController().handle) //OK parcialmente -
route.post("/reset-password/:token", isValided, new RedefinePasswordController().handle) //OK parcialmente -
route.get("/isauthenticated", isAuthenticated, new UserAuthenticatedController().handle) //OK parcialmente -
export default route