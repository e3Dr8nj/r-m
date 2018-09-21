exports.help=async(client,message,args)=>{
  //let local_prfx='=01=';
  let str="```asciidoc";
 //str+='\n'+'= Команды = ';
 str+='\n'+ '0⃣  -выбрать вариант 0 | 1⃣ -выбрать вариант 1 | ⏹-завершить типирование |⏸-приостановить типирование ';
str+='```';
let msg= await message.reply(str);
const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));
await delay(60000);
await msg.delete();
};//help end

exports.users={0:{questID:'start'}};
exports.stop=false;
exports.userID='';
exports.questID='start';

exports.run=(client,message,args)=>{
//if (args[1]=='help')  {return module.exports.help(client.message,args);}
const fs = require('fs');
const vaisband =require('./typing/vaisband_source.js');
let emoji_zero_id="0⃣";
let emoji_one_id="1⃣";
let emoji_stop_id="⏹";
let emoji_pause_id="⏸";


let cmd={};
cmd.getQuest=async(questId)=>{
let test = vaisband.content;
  let str="```asciidoc";
 str+='\n'+'= Типирование по тесту Вайсбанда =';
str+='\n'+ 'Выберите один из вариантов который вам ближе ';
 str+='\n'+ ' 0: "' +test[questId]['0']+'" ';
  str+='\n'+ ' 1: "' +test[questId]['1']+'" ';
 str+='\n'+'[Комманды]';
 str+='\n'+ '0⃣ /1⃣ -выбрать вариант 0/1 | ⏹-надоело типироваться |⏸-приостановить типирование ';
 str+="```";
 return await message.reply(str );
};//getQuest end
cmd.getTim=async(questId)=>{
let test = vaisband.content;
  let str="```asciidoc";
 str+='\n'+'= Результат типирования по тесту Вайсбанда =';
str+='\n'+ test[questId].tim;
 
 str+="```";
 await message.reply(str );
};//getQuest end
/*
let interact =async()=>{

let filter =m=>(m.content.startsWith('=00=')&&m.author.id===module.exports.userID);
   let resolve_=await message.channel.awaitMessages(filter,{max:1,time:3*60*1000,errors:['time']}).then(collected=>{
     console.log(module.exports.userID);
     console.log(message.author.id);
     return collected.first().content;}).catch(err=>{console.log(err);module.exports.userID='';module.exports.questID='start';message.channel.send('Время ожидание ответа истекло'); return 1;});
  await console.log('resolve is - '+resolve_);
   let id_=await resolve_.substr(4);
   console.log(id_);
   if(id_=='0'||id_=='1'){
  module.exports.questID=(module.exports.questID=='start')?module.exports.questID=id_:module.exports.questID=module.exports.questID+id_;
  console.log(module.exports.questID);
   }else
   if(id_.startsWith('надоело мне типироваться')) {message.reply('Как хочешь)) Типирование завершено)'); module.exports.stop=true;return 1;}else {message.reply('хм..');return 0;};
   
};//interact end
*/
let interact = async(msg_)=>{
   //let msg_=await message.reply('quest');
   await msg_.react(emoji_zero_id);
   await msg_.react(emoji_one_id);
   await msg_.react(emoji_stop_id);
   await msg_.react(emoji_pause_id);
   const filter=(reaction,user)=>((reaction.emoji.name==emoji_zero_id || reaction.emoji.name==emoji_one_id || reaction.emoji.name==emoji_stop_id||reaction.emoji.name==emoji_pause_id)&&user.id==module.exports.userID);
   let resolve_=await msg_.awaitReactions(filter,{max:1,time:3*60*1000,errors:['time']}).then(collected=>{
        console.log(collected.first().emoji.name);
        return collected.first();
    }).catch(err=>{console.log(err);module.exports.userID=''; module.exports.questID='start'; message.reply('Время ожидания ответа вышло');return 1;});//end resove
   //console.log(await resolve_);
    await msg_.reactions.get(emoji_zero_id).remove(client.user);
    await msg_.reactions.get(emoji_one_id).remove(client.user);
     await msg_.reactions.get(emoji_stop_id).remove(client.user);
    await msg_.reactions.get(emoji_pause_id).remove(client.user);
   if(resolve_.emoji.name==emoji_zero_id){
       let digit_='0';
       module.exports.questID=(module.exports.questID=='start')?module.exports.questID=digit_:module.exports.questID=module.exports.questID+digit_;
       console.log(module.exports.questID);
   }else if(resolve_.emoji.name==emoji_one_id){
       let digit_='1';
       module.exports.questID=(module.exports.questID=='start')?module.exports.questID=digit_:module.exports.questID=module.exports.questID+digit_;
       console.log(module.exports.questID);
   }else if(resolve_.emoji.name==emoji_stop_id) {message.reply('Типирование завершено. c 98% вероятностью ты лалка!'); module.exports.stop=true;return 1;}
   else if(resolve_.emoji.name==emoji_pause_id) {message.reply('Типирование приостановлено, ты сможешь закончить его когда захочешь если я не забуду твои предыдущие ответы конечно'); module.exports.stop=true; module.exports.users[module.exports.userID]={};module.exports.users[module.exports.userID].questID=module.exports.questID; console.log(module.exports.users);return 1;};
   return 0;
};//interact end
let process=async()=>{
module.exports.userID=message.author.id;
let quest_msg=await cmd.getQuest(module.exports.questID);
let bool = 0;

  while(!bool){
 bool= await interact(quest_msg);
 console.log('interact is '+ bool);
 console.log(module.exports.questID);
 if(!module.exports.stop){
 if (vaisband.content[module.exports.questID].type=='tim') { await cmd.getTim(module.exports.questID);bool=1;module.exports.users[message.author.id].questID='start';}else{quest_msg=await cmd.getQuest(module.exports.questID);};
  };
   };//while end
module.exports.stop=false;
module.exports.questID='start';
return module.exports.userID='';

};//process end

try{
if(module.exports.userID=='') { if(module.exports.users[message.author.id]){module.exports.questID=module.exports.users[message.author.id].questID;}; process(); }else if(module.exports.userID==message.author.id){message.reply("ты уже типируешься");}else{message.reply('подожди немножко)');};
   }catch(err){console.log(err);};

//interact();
};//run end