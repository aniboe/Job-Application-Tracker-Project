// import nodemailer from "nodemailer"



// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure: true,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GOOGLE_APP_PASSWORD,
//   },
// });

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
});
