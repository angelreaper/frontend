import { Fragment } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import  Login  from './Paginas/Autenticacion/Login';
import { Registro } from './Paginas/Autenticacion/Registro';
import Home from './Paginas/Home';
import MostrarClientes from './Paginas/Modulos/MostrarClientes';
import AgregarClientes from './Paginas/Modulos/AgregarClientes';
import EditarClientes from './Paginas/Modulos/EditarClientes';
import MostrarProveedores from './Paginas/Modulos/MostrarProveedores';
import AgregarProveedores from './Paginas/Modulos/AgregarProveedores';
import EditarProveedores from './Paginas/Modulos/EditarProveedores';


function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            {/* ruta de inicio */}
            <Route path='/' exact element={<Login/>}></Route> 
            {/* ruta de registro */}
            <Route path='/Registro' exact element={<Registro/>}></Route> 
            {/* ruta de home */}
            <Route path='/Home' exact element={<Home/>}></Route> 
            {/* ruta de clientes */}
            <Route path='/Clientes' exact element={<MostrarClientes/>}></Route> 
            {/* ruta de regitrarClientes */}
            <Route path='/Clientes/agregar' exact element={<AgregarClientes/>}></Route> 
            {/* ruta de modificar clientes */}
            <Route path="/Clientes/editar/:id" exact element = {<EditarClientes/>}></Route>

            {/* ruta de clientes */}
            <Route path='/Proveedores' exact element={<MostrarProveedores/>}></Route> 
            {/* ruta de regitrarClientes */}
            <Route path='/Proveedores/agregar' exact element={<AgregarProveedores/>}></Route> 
            {/* ruta de modificar clientes */}
            <Route path="/Proveedores/editar/:id" exact element = {<EditarProveedores/>}></Route>
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
