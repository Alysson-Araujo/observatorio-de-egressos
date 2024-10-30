import { useEffect /*useState */} from "react";
import "./Dashboard.css";
import Cookies from "js-cookie";

import { /*fetchDashboard*/ fetchIsAuthenticated } from "../../services/apiService";
function Dashobard() {
  // you will need to install via 'npm install jsonwebtoken' or in your package.json

  // const [tokenMetabase, setTokenMetabase] = useState("");

  useEffect(() => {
    // fetchDashboard().then((response) => {
    //   if (response) setTokenMetabase(response);
    // });

    if(Cookies.get("token") !== undefined){
      const response = async () => {
        await fetchIsAuthenticated();
      }
  
      return () => {
        response();
      }
    }
  }, []);
  const METABASE_SITE_URL = import.meta.env.VITE_LINK_PUBLIC_SITE_METABASE;
  // const iframeUrl =
  //   METABASE_SITE_URL +
  //   "/embed/dashboard/" +
  //   tokenMetabase +
  //   "#bordered=true&titled=true";

  return (
    <div style={{ height: '85vh' }}>
  <div id="container" style={{ height: '100%' }}>
    <iframe
      id="iframe"
      src={METABASE_SITE_URL}
      width="100%"
      height="100%"
    />
  </div>
</div>
  );
}

export default Dashobard;
