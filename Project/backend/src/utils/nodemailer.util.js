import mailTransport from "../config/nodemailer.config.js";

export const sendEmail = async (to, subject, text, html) => {
  console.log(to, "utils");
  const sentMail = await mailTransport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    text,
    html,
  });
  console.log(sentMail);
  return sentMail;
};

//? verification link --> http://localhost:9000/verify-email/7b92604f30e41fb6a0bbb039299139d3fc0954b9c37b95e30269ccf4208c25f3
