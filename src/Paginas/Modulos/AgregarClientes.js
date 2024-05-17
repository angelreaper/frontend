import React, { useState, useEffect } from 'react';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../ArchivoApi/APIInvoke'
import swal from 'sweetalert';

const AgregarClientes = () => {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState({

        nombres: '',
        apellidos: '',
        documento: '',
        correo: '',
        telefono: '',
        direccion: ''

    });

    const { nombres, apellidos, documento, correo, telefono, direccion } = clientes

    useEffect(() => {
        document.getElementById("nombres").focus();
    }, [])

    const onChange = (e) => {
        setClientes({
            ...clientes,
            [e.target.name]: e.target.value
        })
    }

    const crearCliente = async () => {

        const data = {
            nombres: clientes.nombres,
            apellidos: clientes.apellidos,
            documento: clientes.documento,
            correo: clientes.correo,
            telefono: clientes.telefono,
            direccion: clientes.direccion
        }

        const response = await APIInvoke.invokePOST('/api/clientes', data);
        const idClientes = response._id;

        if (idClientes === '') {
            const msg = "hubo un error al agregar un cliente";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {

            navigate("/clientes");

            const msg = "El cliente fue creado con exito";
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
            setClientes({
                nombres: '',
                apellidos: '',
                documento: '',
                correo: '',
                telefono: '',
                direccion: ''

            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCliente();
    }

    return (  
    
    <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
        <div className='content-wrapper'>

            <ContentHeader
                titulo={"Creacion de Clientes"}
                breadCrumb1={"Listado de clientes"}
                breadCrumb2={"Creacion"}
                ruta1={"/clientes"}
            />
      
       
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    </div>

                    <div className="card-body">

                        <form onSubmit={onSubmit}>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Nombres</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nombres"
                                        name="nombres"
                                        placeholder='ingrese el nombres del Cliente'
                                        value={nombres}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fa-regular fa-input-text" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Apellidos</label>
                                    <input type="text"
                                        className="form-control"
                                        id="apellidos"
                                        name="apellidos"
                                        placeholder='ingrese el apellidos del Cliente'
                                        value={apellidos}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>


                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Documento</label>
                                    <input type="text"
                                        className="form-control"
                                        id="documento"
                                        name="documento"
                                        placeholder='ingrese el documento del Cliente'
                                        value={documento}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Correo</label>
                                    <input type="text"
                                        className="form-control"
                                        id="correo"
                                        name="correo"
                                        placeholder='ingrese el correo del Cliente'
                                        value={correo}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Telefono</label>
                                    <input type="text"
                                        className="form-control"
                                        id="telefono"
                                        name="telefono"
                                        placeholder='ingrese el apellidos del Cliente'
                                        value={telefono}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Direccion</label>
                                    <input type="text"
                                        className="form-control"
                                        id="direccion"
                                        name="direccion"
                                        placeholder='ingrese el apellidos del Cliente'
                                        value={direccion}
                                        onChange={onChange}
                                        required
                                    />
                                    {/* <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div> */}
                                </div>

                            </div>

                            <div className="card-footer">
                               <button type='submit' className="btn btn-primary">
                                  Agregar cliente
                                </button>
                            
                            </div>
                        </form>
                    </div>
              </div>                    
         </section >
      
         </div>
         <Footer></Footer>
    </div >

    );
}

export default AgregarClientes