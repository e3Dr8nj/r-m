
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = {};
config.prefix=".";
client.lang=1;
client.prefix=".";




var bodyParser = require('body-parser');

var multer = require('multer'); // v1.0.5
var upload = multer();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));




 
// http://expressjs.com/en/starter/basic-routing.html
app.get('/i', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
   //response.sendStatus(200);
  
});

app.get('/showData', function(request, response) {
  
});
//let res="";
app.post('/addData',function(request, response) {
try{ 
   //if(request.body.avtorization.login!=process.env.login||request.body.avtorization.pass!=process.env.pass) {
     if(process.env["x_"+request.body.avtorization.login]!=request.body.avtorization.pass){
     console.log("wrong login or password");
     response.send("<style>h1 {color:red;}p {color:red;}</style><p>!Не верный логин/пароль </p>"); 
     return;};
    
  async function ins(){
   let obj=request.body[0];
  let obj2=request.body;
/*  
  const mindBD=require('./modules/mindBD.js');
   await mindBD.drop();
  
  let id = "1";
 // let w = request.body.textarea.n;
 // let r = request.body.textarea.n;
 
  //let str = mindBD.run(obj);
 
 for(let key in obj2){
   await mindBD.run(obj2[key]); console.log(obj2[key]);
 };
    await mindBD.show_table();
   //console.log(request.body[0]);
   */
    let res= await createXML(obj2);
    response.send("<style>h1 {color:red;}p {color:blue;}</style><p>Изменения сохранены</p>");
    
 
 
 
    };//async ins end
         ins();
         
}catch(err){console.log(err);};  

});//post  end
// listen for requests :)
/*
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

*/








//-------------------------------------
async function createXML(obj2){
  let res="";
   let str_xml='<?xml version="1.0" encoding="UTF-8"?>\n';

  str_xml+='<triggers>\n';
  
  
  for(let key2 in obj2){
    if(key2=="avtorization"){continue;};
    let obj=obj2[key2];
    str_xml+='<trigger>';
    for(let key in obj){ str_xml+='<'+key+'>'; str_xml+=obj[key]; str_xml+='</'+key+'>'; };
    str_xml+='</trigger>';
    
  };
  str_xml+='</triggers>';
await fs.writeFile('./public/triggers.xml', str_xml, function (err) {
  if (err) {console.log(err); res+=err.message;};
  console.log('Saved!');
   res+=" file save; ";
});
  //---------------
  var d=new Date();
  await fs.appendFile('./public/triggers_recovery.xml', "\n"+d.toString()+"\n"+str_xml, function (err) {
  if (err) {console.log(err); res+=err.message;};
  res+=" recovery file add; ";
});
  //----------------------------------------------
  return res;
  
};//createXML end
//---------------------------------------------------------------


//-------------------DISCORD
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});//event trigger

client.on("ready", () => {
  console.log("I am ready!");
//let messageReactionAdd = require('./events/messageReactionAdd.js');
//messageReactionAdd.onready(client);
});

client.on("message", (message) => {
 
  if ( message.content.startsWith(config.prefix)||(message.mentions.members.first()!=undefined && message.mentions.members.first().user.id==client.user.id)  ){
    

    
    let args=[];
  if( message.content.startsWith(config.prefix) ){
       args = message.content.slice(config.prefix.length).trim().split(/ +/g);
       
   }else if (message.mentions.members.first().user.id==client.user.id)  {
      
        
      if(message.guild.id=='301063859702071316'){
        args = message.content.slice().trim().split(/ +/g);
        args[0]='mental';
      };//if ali
        
   };
  
    try {
    let alias =args[0];
    let keyWords={
       typing:[['typeme'],['ктоя']],
        start:[['start'],['старт']],
       typing_rnd:[['typemefast'],['ктоябыстро']]
    };
      if(!args[0]) return;
    for( var key in keyWords){if(keyWords[key][client.lang]==args[0].toLowerCase()){ alias=key; break;}};

    let commandFile = require(`./commands/${alias}.js`);
    commandFile.run(client, message,args);
  } catch (err) {
    console.error(err);
  }//try end
  };//if starts with prefix
  return;
});
client.login(process.env.TOKEN_BOT);
//--------DISCORD END