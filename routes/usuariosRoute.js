const express = require('express');
const UsuariosService = require('../services/UsuariosService');



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

    router.post('/crearProducto',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.RegistroProducto({datos});
        console.log(datosInsertados)
        return res.status(200).json({
            ok: true,
            message: `producto creado .`
        }); 
    });
   

    
 


    router.post('/loginUsuario',
     
    async function(req, res, next){
      const{body: datos}=req;
        let datosInsertados =await usuariosService.login({datos});
        console.log(datosInsertados)
    if(datosInsertados.length>0){
        return res.status(200).json({
            ok: true,
            message: `acceso exitoso.`
            
          
        }
      
        );
       
        
    } else {
        return res.status(200).json({
            ok: false,
            message: `No existe el usuario`
        });
    }
      
    });

   

    router.post('/crearUsuario',
    async function(req, res, next) {


 const { body: datos } = req;
       let datosInsertados = await usuariosService.registrarUsuario({datos});
        return res.status(200).json({
            ok: true,
            message: `Usuario creado.`
        });
    });

    router.post('/crearVendedor',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.UsuarioVendedor({datos});
        return res.status(200).json({
            ok: true,
            message: `Usuario creado hemos enviado al correo la informacion del usuario.`
        });
    });
  
    router.post('/crearEditarUsuarioVendedor',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.CrearEditarUsuarioVendedor({datos});
        return res.status(200).json({
            ok: true,
            message: `Usuario creado hemos enviado al correo la informacion del usuario.`
        });
    });

    router.post('/editarProveedor',
    async function(req,res, next){

        const{ body :datos} =req;
        let datosInsertados = await usuariosService.editarProveedor({datos});
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

   /* router.post('/crearUsuario',
    passport.authenticate('jwt', { session: true }),
    validateApiKey,
    isAuthenticated,
    async function(req, res, next) {
    const { body: datos } = req;

    let resultado = await administradorService.buscarUsuario({ datos });
    if(resultado.length > 0){  
        return res.status(200).json({
            ok: false,
            message: `El usuario ${datos.username} se encuentra registrado.`
        });
    } else {
    let crear = await administradorService.crearUsuario({ datos });
    return res.status(200).json({
        ok: true,
        message: `Registro exitoso.`
    });
    }
    });*/
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
    router.post('/eliminarUsuarioVendedor',
    async function(req, res, next) {
        const{body: datos }=req;
        console.log('datos',datos);
       let  eliminarUsuarioVendedor = await usuariosService.eliminarUsuarioVendedor({datos});

       return res.status(200).json({
        ok: true,      
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
    router.post('/loginpasswords',
     
    async function(req, res, next){
      const{body: datos}=req;
        let datosInsertados = await usuariosService.RecuperarPassword({datos});
        console.log(datosInsertados)
    if(datosInsertados.length>0){
        return res.status(200).json({
            ok: true,
            message: `el usuario se encuentra registrado hemos enviado los datos al correo`            
        }
      
        );
       
    } else {
        return res.status(200).json({
            ok: false,
            message: `el correo no existe en la base de datos`
        });
    }
      
    });
};


module.exports = usuariosApi;