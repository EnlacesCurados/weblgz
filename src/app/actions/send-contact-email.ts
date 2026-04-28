
'use server';

import nodemailer from 'nodemailer';

/**
 * Server Action para enviar el contenido del formulario de contacto por email.
 * Configurado para enviar a lugarzen@pm.me.
 */
export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  // Configuración del transportador de correo.
  // IMPORTANTE: Debes configurar estas variables en tu entorno para que funcione el envío real.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true para puerto 465, false para otros
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"CINE IA Contacto" <${process.env.SMTP_USER || 'no-reply@cineia.es'}>`,
      replyTo: email,
      to: 'lugarzen@pm.me',
      subject: `Nueva consulta de portafolio: ${name}`,
      text: `Has recibido un nuevo mensaje de contacto:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #e60000;">Nueva consulta desde CINE IA</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error enviando el email:', error);
    // Retornamos éxito falso para que el cliente pueda manejarlo, pero sin romper la ejecución
    return { success: false, error: 'No se pudo enviar el correo' };
  }
}
