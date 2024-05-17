import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../ArchivoApi/APIInvoke';
import sweetAlert from 'sweetalert';

export const Registro = () => {

        //llenamos el objeto
        const [usuario, setUsuario ] = useState({
            nombres:'',
            email:'',
            password:'',
            confpassword : ''
        })
        //estas son las variables para usar en el formulario
        const {nombres,email,password,confpassword} = usuario;

    //esto al parecer asigna el valor del formulario con el nombre correspondiente de cada campo dentro del html
    const onChage=(e)=>{
        setUsuario({
            ...usuario,[e.target.name]:e.target.value
            
        })
    }
    // para dejar el foco en el campo nombres
    useEffect(()=>{
        document.getElementById('nombres').focus();
    },[]);

    const registrarUsuario = async ()=>{
        if (password!==confpassword) {
            const msg = 'Las contraseñas son diferentes';
            sweetAlert({
                title:'error',
                text:msg,
                icon:'error',
                buttons:{
                    confirm:{
                        text:'ok',
                        value:true,
                        visible:true,
                        className:'btn btn-danger',
                        closeModal:true
                  }
                }
            });
        }else{
            if (password<8) {
                const msg = 'La contraseña debe tener minima 8 caracteres';
                sweetAlert({
                    title:'Registro Usuario',
                    text:msg,
                    icon:'error',
                    buttons:{
                        confirm:{
                            text:'ok',
                            value:true,
                            visible:true,
                            className:'btn btn-danger',
                            closeModal:true
                        }
                    }
                });
                
            }else{
                const data = {
                    nombres:usuario.nombres,
                    email:usuario.email,
                    password: usuario.password
                }

                const response = await  APIInvoke.invokePOST('/api/usuarios',data);
                const mensaje = response.msg;
                if (mensaje ==='El usuario ya existe') {

                    const msg = 'El usuario ya existe en el sistema';
                    
                    sweetAlert({
                        title:'Registro Usuario',
                        text:msg,
                        icon:'error',
                        buttons:{
                            confirm:{
                                text:'ok',
                                value:true,
                                visible:true,
                                className:'btn btn-danger',
                                closeModal:true
                            }
                        }
                    });
                }else{
                    const msg= 'El usuario creado correctamente'

                    sweetAlert({
                        title:'Registro Usuario',
                        text:msg,
                        icon:'success',
                        buttons:{
                              confirm:{
                                text:'Aceptar',
                                value:true,
                                visible:true,
                                className:'btn btn-success',
                                closeModal:true
                            }
                        }
                    });
                    setUsuario({
                        nombres:'',
                        email:'',
                        password:'',
                        confpassword : ''
                    })


                }

            }
        }
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        registrarUsuario();
    }
  return (
    <div className="hold-transition register-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>Registrarse</Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Ingrese los datos de usuario</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombres y Apellidos"
                  id="nombres"
                  name="nombres"
                  value={nombres}
                  onChange={onChage}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChage}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChage}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repite Contraseña"
                  id="confpassword"
                  name="confpassword"
                  value={confpassword}
                  onChange={onChage}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Registrarse
                </button>
                <Link to="/" className="btn btn-block btn-danger">
                  Regresar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
