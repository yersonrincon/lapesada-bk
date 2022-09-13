const SqlServerLib = require("../lib/sqlserverdb");
const bcrypt =require ("bcryptjs");
class usuariosService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    async crearUsuario({datos}){
        console.log(datos);
        const password = await bcrypt.hash(datos.password, 10)
        let sql= `INSERT INTO usuario (nombre,apellido,telefono,correo,roles,password,estado) VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','1','${password}',true)`;
 
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);

        return resultSet.rows;

    }
    async crearUsuarioCliente({datos}){
      console.log(datos);
      const password = await bcrypt.hash(datos.password, 10)
      let sql= `INSERT INTO usuario (nombre,apellido,telefono,correo,roles,password,estado) VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','3','${password}',true)`;
      console.log(sql);
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;

  }

  async consultarCantidad() {
    let sql = `select  count(*) from producto`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows[0];
} 


async consultarCantidadventas() {
  let sql = `select  count(*) from venta`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows[0];
} 

async consultarCantidadCotizaciones() {
  let sql = `select  count(*) from cotizacion`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows[0];
} 

    async buscarUsuario({datos}) {
      console.log(datos)
      let sql = `SELECT * FROM usuario WHERE correo ='${datos.correo}'`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;
  } 
  async buscarProveedor({datos}) {
    console.log(datos)
    let sql = `SELECT * FROM proveedor WHERE correo ='${datos.correo}'`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;
} 
 
  async crearCotizacion({datos}){
       console.log(datos);
       let sql=` INSERT INTO cotizacion (correo) VALUES ('${datos.correo}')`;
       const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
       return resultSet.rows;
     }
     
      
  async crearProducto({datos}){

    console.log(datos);
    let sql=` INSERT INTO producto (nombre,marca,precioventa,descripcion,cantidad,categoria,codigo,imagen) VALUES ('${datos.nombre}','${datos.marca}','${datos.precioventa}','${datos.descripcion}','${datos.cantidad}','${datos.categoria}','${datos.codigo}','${datos.imagen}')`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;
  }
  async buscarProducto({datos}) {
    let sql = `SELECT * FROM  producto WHERE codigo ='${datos.codigo}' `;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;;
} 



async buscarCategorias({datos}) {
  let sql = `SELECT * FROM  categorias WHERE nombre ='${datos.nombre}' `;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;;
} 

async consultaRol({datos}) {
  let sql = `SELECT * FROM  roles WHERE nombre ='${datos.nombre}' `;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;;
} 

async buscarMarca({datos}) {
  let sql = `SELECT * FROM  marca WHERE nombre ='${datos.nombre}' `;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;;
} 
  async buscarUsuarioVendedor({datos}){
    let sql =`SELECT * FROM  usuario  WHERE correo ='${datos.correo}'`;
     const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;
  }
  async buscarUsuarioCliente({datos}) {
    let sql = `SELECT * FROM cliente WHERE correo ='${datos.correo}'`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;
  } 


async consultarListaEmpresa() {
  let sql = `SELECT * FROM empresa WHERE id ='${datos.id}`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}  


async consultarListasCotizaciones() {
  let sql = `SELECT * FROM producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}  
  
  async logincliente({datos}){
    console.log('datos correo', datos);

    let resultSet ;
    let sql = `Select  * from cliente where  correo='${datos.correo}'`; 
    
     resultSet = await this.sqlServerLib.executeSqlAsync(sql);
     
    if (resultSet.rows.length > 0){
    
      if (bcrypt.compareSync(datos.password, resultSet.rows[0].password)) {
       
          return resultSet.rows[0];
          
      } else {
          return false;
      }
  } else {
      return false;
  }

    
}


async loginUsuario({datos}){

  let sql = `select * from usuario where correo='${datos.datos}'`; 
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
   return resultSet.rows[0];
  
  /*if (resultSet.rows.length > 0 ){
    console.log('fsdfd',resultSet.rows[0]);
    if (bcrypt.compareSync(datos.password, resultSet.rows[0].password)) {
     
        return resultSet.rows[0];
    } else {
        return false;
    }
} else {
    return false;
}*/

  
}
async consultarEstado({datosLogin}) {
console.log(datosLogin);
let sql = `Select estado from usuario where correo='${datosLogin.correo}'`;
const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
return resultSet.rows[0];
} 


async validarCorreoGmail(datos) {
  console.log(datos);
  let sql = `Select * from usuario where correo='${datos.email}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows[0];
  } 
  
async consultaUsuarioToken({datosLogin}) {
  
    let sql = `SELECT  u.id, u.nombre, u.apellido , u.telefono, u.correo, u.estado, u.roles, r.nombre as nombreRol FROM usuario u 
    inner join roles r on u.roles = r.id 
    WHERE u.correo='${datosLogin.correo}' and u.estado=true ORDER BY ID ASC`;

  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows[0];
  } 
  

   /* async UsuarioVendedor({datos}){
      console.log(contrasena);
      console.log(datos);
      const password = await bcrypt.hash(datos.password, 10)
      let sql=` INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}')`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
    }*/
    async CrearEditarUsuarioVendedor(datos, claveNueva){
      console.log(datos,/*claveNueva */);
     // const password = await bcrypt.hash(claveNueva, 10);
      let sql=` INSERT INTO usuario (nombre,apellido,telefono,correo,roles,estado) VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${datos.roles}',true)`;   
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;
    }
    async RecuperarPasswordCliente(datos, enlace){
      console.log(datos, enlace );
      const password = await bcrypt.hash(enlace, 10);cargarListaUsuarios 
      let sql = `UPDATE cliente SET  password='${datos.enlace}'`;
      sql += ` WHERE correo='${datos.correo}'`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
    }
  

    async CrearEditarUsuarioProveedor({datos}){
      console.log(datos);
      let sql=` INSERT INTO proveedor VALUES ('${datos.nombre}','${datos.direccion}','${datos.apellido}','${datos.telefono}','${datos.empresa}','${datos.correo}')`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
    }


    async crearProveedor({datos}){
        console.log(datos);
        let sql=` INSERT INTO proveedor (nombre,direccion,apellido,telefono,empresa,correo) VALUES  ('${datos.nombre}','${datos.direccion}','${datos.apellido}','${datos.telefono}','${datos.empresa}','${datos.correo}')`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }
      async crearRol({datos}){
        console.log(datos);
        let sql=` INSERT INTO roles  (nombre,descripcion,estado) VALUES  ('${datos.nombre}','${datos.descripcion}',true)`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }

      async crearclientealmacen({datos}){
        console.log(datos);
        let sql=` INSERT INTO clientealmacen (nombre,direccion,apellido,telefono,correo) VALUES  ('${datos.nombre}','${datos.direccion}','${datos.apellido}','${datos.telefono}','${datos.correo}')`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }
    
      async crearCategoria({datos}){
          console.log(datos);
           let sql=` INSERT INTO categorias (nombre,descripcion,estado) VALUES ('${datos.nombre}','${datos.descripcion}',true)`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }

         async crearMarca({datos}){
          console.log(datos);
           let sql=` INSERT INTO marca(nombre,descripcion,estado) VALUES ('${datos.nombre}','${datos.descripcion}',true )`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }
         async crearEmpresa({datos}){
          console.log(datos);
           let sql=`INSERT INTO empresa(nombre,nit,correo,telefono,direccion,imagen) VALUES ('${datos.nombre}','${datos.nit}','${datos.correo}','${datos.telefono}','${datos.direccion}','${datos.imagen}')`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }
  
   
         async editarVenta({datos}) {
          console.log(datos)
          let sql=`INSERT INTO VENTA (precioventa,cantidad,codigo,descripcion) VALUES ('${datos.precioventa}','${datos.cantidad}','${datos.codigo}','${datos.descripcion}')`;
          const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
          return resultSet;
        }
        
      
      async editarProducto({datos}) {
        console.log(datos)
        let sql = `UPDATE producto SET  nombre='${datos.nombre}',marca='${datos.marca}',categoria='${datos.categoria}',precioventa='${datos.precioventa}',descripcion='${datos.descripcion}',cantidad='${datos.cantidad}',imagen='${datos.imagen}'`;
        sql += ` WHERE id='${datos.id}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }
     
      async editarCategoria({datos}) {
        console.log(datos)
        let sql = `UPDATE categorias SET  nombre='${datos.nombre}',descripcion='${datos.descripcion}'`;
        sql += ` WHERE id='${datos.id}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }

      
    async consultarListaUsuarios() {
      let sql = `  SELECT p.id, p.apellido, p.nombre, p.telefono, p.correo, p.roles ,p.estado ,c.nombre as nombreRoles FROM usuario p, roles c
      WHERE p.roles = c.id`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet.rows;
  }

  async consultarListaCotizaciones() {
    let sql = `SELECT * FROM cotizacion`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;
}
  async consultarClientealmacen() {
    let sql = `SELECT * FROM clientealmacen`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;
}
     
  async consultarListaProveedor() {
    let sql = `SELECT * FROM proveedor`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet.rows;
}

async consultarListaroles() {
  let sql = `SELECT * FROM roles`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}
async consultarListaroles() {
  let sql = `SELECT * FROM roles`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarListaEmpresa() {
  let sql = `SELECT * FROM empresa`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarListaVentas() {
  let sql = `SELECT * FROM venta`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}
async consultarListaCategorias() {
  let sql = `SELECT * FROM categorias ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarListaMarcas() {
  let sql = `SELECT * FROM marca ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarcategorias() {
  let sql = `SELECT * from categorias ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarroles() {
  let sql = `SELECT * from roles ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}
async consultarmarca() {
  let sql = `SELECT   id, nombre FROM MARCA  WHERE ESTADO =TRUE`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}
async consultarProductos() {
  let sql = `select * from producto ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultarparacotizacion() {
  let sql = `select * from producto ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async consultaralmacenes() {
  let sql = `select * from empresa ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}


async consultarListaProductos() {
  let sql = `SELECT p.id, p.nombre, p.marca, m.nombre as nombreMarca, p.categoria, p.precioventa, p.descripcion, p.cantidad, p.codigo, p.imagen,  c.nombre as nombreCategoria 
  FROM producto p, categorias c, marca m
   WHERE p.categoria = c.id and p.marca = m.id ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async eliminarUsuarioVendedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM usuario WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}


async eliminarClientealmacen({datos}) {
  console.log(datos)
    let sql = `DELETE FROM clientealmacen WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async eliminarProducto({datos}) {
  console.log(datos)
    let sql = `DELETE FROM producto WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarEmpresa({datos}) {
  console.log(datos)
    let sql = `DELETE FROM  empresa WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async eliminarcotizacion({datos}){
  console.log(datos)
  let sql = `DELETE FROM  cotizacion WHERE id ='${datos.id}'`;
  return await this.sqlServerLib.executeSqlAsync(sql);
}
async consultarparacotizacion() {
  let sql = `select * from producto ORDER BY ID ASC`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}


async eliminarUsuarioRol({datos}) {
  console.log(datos)
    let sql = `DELETE FROM  roles WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarCategoria({datos}) {
  console.log(datos)
    let sql = `DELETE FROM  categorias WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarMarca({datos}) {
  console.log(datos)
    let sql = `DELETE FROM marca WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async eliminarUsuarioProveedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM proveedor WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async editarusuariovendedor({datos}) {
  console.log(datos)
  let sql = `UPDATE  usuario SET  nombre='${datos.nombre}', apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',estado='${datos.estado}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async editarProveedor({datos}) {
  console.log(datos)
  let sql = `UPDATE proveedor SET  nombre='${datos.nombre}',direccion='${datos.direccion}',apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',empresa='${datos.empresa}' `;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async editarRoles({datos}) {
  console.log(datos)
  let sql = `UPDATE roles SET  nombre='${datos.nombre}',descripcion='${datos.descripcion}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}


async editarUsuario({datos}) {
  console.log(datos)
  let sql = `UPDATE usuario  SET  nombre='${datos.nombre}',apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',roles='${datos.roles}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}



async editarMarca({datos}) {
  console.log(datos)
  let sql = `UPDATE marca SET  nombre='${datos.nombre}',descripcion='${datos.descripcion}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async editarEmpresa({datos}) {
  console.log(datos)
  let sql = `UPDATE empresa SET  nombre='${datos.nombre}',nit='${datos.nit}',correo='${datos.correo}',telefono='${datos.telefono}',direccion='${datos.direccion}',imagen='${datos.imagen}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async actualizarEstadoUsuario({datos}) {
  console.log(datos)
  let sql = `UPDATE usuario SET estado=${datos.estado}`;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}

async actualizarEstadoRol({datos}) {
  console.log(datos)
  let sql = `UPDATE roles SET estado=${datos.estado}`;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async actualizarEstadoCategoria({datos}) {
  console.log(datos)
  let sql = `UPDATE categorias SET estado=${datos.estado}`;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async actualizarEstadoMarca({datos}) {
  let sql = `UPDATE marca SET estado='${datos.estado}' `;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}


async consultaIdproducto() {
  let sql = `SELECt * from producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet.rows;
}
}

module.exports =usuariosService;

