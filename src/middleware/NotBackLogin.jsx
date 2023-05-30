import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";

const NotBackLogin = () => {
   
  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();
  if (localStorage.user) {
    const userStorage = JSON.parse(localStorage.user);
    if (userStorage.uid === userAuth.uid) {
        useEffect(() => {
            return navigate("/");
            
        }, []);
        
    } else {
        return <Outlet />;
    }
}else{
      return <Outlet />;

  }

};

export default NotBackLogin;
