import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const res = await axios.post("/auth", {
      withCredentials: true,
      username: "sarah",
      password: "connor",
    });
    setAuth(res.data.token);

    return res.data.token;
  };
  return refresh;
};

export default useRefreshToken;
