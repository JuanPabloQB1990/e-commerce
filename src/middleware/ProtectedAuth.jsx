import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";

const ProtectedAuth = () => {
  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();
  if (localStorage.user) {
    const userStorage = JSON.parse(localStorage.user);
    if (userStorage.uid === userAuth.uid) {
      return <Outlet />;
    } else {
      useEffect(() => {
        return navigate("/");
      }, []);
    }
  }
};

export default ProtectedAuth;
