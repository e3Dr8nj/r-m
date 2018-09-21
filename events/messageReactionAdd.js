
exports.system={
           serverID:'301063859702071316'
};
exports.run =async(client,messageReaction,user)=>{
   if(messageReaction.message.guild.id!=module.exports.system.serverID) return;
   let tt = require(`../commands/tt.js`);
   await tt.onclickEmoji(client,messageReaction,user);
//console.log(messageReaction.emoji);

};//

exports.onready=async(client)=>{
try{
   let tt = require(`../commands/tt.js`);
   await tt.onready(client);
}catch(err){console.log(err);};
};// onready end


