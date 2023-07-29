const express = require("express");
const UsuariosService = require("../services/usuariosService");
const emailer = require('../config/mailer');
const mensajeinicio = require('../config/mensajeinicio');
const cotizacion = require('../config/cotizacion');
const { config } = require("../config");
const jwt = require("jsonwebtoken");
const path = require('path');
const app = express();
const fs = require('fs')
const fileUpload = require('express-fileupload');
app.use(fileUpload());


const usuariosApi = (app) => {

    const router = express.Router();
    app.use('/api/administrador', router);
    const usuariosService = new UsuariosService();

    router.post('/crearProveedor',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.buscarProveedor({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` EL proveedor ${datos.correo} ya se encuetra registrado `
                });
            }
            else {
                const { body: datos } = req;
                let crearProveedor = await usuariosService.crearProveedor({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `Provedor creado`
                });
            }
        });
    router.post('/crearProducto',
        async function (req, res, next) {
            const { body: datos } = req;

            let datosInsertados = await usuariosService.buscarProducto({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` EL codigo del producto  ${datos.codigo} ya se encuetra registrado  .`
                });
            } else {
                let crearproducto = await usuariosService.crearProducto({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `producto creado.`
                });
            }
        });
    router.post('/crearRol',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultaRol({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` el rol  ${datos.nombre} ya se encuetra registrado`
                });
            } else {
                let crearproducto = await usuariosService.crearRol({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `Rol creado`
                });
            }
        });

    router.post('/crearclientealmacen',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.crearclientealmacen({ datos });
            return res.status(200).json({
                ok: true,
                message: `Cliete creado creado .`
            });
        });
    router.post('/crearCategoria',


        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.crearCategoria({ datos });
            return res.status(200).json({
                ok: true,
                message: `Categoria creada .`
            });
        });



    router.post('/crearMarca',
        async function (req, res, next) {
            const { body: datos } = req;

            let datosInsertados = await usuariosService.buscarMarca({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` la marca  ${datos.nombre} ya se encuetra registrada`
                });
            } else {
                let crearproducto = await usuariosService.crearMarca({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `Marca creada.`
                });
            }
        });

    router.post('/crearEmpresa',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.crearEmpresa({ datos });
            return res.status(200).json({
                ok: true,
                message: `empresa creada.`
            });
        });

    router.post('/crearProducto',
        async function (req, res, next) {
            const { body: datos } = req;

            let datosInsertados = await usuariosService.buscarProducto({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` EL producto ${datos.nombre} ya se encuetra registrado  .`
                });
            } else {
                let crearproducto = await usuariosService.crearProducto({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `producto creado.`
                });
            }
        });

    router.post('/crearUsuario',

        async function (req, res, next) {
            const { body: datos } = req;
            console.log('datos', datos);
            let datosInsertados = await usuariosService.buscarUsuario({ datos });

            if (datosInsertados.length > 0) {

                return res.status(200).json({
                    ok: false,
                    message: `El usuario ${datos.correo} se encuentra registrado.`

                });

            }
            else {
                let crear = await usuariosService.crearUsuario({ datos });

                return res.status(200).json({
                    ok: true,
                    message: `Registro exitoso.`
                });
            }
        });

    router.post('/crearUsuarioCliente',

        async function (req, res, next) {
            const { body: datos } = req;
            console.log('llegamos', datos);
            let datosInsertados = await usuariosService.buscarUsuarioCliente({ datos });

            if (datosInsertados.length > 0) {

                return res.status(200).json({
                    ok: false,
                    message: `El usuario ${datos.correo} se encuentra registrado.`

                });

            }
            else {
                let crear = await usuariosService.crearUsuarioCliente({ datos });



                return res.status(200).json({
                    ok: true,
                    message: `Registro exitoso.`
                });
            }
        });

    router.post('/crearVenta',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.crearVenta({ datos });
            return res.status(200).json({
                ok: true,
                message: `se a registrado una venta .`
            });
        });



    /*  router.post('/loginUsuario',
       
      async function(req, res, next){
        const{body: datos}=req;
          let datosInsertados =await usuariosService.login({datos});
          console.log(datosInsertados)
      if(!datosInsertados){
          return res.status(200).json({
              ok: false,
              message: `el correo o la contraseña no son correctas.`
              
            
          }
        
          );
         
          
      } else {
          return res.status(200).json({
              ok: true,
              message: `login exitoso`
          });
      }
  
        
      }); 
      
      
       else{
              let datosInsertados = await usuariosService.login({datos});
              return res.status(200).json({
                  ok: false,
                  message: `el correo o la contraseña no son correctas.`
              
          });
      } 
      
      
      
      
      
      
      
      
      
      
      
      
      */

    router.post('/loginUsuario',

        async function (req, res, next) {
            const { body: datos } = req;

            let datosLogin = await usuariosService.loginUsuario({ datos });

            if (datosLogin) {
                let estado = await usuariosService.consultarEstado({ datosLogin });
                if (estado.estado == false) {
                    return res.status(200).json({
                        ok: false,
                        message: `usuario  esta inactivo.`
                    });

                } else {

                    let consultarUsuarioDB = await usuariosService.consultaUsuarioToken({ datosLogin });
                    console.log('consultarUsuarioDB', consultarUsuarioDB, config.authJwtSecret);
                    console.log('consultarUsuarioDB', consultarUsuarioDB);
                    const { id, nombre, apellido, telefono, correo, estado, roles, nombrerol } = consultarUsuarioDB;

                    const payload = { id, nombre, apellido, telefono, correo, estado, roles, nombrerol };

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: config.expiresIn,
                    });
                    return res.status(200).json({
                        ok: true,
                        roles,
                        token,
                        message: `Login  exitoso.`
                    });
                }

            }
            else {
                return res.status(200).json({
                    ok: false,
                    message: `el correo o la contraseña no son correctas.`

                });
            }
        }
    );
    /*router.post('/loginUsuario',
    async function(req, res, next) {
        const { body: datos } = req;

        let [usuario] = await usuariosService.loginUsuario({ datos });
        if (usuario) {
            const payload = { idusuario: usuario.idusuario, nombre: usuario.nombre, usuario: usuario.usuario, idrol: usuario.idrol };
            const token = jwt.sign(payload, config.authJwtSecret, {
                expiresIn: config.expiresIn,
            });
            return res.status(200).json({
                ok: true,
                token,
                message: `Bienvenido.`
            });
        } else {
            return res.status(200).json({
                ok: false,
                message: `Acceso denegado.`
            });
        }
    });*/
    router.post('/logincliente',

        async function (req, res, next) {
            const { body: datos } = req;
            console.log(datos)
            let datosLogin = await usuariosService.logincliente({ datos });

            // console.log('inportante este es el token ',token);
            if (!datosLogin) {
                return res.status(200).json({
                    ok: false,
                    message: `el correo o la contraseña no son correctas.`

                });


            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Login  exitoso.`

                });
            }
        });
    /*  const payload = {
          check:true
      };
       const token =jwt.sign(payload, app.get('key'),{
          expiresIn:'7m' 
       });   
  */
    router.post('/crearEditarUsuarioVendedor',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.buscarUsuarioVendedor({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: `El usuario ${datos.correo} se encuentra registrado.`
                });
            } else {


                let crear = await usuariosService.CrearEditarUsuarioVendedor(datos,/* claveNueva*/);
                mensajeinicio.sendMail(datos);
                return res.status(200).json({
                    ok: true,
                    message: `Usuario creado hemos enviado al correo la informacion del usuario.`

                });
            }
        });


    router.post('/crearCotizacion',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.crearCotizacion({ datos });
            cotizacion.sendMailCotizacion(datos);
            return res.status(200).json({
                ok: true,
                message: `Cotizacion enviada`
            });
        });

    router.post('/loginpasswords',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.buscarUsuarioCliente({ datos });

            if (datosInsertados.length > 0) {
                let enlace = await token();
                console.log('enlace recueprar usuario', enlace);
                let crear = await usuariosService.RecuperarPasswordCliente(datos, enlace);
                emailer.sendMailpassword(datos, enlace);
                //let tokenpassword = await token();
                // console.log('inportante este es el token ',tokenpassword);
                return res.status(200).json({
                    //token:token,
                    ok: true,
                    message: `el  usuario se encuentra registrado hemos enviado la informacion al correo`
                });
            } else {

                return res.status(200).json({
                    ok: false,
                    message: `usuario no se encuentra registrado en la base de datos`
                });
            }

        });
    const token = () => {
        let codigo = '';
        let caracteres = 'qwertyuiopasdfghjklñzxcvbnm./QWERTYUIOPASDFGHJKLÑZXCVBNM';
        for (let i = 1; i <= 50; i++) {
            let char = Math.floor(Math.random() * caracteres.length + 1);
            codigo += caracteres.charAt(char)
        }
        return codigo;
    }


    /* const payload = {
            check:true
        };
         const token =jwt.sign(payload, app.get('key'),{
            expiresIn:'7m' 
         });   
        */

    router.post('/editarProveedor',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarProveedor({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });





    router.post('/editarRoles',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarRoles({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });


    router.post('/actualizarEstadoUsuario',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.actualizarEstadoUsuario({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos actualizado  el estado`
            });
        });

    router.post('/actualizarEstadoCategoria',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.actualizarEstadoCategoria({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos actualizado  el estado`
            });
        });

    router.post('/editarProducto',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarProducto({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });



        router.post('/editarMarca',
        async function (req, res, next) {
            const { body: datos } = req;       
                let crearmarca = await usuariosService.editarMarca({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `hemos editado el registro`
                });
            
        });


    router.post('/crearMarca',
        async function (req, res, next) {
            const { body: datos } = req;

            let datosInsertados = await usuariosService.buscarMarca({ datos });
            if (datosInsertados.length > 0) {
                return res.status(200).json({
                    ok: false,
                    message: ` la marca  ${datos.nombre} ya se encuetra registrada`
                });
            } else {
                let crearproducto = await usuariosService.crearMarca({ datos });
                return res.status(200).json({
                    ok: true,
                    message: `Marca creada.`
                });
            }
        });

    router.post('/editarUsuario',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarUsuario({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });







router.post('/editarClientesAlmacen',
async function (req,res){
    const {body: datos}= req;
    console.log(datos);
    let editarClienteAlmacen= await usuariosService.editarClienteAlmacen({datos});
    return res.status(200).json({
        ok: true,
        message: `hemos editado el registro.`
    });
});



    router.post('/editarCategoria',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarCategoria({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });

    router.post('/editarVenta',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.editarVenta({ datos });
            console.log(datos)
            return res.status(200).json({
                ok: true,
                message: `hemos realizado la venta.`
            });
        });

    router.post('/editarEmpresa',
        async function (req, res, next) {
            const { body: datos } = req;
            console.log (datos);
            let datosInsertados = await usuariosService.editarEmpresa({ datos });
            return res.status(200).json({
                ok: true,
                message: `hemos editado el registro.`
            });
        });


    router.post('/consultarcategorias',
        async function (req, res, next) {
            let categorias = await usuariosService.consultarcategorias();
            console.log(categorias);
            return res.status(200).json({
                ok: true,
                message: `datos.`,
                categorias
            });
        });


    router.post('/validarCorreoGmail',
        async function (req, res, next) {
            const { body: datos } = req;
            let datoscorreovalidar = await usuariosService.validarCorreoGmail(datos);
            if (datoscorreovalidar) {
                return res.status(200).json({
                    ok: true,
                    message: `datos.`,
                    datoscorreovalidar
                });
            } else {
                return res.status(200).json({
                    ok: false,
                    message: `Para poder iniciar sesión debe comunicarse a través  de nuestra línea telefónica .`,
                    datoscorreovalidar
                });
            }

        })

    router.post('/consultarclientes',
        async function (req, res, next) {
            let clientes = await usuariosService.consultarcategorias();
            console.log(clientes);
            return res.status(200).json({
                ok: true,
                message: `datos.`,
                clientes
            });
        });

    router.post('/consultarroles',
        async function (req, res, next) {
            let roles = await usuariosService.consultarroles();
            console.log(roles);
            return res.status(200).json({
                ok: true,
                message: `datos.`,
                roles
            });
        });

    router.post('/consultarClientealmacen',
        async function (req, res, next) {
            let datosInsertados = await usuariosService.consultarClientealmacen();
            return res.status(200).json({
                ok: true,
                message: `datos.`,
                datosInsertados
            });
        });
    router.post('/consultarmarca',

        async function (req, res, next) {
            let marca = await usuariosService.consultarmarca();
            console.log(marca);
            return res.status(200).json({
                ok: true,
                message: `datos.`,
                marca
            });
        });

    router.post('/consultarListaCotizaciones',

        async function (req, res, next) {
            let datosInsertados = await usuariosService.consultarListaCotizaciones();

            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`,

            });
        });
    router.post('/consultarListaEmpresa',

        async function (req, res, next) {
            let datosInsertados = await usuariosService.consultarListaEmpresa();
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`,

            });
        });


    router.post('/consultarListasCotizaciones',

        async function (req, res, next) {
            let datosInsertados = await usuariosService.consultarListasCotizaciones();
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`,

            });
        });
    router.post('/consultarListaVentas',

        async function (req, res, next) {
            let datosInsertados = await usuariosService.consultarListaVentas();
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`,

            });
        });


    router.post('/crearEditarUsuarioProveedor',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.CrearEditarUsuarioProveedor({ datos });
            return res.status(200).json({
                ok: true,
                message: `Usuario creado .`
            });
        });

    router.post('/cargarListaUsuarios',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaUsuarios({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });


    router.post('/eliminarCategoria',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let eliminarCategoria = await usuariosService.eliminarCategoria({ datos });

            return res.status(200).json({

                ok: true,
                message: ` categoria eliminado.`
            });
        }
    );

    router.post('/eliminarClientealmacen',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let eliminarClientealmac = await usuariosService.eliminarClientealmacen({ datos });

            return res.status(200).json({

                ok: true,
                message: ` categoria eliminado.`
            });
        }
    );
    router.post('/eliminarMarca',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let eliminarMarca = await usuariosService.eliminarMarca({ datos });

            return res.status(200).json({

                ok: true,
                message: `marca eliminado.`
            });
        }
    );
    router.post('/consultarListaProveedor',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaProveedor({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });

    router.post('/consultarListaroles',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaroles({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });
    router.post('/consultarListaProductos',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaProductos({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });


    router.post('/consultarparacotizacion',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarparacotizacion({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });


    router.post('/eliminarregistrocotizacion',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.eliminarcotizacion({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `cotización eliminada`
            });
        });

    router.post('/consultarListaCategorias',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaCategorias({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });

    router.post('/consultarCantidad',
        async function (req, res, next) {
            const { body: datos } = req;
            let cantidad = await usuariosService.consultarCantidad({ datos });
            return res.status(200).json({
                ok: true,
                cantidad,
                message: `datos.`
            });
        });


    router.post('/consultarCantidadventas',
        async function (req, res, next) {
            const { body: datos } = req;
            let ventas = await usuariosService.consultarCantidadventas({ datos });
            return res.status(200).json({
                ok: true,
                ventas,
                message: `datos.`
            });
        });


    router.post('/consultarCantidadCotizaciones',
        async function (req, res, next) {
            const { body: datos } = req;
            let cotizacion = await usuariosService.consultarCantidadCotizaciones({ datos });
            return res.status(200).json({
                ok: true,
                cotizacion,
                message: `datos.`
            });
        });

        router.post('/consultarCantidadAlmacenes',
        async function (req, res, next) {
            const { body: datos } = req;
            let empresa = await usuariosService.consultarCantidadAlmacenes({ datos });
            return res.status(200).json({
                ok: true,
                empresa,
                message: `datos.`
            });
        });

    router.post('/consultaralmacenes',

        async function (req, res, next) {
            const { body: datos } = req;
            let almacen = await usuariosService.consultaralmacenes({ datos });
            console.log('respustada', datos)
            return res.status(200).json({
                ok: true,
                almacen,
                message: `datos.`
            });
        });


    router.post('/consultarListaMarcas',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaMarcas({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });
    router.post('/eliminarUsuarioVendedor',
        async function (req, res, next) {
            const { body: datos } = req;
            console.log('datos', datos);
            let datosInsertados = await usuariosService.eliminarUsuarioVendedor({ datos });

            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `Usuario Eliminado.`
            });
        }
    );

    router.post('/eliminarUsuarioProveedor',
        async function (req, res, next) {
            const { body: datos } = req;
            console.log('datos', datos);
            let eliminarProveedor = await usuariosService.eliminarUsuarioProveedor({ datos });

            return res.status(200).json({
                ok: true,
                message: `proveedor Eliminado.`
            });
        }
    );


    router.post('/eliminarProducto',
        async function (req, res, next) {
            const { body: datos } = req;

            let eliminarproducto = await usuariosService.eliminarProducto({ datos });

            return res.status(200).json({

                ok: true,
                message: `producto eliminado.`
            });
        }
    );

    router.post('/eliminarEmpresa',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let eliminarEmpresa = await usuariosService.eliminarEmpresa({ datos });

            return res.status(200).json({

                ok: true,
                message: `almacen eliminado.`
            });
        }
    );

    router.post('/eliminarUsuarioRol',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let eliminarroles = await usuariosService.eliminarUsuarioRol({ datos });

            return res.status(200).json({

                ok: true,
                message: `rol eliminado.`
            });
        }
    );

    router.post('/eliminarCotizacion',
        async function (req, res, next) {
            const { body: datos } = req;
            //  console.log('datos',datos);
            let cotizacion = await usuariosService.eliminarCotizacion({ datos });

            return res.status(200).json({

                ok: true,
                message: `cotización eliminada `
            });
        }
    );

    router.post('/actualizarEstadoUsuario',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.actualizarEstadoUsuario({ datos });
            return res.status(200).json({
                ok: true,
                message: `ESTADO ACTUALIZADO.`
            });
        });

    router.post('/actualizarEstadoRol',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.actualizarEstadoRol({ datos });
            return res.status(200).json({
                ok: true,
                message: `ESTADO ACTUALIZADO.`
            });
        });

    router.post('/actualizarEstadoMarca',
        async function (req, res, next) {

            const { body: datos } = req;
            let datosInsertados = await usuariosService.actualizarEstadoMarca({ datos });
            return res.status(200).json({
                ok: true,
                message: `ESTADO ACTUALIZADO.`
            });
        });
    router.post('/consultarProductos',
        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarProductos({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });

    router.post('/consultarListaCompras',

        async function (req, res, next) {
            const { body: datos } = req;
            let datosInsertados = await usuariosService.consultarListaCompras({ datos });
            return res.status(200).json({
                ok: true,
                datosInsertados,
                message: `datos.`
            });
        });

    router.post('/consultaIdproducto',
        async function (req, res, next) {
            const { body: datos } = req;
            let listaProductos = await usuariosService.consultaIdproducto({ datos });
            return res.status(200).json({
                ok: true,
                listaProductos,
                message: `datos.`
            });
        });

    router.post('/cargar',
        app.use(fileUpload()),
        function (req, res) {

            let correo = req.query.correo;

            if (!req.files) {
                return res.status(400).json({
                    ok: false,
                    message: 'No se ha seleccionado ningún archivo'
                });
            }
            let archivo = req.files.archivo;
            let nombreCortado = archivo.name.split('.');
            let extension = nombreCortado[nombreCortado.length - 1];
            //console.log(archivo);
            //console.log(correo);
            let extensionesPermitidas = ['pdf'];
            if (extensionesPermitidas.indexOf(extension) < 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'La extensión de los archivos debe ser .pdf'
                });
            }
            filePath = path.resolve(__dirname, `../archivos`) + '/' + archivo.name;
            archivo.mv(filePath, function (err) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                const respuesta = cotizacion.sendMailCotizacion(correo);
                setTimeout(function () {
                    fs.unlinkSync(`./archivos/${correo}.pdf`)
                    console.log('File removed')
                }, 12000);

        
            })
        });

};





module.exports = usuariosApi;

