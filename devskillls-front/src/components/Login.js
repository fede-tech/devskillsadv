import axios from "../api/axios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";


const LOGIN_URL = "/auth";

const Login = () => {
  const { auth, setAuth } = useAuth();

  const username = "sarah";
  const password = "connor";

  const doConnect = () => {
    axios
      .post(LOGIN_URL, {
        username,
        password,
      })
      .then((res) => {
        console.log(res?.data);
        setAuth(res?.data?.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    doConnect();
  }, []);

  return (
    <div>
      <div>Login</div>
      {console.log(`auth: ${auth}`)}
      <div>{auth ? 'si': 'no'}</div>
    </div>
  );
};

export default Login;
