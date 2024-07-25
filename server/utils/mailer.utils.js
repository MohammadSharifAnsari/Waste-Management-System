
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'karelle.haag51@ethereal.email',
        pass: 'MmbCdFcqVPHPZjNzpB'
    }
});

async function sendmail(message){
    const info= await transporter.sendMail(message);

    return info;
}

export default sendmail;