import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/paginaPrincipal.js";
import Login from "./pages/Login/login.js";
import ListaPets from "./pages/ListaPets/listaPets.js";
import FormularioAdocao from "./pages/FormularioAdocao/formularioAdocao.js";
import Registrar from "./pages/Registrar/registrar.js";
import AdmGerenciar from "./pages/AdmGerenciar/admGerenciar.js";
import FormularioAdicao from "./pages/FormularioAdicao/formularioAdicao.js";


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listaPets" element={<ListaPets />} />
        <Route path="/formularioAdocao" element={<FormularioAdocao/>} />
        <Route path="/formularioAdicao" element={<FormularioAdicao/>} />
        <Route path="/registrar" element={<Registrar/>} />
        <Route path="/admGerenciar" element={<AdmGerenciar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;