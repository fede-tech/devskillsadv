import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import { useIdleTimer } from "react-idle-timer";

const Members = () => {
  const [members, setMembers] = useState([]);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  const [error, setError] = useState(null);

  const getMembers = async () => {
    const token = await refresh();

    try {
      const response = await axios.get("/api/members", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(response.data);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    getMembers();
  }, [auth, members]);

  const timeout = 1000 * 60 * 2;
  const [remaining, setRemaining] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => {
    setIsIdle(false);
  };
  const handleOnIdle = () => {
    setIsIdle(true);
  };

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime,
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    setRemaining(getRemainingTime());
    
    setInterval(() => {
      setRemaining(getRemainingTime());
      
    }, 1000);
  }, []);

  useEffect(() => {
    if (remaining === 0) {
      setMembers([]);
      reset();
    }
  }, [remaining]);


  return (
    <div>
      <Header title="Members" />
      <Link to="/">Home</Link>
    

      <h2>Members List</h2>
      {error && <div>There was an error while trying to fetch data</div>}

      {members.length ? (
        <ul>
          {members.map((member) => (
            <li key={member.ssn}>
              {member.firstName} / {member.lastName} / {member.address} /{" "}
              {member.ssn}
            </li>
          ))}
        </ul>
      ) : (
        <p>No members</p>
      )}
    </div>
  );
};

export default Members;
