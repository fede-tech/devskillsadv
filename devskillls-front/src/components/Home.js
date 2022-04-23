import { Link } from "react-router-dom";
import Form from "./Form";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <div>
        <Header title='Home' />
        Home / <Link to="/members">Members</Link>
        <br />
        <br />
      </div>
      <Form />
    </>
  );
};

export default Home;
