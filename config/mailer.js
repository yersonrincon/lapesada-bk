
const nodemailer = require('nodemailer');
 
     const createTrans = () => {
       const transporter = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 465,   
           auth: {
             user: "yersonhernandez202@gmail.com",
             pass: "pqasnjlzjzsiuchs",
           },
           
       });
        return  transporter;
   }

  
//exports.sendMail = (datos, claveNueva) => sendMail(datos,claveNueva)
//exports.sendMailpassword = (datos,token) => sendMailpassword(datos,token);
//exports.sendMailCotizacion = (datos) => sendMailCotizacion(datos);
module.exports= createTrans;

