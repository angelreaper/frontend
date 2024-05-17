import React, { useState, useEffect } from "react";
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import APIInvoke from '../../ArchivoApi/APIInvoke';
import SidebarContainer from "../../Componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';



const EditarProveedores = () => {

    const [razonSocial, setRazonSocial] = useState('');
    const [nit, setNit] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate()
    const { id } = useParams()


    //funcion actualizar
    const editarProveedores = async (e) => {
        e.preventDefault();
        const response = await APIInvoke.invokePUT(`/api/proveedores/${id}`, {
            razonSocial: razonSocial,
            nit: nit,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
        })

        if (response.msg==='El Proveedor fue actualizado correctamente') {
            const msg='El proveedor fue actualizado correctamente'
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            navigate('/proveedores');
        } else {
            const msg='El cliente no fue actualizado.'
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
        }
         
    }

    useEffect( () =>{
        getProveedoresID()
      //eslint-disable-next-line
    }, []);

    const getProveedoresID = async () => {
       const resul =  await APIInvoke.invokeGET(`/api/proveedores/${id}`)
       setRazonSocial(resul.razonSocial)
       setNit(resul.nit)
       setCorreo(resul.correo)
       setTelefono(resul.telefono)
       setDireccion(resul.direccion)
       
    }


  return (
    <div className="wrapper">
    <Navbar></Navbar>
    <SidebarContainer></SidebarContainer>

    <div className="content-wrapper">

        <ContentHeader
            titulo={"Editar Proveedores"}
            breadCrumb1={"Listado de proveedores"}
            breadCrumb2={"editar"}
            ruta1={"/Proveedores"}
        />
    <section className="content" >
            <div className="card">
                <div className="card-header">                            
                    <div className="card-tools">

                        <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                            <i className="fas fa-times" />
                        </button>

                        <button type="button" className="btn btn-tool" data-card-widget="remove"
                            title="Remove">
                            <i className="fas fa-items" />
                        </button>
                    </div>
                </div>

                <div className="card-body">
                    <form onSubmit={editarProveedores}>

                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="razonSocial" > Razón Social </label>
                                <input type="text"
                                className="form-control"
                                id='razonSocial'
                                name='razonSocial'
                                placeholder="Ingrese los razón social del Proveedor"
                                value={razonSocial}
                                onChange={(e) => setRazonSocial(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

                     
                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="nit" > Nit </label>
                                <input type="number"
                                className="form-control"
                                id='nit'
                                name='nit'
                                placeholder="Ingrese la Nit del Proveedor"
                                value={nit}
                                onChange={(e) => setNit(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

                      

                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="email" > Correo </label>
                                <input type="text"
                                className="form-control"
                                id='correo'
                                name='correo'
                                placeholder="Ingrese el correo del Proveedor"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

         


                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="telefono" > Telefono </label>
                                <input type="number"
                                className="form-control"
                                id='telefono'
                                name='telefono'
                                placeholder="Ingrese el telefono del Proveedor"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

               


                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="direccion" > Direccion </label>
                                <input type="text"
                                className="form-control"
                                id='direccion'
                                name='direccion'
                                placeholder="Ingrese la direccion del Proveedor"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

                     
                        <div className="card-footer">
                         <button type="submit" className="btn btn-primary">
                            Editar
                         </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
    <Footer></Footer>
</div>

   
  )
}

export default EditarProveedores

