import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
            auth: {
                user: "naazmailsender@gmail.com",
                pass: "gwsmdokyzjatdlxc"
            }
})

