import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/paginaPrincipal.js";
import Login from "./pages/Login/login.js"

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;