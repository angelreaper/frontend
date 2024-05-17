import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../ArchivoApi/APIInvoke'
import swal from 'sweetalert';

const MostrarProveedores = () => {

    const [proveedores, setProveedores] = useState([]);

    const getProveedores = async () => {
        const response = await APIInvoke.invokeGET(`/api/proveedores`);
        
        setProveedores(response.Proveedores);
        
    }

    useEffect(() => {
        getProveedores();
    }, [])

    const eliminarPrveedores = async (e, idProveedor) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/proveedores/${idProveedor}`);

        if (response.msg === 'El Proveedor fue elimnado correctamente') {
            const msg = "El proveedor fue elimnado correctamente";
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
            getProveedores();
        } else {


            
            const msg = "El Proveedor no fue borrado correctamente.";
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
                    titulo={"Listado de Proveedores"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Proveedores"}
                    ruta1={"/home"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/proveedores/agregar"} className="btn btn-block btn-primary btn-sm">
                                Crear Proveedores</Link></h3>
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
                                        
                                        <th style={{ width: '15%' }}>Razón Social</th>
                                        <th style={{ width: '15%' }}>Nit</th>
                                        <th style={{ width: '20%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Telefono</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '10%' }}>Opciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {proveedores.map( (proveedor, index) => (
                                <tr key = {index}>
                                    <td> {proveedor.razonSocial} </td>
                                    <td> {proveedor.nit} </td>
                                    <td> {proveedor.correo} </td>
                                    <td> {proveedor.telefono} </td>
                                    <td> {proveedor.direccion} </td>
                                    <td>
                                                        
                                                        <Link to={`/proveedores/editar/${proveedor._id}`} className="btn btn-sm btn-primary">Editar</Link>
                                                        <button onClick={(e) => eliminarPrveedores(e, proveedor._id)} className="btn btn-sm btn-danger">Borrar</button>
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

export default MostrarProveedores;