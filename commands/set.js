exports.system={
    rainblow:{
       on:false,time:1000,
       item_color:'gray',
       color:{
          gray:['0x000000','0x333333','0x666666','0x999999'],
          blue:['0x0D47A1','0x#1565C0','0x1976D2','0x1E88E5','0x2196F3','0x42A5F5','0x64B5F6','0x90CAF9','0xBBDEFB','0x81D4FA','0x4FC3F7','0x29B6F6','0x03A9F4','0x039BE5','0x0288D1','0x0277BD','0x01579B'],
          red:['0xB71C1C','0xC62828','0xD32F2F','0x#E53935','0xF44336','0xEF5350','0xE57373','0xEF9A9A','0xFFCDD2','0xF8BBD0','0xF48FB1','0xF06292','0xEC407A','0xE91E63','0xD81B60','0xC2185B','0xAD1457','0x880E4F']
       }

    }
};
exports.run =async(client,message,args)=>{
 
   
  if(args[1] == 'reactions'){
      let event = require(`../events/messageReactionAdd.js`);
       event.reset(client);
   };
/*
  if(args[1]=='roleColor'){
//```css
  async function rainblow(){
     
     let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
      console.log('roleColor');
     let role = message.guild.roles.find(r=>r.name=='rainblow');
     console.log(args[2]);
     
     //let colors=['0x000000','0x333333','0x666666','0x999999'];
    let colors = module.exports.system.rainblow.color[module.exports.system.rainblow.item_color];
     exports.system.rainblow.on=(args[2]=="off")?false:true;
     if(args[2]=='time'){exports.system.rainblow.time=(args[3])?Number(args[3]):2000};
     if(args[2]=='color'){
            exports.system.rainblow.item_color=(args[3]=='gray'||args[3]=='blue'||args[3]=='red')?args[3]:'blue';
            
      };
         let s=1;
         for(let i=0;i<colors.length;i+=s){
              colors = module.exports.system.rainblow.color[module.exports.system.rainblow.item_color];
              console.log(i);
              await delay(exports.system.rainblow.time);
             console.log(exports.system.rainblow.time);
             await   role.edit({color:colors[i]});
            
             if(i==colors.length-1){
                      
                    s=(module.exports.system.rainblow.on)?-1:s};
              
             if(i==0){
                     
                     s=(module.exports.system.rainblow.on)?1:1};
               };

  };
   rainblow();
//```
  }//if roleColor end
*/
};
