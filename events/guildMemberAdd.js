
exports.system={
   CHANNEL_ID:'416255611819524097',
  //CHANNEL_ID:'473198002778013716',
  //CHANNEL_ID:'473197950349082624',
  GUEST_CHANNEL_ID:'488840569674530816',
  //GUEST_CHANNEL_ID:'473197950349082624',
   SERVER_ID:'301063859702071316',
   TYPING_TIME:3*1000,
  ROLE_TIME_NAME:'Временная роль',
  ROLE_NAME:'Кто все эти люди'
  
};//
exports.global={
   arr:['-1'],
   ex:-1,anti_ex:-2,anti_ex1:-3,anti_ex2:-4,anti_ex3:-5};
exports.phrase=[
  
  ['Чудно, славно… Могучей силой владеешь ты. Великим ситхом ты станешь. \nВстань. Впредь ты будешь носить имя ...#u !'],
  ['Да это же #u собственной персоной!  '],
  ['Enjoy the Silence'],
  ['Memento mori'],['Одиночество — лучший друг. Тишина — лучший собеседник.'],
  ['Империя ситхов будет гореть ярко, как сверхновая звезда, затмевая Республику.Мы будем держать галактику мёртвой хваткой.'],
  ['Здесь царит темная сторона силы. Зла обитель. Войти ты должен.'],
  ['Бинго! Вы выиграли в рандомном розыгрыше админку сервера, за сменой власти обратитесь к текущему админу. Мои поздравления!'],
  ['Исчезая в темноту, я звала тебя..'],['Ты пришел'],['Исчезая в темноту, я звала тебя..'],
  ['\nКогда уходят поезда из Ниоткуда в Никуда, \nТо им с перрона машут вслед \nНикто, Ничто, Никак и Нет. \nВ их чёрных окнах, как в воде, \nПлывёт бескрайнее Нигде \nИ исчезает без следа \nВ необозримом Никуда.'],
  
  ['\nМне грустно на тебя смотреть\nКакая боль, какая жалость!\nЗнать, только ивовая медь\nНам в сентябре с тобой осталась.'],
  [" ytn 'vjwbq? tcnm njkmrj gjrjq/"],['jniktgfq vtyz'],['Покайся грешник!'],
  
  ['Аллo. Пpивeт. Как сам? Как дети?'],['Оставь надежды, всяк сюда входящий.'],
  
  ['\nУмников как-то чатовских трое\nВ корыте заплыли в открытое море,\nИ если бы крепче корыто попалось,\nТо песня б длиннее моя оказалась.'],
  ['Сколько лет, сколько зим.'],['Я б попросила вас остаться, но вы ж останетесь, боюсь.'],['Ассалам алейкум'],['Бонжорно'],
  ['\nкогда идем с тобою вместе \nвсе звезды гаснут и цветы \nна клумбах вянут и машины \nсбивают намертво людей'],
  ['Йоу нига бич бро!'],[' Я устала ждать, пока ты сделаешь первый шаг. Привет!'],
  ['Руками челку теребя, я думала сегодня про тебя'],
  ['Наш тёмный орден приветствует тебя.'],['Hет бога кроме аллаха и мохаммед пророк его'],
  ['\n Я пришла к тебе с приветом \n Рассказать, что солнце встало, \n Что оно горячим светом \n По листам затрепетало.'],
  ['Мое почтение.','Сынок, поздоровайся с дядей.','Поздоровайся с дядей, как папа здоровается с друзьями!'],
  ['Кого я вижу!',' И действительно, кого?🤔'],['Здравствуйте','Пройдите немного прямо, а потом налево, там вас встретят.']
  ['Охайо'],['Милости просим мимо ворот щей хлебать.'],
  ['Здравиа желаю.'],
  ['Анийо хасейо.'],['Входите \n *было произнесено сквозь стиснутые зубы и звучало как* ступайте к черту.'],
  [' Я Вас категорически приветствую!'],['Я пришла к тебе с приветом, топором и пистолетом.'],
  ['🐿'],['Да пребудет с тобой Сила'],['...'],['Ты даже не представляешь куда ты попал.. '],
  ['Спасайся, беги отсюда! (нет, останься, прошу.)'],
  ['\nОстановись в потоке мирской суеты, не спеши, побудь со мной немного.'],['\nТри мудреца в одном тазу\nПустились по морю в грозу.\nБудь попрочнее старый таз,\nДлиннее был бы мой рассказ.'],
  ['\nКак гoвopил бeccмepтный клaccик\nВильям Сepгeeвич Шекcпиp\nЧyмa нa oбa вaши дoмa\nИ пиp']

];

exports.run = async(client, member) => {
        try{
          if(member.guild.id!=module.exports.system.SERVER_ID) return;
      //if(member.id!=module.exports.system.SERVER_ID) return;
      let CHANNEL_ID=module.exports.system.CHANNEL_ID;
        
      let channel = client.channels.get(CHANNEL_ID);
      let TYPING_TIME = module.exports.system.TYPING_TIME;
      let delay =(duration)=>new Promise( resolve=> setTimeout(resolve,duration) );
    
     async function typing_delay(msg,delay_time){
            if(!delay_time) delay_time=TYPING_TIME;
            await channel.startTyping();
            await delay(delay_time);
            await channel.send(msg);
            await channel.stopTyping();         
            return;
       };//
      async function process(){
         try{  
           
           function getRnd(){
               let x = Math.floor(Math.random()*(module.exports.phrase.length));
               if(module.exports.global.arr.length==module.exports.phrase.length){module.exports.global.arr.length=0;};
               if(module.exports.global.arr.length==0||module.exports.global.arr.indexOf(x)==-1){
                        module.exports.global.arr.push(x);return x;
                }else{  return getRnd();};
               //return (  (x!=Number(module.exports.global.ex)) && (x!=Number(module.exports.global.anti_ex))  )?x:getRnd();
            };

            
           
            let x = Number(getRnd());
            module.exports.global.anti_ex=module.exports.global.ex;
            module.exports.global.ex=x;
            console.log(x);
             console.log(module.exports.phrase[x][0]);
             let str = module.exports.phrase[x][0];
             str=(module.exports.phrase[x][0].indexOf('#u')==-1)?member+" "+str:str.replace(/#u/i,member);
            
            await typing_delay(str);
            
            if(module.exports.phrase[x][1]){
                   for(let i=1;i<module.exports.phrase[x].length;i++){
                        
                        if(module.exports.phrase[x][i]=='#d'){await delay(1*15*1000);}else
                        {await typing_delay(module.exports.phrase[x][i]);};
                    }//for end

             };//if end
/*            
 async function checkBot(){  
 
       let secret_arr=[
  ['человек в плаще с очками ','🕵'],
  ['единорог ','🦄'],
  ['смеющийся смайлик','😄']
];
  let xrnd = Math.ceil(Math.random() * secret_arr.length-1);
   console.log(xrnd);
  let desc=secret_arr[xrnd][0];
  let emo=secret_arr[xrnd][1];
  let str_chek='Чтобы получить роль доступа к серверу, нажми на реакцию '+desc+'(1 мин.)';
  let check_msg=await channel.send(str_chek);
  for(let i=0;i<secret_arr.length;i++){await check_msg.react(secret_arr[i][1]);};     
  let filter=(reaction,user)=>(reaction.emoji.name==emo &&user.id==member.user.id);
   await check_msg.awaitReactions(filter,{max:1,time:1*60*1000,errors:['time']}).then(collection=>{
       if (collection){
          channel.send("ok");
          let role=channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_NAME);
          member.addRole(role);
      }; return;
    }).catch(err=>{console.log(err); return;});
    
};//checkBot end;
 checkBot();
   */        
           
         }catch(err){console.log(err)};
         };//process end

        await process();
        await module.exports.check(client,member);
          
          
          
         }catch(err){console.log(err);}
  
};
/*
exports.run = (client, member) => {
        try{

            let CHANNEL_ID=modul.exports.CHANNEL_ID;
            let channel = client.channels.get(CHANNEL_ID);
            let x = Math.floor(Math.random()*(module.exports.phrase.length));
            console.log(x);
             console.log(module.exports.phrase[x]);
            let str = module.exports.phrase[x][0]+member.username+module.exports.phrase[x][1];
            channel.send(str)
         }catch(err){console.log(err);}
  
};
*/
exports.check = async(client, member) => {
try{
   let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
   let channel=client.channels.get(module.exports.system.GUEST_CHANNEL_ID);
    if (member.guild.id!=exports.system.SERVER_ID) return; 
   let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
  if(roleTime) await member.addRole(roleTime);
 async function checkBot(){  
 
       let secret_arr=[
     ['эльфийского скакуна','🦄'],
['машину на которой поехал Гагарин','🚀'],
['всевидящее око','👁'],
['закуску наркомана','🍄'],
['то что осталось от бедного Йорика','💀'],
['сердце педика','💙'],
['сердце адепта Тьмы','🖤'],
['вампирское исчадие ада','🦇'],
['одежду человеческой самки','👗'],
['традиционное одеяние японской тянки','👘'],
['единство противоположностей','☯'],
['страх арахнофоба','🕷'],
['пламя бездны','🔥'],
['хитрую убийцу хвастливого колобка','🦊'],
['источник жаренных семечек','🌻'],
['увеличитель зоркости','🔭'],
['полезный девайс на шумных митингах','📢'],
['жест мира','✌'],
['пошлый жест','🖕'],
['яйцо избежавшее яичницы','🐥'],
['шедевр Малевича','⬛'],
['удачно переродившуюся гусеницу','🦋'],
['кулак Северной Звезды','👊'],   
  ['анонима в очках ','🕵'],
  ['единорога ','🦄'],
  ['голову инопланетного чувака','👽'],
['кровавые следы','👣'],
['маленькую бедняжку','😭']
];
  let new_arr = [];
   for (let i = 0;i<10;i++){
     let xrnd_ = Math.ceil(Math.random() * secret_arr.length-2);
     new_arr.push(secret_arr.splice(xrnd_,1));
  };
   secret_arr=new_arr; console.log(new_arr);
   secret_arr=secret_arr.map(e=>e[0]);
   let xrnd = Math.ceil(Math.random() * secret_arr.length-1);
  let desc=secret_arr[xrnd][0];
  let emo=secret_arr[xrnd][1];
  let str_chek=member+' Для доступа к серверу нажмите на '+desc+' под этим сообщением.\nУспейте нажать в течение 10 минут.';
  let check_msg=await channel.send(str_chek);
  for(let i=0;i<secret_arr.length;i++){ check_msg.react(secret_arr[i][1]);};     
  let filter=(reaction,user)=>(user.id==member.user.id);
  let resolve = await check_msg.awaitReactions(filter,{max:1,time:10*60*1000,errors:['time']}).then(collection=>{
      /*
       if (collection){
          channel.send("ok");
         // let role=channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_NAME);
         // member.addRole(role);
         };
       */
         if (collection.first().emoji.name==emo) {return true;}else{return false;};
      
    }).catch(err=>{console.log(err); return false;});
    console.log(resolve);
  if(resolve){
    await channel.send(member+" Через 5 минут доступ будет открыт.\nА пока почитайте правила сервера <#301319871981944834>");
  await delay(5*60*1000);
  let roleTime=await channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_TIME_NAME);
  if(roleTime) await member.removeRole(roleTime);
  let roleA=channel.guild.roles.find(r=>r.name==module.exports.system.ROLE_NAME);
  if(roleA) await member.addRole(roleA);
   };
   
   
   
   
   

};//checkBot end;
 checkBot();
   


}catch(err){console.log(err);};
};//run end