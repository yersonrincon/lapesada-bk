
const nodemailer = require('nodemailer');
//const nodemailerSendgrid = require('nodemailer-sendgrid');
 
     const createTrans = () => {
       const transporter = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 465,   
           auth: {
             user: "yersonhernandez202@gmail.com",
             pass: "pqasnjlzjzsiuchs",
           },
           
       });
    /*   const transporter = nodemailer.createTransport(
         nodemailerSendgrid({
           apiKey:'bcea4da2d0a67dc34ecc9de57362a553'
         })
       )*/
        return  transporter;
   }

 
 const sendMailCotizacion= async (correo) => {
   const transporter = createTrans ()
   const info = await transporter.sendMail({
     
         from: '"cotizacion  "<yersonhernandez202@gmail.com>', // sender address
         to: `${correo}`,
         subject: `Cotización`, // Subject line
         attachments:[
          {
          name: 'cotizacion.pdf',
          path: `./archivos/${correo}.pdf`
          }
  ],
     });
   console.log("mesage sent: %s ",info.messageId);
    return info.messageId;
 }   
exports.sendMail = (datos, claveNueva) => sendMail(datos,claveNueva)
exports.sendMailpassword = (datos,token) => sendMailpassword(datos,token);
exports.sendMailCotizacion = (datos) => sendMailCotizacion(datos);

