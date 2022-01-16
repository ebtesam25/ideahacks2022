import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import BinMap from './screens/maps';
import Bins from "./screens/bin";


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<BinMap />} />
        <Route path="/bin/:id" element={<Bins />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
