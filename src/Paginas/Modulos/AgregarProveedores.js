import React, { useState, useEffect } from 'react';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../ArchivoApi/APIInvoke'
import swal from 'sweetalert';

const AgregarProveedores = () => {

    const navigate = useNavigate();

    const [proveedores, setProveedores] = useState({

        razonSocial: '',
        nit: '',
        correo: '',
        telefono: '',
        direccion: ''

    });

    const { razonSocial,nit, correo, telefono, direccion } = proveedores

    useEffect(() => {
        document.getElementById("razonSocial").focus();
    }, [])

    const onChange = (e) => {
        setProveedores({
            ...proveedores,
            [e.target.name]: e.target.value
        })
    }

    const crearProveedor = async () => {

        const data = {
            razonSocial: proveedores.razonSocial,
            nit: proveedores.nit,
            correo: proveedores.correo,
            telefono: proveedores.telefono,
            direccion: proveedores.direccion
        }

        const response = await APIInvoke.invokePOST('/api/proveedores', data);
        const idProveedor = response._id;

        if (idProveedor === '') {
            const msg = "hubo un error al agregar un proveedor";
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

            navigate("/proveedores");

            const msg = "El proveedor fue creado con exito";
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
            setProveedores({
                razonSocial: '',
                nit: '',
                correo: '',
                telefono: '',
                direccion: ''

            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProveedor();
    }

    return (  
    
    <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
        <div className='content-wrapper'>

            <ContentHeader
                titulo={"Creacion de Proveedores"}
                breadCrumb1={"Listado de Proveedores"}
                breadCrumb2={"Creacion"}
                ruta1={"/Proveedores"}
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
                                    <label htmlFor='razonSocial'>Razón Social</label>
                                    <input type="text"
                                        className="form-control"
                                        id="razonSocial"
                                        name="razonSocial"
                                        placeholder='Ingrese la razón social del Proveedor'
                                        value={razonSocial}
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
                                    <label htmlFor='nit'>Nit</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nit"
                                        name="nit"
                                        placeholder='Ingrese el nit del Proveedor'
                                        value={nit}
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
                                        placeholder='Ingrese el correo del Proveedor'
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
                                        placeholder='Ingrese el telefono del Proveedor'
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
                                        placeholder='Ingrese el dirección del Proveedor'
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
                                  Agregar Proveedor
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

export default AgregarProveedores