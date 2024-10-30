import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import RoutesApp from "./routes";
import NavBarSwitch from "./components/NavBarSwitch/NavBarSwitch";
import { Rodape } from "./components/Rodape/Rodape";


function App() {


  return (
    <>
      
      <Router>
      <NavBarSwitch />
        <RoutesApp />
      <Rodape />
      </Router>
      
    </>
  );
}

export default App;
