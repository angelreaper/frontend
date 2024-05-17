import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import APIInvoke from '../../ArchivoApi/APIInvoke';
import sweetAlert from 'sweetalert';

const Login = () => {


  const navigate = useNavigate();
    //llenamos el objeto
    const [usuario, setUsuario ] = useState({
        email:'',
        password:''
    })
    //estas son las variables para usar en el formulario
    const {email,password} = usuario;
    //esto al parecer asigna el valor del formulario con el nombre correspondiente de cada campo
    const onChange = (e)=>{
        setUsuario({
            ...usuario,[e.target.name]:e.target.value
            
        })
    }
 
    //deja el foco en el email
    useEffect(()=>{
        document.getElementById('email').focus()
    },[]);
    //función para iniciar sesión
    const inciarSesion = async ()=>{
        if (password<8) {

            const msg = 'La contraseña debe tener minima 8 caracteres';

            sweetAlert({
                title:'Login',
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
            const dataReq={
                email:usuario.email,
                password:usuario.password

            }
            const response = await APIInvoke.invokePOST('/api/auth',dataReq)
            //esto esta configurado en la respuesta de la api de autenticación
            const mensaje = response.msg;
            //console.log('este es el mensaje msg:',mensaje);
            //error del express validator que viene del backend
            const mensajeError = response.errores;
            //console.log('este es el mensaje errrores:',mensajeError);
            //esto esta configurado en la respuesta de la api de autenticación
            //aquí hay validaciones para el post de autenticación que estan implementadas con el exppress validator
            if (mensajeError || mensaje === 'El usuario no existe'||mensaje === 'La contraseña es incorrecta' || mensaje ==='Ingrese un email valido' || mensaje === 'El password debe ser minimo de 10 caracteres') {
                const msg = 'No es posible iniciar sesión, verifique los datos de ingreso';

                sweetAlert({
                    title:'Login',
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
                const jwt = response.token;
                //guardamos el token en el localstorage
                localStorage.setItem('token',jwt);
                const msg = 'Bienvenido';
                sweetAlert({
                    title:'Login',
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
                navigate('/Home');
            }
        };

       
    }
    //llamammos la función 
    const onSubmit=(e)=>{
        e.preventDefault();
        inciarSesion()
    }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="#">
            <b>Iniciar Sesión</b>
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id='email'
                  value={email}
                  name='email'
                  onChange={onChange}
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
                  placeholder="Password"
                  id='password'
                  value={password}
                  name='password'
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                >Ingresar</button>
                <Link to={"/Registro"} className="btn btn-block btn-success">
                  Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;