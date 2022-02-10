const SqlServerLib = require('../lib/sqlserverdb')
const bcrypt =require ("bcryptjs");
class UsuariosService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    async crearUsuario({datos}){
        console.log(datos);
        const password = await bcrypt.hash(datos.password, 10)
        let sql= `INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}',1)`;
 
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);

        return resultSet;

    }
    async crearUsuarioCliente({datos}){
      console.log(datos);
      const password = await bcrypt.hash(datos.password, 10)
      let sql= `INSERT INTO cliente VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}')`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;

  }

    async buscarUsuario({datos}) {
      let sql = `SELECT * FROM [dbo].[usuario] WHERE correo ='${datos.correo}'`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
  } 
  async buscarUsuarioCliente({datos}) {
  let sql = `SELECT * FROM cliente WHERE correo ='${datos.correo}'`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet;
} 
  async crearProducto({datos}){
    //   console.log(datos);
       let sql=` INSERT INTO producto VALUES ('${datos.nombre}','${datos.marca}','${datos.preciocompra}','${datos.precioventa}','${datos.descripcion}','${datos.cantidad}','${datos.categoria}','${datos.codigo}','${datos.imagen}')`;
       const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
       return resultSet;
     }

  async buscarProducto({datos}) {
    let sql = `SELECT * FROM [dbo].[producto] WHERE nombre ='${datos.nombre}'`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet;
} 

  async buscarUsuarioVendedor({datos}){
    let sql =`SELECT * FROM [dbo].[usuario] WHERE correo ='${datos.correo}'`;
     const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
  }



async consultarListaImagenes() {
  let sql = `SELECT * FROM empresa`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}  
  
  async logincliente({datos}){
    console.log('datos correo', datos);

    let resultSet ;
    let sql = `SELECt * from cliente where  correo='${datos.correo}'`; 
    
     resultSet = await this.sqlServerLib.executeSqlAsync(sql);
   console.log(resultSet);
    if (resultSet[0]){
      console.log('entro 1');
      if (bcrypt.compareSync(datos.password, resultSet[0].password)) {
        console.log('entro 2');
          return resultSet[0];
          
      } else {
          return false;
      }
  } else {
      return false;
  }

    
}


async login({datos}){
  console.log(datos);
  let resultSet;
  let sql = `SELECt * from usuario where  correo='${datos.correo}'`; 
   resultSet = await this.sqlServerLib.executeSqlAsync(sql);

  if (resultSet[0] ){
    if (bcrypt.compareSync(datos.password, resultSet[0].password)) {
        return resultSet[0];
    } else {
        return false;
    }
} else {
    return false;
}

  
}
async consultarEstado({datos}) {
console.log(datos);
let sql = `Select estado from usuario where correo='${datos.correo}'`;
const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
return resultSet[0];
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
      console.log(datos, claveNueva );
      const password = await bcrypt.hash(claveNueva, 10);
      let sql=` INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}','${datos.estado}')`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
    }
    async RecuperarPasswordCliente(datos, enlace){
      console.log(datos, enlace );
      const password = await bcrypt.hash(enlace, 10);
      let sql = `UPDATE [dbo].[cliente] SET  password='${datos.enlace}'`;
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
        let sql=` INSERT INTO proveedor VALUES ('${datos.nombre}','${datos.direccion}','${datos.apellido}','${datos.telefono}','${datos.empresa}','${datos.correo}')`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }

    
      async crearCategoria({datos}){
          console.log(datos);
           let sql=` INSERT INTO categorias VALUES ('${datos.nombre}','${datos.descripcion}',1 )`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }

         async crearMarca({datos}){
          console.log(datos);
           let sql=` INSERT INTO marca VALUES ('${datos.nombre}','${datos.descripcion}','${datos.imagen}',1 )`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }
         async crearEmpresa({datos}){
          console.log(datos);
           let sql=` INSERT INTO empresa VALUES ('${datos.nombre}','${datos.nit}','${datos.correo}','${datos.telefono}','${datos.direccion}','${datos.imagen}')`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }
         async crearVenta({datos}){
          console.log(datos);
           let sql=` INSERT INTO VENTA VALUES ('${datos.fecha}','${datos.precio}','${datos.descripcion}','${datos.cantidad}','${datos.codigo}')`;
           const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
           return resultSet;
         }
   
      async editarProducto({datos}) {
        console.log(datos)
        let sql = `UPDATE [dbo].[producto] SET  nombre='${datos.nombre}',marca='${datos.marca}',preciocompra='${datos.preciocompra}',categoria='${datos.categoria}',precioventa='${datos.precioventa}',descripcion='${datos.descripcion}',cantidad='${datos.cantidad}',imagen='${datos.imagen}'`;
        sql += ` WHERE id='${datos.id}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }
     
      async editarCategoria({datos}) {
        console.log(datos)
        let sql = `UPDATE [dbo].[categorias] SET  nombre='${datos.nombre}',descripcion='${datos.descripcion}'`;
        sql += ` WHERE id='${datos.id}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
      }
      
    async consultarListaUsuarios() {
      let sql = `SELECT * FROM usuario`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
  }


     
  async consultarListaProveedor() {
    let sql = `SELECT * FROM proveedor`;
    const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
    return resultSet;
}

async consultarListaEmpresa() {
  let sql = `SELECT * FROM empresa`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async consultarListaVentas() {
  let sql = `SELECT * FROM venta`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async consultarListaCategorias() {
  let sql = `SELECT * FROM categorias`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async consultarListaMarcas() {
  let sql = `SELECT * FROM marca`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async consultarcategorias() {
  let sql = `select nombre from categorias where estado = '1'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async consultarmarca() {
  let sql = `select * from marca`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async consultarProductos() {
  let sql = `SELECT * FROM producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}




/*async consultarListaCompras() {
  let sql = `SELECT * FROM producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
*/
async consultarListaProductos() {
  let sql = `SELECT p.id, p.nombre, p.marca, p.preciocompra, p.precioventa, p.descripcion, p.cantidad, p.codigo, p.imagen, p.categoria, c.nombre as nombreCategoria FROM producto p, categorias c
  WHERE p.categoria = c.id`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async consultarListaProductos() {
  let sql = `SELECT * FROM producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async eliminarUsuarioVendedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[usuario] WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}

  
async eliminarProducto({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[producto] WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarEmpresa({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[empresa] WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarCategoria({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[categorias] WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}

async eliminarMarca({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[marca] WHERE id ='${datos.id}'`;
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async eliminarUsuarioProveedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[proveedor] WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async editarusuariovendedor({datos}) {
  console.log(datos)
  let sql = `UPDATE [dbo].[usuario] SET  nombre='${datos.nombre}', apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',estado='${datos.estado}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
async editarProveedor({datos}) {
  console.log(datos)
  let sql = `UPDATE [dbo].[proveedor] SET  nombre='${datos.nombre}',direccion='${datos.direccion}',apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',empresa='${datos.empresa}' `;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}



async editarUsuario({datos}) {
  console.log(datos)
  let sql = `UPDATE [dbo].[usuario] SET  nombre='${datos.nombre}',apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}',estado='${datos.estado}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async editarMarca({datos}) {
  console.log(datos)
  let sql = `UPDATE [dbo].[marca] SET  nombre='${datos.nombre}',descripcion='${datos.descripcion}',imagen='${datos.imagen}',estado='${datos.estado}'`;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}


async actualizarEstadoUsuario({datos}) {
  let sql = `UPDATE [dbo].[usuario] SET estado='${datos.estado}' `;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async actualizarEstadoMarca({datos}) {
  let sql = `UPDATE [dbo].[marca] SET estado='${datos.estado}' `;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}

async actualizarEstadoCategoria({datos}) {
  let sql = `UPDATE [dbo].[categorias] SET estado='${datos.estado}' `;
      sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
actuali
async consultaIdproducto() {
  let sql = `SELECt id,nombre from producto`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
}

module.exports = UsuariosService;

