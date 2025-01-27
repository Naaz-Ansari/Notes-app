import { transporter } from "./mailsender.js"

export const SendVerificationCode = async(email,verificationcode) => {
    try {
        const response = await transporter.sendMail({
            from: '"NoteApp By Naaz" <naazmailsender@gmail.com>',
            to: email,
            subject: "Verify your Email.",
            text: "Your Verification Code",
            html: verificationcode
        })
        // console.log("Email send successfully",response)
        
    } catch (error) {
        // console.log("Failed to send email",error);
    }
}
