exports.system={
     serverID:'301063859702071316',
     channelID:'301319871981944834',
     part1:{ messageID:'490587062488006667'},
     messagesID:['490907380805009420','490907829285421065','490907936848216064','490908007136231444']
     
   
   
};
/*
exports.system={
   serv:{servd}
};
*/
exports.digit={"0⃣":'0',"1⃣":'1' ,"2⃣":'2',"3⃣":'3',"4⃣":'4',"5⃣":'5',"6⃣":'6',"7⃣":'7',"8⃣":'8',"9⃣":'9',"🇦":'10',"🇧":'11',"🇨":'12',"🇩":'13',"🇪":'14',"🇫":'15',"🇬":'16',"🇭":'17',"🇮":'18',"🇯":'19'};
exports.run=async(client,message,args)=>{
   try{
    let step = 10;
    if(args[1]=='reload'){return await module.exports.autoreload(client);};
    if(args[1]=='test'){await module.exports.onclick(client,message.channel.id,args[2]);};
    if(args[1]=='create'){await module.exports.create(client,message,args);return;};
    if(args[1]=='reset'){
    
      let counter = Number(args[2]);
      let count = [0+(step*counter),0+(step*counter)+step];
      console.log(count);
      let roleList =  await module.exports.getRoleList(client,message,count);
      let rolesCount=roleList[1];
      roleList=roleList[0];
      let msg = await message.channel.fetchMessage(args[3]);
       await msg.clearReactions();
      msg = await msg.edit({
      embed:{
         title:'',
         fields:[{name:'---',value:roleList}]
       }
      });
          let j=0;
          for(let key in module.exports.digit){
                      if(j==rolesCount) continue;
                      await msg.react(key); j++;
                };
     };//if end
   // await msg.edit({embed:{title:'no'}});
   
     }catch(err){console.log(err)};
};//exports.run end

exports.reset=async(client,message,args)=>{


};

exports.getRoleArr=async(client,message,count)=>{
     let roles_arr=[];
     message.guild.roles.map( r=>{if(r.name.endsWith('.')) {roles_arr.push(r); }           });
     return  roles_arr.slice(count[0],count[1]);
};//getRoleArr end;

exports.getRoleList=async(client,message,count)=>{
   let str='';
   str+='\n';
   let roles_arr  = await module.exports.getRoleArr(client,message,count);
   let d_arr = [];
   for(let key in module.exports.digit){ await d_arr.push(key);};
   if(roles_arr.length>20) roles_arr.length=20;
   for(let i=0;i<roles_arr.length;i++){str+=d_arr[i]+" <@&"+roles_arr[i].id+">  \n"};
 
   str+='';
   return [str,roles_arr.length];
};//getRoleList end

exports.create=async(client,message,args)=>{ await message.channel.send('test'); };


exports.getRoleEmojiArr=async(client,msg)=>{

   
  // let msg= await client.channels.get(channelID).fetchMessage(messageID);
   let emb = msg.embeds[0].fields[0].value;
   let roles_arr = emb.split('\n');
   roles_arr=roles_arr.map(e=>e.replace('>','').trim().split(' <@&'));
    let obj = {};
   await  roles_arr.map(e=>obj[e[0]]=e[1]);
    //console.log(obj);
/*
   messageReaction user
    if( (keys_arr.indexOf(messageReaction.emoji.name)!=-1)  ) { console.log(); };
*/   
   return obj;
 };//getRoleEmojiArr end

exports.onready=async(client)=>{
  try{
   if(module.exports.system.messagesID.length==0) return;
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
      let msg = await client.channels.get(module.exports.system.channelID).fetchMessage(module.exports.system.messagesID[i]);
      await client.emit("message",msg);
     };//for end
  }catch(err){console.log(err);};
  
};

exports.onclickEmoji=async(client,messageReaction,user)=>{
  try{
     console.log('emoji');
       if ( module.exports.system.messagesID.indexOf(messageReaction.message.id)==-1) return;
     //if(messageReaction.message.id!=module.exports.system.part1.messageID) return;
     let roleEmojiArr = await  module.exports.getRoleEmojiArr(client,messageReaction.message);
     let member =messageReaction.message.guild.members.get(user.id);
     let roleID = await roleEmojiArr[messageReaction.emoji.name];
     let role = messageReaction.message.guild.roles.get(roleID);
     if(!role){return console.log('this role is apsend');};
     if(member.user.id==client.user.id) return;
     if(member.roles.get(roleID)){ member.removeRole(role);  }else{member.addRole(role);};
     return;
     //if member has role remove it else add
     
   }catch(err){console.log(err);};
};//onclickEmoji end


exports.autoreload=async(client)=>{

  try{
   if(module.exports.system.messagesID.length==0) return;
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
     let channel = client.channels.get(module.exports.system.channelID);
     let msg =   await  channel.send('.tt reset '+i+' '+module.exports.system.messagesID[i]);
    console.log(msg.content);
     await msg.delete();
     
     };//for end
  }catch(err){console.log(err);};    

};//autoreload end