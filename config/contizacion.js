const sendMailCotizacion = async (correo) => {
   const transporter = createTrans()
   const info = await transporter.sendMail({

      from: '"cotizacion  "<yersonhernandez202@gmail.com>', 
      to: `${correo}`,
      subject: `Cotización`, 
      attachments: [
         {
            name: 'cotizacion.pdf',
            path: `./archivos/${correo}.pdf`
         }
      ],
   });
   console.log("mesage sent: %s ", info.messageId);
   return info.messageId;
}
exports.sendMailCotizacion = (datos) => sendMailCotizacion(datos);