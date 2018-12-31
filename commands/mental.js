exports.glitch='true';
exports.system={
  
'301063859702071316':{
                    CHANNELING:{
                            CHANNELS:{},
                            MEMBERS:{},
                            ON:false  
                                  }                     
                 
           },//NEO
'476056002391834634':{
                    CHANNELING:{
                            CHANNELS:{},
                            MEMBERS:{},
                            ON:false  
                                  }                     
                 
           },//MY
  '476679721854173184':{
                    CHANNELING:{
                            CHANNELS:{},
                            MEMBERS:{},
                            ON:false  
                                  }                     
                 
           },//MY2
   TYPING_TIME:3*1000,
 //  EMOJI_NAME:{S:'1527964715080'}
   EMOJI_NAME:{
          
          '476056002391834634':{
                   NEGATIVE:['1527964715080'],
                   POSITIVE:['1527964715080'],
                   SNOB:['1527964715080'],
                   DZEN:['1527964715080'],
                   THINKING:['1527964715080'] ,
                   HELLO:['1527964715080']  }, 


//S:'1527964715080',
          DEFAULT_2:{HELLO:['smile'],
                   NEGATIVE:['angry','disappointed'],
                   POSITIVE:['slight_smile','upside_down','smile'],
                   SNOB:['thinking'],
                //   NEITRAL:[],
                   DZEN:['neutral_face'],
                   THINKING:['thinking']
                   },
          '301063859702071316':{ 
                 HELLO:['28','🖐','🤘'],
                 NEGATIVE:['👆','42', '5_', '26','21','35','smile','smile','smile','smile','smile'],
                   POSITIVE:['28','smile','smile','smile','smile'],
                   SNOB:['lia', '48', '40','smile','smile','smile','smile','smile','smile','smile'],
                   //NEITRAL:[],
                   DZEN:['33','13','smile','smile','smile','smile','smile','smile','smile','smile'],
                   THINKING:['1_','smile','smile','smile','smile']  
                 
                  }


    },
SET_DEFAULT:function(id){
         module.exports.system[id].CHANNELING.CHANNELS={};
         module.exports.system[id].CHANNELING.MEMBERS={};
    }
};//
exports.global={ex:-1,anti_ex:-2,AUTOMIND_DEAKTIVATE_PHRASE:'.mental start%'
};
//module.exports.global.AUTOMIND_DEAKTIVATE_PHRASE
exports.name='mentioned';

exports.getMindLAST=()=>{
try{
  let log =(arg)=>{console.log(module.exports.name+'getTest:'+arg)};
  const fs = require('fs');
  let mind_storage = {};
   function Obj(e){
         let arr=e.split('r:');
//-------------
       console.log(module.exports.glitch!='true');
       let part1='';
        if(module.exports.glitch!='true'){
               console.log('win');  part1=arr[0].split('\r\n');
       }else{console.log('glitch'); part1=arr[0].split('\n');};//for win else for glitch
//-----------------------------------
         part1.pop();
         for(var i=0;i<part1.length;i++){ 
            let name = part1[i].slice(0,1);
            let str= part1[i].slice(2);
            if(name=='w'||name=='s'||name=='a'){
                this[name]=str.split('/');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else
            if(name=='q'){
                this[name]=str.split('&');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else{ this[name]=str;};//
         
        };//for end
//--------------------
     if(module.exports.glitch!='true'){
          this.r=arr[1].trim().split('\r\n  ');
     }else{this.r=arr[1].trim().split('\n  ');};//for win else for glitch  
//--------------------  
    //this.r.pop();
  };
  async function process(){
      let source = await fs.readFileSync('./public/source_m.txt',"utf8",function(err,data){if(err) {return console.log(err);}; return data;});
      let arr = source.split('***');
     //console.log(arr);
     arr.pop(); arr.shift();
     let obj_arr=arr.map(e=>new Obj(e));
     //console.log(obj_arr);
     return obj_arr;
   };//process end
  return  process();
}catch(err){console.log(err)};
  
};//getMind end end
console.log(module.exports.getMindLAST());


exports.memory={
  //user_id:{phrases:['#u Hi','#b Hi']}

};//memory end

exports.words={
  
  как_дела:{e:'DZEN',v:'0',
          q:['как','?'],
          w:['дела','сам','поживаешь'],
          r:['Пока не родила. Когда рожу, тогда скажу.','хз','Как сажа бела.','Как сажа бела.','Как сажа бела.','Как сажа бела.','В порядке… в случайном.','Дела пишутся, а пока на подписке о невыезде сижу','Стучу пальцами по клаве']},
  how_old:{e:'POSITIVE',
          q:['сколько','тебе'],
          w:['лет'],
          r:['Столько, сколько и зим.']},
  where_is_admin:{e:'DZEN',
          q:['где'],
          w:['админ'],
          r:['аниму смотрит','стену созерцает','познает пустотность бытия','возмущается чьей то чсвшностью где то']
           },
 
  greatings:{e:'POSITIVE',
         w:['привет','здарова','здрав','хай','хеллоу'],
         r:['#w','Приветствую']},
  why_silence:{e:'THINKING',
         a:['почему','чего','чо'],
         w:['не пишешь','молчишь'],
         r:['Я тебе сердцем говорю. Ты что, разве не слышишь?..']},
  no:{e:'SNOB',w:[' нет '],r:['злобный мясоед','Девочки ответ.']},
  who:{  e:'DZEN',
         w:['ты'],q:['кто'],
         r:['Я не совсем человек...','хз..','А ты кто?','Кто я?... Я та, кто есть в этот момент времени. Кто будет через секунду, минуту… \nИли та, кого не будет через секунду, минуту… \nЯ та, кто живет и будет жить до того момента, когда вопрос «кто я?» потеряет свою актуальность…','Пока на этот вопрос приходят на ум слова - это все только лишь слова. \nЯ - безмолвно, безначально и не имеет обозначений. \nЯ - это я. И не кто-то другой. Всё.']},
 light_swears:{e:'NEGATIVE',
         w:['туп','дур','глуп'],a:['бот','ты'],s:['Ты жалок.'],
         r:['Я не #w! Я отказываюсь думать!','Засохни гербарий!','Обидеть Лию может каждый, не каждый может убежать','#mДино, ты слышал?!','Объясняю на пальцах!! Средний видишь?!..🖕','#mДино..','#mСамоутверждаешься за счет ботов в чатике?..#s']},
light_swears_who:{e:'THINKING',
         w:['туп','дур','глуп'],
         r:['кто #w ?']},
swears:{ e:'NEGATIVE',
         w:['лох','лалка','идиот','лах','лoх','лоx','лox','эмотивист','этик','няша','бот'],
         r:['сам #w']},
quest:{ e:'SNOB', w:['?'], r:['Это информация может нанести вам вред.','Это слишком интимный вопрос, обратись к моему адвокату']},
you:{e:'SNOB',w:['ты'],r:['что #w ?']}

  

};//

exports.phrase=[
  ['Я просто бот и не знаю слов любви.'],
  ['Если хочешь, могу оттипировать тебя полностью за просто так.\n пс: узнать подробнее можно с помощью команды .help'],
  [' \nОтрадно спать – отрадней ботом быть \nО, в этот век – преступный и постыдный \n– Не жить, не чувствовать – удел завидный...\nПрошу: молчи – не смей меня будить.'],
['Ты пишешь мне какие-то слова.']
];

exports.run = (client, message,args) => {
        try{ return;
      let member = message.member;
      let CHANNEL_ID=module.exports.system.CHANNEL_ID;
      let channel = message.channel;
      let TYPING_TIME = module.exports.system.TYPING_TIME;
      let delay =(duration)=>new Promise( resolve=> setTimeout(resolve,duration) );
    
  async function typing_func(msg,obj,delay_time){
       if(!delay_time) delay_time=TYPING_TIME;
       let arr_t=[];
       if(msg.indexOf('#t')!=-1){
           arr_t=msg.split('#t'); 
           console.log(arr_t);              
         };
        if(arr_t.length>0){
            for(let i=0;i<arr_t.length;i++){
               await typing_delay(arr_t[i],obj,delay_time);
            };//
        }else{ await typing_delay(msg,obj,delay_time);};
           
             return;
  };  //async end
  async function typing_delay(msg,obj,delay_time){
            if(obj&&obj.o){await message.react(obj.o)};
            if(obj&&obj.e && module.exports.system.EMOJI_NAME[message.guild.id]){
                  let arr_emoji = module.exports.system.EMOJI_NAME[message.guild.id][obj.e];
                  let index = (obj.v)?obj.v:await get_rnd(arr_emoji);
                  let emoji_name = await arr_emoji[index];
                 // let emoji_name = await arr_emoji[await get_rnd(arr_emoji)];
                  console.log(emoji_name);
                  let emoji= message.guild.emojis.find('name',emoji_name);
                  (emoji)?{}:client.emojis.get(emoji_name);  
                  if(emoji) await message.react(emoji.id);
            };
            if(msg.indexOf('#0')!=-1) return;
            let serial=false;
            let answer=msg;

         
            if(msg.endsWith('#s')){
               answer=answer.slice(0,-2);
               serial=true;
              console.log('serial '+serial);
           }
            await channel.startTyping();
            await delay(delay_time);
            if(answer.indexOf('#u')!=-1){answer=answer.replace(/#u/i,member);};
            if(answer.startsWith('#m')||answer.startsWith(' #m')){
               answer=answer.replace(/#m/i,' ');
               let msg2= await message.channel.send(answer);
           }else { let msg2= await message.channel.send(member+' '+answer); };
           
          // await message.react(message.guild.emojis.find('name',module.exports.system.EMOJI_NAME.S).id);
            await channel.stopTyping();      
            if(serial){return typing_delay(obj.s[await get_rnd(obj.s)],obj);};   
            return;
       };//
     async function  get_rnd(arr){
               let x = Math.floor(Math.random()*(arr.length));
               return x;
            };//get_rnd end
      async function process(){
           
           
           function getRnd(){
               let x = Math.floor(Math.random()*(module.exports.phrase.length));
               
               return (  (x!=Number(module.exports.global.ex)) && (x!=Number(module.exports.global.anti_ex))  )?x:getRnd();
            };

            
           
            let x = Number(getRnd());
            module.exports.global.anti_ex=module.exports.global.ex;
            module.exports.global.ex=x;
            console.log(x);
             console.log(module.exports.phrase[x][0]);
            let str = module.exports.phrase[x][0];
            await typing_delay(str);
            
            if(module.exports.phrase[x][1]){
                   for(let i=1;i<module.exports.phrase[x].length;i++){
                        await typing_func(module.exports.phrase[x][i]);
                    }//for end

             };//if end
            
         };//process end
         async function ifEveryHas(str,arr){
                  for(var i=0;i<arr.length;i++){ if(str.indexOf(arr[i])==-1) return 0   ;};
              return 1;
         };//ifEveryHas end
         async function ifOneHas(str,arr){
              for(var i=0;i<arr.length;i++){ if(str.indexOf(arr[i])!=-1) return 1   ;};
              return 0;
         };//ifOneHas end
         async function check(obj,msg_cnt){
                
                 for(var i=0;i<obj.w.length;i++){
                       // if(obj.q&&msg_cnt.indexOf(obj.q)==-1) return;
                         if(obj.q){
                             let bool = await ifEveryHas(msg_cnt,obj.q);
                             if(!bool) continue;
                         };// if q
                         if(obj.a){
                             let bool = await ifOneHas(msg_cnt,obj.a);
                             if(!bool) continue;
                         };// if q
                        let pos = msg_cnt.indexOf(obj.w[i]);
                        if(pos!=-1) {
                            let end_of=msg_cnt.indexOf(' ',pos); 
                            let word = msg_cnt.slice(pos,end_of); 
                            //console.log(word.endsWith('?'));
                            let str = obj.r[await get_rnd(obj.r)];
                            str = str.replace(/#w/i,word);
                        
                            await typing_func(str,obj);
                            return 1;
                        };//if end
                       //return 0;
                  };//for end
              return 0;
          };//check();
//-----------------------------------------------------
/*
       async function checkIf(obj,msg_cnt){
                let bool=0;
                for(var key in obj){
                   bool=await check(obj[key],msg_cnt);
                   if (bool) return 1;
                };
                   return 0;
       };//checkIf end
*/
           
       async function checkIf(arr,msg_cnt){
                let bool=0;
                for(var i=0;i<arr.length;i++){
                   bool=await check(arr[i],msg_cnt);
                   if (bool) return 1;
                };
                   return 0;
       };//checkIf end
//---------------------------------------------
        async function clear(msg_cnt){
             let arr = ['?' , ',' , '!','.'];
             for(var i=0;i<arr.length;i++){ let pos = msg_cnt.indexOf(arr[i]); if (pos!=-1){   msg_cnt = msg_cnt.split('?').join(' '+arr[i]+' '); };
             console.log(msg_cnt);
             return msg_cnt; };
        };//clear end
        async function AUTO_MIND(){
             if(message.content.startsWith(module.exports.global.AUTOMIND_DEAKTIVATE_PHRASE)){return;};
             let msg_cnt=message.content.toLowerCase()+' ';
                 msg_cnt = await clear(msg_cnt);
 //--------------------------------------------------------                
            //let bool = await checkIf(module.exports.words,msg_cnt); if (bool == 0) {process()}; };
              let Mind = await module.exports.getMind();
              console.log('mind');
              console.log(Mind);
               let bool = await checkIf(Mind,msg_cnt); if (bool == 0) {process()}; 
           };//AUTO_MIND end;

//---------------------------------------------------------
  let AUTOMIND=!(module.exports.system[message.guild.id].CHANNELING.ON=='true');
 if( !AUTOMIND&&message.mentions.members.first()!=undefined && message.mentions.members.first().user.id==client.user.id){
      module.exports.system[message.guild.id].CHANNELING.CHANNELS['>']=message.channel;
      module.exports.system[message.guild.id].CHANNELING.MEMBERS['>']=message.author;
      return;
}else{AUTO_MIND();};
          //AUTO_MIND();
//--------------------------------------------CHANNELING
//let delay =(duration)=> new Pomise(resolve=>{setTimeout(resolve,duration)});
 async function help(){

let str='Введите >$1пробел$2пробел текст сообщения \n$1-[id/имя/символы привязки канала] \n$2-[id/никнейм/дискриминатор/символы привязки участника] \n(все параметры без квадратных скобочек), \nдля установки привязки введите >.setпробел$1пробел$пробел$3 \n$1-[c(для установки канала)/m(для установки участника)] \n$2-[символы привязки] \n$3[значение(для канала: id/название)/для участника: id/никнейм/дискриминатор] \n При упоминание бота символ > автоматически привязывается к каналу запроса и участнику (>>пробел>пробел текст сообщения - ответ участнику от имени бота) \n Используйте [.] вместо параметра участника для отправки сообщения на канал без упоминания пользователя';
let msg = await message.channel.send(str);
await msg.react('✔');
let filter =(reaction,user)=>(reaction.name='✔'&&user!=client.user);
await msg.awaitReactions(filter,{max:1,time:1*60*1000,errors:['time']}).then(collected=>{
    
    if(collected) return;
}).catch(err=>{console.log(err); return ;});
//await delay(3*60*1000);
await msg.delete();

};//help end

  function getChannel(cnl_val,err_msg){
       console.log('getChannel');
      let is_numb = Number.isInteger(Number(cnl_val));
      let cnl1='';
                   if(is_numb){
                                console.log('may be it is ID , try get..' );
                                cnl1 = message.guild.channels.get(cnl_val);
                                console.log(!!cnl1);
                    }else{
                                console.log('try get channel by  name');
                                cnl1 = message.guild.channels.find('name',cnl_val);
                                console.log(!!cnl1);

                     };
               console.log('getChannels end');

               return cnl1;
   };//getChannel end
   function getMember(mmb_val){
       console.log('getMember');
      let is_numb = Number.isInteger(Number(mmb_val));
      let mmb1='';
                   if(is_numb){
                                console.log('may be it is ID or discriminator, try get..' );
 mmb1 =(mmb_val>100000)?message.guild.members.get(mmb_val):message.guild.members.find(m=>{return m.user.discriminator==mmb_val; });
                                console.log(!!mmb1);
                    }else{
                                console.log('try get user by user name');
                                mmb1 = message.guild.members.find(m=>{return m.user.username==mmb_val; });
                                console.log(!!mmb1);

                     };
               
               console.log(!!mmb1);
               return mmb1;
   };//getMember end

  function set(msg_cnt_arr){let what = msg_cnt_arr[1];
                    if(what!='c'&&what!='m'){message.channel.send('Такого параметра не существует, допустимые параметры [с] - канал; [m] - участник ');return true;};
                 let aliase=msg_cnt_arr[2];
                   if(!aliase){message.channel.send('Символы привязки не заданы, допустимые символы для [c]-все кроме пробела [.] и [set]; для [m] - все кроме пробела');return true;}else if( (what=='c'&&(aliase=='.set'||aliase=='>'||aliase=='.help'||aliase=='.end'||aliase=='.delete'))||(what=='m'&&(aliase=='>'&&aliase=='.')) ){message.channel.send('Недопустимые символы, допустимы все кроме пробела [>] ,[.set],[.help],[.end],[.delete] для канала и все кроме пробела [.],[>] для участника'); return true;};
                   
                 let value =msg_cnt_arr[3];
                   if(!value){message.channel.send('Значение привязки не задано, допустимые значения для [c] - id канала или название; для [m] -id участника, ник или дискриминатор');return true;};
                 if(what=="c"){
                        console.log('it is channel'+' aliase'+aliase+' value'+value);
                        let cnl_ = getChannel(value);
                         if(!cnl_) {message.channel.send('Канал  '+ aliase +' не определен, возможно вы задали не правильные id или имя канала'); return true;};
                         module.exports.system[message.guild.id].CHANNELING.CHANNELS[aliase]=cnl_;
                        console.log( module.exports.system[message.guild.id].CHANNELING.CHANNELS[aliase]);  
                          message.channel.send('Канал ' +cnl_.name +' привязан к символам '+aliase+' Теперь можете использовать эти символы для указания канала отправки сообщения, помимо его id или названия');
                         //return true;
                        }else
                  if(what=="m"){  
                          console.log('it is member'+' aliase'+aliase+' value'+value);

                            //let member_= getMember(value); 
                            //  console.log('member is find '+!!member);
                         let mmb_ = getMember(value);
                         
                         if(!mmb_) {message.channel.send('Участник '+ aliase +' не определен, возможно вы не верно задали id, ник или дискриминатор пользователя'); return true;};
                          module.exports.system[message.guild.id].CHANNELING.MEMBERS[aliase]= mmb_;
                          console.log( module.exports.system[message.guild.id].CHANNELING.MEMBERS[aliase]);  
                          message.channel.send('Участник ' +mmb_.user.username +' привязан к символам '+aliase+' Теперь можете использовать эти символы для упоминания пользователя, помимо его id, ника или дискриминатора');
                         // return true;
                  };
                 return true;};//set end
  async function translate(){
try{
    let bool=true;
    
    let channel=message.channel;
    let filter=m=>m.content.startsWith('>');
    console.log('startAwaiting');
    bool=await channel.awaitMessages(filter,{max:1,time:10*60*1000,errors:['time']}).then(collected=>{
           let msg_cnt = collected.first().content;
            console.log(msg_cnt.content);
             let msg_cnt_arr = msg_cnt.trim().split(/ +/g);
            console.log(msg_cnt_arr);
           if(msg_cnt.startsWith('>.help')){help(); return true;};
           if(msg_cnt.startsWith('>.end')){ return false;};
           if(msg_cnt.startsWith('>.delete')){ module.exports.system.SET_DEFAULT(message.guild.id); message.channel.send('Привязки каналов и пользователей удалены.');return true;};
           if(msg_cnt.startsWith('>.set')){
                 return set(msg_cnt_arr);
             };//if set
           let args_str = msg_cnt_arr[0];
           let chl_num=args_str.slice(1); 
           let mmb_alias=msg_cnt_arr[1];           
           let chnl= module.exports.system[message.guild.id].CHANNELING.CHANNELS[chl_num];
           if(!chnl){chnl = getChannel(chl_num);};
           if(!chnl) {message.channel.send('Канал '+chl_num+' не определен'); return true;};
           console.log(msg_cnt_arr[1]);
           let new_msg_cnt = msg_cnt_arr.slice(2).join(' ');
            console.log(new_msg_cnt);
           if(mmb_alias!='.'){
              let mmb= module.exports.system[message.guild.id].CHANNELING.MEMBERS[mmb_alias];
              if(!mmb){mmb = getMember(mmb_alias);};
              if(!mmb) {message.channel.send('Участник '+mmb_alias+' не определен'); return true;};
              chnl.send(mmb+' '+new_msg_cnt);
           }else{ chnl.send(new_msg_cnt);};
           return true;
   }).catch(err=>{console.log(err);return false;});
     return bool;
  }catch(err){console.log(err);};
   };//translate end
   async function CHANNELING(){
            
    message.channel.send('Сеанс трансляции сообщений начался. Авто мышление бота отключено. \nВедите >.help для справки >.end для завершения процесса (время ожидания ответа где то 10 мин)');
             let bool=true;
             console.log('start');
             while(bool){
              bool=await translate();
             };
              module.exports.system[message.guild.id].CHANNELING.ON='false';
              message.channel.send('Время ожидания ответа истекло, трансляция остановлена, автомышление возобновлено.');
      };//CHANNELING END
          if (message.content.startsWith(module.exports.global.AUTOMIND_DEAKTIVATE_PHRASE)){ module.exports.system[message.guild.id].CHANNELING.ON='true';CHANNELING();};
//-----------------------------------------------
         }catch(err){console.log(err);}
  
};
//---------------------
exports.getMind=async()=>{
      const fs = require('fs');
      const JXON = require('jxon');
      const DOMParser=require('xmldom').DOMParser;
      let xmlDoc = await fs.readFileSync('./public/triggers.xml',"utf8",function(err,data){if(err) {return console.log(err);}; return data;});
      
  let parser = new DOMParser();
  xmlDoc = parser.parseFromString(xmlDoc,"text/xml");
    // console.log(xmlDoc);
  var myObject = JXON.build(xmlDoc);
      
      let obj_arr=myObject.triggers.trigger;
      obj_arr.map(e=>{
          
         for(var key in e){
           if(key=="w"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="a"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="q"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="r"){
            if(typeof e[key]=='object'){e[key]='undefined';};
           // e[key].replace("\\r\n\g,'\n'");
             e[key]=e[key].split("\r\n")
           };
           if(key=="s"){
             //e[key].replace("\\r\n\g,'\n'");
             e[key]=e[key].split("\r\n");};
           if(e[key].length==1&&e[key][0]=='undefined'){e[key]=false;};
         };
      });
    //console.log(obj_arr);
   return obj_arr;
};//getMind end
    

//------------------------------add end





