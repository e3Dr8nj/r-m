
exports.help=async(client,message,args)=>{
  let local_prfx='=01=';
  let str="```asciidoc";
 str+='\n'+'= Команды = ';
 str+='\n'+local_prfx+'почему это? - спросить у бота почему он решил что у вас именно этот тим \n' +local_prfx+'нит -выразить несогласие \n'+local_prfx+'ты не умеешь типировать ! -сказать боту что он не умеет типировать \n'+local_prfx+'как же так я же <дихотомия с которой вы не согласны>  - попросить бота аргументы относительно дихотомии (например: '+local_prfx+'как же так я же логик ) \n'+local_prfx+'сам ты <тим в который вас типировал бот>  \n'+local_prfx+'ты супер типировщик  - закончить типирование ';
str+='```';
let msg= await message.reply(str);
const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));
await delay(60000);
await msg.delete();
};//help end
exports.userID='';
exports.run=(client,message,args)=>{


let dichotomy = {
логик: 'да не, просто у тебя Логика высокая по пй, этик 100%)',
этик:'да не, это у тебя Этика высокая по пй)',
интуит:'да не, физика низкая по пй у тебя поэтому так думаешь, многие путают)',
сенсорик:'физика высокая по пй прост)',
рационал:'да ты што!!!',
иррационал:'пфф'


};

let interact =async()=>{

let filter =m=>(m.content.startsWith('=01=')&&m.author.id===module.exports.userID);
   let resolve_=await message.channel.awaitMessages(filter,{max:1,time:150000,errors:['time']}).then(collected=>{
     console.log(module.exports.userID);
     console.log(message.author.id);
     return collected.first().content;}).catch(err=>{console.log(err);module.exports.userID='';message.channel.send('Время ожидания ответа вышло'); return 1;});
  await console.log('resolve is - '+resolve_);
  if(resolve_===1) return 1;
   let id_=await resolve_.substr(4);
   console.log(id_);
   if(id_.startsWith('ты супер типировщик')) {message.reply('Ато. Типирование завершено'); return 1;}else
   if(id_.startsWith('help')) {module.exports.help(client,message,args); return 0;}else
   if(id_.startsWith('сам ты')) {message.reply('нит!'); return 0;}else
   if(id_.startsWith('почему это')) {message.reply('потому это!'); return 0;}else
   if(id_.startsWith('нит')) {message.reply('дат'); return 0;}else
   if(id_.startsWith('ты не умеешь типировать')) {message.reply('ты просто не можешь оценить результаты моего типирования!)'); return 0;}else
   
   if(id_.startsWith('как же так я же')) {
         let d_=id_.slice(16);
         d_=d_.trim().split(' ')[0];
         
          console.log(d_);
        
         message.reply(dichotomy[d_]); return 0;

    }else{message.reply('хм..');};
   
};//interact end





let typing = async()=>{
   
module.exports.userID=message.author.id;
let rnd_x=Math.floor(Math.random()*15);
let rnd_x2 =Math.floor(Math.random()*100+1);
let types_cosionika=['Дон Кихот','Дюма','Робеспьер','Гюго','Есенин','Жуков','Гамлет','Максим','Бальзак','Наполеон','Джек','Драйзер','Гексли','Габен','Достоевский','Штирлиц'];

let type=types_cosionika[rnd_x];
/*
let emb={
    fields:[
                  {name:'ты ' + type ,value:'вероятность '+ rnd_x2 +'%'},
                  {name:'команды взаимодействия:' ,value:'!!!почему это? - спросить у бота почему он решил что у вас именно этот тим \n !!!нит -выразить несогласие \n !!!ты не умеешь типировать ! -сказать боту что он не умеет типировать \n !!!как же так я же <дихотомия с которой вы не согласны> ! - попросить бота аргументы относительно дихотомии (например: !!!как же так я же логик !) \n !!!сам ты <тим в который вас типировал бот> ! - помочь боту идентифицировать свой тим (например:!!!сам ты Дюма !) \n !!!спасибо за типирование - поблагодарить бота за типирование (например:!!!спасибо за типирование) \n !!! \n !!!ок - закончить типирование '}]
};
 await message.reply({embed:emb});
*/
//let str='```css \n ты '+ type +'вероятность'+ rnd_x2+' %' +'\n ```';
 let str="```asciidoc";
 str+='\n'+'= Результаты типирования =';
 str+='\n'+ ' ты "' +type.toUpperCase() +'" вероятность '+rnd_x2+"%";
 str+='\n'+'[Комманды]';
 str+='\n'+' =01=ты супер типировщик - закончить типирование \n =01=help - список остальных комманд для взаимодествия с ботом';
 str+="```";
 await message.channel.send(str );

 let bool = 0;
  while(!bool){
 bool= await interact();
 console.log('interact is '+ bool);
   };//while end

return module.exports.userID='';
  };//end typing

  try{
if(module.exports.userID=='') {typing(); }else if(module.exports.userID==message.author.id){message.reply("ты уже типируешься");}else{message.reply('в очередь!!');};
   }catch(err){console.log(err);};

};//exports end