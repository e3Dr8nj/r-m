exports.system={isReady:false};
exports.run =async(client,event)=>{
try{
  //console.log(event.t);
  
  //if(!module.exports.system.isReady){console.log('ready r');module.exports.system.isReady=false;return};
  if(event.t=='READY'){console.log('onready'); await module.exports.onGuildCreate(client);return;};
  if(event.t=='MESSAGE_REACTION_ADD'||event.t=='MESSAGE_REACTION_REMOVE'){return module.exports.onmessageReactionAddRemove(client,event.d,event.t);};
   

  return;
}catch(err){console.log(err);};
};//exports.run end

exports.onGuildCreate=async(client)=>{
try{
   let delay =(duration)=>new Promise(resolve=>setTimeout(resolve,duration));
    await delay(10*1000);
   let roles1 = require(`../commands/roles1.js`);
  let roles2 = require(`../commands/roles2.js`);
    await roles1.onGuildCreate(client);
    await roles2.onGuildCreate(client);
}catch(err){console.log(err);};
};// onGuildCreate end

exports.onmessageReactionAddRemove=async(client,d,t)=>{
try{
      //if(t.server_id!='301063859702071316') return;
       let action = (t=='MESSAGE_REACTION_ADD')?'add':'remove';
       let messageReaction =await client.channels.get(d.channel_id).fetchMessage(d.message_id).then(m=>{return m.reactions.get(d.emoji.name);});
       let user = client.guilds.get(d.guild_id).members.get(d.user_id).user;
       let roles1 = require(`../commands/roles1.js`);
       let roles2 = require(`../commands/roles2.js`);
       
       await roles1.onclickEmoji(client,messageReaction,user,action);       
       await roles2.onclickEmoji(client,messageReaction,user,action);
}catch(err){console.log(err);};
};//aw