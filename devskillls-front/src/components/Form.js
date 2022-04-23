import axios from "../api/axios";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const MORE_THAN_ONE_REGEX = /^[a-zA-Z]{2,}$/;

const SSN_REGEX = /^\d{3}-?\d{2}-?\d{4}$/;

const trim = (str) => {
  return str.replace(/^\s+|\s+$/g, "");
};

const Form = () => {
  const formRef = useRef();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [address, setAddress] = useState("");

  const [ssn, setSsn] = useState("");
  const [validSsn, setValidSsn] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = SSN_REGEX.test(ssn);
    setValidSsn(result);
  }, [ssn]);

  const { auth, setAuth } = useAuth();

  const refresh = useRefreshToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tok = await refresh();
      const response = await axios.post(
        "/api/members",
        { firstName, lastName, address, ssn },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      setErrMsg(err.response.data.message);
      setSuccess(false);
      console.log("eRR", err);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        minlength="2"
        onChange={(e) => setFirstName(trim(e.target.value))}
      />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        minlength="2"
        onChange={(e) => setLastName(trim(e.target.value))}
      />
      <br />
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        minlength="2"
        onChange={(e) => setAddress(trim(e.target.value))}
      />

      <p style={{ display: !validSsn ? "block" : "none" }}>
        Please check that the Social Security number you enter is a nine-digit
        number in the format "AAA-GG-SSSS".
      </p>
      <br />
      <label htmlFor="ssn">SSN:</label>
      <input type="text" id="ssn" onChange={(e) => setSsn(e.target.value)} />
      <br />
      <br />
      {success ? "The new member has been added to the Members List" : errMsg}
      <br />
      <br />
      <button onClick={handleReset}>Reset</button>
      <button type="submit" disabled={!validSsn ? true : false}>
        Save
      </button>
    </form>
  );
};

export default Form;
