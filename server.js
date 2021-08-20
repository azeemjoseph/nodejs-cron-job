const customDate = require("./custom_nodeModules/getdate");
const express = require("express");
const cron = require("node-cron");
const fsp = require("fs/promises");
const shell = require('shelljs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
  });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(`
    <br>&emsp;&emsp; <h3 style="color:darkgreen;border-width:10px;border-style:solid;border-color:Navy;">Nodejs Server with Express cron jobs!!</h1>
    <p style="color:blue;"> Now you can modify, edit, merge up to your requirements.</p>
    <h4>Credits</h4>
    <p style="color:blue;"> Azeem Joseph (@Azeem Joseph) <a href="https://github.com/azeemjoseph"  target="_blank">https://github.com/azeemjoseph</a></p>
  
             
    <h4>## License</h4>

    <h3 style="color:Navy;">Default Date  :</h3><h4> ${customDate.getDefaultDateTime()}</h4>
    <h3 style="color:Navy;">customDate  :</h3><h4> ${customDate.getDate()}</h4>              


    <p style="color:Navy;border-style:solid;border-color:Green;">The MIT License (MIT)</p>`);
});

// RUN cron job to email every day log  
// cron.schedule("*/10 * * * * * ", function () {

//     let messageOptions = {
//         from: 'nodecron@nodecron.com',
//         to: process.env.EMAIL_TO,
//         subject: 'Scheduled Email from Node js cron job',
//         text: 'This email was automatically sent by Node js cron job.'
//       };
    
//       transporter.sendMail(messageOptions, function(error, info) {
//         if (error) {
//           throw error;
//         } else {
//           console.log('Email successfully sent!');
//         }
//       });
// });


// RUN cron job to delete log file and append every 10sec 
cron.schedule("*/10 * * * * * ", async function () {
  // fs.unlink('./error.log', err => {
  //     console.log('###################################cron-job###############################################');
  //     if(err) throw err;
  //     console.log('Error file successfully deleted');
  //     console.log('###################################cron-job (end)#########################################');
  // });
  try {
    console.log('###################################cron-job#####################################################');  
    await fsp.unlink("./corn-job.log");
    console.info("File deleted successfully!");
    console.log('###################################cron-job (end) running every 15sec ###########################');
  } catch (error) {
    console.error(error);
    try {
    await fsp.appendFile("./corn-job.log", error.toString() +"\n");
    console.info("File corn-job.log created successfully");
    } catch(error) {
        console.error(error);
        console.info("File corn-job.log not created");
    }
  }
});

app.listen(PORT, () => {
  console.log("Node js server is listening on PORT : ", PORT);
});
