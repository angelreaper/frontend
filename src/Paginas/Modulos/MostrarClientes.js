import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../ArchivoApi/APIInvoke'
import swal from 'sweetalert';

const MostrarClientes = () => {

    const [clientes, setClientess] = useState([]);

    const getClientes = async () => {
        const response = await APIInvoke.invokeGET(`/api/clientes`);
        
        setClientess(response.clientes);
        
    }

    useEffect(() => {
        getClientes();
    }, [])

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'El cliente fue elimnado correctamente') {
            const msg = "El cliente fue elimnado correctamente";
            swal({
                title: 'Información',
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
            getClientes();
        } else {


            
            const msg = "El Cliente no fue borrado correctamente.";
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
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de Clientes"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Clientes"}
                    ruta1={"/home"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/clientes/agregar"} className="btn btn-block btn-primary btn-sm">
                                Crear Clientes</Link></h3>
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
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        
                                        <th style={{ width: '15%' }}>Nombres clientes</th>
                                        <th style={{ width: '15%' }}>Apellidos clientes</th>
                                        <th style={{ width: '15%' }}>Documento</th>
                                        <th style={{ width: '20%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Telefono</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '10%' }}>Opciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {clientes.map( (cliente, index) => (
                                <tr key = {index}>
                                    <td> {cliente.nombres} </td>
                                    <td> {cliente.apellidos} </td>
                                    <td> {cliente.documento} </td>
                                    <td> {cliente.correo} </td>
                                    <td> {cliente.telefono} </td>
                                    <td> {cliente.direccion} </td>
                                    <td>
                                                        
                                                        <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-sm btn-primary">Editar</Link>
                                                        <button onClick={(e) => eliminarClientes(e, cliente._id)} className="btn btn-sm btn-danger">Borrar</button>
                                                    </td>
                                                </tr>
                                      ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MostrarClientes;