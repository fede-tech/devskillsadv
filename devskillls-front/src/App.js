import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import OtherPage from "./components/OtherPage";
import Members from "./components/Members";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="otherPage" element={<OtherPage />} />
        <Route path="members" element={<Members />} />
        <Route path="login" element={<Login />} />        
      </Routes>      
    </div>
  );
}

export default App;
