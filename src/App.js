import "./App.css";
import Header from "./Header";
import Home from "./Home";
import ListContainer from "./ListContainer";
import ListDetails from "./ListDetails";
import NewList from "./NewList";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//reduce useEffects, send nested json down

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="/lists" element={<ListContainer />} />
          <Route path="/lists/:list_id" element={<ListDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
