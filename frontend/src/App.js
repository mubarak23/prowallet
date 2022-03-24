import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
