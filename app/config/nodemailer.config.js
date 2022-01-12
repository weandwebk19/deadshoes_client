const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const HOST_MAIL = process.env.HOST_MAIL;
const HOST_PASSWORD = process.env.HOST_PASSWORD;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = {
    sendEmail: async ({ to, subject, text }) => {
        /* Create nodemailer transporter using environment variables. */
        try {
            console.log(REFRESH_TOKEN);
            const acccessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: HOST_MAIL,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: acccessToken
                    // pass: HOST_PASSWORD
                }
            })
            /* Send the email */
            let info = await transporter.sendMail({
                from: `"K19WEANDWEB" <${HOST_MAIL}>`,
                to,
                subject,
                text
            })
            /* Preview only available when sending through an Ethereal account */
            console.log(`Message preview URL: ${nodemailer.getTestMessageUrl(info)}`)
        } catch (error) {
            console.log(error);
        }
    }
}