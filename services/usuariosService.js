const SqlServerLib = require('../lib/sqlserverdb')
const bcrypt =require ("bcryptjs");
class UsuariosService {
    constructor() {
        this.sqlServerLib = new SqlServerLib();
    }

    async registrarUsuario({datos}){n
        console.log(datos);
        const password = await bcrypt.hash(datos.password, 10)
        let sql= `INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}')`;
 
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);

        return resultSet;

    }
    
    async RecuperarPassword({datos}){
        console.log(datos);
        let sql = `select * from usuario where correo='${datos.correo.trim()}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
    }
    async login({datos}){
        console.log(datos);
        let sql = `select * from usuario where correo='${datos.correo.trim()}'`;
        const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
        return resultSet;
    }
    
    async UsuarioVendedor({datos}){
      console.log(datos);
      const password = await bcrypt.hash(datos.password, 10)
      let sql=` INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}')`;
      const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
      return resultSet;
    }
    async CrearEditarUsuarioVendedor({datos}){
      console.log(datos);
      const password = await bcrypt.hash(datos.password, 10)
      let sql=` INSERT INTO usuario VALUES ('${datos.nombre}','${datos.apellido}','${datos.telefono}','${datos.correo}','${password}')`;
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
      async RegistroProducto({datos}){
        console.log(datos);
        let sql=` INSERT INTO producto VALUES ('${datos.nombre}','${datos.categoria}','${datos.descripcion}','${datos.precio_unitario}','${datos.cantidad}','${datos.id_proveedor}')`;
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

async eliminarUsuarioVendedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[usuario] WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}
  
async eliminarUsuarioProveedor({datos}) {
  console.log(datos)
    let sql = `DELETE FROM [dbo].[proveedor] WHERE id ='${datos.id}'`;
 
    return await this.sqlServerLib.executeSqlAsync(sql);
}
async editarusuariovendedor({datos}) {
  console.log(datos)
  let sql = `UPDATE [dbo].[usuario] SET  nombre='${datos.nombre}', apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}' `;
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
  let sql = `UPDATE [dbo].[usuario] SET  nombre='${datos.nombre}',direccion='${datos.direccion}',apellido='${datos.apellido}',telefono='${datos.telefono}',correo='${datos.correo}' `;
  sql += ` WHERE id='${datos.id}'`;
  const resultSet = await this.sqlServerLib.executeSqlAsync(sql);
  return resultSet;
}
}

module.exports = UsuariosService;

