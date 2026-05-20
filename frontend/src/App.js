import {BrowserRouter, Routes, Route} from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/paginaPrincipal.js";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PaginaPrincipal />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;