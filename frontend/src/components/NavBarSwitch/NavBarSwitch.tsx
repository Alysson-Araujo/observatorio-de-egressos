import Cookies from "js-cookie";
import NavBarInitialComponent from "../NavBarInitial/NavBarInitial";
import NavbarComponent from "../NavBar/NavbarComponent";
import { useEffect, useState } from "react";


function NavBarSwitch() {
    
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = !!Cookies.get('auth');
        if (auth) {
            setIsAuth(true);
        }
        else {
            setIsAuth(false);
        }
    }
    , []);

    

  return (
    <>
        {isAuth ? <NavbarComponent /> : <NavBarInitialComponent />}
    </>
  );
}

export default NavBarSwitch;