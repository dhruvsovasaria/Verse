// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Blog from "./pages/Blog";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
