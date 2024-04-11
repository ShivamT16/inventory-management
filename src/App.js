import './App.css';
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"

import { Inventory } from './Pages/Inventory';
import { Sales } from './Pages/Sales';
import logo from "./images/github.jpg"

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
        <h1>Inventory Management</h1>
        <NavLink className="link" to="/">Inventory</NavLink>
        <NavLink className="link" to="/sales">Sales</NavLink>
        <NavLink className="link1" to="https://github.com/ShivamT16/inventory-management" target='_blank' ><img className='logo' src={logo} alt="Github"/></NavLink>
        </nav>
        <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
