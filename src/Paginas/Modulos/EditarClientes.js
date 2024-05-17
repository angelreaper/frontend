import React, { useState, useEffect } from "react";
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import APIInvoke from '../../ArchivoApi/APIInvoke';
import SidebarContainer from "../../Componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';



const EditarClientes = () => {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate()
    const { id } = useParams()


    //funcion actualizar
    const editarClientes = async (e) => {
        e.preventDefault();
        const response = await APIInvoke.invokePUT(`/api/clientes/${id}`, {
            nombres: nombres,
            apellidos: apellidos,
            documento: documento,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
        })

        if (response.msg==='El cliente fue actualizado correctamente') {
            const msg='El cliente fue actualizado correctamente'
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
            navigate('/clientes');
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
        getclientesID()
      //eslint-disable-next-line
    }, []);

    const getclientesID = async () => {
       const resul =  await APIInvoke.invokeGET(`/api/clientes/${id}`)
       setNombres(resul.nombres)
       setApellidos(resul.apellidos)
       setDocumento(resul.documento)
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
            titulo={"Editar Clientes"}
            breadCrumb1={"Listado de clientes"}
            breadCrumb2={"editar"}
            ruta1={"/Clientes"}
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
                    <form onSubmit={editarClientes}>

                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="nombres" > Nombres </label>
                                <input type="text"
                                className="form-control"
                                id='nombres'
                                name='nombres'
                                placeholder="Ingrese los nombres del Cliente"
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}
                                required
                                />   
                          </div>
                        </div>

                     


                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="apellidos" > Apellidos </label>
                                <input type="text"
                                className="form-control"
                                id='apellidos'
                                name='apellidos'
                                placeholder="Ingrese el apellido del Cliente"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                required
                                />   
                          </div>
                        </div>




                        <div className="card-body" >
                            <div className="form-group">
                                <label htmlFor="cedula" > Cedula </label>
                                <input type="number"
                                className="form-control"
                                id='cedula'
                                name='cedula'
                                placeholder="Ingrese la cedula del Cliente"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
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
                                placeholder="Ingrese el correo del Cliente"
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
                                placeholder="Ingrese el telefono del Cliente"
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
                                placeholder="Ingrese la direccion del Cliente"
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

export default EditarClientes

