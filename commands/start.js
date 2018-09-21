exports.dictionary={
   quest:[' Quest ',' Вопрос '],
   getPoint:[' It is right!!! You get ',' Правильно!!! Ты получаешь '],
   itemScore:[' You item score in this quiz is ',' Твой общий счет в этой викторине ']
};


//exports.global.questID=0;
//exports.toltipMSG='';
//exports.boss='';
exports.system={ waiting:5*60*1*1000, waiting_item_table_score_msg:10*1000, local_prefix:'!!!'};

exports.global={ questID:0, boss:'',item_quest_msg:'',item_toltip_msg:'', democry:true, on:false};
exports.item_quest={toltiped:[],item_toltip_msg:'',toltip:false};
exports.score={
//user_id:{points:0 ,quiz_name:'this',user_name:''}
};

exports.emoji={ "🇦":'toltip',"⏭":'next',"⏯":'stop','❔':'info'};
exports.emoji_marker={"🔚":'end'};
exports.digit={"1⃣":'1' ,"2⃣":'2',"3⃣":'3',"4⃣":'4',"5⃣":'5',"6⃣":'6',"7⃣":'7',"8⃣":'8',"9⃣":'9'};
exports.setDefault={
   item_quest:async function(){
     module.exports.item_quest.toltiped=[];
     module.exports.item_quest.toltip=false;
     //module.exports.item_quest.item_toltip_msg='';
      return;
    },
   global:async function(){ module.exports.global.questID=0; module.exports.global.boss=''; 
                          module.exports.global.item_quest_msg=''; module.exports.global.democry=true;  module.exports.global.on=false},
   score:async function(){ module.exports.score = {};}

};//exports.setDefault end

exports.getTest=()=>{
  const fs = require('fs'); let quests = {};let quest_number=0;
  function QUEST(arr_element){
       let divider ='|'; arr_element=arr_element.split(divider); this.questId=quest_number; 
       this.quest = arr_element[0]; this.answer = arr_element[1]; quest_number++;
  };//quest consructor end
 let process = async()=>{
    let test_content=await fs.readFileSync('test_source.txt',"utf8",function(error,data){if(error) {return console.log(error);}; return data;});
    //test_content=test_content.split('\r\n'); //for win
    test_content=test_content.split('\n'); //for glitch
   let quests = test_content.map(e=> new QUEST(e)); return quests;
  };//process end
  return process();
};//get end end





exports.run=(client,message,args)=>{
 const fs = require('fs');
 const points_table = require('./usersPointsBD.js');
let quests= [];
let cmd={};
//cmd.ifRight();

//-----------------------------------
let delay=(duration)=>new Promise( resolve => setTimeout(resolve,duration) );
async function AddToPointsTable(){
try{
     console.log('add');
      if(!module.exports.score) return;
  for(var key in module.exports.score){
        
        await points_table.insert(client,module.exports.score[key].points,key,message.guild.id);
  };//for end
}catch(err){console.log(err);};
};//addToPointsTable end

async function Info(){
    let prfx = module.exports.system.local_prefix;
    let str='';
    str+=' "🇦"-взять подсказку '  + ' "⏭"-следующий вопрос ' +'\n' +'"⏯" -остановить ' + '"❔" -инфо '+'\n';
    str+=prfx+'<ответ> \n';
    str+=prfx+'подскажи '+prfx+'следующий '+prfx+'стоп '+prfx+'инфо '+'\n';
    str+=prfx+'рейтинг '+'\n'+prfx+'no democry -отключить режим демократии - управлять викториной может только тот кто ее начал';
   
    
   let msg = await  message.channel.send(str,{code:'autohotkey'});
   await delay (1*30*1000);
   await msg.delete();

};


async function getItemScoreTable(){
  let lf = 'getItemScoreTable : ';
             try{
           let str=' SCORES ';
           let sub_str='\n';
  
           let sorted_arr= [];
           for(var key in module.exports.score){sorted_arr.push(module.exports.score[key]);};
           
           console.log('arr'+sorted_arr);
           sorted_arr=sorted_arr.sort((a,b)=>{return b['points']-a['points']});
          
                  
           sorted_arr.map(e=> sub_str+= e.user_name+" "+ e.points +'\n' );
           
            str+=sub_str;
                  return await  message.channel.send(str,{code:'autohotkey'});
                }catch(err){console.log(lf+" error: "+err);};
};//getItemScoreTable end

async function ifRight (message){
    let lf = 'ifRight : ';
       try{
//--------------------------------------------score
     await module.exports.global.item_quest_msg.react("🔚"); 
    // console.log(module.exports.item_quest); 
    let item_points = 100;
    if (module.exports.item_quest.toltiped.length!=0){
          
           let answer_len = await quests[module.exports.global.questID].answer.length; 
           let toltipes = await module.exports.item_quest.toltiped.length ;
           //10-90,20-80,30-70,40-60,50-50,60-40 70-30 80-20 90-10
           
           item_points = Math.ceil(100-toltipes*(100/answer_len)); item_points=Number(item_points);
//------------------------------
        //  await points_table.insert(client,item_points,message.author.id,message.guild.id);
//---------------------------------------------------------------------
           console.log(item_points);
       };
      
if(!module.exports.score[message.author.id]) { module.exports.score[message.author.id]={points:0,quiz_name:'this',user_name:message.author.username}; };
           module.exports.score[message.author.id].points+=item_points;
           console.log(lf+module.exports.score[message.author.id]);
let str2=module.exports.dictionary.getPoint[client.lang] + item_points + module.exports.dictionary.itemScore[client.lang]+ module.exports.score[message.author.id].points;
                  
             await message.reply(str2);
                  let item_score_table_msg = await getItemScoreTable(message);
                  let f=async()=>{await delay(module.exports.system.waiting_item_table_score_msg);await item_score_table_msg.delete();};
                  f();
               
                
//--------------------------------------------
    
   
   // await nextQuest('by_words');
        }catch(err){console.log(lf+'error: ');console.log(err);};
   

};//ifRight end

async function dueInteractTime(){ 
   let lf = 'dueInteractTime';
      try{
   console.log('dueInteractTime: process interact time was dued by skip one loop [by emulating ignore command for iteraction loop]');
   let dprct_msg =await message.channel.send(exports.system.local_prefix+'0xdprct'); await dprct_msg.delete(); 
      }catch(err){console.log(lf+'error'); console.log(err);}; 
};//dueInteractTime end

async function Toltip(){
  let lf = 'Toltip : ';
      try{
         await module.exports.global.item_quest_msg.react("🔚");await module.exports.global.item_quest_msg.delete(); questMessageInteract(); getToltip();
     }catch(err){console.log(lf+'error: ');console.log(err);};
};//Toltip end

cmd.ifToltiped=async(quest_num)=>{
   if(quest_num==module.exports.global.questID){module.exports.global.questID++; message.channel.send('Ответ полностью был подсказан никто не угадал');};
};//ifToltiped end
//async functionToltipInteract(){};

//--------------------------------------------------------------
async function ToltipInteract(){
    let lf = 'ToltipInteract : ';
     try{
  // let msg_to_await = module.exports.item_quest.item_toltip_msg;
   console.log('ToltipInteract: start awaiting ractions');
   let filter =(reaction,user)=>( ( (user.id==module.exports.global.boss.id||module.exports.global.democry )&& module.exports.digit[reaction.emoji.name] && (user.id!=client.user.id) )|| (reaction.emoji.name=="🔚" ) );
   let resolve_= await module.exports.item_quest.item_toltip_msg.awaitReactions( filter,{max:1,time:module.exports.system.waiting,errors:['time']} ).then(collected=>{return collected.first();}).catch(err=>{console.log('Time to use toltipe is ended'); return 'end';});
  if(resolve_=='end') {console.log(resolve_+'try end by time'); return 'end';} else
  if(resolve_.emoji.name=="🔚") {console.log(resolve_.emoji.name+'try ended by react'); return 'end';};
  return module.exports.digit[resolve_.emoji.name];
        }catch(err){console.log(lf+'error: '); console.log(err);};
};
async function addReactionToltip(){
 let lf = 'addReactionToltip ';
        try{
  let msg_to_react = module.exports.item_quest.item_toltip_msg;
  let len = quests[module.exports.global.questID].answer.length;
//CHANGED  
  for( let key in module.exports.digit){await msg_to_react.react(`${key}`) ;if (module.exports.digit[key]==len){return};};
    
   return;
            }catch(err){console.log(lf+ 'error: ');  console.log(err);};
};//addReactionToltip end
async function preCastToltip(){
 //- let quest_num = module.exports.global.questID;
  let lf = 'preCastToltip : ';
     try{
  let arr_num_=module.exports.item_quest.toltiped;
  console.log(arr_num_);
 let str_='Подсказка: в слове '+quests[module.exports.global.questID].answer.length+' букв. Это слово начинается на ';
 let x="⬛" ;
 let arr_=[];
 arr_.length=quests[module.exports.global.questID].answer.length+1;
 let str2=arr_.join(x);
 console.log(str2);
 str2=str2.split('');
 console.log(str2);
 //str2.splice(abc_num-1,1,quests[module.exports.global.questID].answer[abc_num-1]);
  
  if(arr_num_.length!=0) {for(var i=0;i<arr_num_.length;i++){str2.splice(arr_num_[i]-1,1,quests[module.exports.global.questID].answer[arr_num_[i]-1].toUpperCase() );};
   };//if end
 str2=str2.join('');
 console.log(str2);
 str_ = 'Подсказка: '+str2 ;
  return str_;
     }catch(err){console.log(lf+'error: ');console.log(err);};
};//preCastToltip end
async function castToltip(){
  let lf ='castToltip : ';
      try{
  module.exports.item_quest.toltip=true;
 if(module.exports.item_quest.item_toltip_msg)  {await module.exports.item_quest.item_toltip_msg.react("🔚"); await module.exports.item_quest.item_toltip_msg.delete();};
  let str_toltip=await  preCastToltip();
  
  module.exports.item_quest.item_toltip_msg=await message.channel.send(str_toltip);
 
//sending toltip msg
  let toltip_msg_= module.exports.item_quest.item_toltip_msg;

  return toltip_msg_;
      }catch(err){console.log(lf+'error: ');console.log(err);};
};//castToltip end
 
async function getToltip(){
 let lf = 'getToltip : ';
     try{
 await castToltip();
 let toltip_msg = module.exports.item_quest.item_toltip_msg;
 await addReactionToltip();
 let number = '';
 while(number!='end'){
   number = await ToltipInteract();
   if (number=='end') continue;
   if(number!='end' && module.exports.item_quest.toltiped.indexOf(Number(number))==-1 ) {
   number=Number(number);
   console.log('pos in arr is '+module.exports.item_quest.toltiped.indexOf(number));
   await module.exports.item_quest.toltiped.push(number);
   await toltip_msg.edit(await  preCastToltip());
  };
 };//while end
  await console.log('toltip interact end');
 return ;
    }catch(err){console.log(lf+'err');console.log(err);};
};//getToltip end

async function addReactions(msg){
   let lf = 'addReactions : ';
           try{
  //let toltip=module.exports.item_quest.toltip;
  for(let key in module.exports.emoji){ await msg.react(`${key}`);}; return;
         }catch(err){console.log(lf+'error: '); console.log(err);};
};//addReactions end
//----------------------------------------------------------------------------
async function interactEmoji(quest_msg){  
   let lf = 'interactEmoji : ';
             try{
   let filter=(reaction,user)=>(  ( (user.id==module.exports.global.boss.id||module.exports.global.democry)&&module.exports.emoji[reaction.emoji.name]&&(user.id!=client.user.id) ) || (user==client.user&&module.exports.emoji_marker[reaction.emoji.name]) );
   let resolve_= await quest_msg.awaitReactions(filter,{max:1,time:module.exports.system.waiting,errors:['time']}).then(collected=>{return collected.first();}).catch(err=>{console.log(err);return 'end';});  
   if(resolve_=='end') return 'end';
   if(module.exports.emoji_marker[resolve_.emoji.name]){return module.exports.emoji_marker[resolve_.emoji.name]};
   let command_=module.exports.emoji[resolve_.emoji.name]; console.log(command_);return command_;   
          }catch(err){console.log(lf+'err');console.log(err);};
 };//interactEmoji end

async function getRnd(max){
   let x = Math.ceil(Math.random() * max);
   return x;
};

async function getQuestById(){
  let lf = 'getQuestById : ';
        try{
  let str = `= ${module.exports.dictionary.quest[client.lang]} = \n ${quests[module.exports.global.questID].quest}`;
  module.exports.global.item_quest_msg=await message.channel.send(str,{code:'asciidoc'});
  await addReactions(module.exports.global.item_quest_msg); return;
      }catch(err){console.log(lf+'error: '); console.log(err);};
};//getQuestById end

async function nextQuest(){
    let lf = 'nextQuest : ';
              try{
     await module.exports.global.item_quest_msg.react("🔚");
    await module.exports.setDefault.item_quest();
    //await module.exports.global.questID++;
     module.exports.global.questID=await getRnd(quests.length-1);
     questMessageInteract();
              }catch(err){console.log(lf+'error: ');console.log(err);};
};//nextQuest end

async function questMessageInteract(){
   let lf = 'questMessageInteract : ';
                   try{
   await getQuestById();
   let quested = module.exports.global.item_quest_msg;
   let bool_='';
   while(bool_!='end'){
     bool_ = await interactEmoji(module.exports.global.item_quest_msg);
     if(bool_=='info'){ console.log('info by emoji');let msg= await message.channel.send(module.exports.system.local_prefix+'инфо'); await msg.delete(); continue;
       
     }else
      
     if(bool_=='toltip'){ let msg= await message.channel.send(module.exports.system.local_prefix+'подскажи'); await msg.delete(); continue;
     }else
     if(bool_=='next'){ let msg= await message.channel.send(module.exports.system.local_prefix+'следующий'); await msg.delete(); continue;
     }else
     if(bool_=='stop'){message.channel.send(module.exports.system.local_prefix+'стоп');};
     };
  console.log('questMessageInteract: message interact by emoji end');
  return;
             }catch(err){console.log(lf+"error: ");console.log(err);};
};//quest message interact end

let interact =async()=>{
//+-
    let lf='interact : ';
            try{
    
    let on_time_end = {};
    on_time_end.author=client.user;
    on_time_end.content = exports.system.local_prefix+'end';
    console.log('interact: start awaiting messages starts with '+module.exports.system.local_prefix);
    let filter =m=>(m.content.startsWith(module.exports.system.local_prefix));
    let resolve_=await message.channel.awaitMessages(filter,{max:1,time:module.exports.system.waiting,errors:['time']}).then(collected=>{
          return collected.first();
    }).catch( err=>{ console.log(err);message.channel.send('Время ожидания ответа вышло'); return on_time_end; } );
    await console.log('interact: resolve is - '+resolve_.content);
    let acess = (resolve_.author.id==module.exports.global.boss.id||resolve_.author.id==client.user.id||module.exports.global.democry);
    let id_=await resolve_.content.substr(module.exports.system.local_prefix.length);
    console.log(lf+'acess is '+acess +" command is "+ id_);
    if(acess){
       if(id_.startsWith('end')) {console.log('end'); return 'end';}else
       if(id_.startsWith('0xdprct')) {console.log('0xdprct'); return 'ignore';}else
       if(id_.startsWith('подскажи'))  {return 'toltip';}else
       if(id_.startsWith('следующий'))  {return 'next';}else
       if(id_.startsWith('инфо'))  {return 'info';}else
        if(id_.startsWith('no democry'))  {return 'no democry';}else

       if(id_.startsWith('рейтинг'))  {return 'table';}else
       if(id_.startsWith('стоп')) {  return 'end';}
   };//acess end
//-------------------
    // if(id_.startsWith(quests[module.exports.global.questID].answer)) {return 'right_answer';}else
     if(id_.startsWith(quests[module.exports.global.questID].answer)) {await ifRight(resolve_);return 'next';}else
    {message.reply('хм..'); return 'smth';};
         }catch(err){console.log(lf+'error: ');console.log(err);};
};//interact end


let process = async()=>{
   try{
         module.exports.global.on=true; 
         module.exports.global.boss=message.author;
         quests = await module.exports.getTest();
         console.log(quests);
         //getQuestById(module.exports.global.questID);
         module.exports.global.questID=await getRnd(quests.length-1);
         questMessageInteract();
         let bool = '';
         while(bool!='end'){
               bool= await interact(); 
                  console.log('process: bool is '+ bool);
               if(bool == 'end'){ 
                   await getItemScoreTable();
                    await AddToPointsTable();
                   await module.exports.global.item_quest_msg.react("🔚");
                  if(module.exports.item_quest.item_toltip_msg){ 
                       await module.exports.item_quest.item_toltip_msg.react("🔚")};
                        //------------
                       
                        await module.exports.setDefault.global();
                        await module.exports.setDefault.score();
                        //------------ 
                   console.log('process: iteraction is continue'); continue;
               };//if bool == 'end'
               console.log('bool is not end go to next iteraction [await messages startsWith '+exports.system.local_prefix+']');
               if (bool=='info') { Info(); continue; }else
               if (bool=='table') { getItemScoreTable(); continue; }else
                if (bool=='no democry') { module.exports.global.democry=false; continue; }else
               if (bool=='toltip') { await Toltip(); }else
               if (bool=='right_answer') { await ifRight(); }else
               if (bool=='next') { await nextQuest(); }
         };//while end
        console.log('process: main quest interaction is end. process is end');
         
        message.reply('все');
        let global_table = await points_table.getTopTableStr(client,message.guild.id);
         message.channel.send(global_table,{code:'asciidoc'});

       
       //  let ids = await points_table.getTop3ID_str(client,message.guild.id); console.log(ids);
       //  await points_table.setRoles(client,message.guild.id);
         message.channel.send('+pointsBD setRoles_ '+  await points_table.getTop3ID_str(client,message.guild.id));
   }catch(err){console.log('process error: '); console.error(err);};

};//end process 

(module.exports.global.on)?message.reply('Викторина уже идет'):process();

};//run end

