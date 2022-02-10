const express = require("express");
const UsuariosService = require("../services/UsuariosService");
const emailer = require('..//config/mailer');


const usuariosApi = (app) => {

    const router = express.Router();
    app.use('/api/administrador', router);
    const usuariosService = new UsuariosService();    

    router.post('/crearProveedor',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.crearProveedor({datos});
        return res.status(200).json({
            ok: true,
            message: `Provedore creado .`
        });
    });
    router.post('/crearCategoria',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.crearCategoria({datos});
        return res.status(200).json({
            ok: true,
            message: `categoria creada .`
        }); 
    });

    router.post('/crearMarca',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.crearMarca({datos});
        return res.status(200).json({
            ok: true,
            message: `marca creada .`
        }); 
    });
   
    router.post('/crearEmpresa',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.crearEmpresa({datos});
        return res.status(200).json({
            ok: true,
            message: `empresa creada.`
        }); 
    });

    router.post('/crearProducto',
    async function(req,res, next){
        const{ body :datos} =req;
        
        let datosInsertados = await usuariosService.buscarProducto({datos});
        if( datosInsertados.length > 0){  
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

            async function(req, res, next) {
            const { body: datos } = req;
        console.log('datos',datos);
            let datosInsertados = await usuariosService.buscarUsuario({ datos });
           
            if(datosInsertados.length > 0){  
                
                return res.status(200).json({
                    ok: false,
                    message: `El usuario ${datos.correo} se encuentra registrado.`
                    
                });
                
            } 
            else {
            let crear = await usuariosService.crearUsuario({ datos });
       
           emailer.sendMail(datos)
       
            return res.status(200).json({
                ok: true,
                message: `Registro exitoso.`
            });
            }
            });
            router.post('/crearUsuarioCliente',

            async function(req, res, next) {
            const { body: datos } = req;
        console.log('llegamos',datos);
            let datosInsertados = await usuariosService.buscarUsuarioCliente({ datos });
           
            if(datosInsertados.length > 0){  
                
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
        async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.crearVenta({datos});
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
     
    async function(req, res, next){
      const{body: datos}=req;
      let datosLogin = await usuariosService.login({datos});
    
      if(!datosLogin){
        return res.status(200).json({
            ok: false,
            message: `el correo o la contraseña no son correctas.`           
          
        });      
        
    } else {
        let estado = await usuariosService.consultarEstado({datos});    
    
       if(estado.estado == false){
        return res.status(200).json({
            ok: false,
            message: `usuario  esta inactivo.`        
        });
          
        } else {           
            return res.status(200).json({
                ok: true,
                message: `Login  exitoso.`                  
            });    
    }
        
    }}
    );
 
    router.post('/loginCliente',
     
    async function(req, res, next){
      const{body: datos}=req;
      let datosLogin = await usuariosService.logincliente({datos});

     console.log('inportante este es el token ',token);
      if(!datosLogin){
        return res.status(200).json({
            ok: false,
            message: `el correo o la contraseña no son correctas.`           
          
        });  
     
        
    } else 
    {        
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
    async function(req,res, next){
        const{ body :datos} =req;
        let datosInsertados = await usuariosService.buscarUsuarioVendedor({datos});
        if( datosInsertados.length > 0){
        return res.status(200).json({
            ok: false,
            message:`El usuario ${datos.correo} se encuentra registrado.`
        });
    }else { 
        let claveNueva = await ramdon();
        console.log('claveNueva',claveNueva);
        let crear = await usuariosService.CrearEditarUsuarioVendedor(datos, claveNueva);
        emailer.sendMail(datos,claveNueva);    
        return res.status(200).json({     
        ok: true,
        message: `Usuario creado hemos enviado al correo la informacion del usuario.`

     });
    }
    });

    const ramdon = ()=>{
      
        let contrasena = '';
           let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';           
            for (let i = 1; i <= 8; i++) {
                let char = Math.floor(Math.random() * caracteres.length + 1);                  
                contrasena += caracteres.charAt(char)
            }                 
            return contrasena;           
        }
        router.post('/loginpasswords',
        async function(req, res, next){
          const{body: datos}=req;
            let datosInsertados = await usuariosService.buscarUsuarioCliente({datos});
            
        if(datosInsertados.length>0){ 
            let enlace = await token();
            console.log('enlace recueprar usuario',enlace);
            let crear = await usuariosService.RecuperarPasswordCliente(datos, enlace);
            emailer.sendMailpassword(datos,enlace);
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
        const token = ()=>{  
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
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarProveedor({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos editado el registro.`
        });
    });
 
    router.post('/actualizarEstadoUsuario',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.actualizarEstadoUsuario({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos actualizado  el estado`
        });
    });

    router.post('/actualizarEstadoCategoria',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.actualizarEstadoCategoria({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos actualizado  el estado`
        });
    });

    router.post('/editarProducto',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarProducto({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos editado el registro.`
        });
    });
    router.post('/editarMarca',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarMarca({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos editado el registro.`
        });
    });
    router.post('/editarUsuario',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarUsuario({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos editado el registro.`
        });
    });
 
    router.post('/editarCategoria',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarCategoria({datos});
        return res.status(200).json({
            ok: true,
            message: `hemos editado el registro.`
        });
    });

    router.post('/consultarcategorias',
 
    async function(req, res, next) {
        let categorias  = await usuariosService.consultarcategorias();
        console.log(categorias);
        return res.status(200).json({
            ok: true,
            message: `datos.`,
            categorias
        });
    });
   
    router.post('/consultarmarca',
 
    async function(req, res, next) {
        let marca  = await usuariosService.consultarmarca();
        console.log(marca);
        return res.status(200).json({
            ok: true,
            message: `datos.`,
            marca
        });
    });
    router.post('/consultarListaImagenes',
 
    async function(req, res, next) {
        let datosInsertados  = await usuariosService.consultarListaImagenes();
        return res.status(200).json({
            ok: true,
            datosInsertados,
            message: `datos.`,
        
        });
    });


    router.post('/consultarListaVentas',
 
    async function(req, res, next) {
        let datosInsertados  = await usuariosService.consultarListaVentas();
        return res.status(200).json({
            ok: true,
            datosInsertados,
            message: `datos.`,
          
        });
    });
    
   
    router.post('/crearEditarUsuarioProveedor',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.CrearEditarUsuarioProveedor({datos});
        return res.status(200).json({
            ok: true,
            message: `Usuario creado .`
        });
    });

  router.post('/cargarListaUsuarios',
 
    async function(req, res, next) {
        const{body: datos}=req;
        let datosInsertados  = await usuariosService.consultarListaUsuarios({datos});
        return res.status(200).json({
            ok: true,
            datosInsertados,
            message: `datos.`
        });
    });

    
    router.post('/eliminarCategoria',
    async function(req, res, next) {
        const{body: datos }=req;
      //  console.log('datos',datos);
       let  eliminarCategoria = await usuariosService.eliminarCategoria({datos});
   
       return res.status(200).json({
       
        ok: true,      
        message: ` categoria eliminado.`
    });
   }
   );

   router.post('/eliminarMarca',
   async function(req, res, next) {
       const{body: datos }=req;
     //  console.log('datos',datos);
      let  eliminarMarca = await usuariosService.eliminarMarca({datos});
  
      return res.status(200).json({
      
       ok: true,      
       message: `marca eliminado.`
   });
  }
  );
  router.post('/consultarListaProveedor',
 
  async function(req, res, next) {
      const{body: datos}=req;
      let datosInsertados  = await usuariosService.consultarListaProveedor({datos});
      return res.status(200).json({
          ok: true,
          datosInsertados,
          message: `datos.`
      });
  });

  router.post('/consultarListaProductos',
 
  async function(req, res, next) {
      const{body: datos}=req;
      let datosInsertados  = await usuariosService.consultarListaProductos({datos});
      return res.status(200).json({
          ok: true,
          datosInsertados,
          message: `datos.`
      });
  });

 router.post('/consultarListaCategorias',
 async function(req, res, next) {
     const{body: datos}=req;
     let datosInsertados  = await usuariosService.consultarListaCategorias({datos});
     return res.status(200).json({
         ok: true,
         datosInsertados,
         message: `datos.`
     });
 });

 router.post('/consultarListaMarcas',
 async function(req, res, next) {
     const{body: datos}=req;
     let datosInsertados  = await usuariosService.consultarListaMarcas({datos});
     return res.status(200).json({
         ok: true,
         datosInsertados,
         message: `datos.`
     });
 });
    router.post('/eliminarUsuarioVendedor',
    async function(req, res, next) {
        const{body: datos }=req;
        console.log('datos',datos);
       let  datosInsertados = await usuariosService.eliminarUsuarioVendedor({datos});
  
       return res.status(200).json({
        ok: true,    
        datosInsertados,
        message: `Usuario Eliminado.`
    });
}
 );

 router.post('/eliminarUsuarioProveedor',
 async function(req, res, next) {
     const{body: datos }=req;
     console.log('datos',datos);
    let  eliminarUsuarioVendedor = await usuariosService.eliminarUsuarioProveedor({datos});

    return res.status(200).json({
     ok: true,      
     message: `proveedor Eliminado.`
 });
}
);


router.post('/eliminarProducto',
 async function(req, res, next) {
     const{body: datos }=req;
   //  console.log('datos',datos);
    let  eliminarUsuarioVendedor = await usuariosService.eliminarProducto({datos});

    return res.status(200).json({
    
     ok: true,      
     message: `producto eliminado.`
 });
}
);

router.post('/eliminarEmpresa',
 async function(req, res, next) {
     const{body: datos }=req;
   //  console.log('datos',datos);
    let  eliminarEmpresa = await usuariosService.eliminarEmpresa({datos});

    return res.status(200).json({
    
     ok: true,      
     message: `almacen eliminado.`
 });
}
);
  

    router.post('/actualizarEstadoUsuario',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.actualizarEstadoUsuario({datos});
        return res.status(200).json({
            ok: true,
            message: `ESTADO ACTUALIZADO.`
        });
    });

    router.post('/actualizarEstadoMarca',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.actualizarEstadoMarca({datos});
        return res.status(200).json({
            ok: true,
            message: `ESTADO ACTUALIZADO.`
        });
    });
    router.post('/consultarProductos',
    async function(req, res, next) {
        const{body: datos}=req;
        let datosInsertados  = await usuariosService.consultarProductos({datos});
        return res.status(200).json({
            ok: true,
            datosInsertados,
            message: `datos.`
        });
    });

    router.post('/consultarListaCompras',
 
  async function(req, res, next) {
      const{body: datos}=req;
      let datosInsertados  = await usuariosService.consultarListaCompras({datos});
      return res.status(200).json({
          ok: true,
          datosInsertados,
          message: `datos.`
      });
  });

  router.post('/consultaIdproducto',
  async function(req, res, next) {
      const{body: datos}=req;
      let listaProductos  = await usuariosService.consultaIdproducto({datos});
      return res.status(200).json({
          ok: true,
          listaProductos,
          message: `datos.`
      });
  });


};





module.exports = usuariosApi;

