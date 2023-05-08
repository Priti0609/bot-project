const express = require('express'); //import express module
const bp = require('body-parser');//import body-parser module

const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');

const { Client,LocalAuth } = require('whatsapp-web.js');



const path= require('path');//import path module
const app = express();
const port = 3000;
app.use(bp.urlencoded({extended:false}));

app.use(bp.json())

//Serve static files
app.use(express.static('public'));

//handle form submission

app.post('/submit-form',(req,res)=>{
    const mobile=req.body.mobile;
    const message=req.body.message;

    console.log('Mobile number ',mobile);
    console.log('Message ',message);
  
    res.send('Form submitted successfully!');

    
    const client = new Client({
      authStrategy: new LocalAuth()
     });


    client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
  });


    client.on('ready', () => {
    console.log('Client is ready!');

    

    
 
    //Number where you want to send the message
  	const number=mobile;

	   //Your message.
	   const text="Hey this is Priti";

  
    
	   //Getting chatid from the number.
	   //we have to delete "+";

	   const chatid= number.substring(1)+"@c.us";

     if(message=='holiday list'){
     media = MessageMedia.fromFilePath('holiday list 2023.pdf');
 

	   //sending message.
	   client.sendMessage(chatid,text);
     client.sendMessage(chatid,media);
    
     }
     else
     {
      client.sendMessage(chatid,text);

     }

     
	
    });
    client.initialize();

});







//start the server

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
 });