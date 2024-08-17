const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 for TLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSCODE, // your email password or app password if 2FA is enabled
  },
});

function sendMail({ email, OTP }) {
 return new Promise(async(resolve, reject) => {
    try {

        const subject = "Verify Your Email Address";
        const body = `
            <html>
            <head>
                <style>
                body {
                    background-color: #f9f9f9;
                    padding-right: 10px;
                    padding-left: 10px;
                  }
                  .content {
                    background-color: #ffffff;
                    border-color: #e5e5e5;
                    border-style: solid;
                    border-width: 0 1px 1px 1px;
                    max-width: 600px;
                    width: 100%;
                    height: 300px;
                    margin-top: 60.5px;
                    margin-bottom: 31px;
                    border-top: solid 3px #8e2de2;
                    border-top: solid 3px -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
                    border-top: solid 3px -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
                    text-align: center;
                    padding: 60px 0px 0px;
                  }
                  h1 {
                    padding-bottom: 5px;
                    color: #000;
                    font-family: Poppins,Helvetica,Arial,sans-serif;
                    font-size: 28px;
                    font-weight: 400;
                    font-style: normal;
                    letter-spacing: normal;
                    line-height: 36px;
                    text-transform: none;
                    text-align: center;
                  }
                  h2 {
                    margin-bottom: 30px;
                    color: #999;
                    font-family: Poppins,Helvetica,Arial,sans-serif;
                    font-size: 16px;
                    font-weight: 300;
                    font-style: normal;
                    letter-spacing: normal;
                    line-height: 24px;
                    text-transform: none;
                    text-align: center;
                  }
                  p {
                    font-size: 14px;
                    margin: 0px 21px;
                    color: #666;
                    font-family: 'Open Sans',Helvetica,Arial,sans-serif;
                    font-weight: 300;
                    font-style: normal;
                    letter-spacing: normal;
                    line-height: 22px;
                    margin-bottom: 40px;
                  }
                  .btn-primary {
                    background: #7071e8;
                    border: none;
                    font-family: Poppins,Helvetica,Arial,sans-serif;
                    font-weight: 200;
                    font-style: normal;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                    padding:10px 5px;
                    border-radius:5px;
                  }
                  a {
                    color:white;
                    text-decoration: underline;
                  }
                  .color_span{
                    color:white;
                  }
                  .did_get{
                    test-align:center;
                  }
                </style>
            </head>
            <body>
            <div class="d-flex align-items-center justify-content-center">
            <div class="content">
              <h1>Hello,</h1>
              <h2>OTP is ${OTP}</h2>
              <h2>Verify Your Email Account</h2>
              <p>Thanks for choosing our platform!</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
          <p class="did_get">If you didn't request this, you can safely ignore this email.</p>
          </div>
            </body>
            </html>`;
    
        const mailOptions = {
          from: '"Email Services" <brr9096005866@gmail.com>',
          to: email,
          subject,
          html: body,
        };
    
        const info = await transporter.sendMail(mailOptions);
        resolve(info)
      } catch (error) {
        console.log("Error sending email:", error);
        resolve(null);
      }
 })
  
}

// Replace with your email and name
// sendMail({ email: "rozodkarbharat@gmail.com", name: "Bharat Rozodkar" });

module.exports = sendMail;