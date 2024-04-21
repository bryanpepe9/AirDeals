import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "../src/pages/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";

import "./App.css";

// Router logic goes here
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
