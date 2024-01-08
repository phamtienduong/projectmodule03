import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguserJSON = localStorage.getItem("user_login");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;

  return flaguser.role == 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;