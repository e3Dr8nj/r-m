exports.system={
     prefix:'.',
     step:10,
     divider_roleList_word:'roles2',
     main_command_name:'roles2',
     serverID:'301063859702071316',
     channelID:'301319871981944834',
     part1:{ messageID:'490587062488006667'},
     messagesID:['493904788820459560','493905085030727700','493905085504421888'],
     temple:{roles_arr_id:[]}
   
   
};

exports.digit={"0⃣":'0',"1⃣":'1' ,"2⃣":'2',"3⃣":'3',"4⃣":'4',"5⃣":'5',"6⃣":'6',"7⃣":'7',"8⃣":'8',"9⃣":'9',"🇹":'10',"🇱":'11',"🇪":'12',"🇳":'13' ,"🇪":'14',"🇫":'15',"🇬":'16',"🇭":'17',"🇮":'18',"🇯":'19'};

exports.run=async(client,message,args)=>{
   try{
    
    if(args[1]=='reload'){return await module.exports.autoreload(client,message,args);};
    if(args[1]=='test'){await module.exports.onclick(client,message.channel.id,args[2]);};
    if(args[1]=='create'){await module.exports.create(client,message,args);return;};
    if(args[1]=='reset'){
       await module.exports.reset(client,message,args);

     };//if end
   // await msg.edit({embed:{title:'no'}});
   
     }catch(err){console.log(err)};
};//exports.run end

exports.reset=async(client,message,args)=>{

   let step = module.exports.system.step;
      let counter = Number(args[2]);
      let count = [0+(step*counter),0+(step*counter)+step];
    //  console.log(count);
      let roleList =  await module.exports.getRoleList(client,message,count);
       console.log(roleList);
      let rolesCount=roleList[1];
      roleList=roleList[0];
      let msg = await message.channel.fetchMessage(args[3]);
       await msg.clearReactions();
      msg = await msg.edit({
      embed:{
         title:'',
         fields:[{name:'-',value:roleList}]
       }
      });
          let j=0;
          for(let key in module.exports.digit){
                      if(j==rolesCount) continue;
                      await msg.react(key); j++;
                };

};//reset end

exports.getRoleArr=async(client,message,count,keyWord)=>{
     
     let roles_arr=[];
     let bool=false;
     //message.guild.roles.map( r=>{if(r.name.endsWith('.')) {roles_arr.push(r); }           });
     
     let roles_arr2= await message.guild.roles;
     let pos=[];
     roles_arr2.map(r=>{if(r.name==keyWord){ pos.push(r.position);}; return;});
     //pos = pos.sort((a,b)=> {return Number(a)<Number(b) ;});
         console.log(pos);
     roles_arr2.map( r=>{
               if(r.position<pos[0]&&r.position>pos[1]){bool=true;};
               if(bool) {roles_arr.push(r); }   
               bool=false;        
                             });
     module.exports.system.temple.roles_arr_id=await roles_arr.map(r=>r.id);
     roles_arr = roles_arr.slice(count[0],count[1]);
     
     return  roles_arr;
};//getRoleArr end;

exports.getRoleList=async(client,message,count)=>{
   let str='';
   str+='\n';
   let roles_arr  = await module.exports.getRoleArr(client,message,count,module.exports.system.divider_roleList_word);
   let d_arr = [];
   for(let key in module.exports.digit){ await d_arr.push(key);};
   if(roles_arr.length>20) roles_arr.length=20;
   for(let i=0;i<roles_arr.length;i++){str+=d_arr[i]+" <@&"+roles_arr[i].id+">  \n"};
   //console.log(roles_arr);
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
   return obj;
 };//getRoleEmojiArr end

exports.onGuildCreate=async(client)=>{
  try{ console.log('onguild');
   if(module.exports.system.messagesID.length==0) return;
   let message = await client.channels.get(module.exports.system.channelID).fetchMessage(module.exports.system.messagesID[0]);
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
      let msg = await client.channels.get(module.exports.system.channelID).fetchMessage(module.exports.system.messagesID[i]);
      await client.emit("message",msg);
      await exports.getRoleArr(client,message,[0,0],module.exports.system.divider_roleList_word);
      
     };//for end
  }catch(err){console.log(err);};
  
};//onGuildCreate end

exports.onclickEmoji=async(client,messageReaction,user,action)=>{
  try{
 
     if(!messageReaction) return;
       if ( module.exports.system.messagesID.indexOf(messageReaction.message.id)==-1) return;
     console.log('emoji_role');
     //if(messageReaction.message.id!=module.exports.system.part1.messageID) return;
     let roleEmojiArr = await  module.exports.getRoleEmojiArr(client,messageReaction.message);
     let member =messageReaction.message.guild.members.get(user.id);
     let roleID = await roleEmojiArr[messageReaction.emoji.name];
     let role = messageReaction.message.guild.roles.get(roleID);
     if(!role){return console.log('this role is apsend');};
     if(member.user.id==client.user.id) return;
    // if(member.roles.get(roleID)){ member.removeRole(role);  }else{member.addRole(role);};
       if(action=='remove'){ member.removeRole(role);  }else{
                // console.log(module.exports.system.temple.roles_arr_id);
                if(module.exports.system.temple.roles_arr_id.length!=0){
                      let roles_arr_id=module.exports.system.temple.roles_arr_id.slice();
                      
                      for(let i=0;i<roles_arr_id.length;i++){
                               console.log(roles_arr_id[i])
                               let item_role=messageReaction.message.guild.roles.get(roles_arr_id[i]);
                               if(item_role && member.roles.get(roles_arr_id[i])){ await member.removeRole(item_role);}; 
                       };//for end
                };
                member.addRole(role);
                
                };
             //console.log(module.exports.system.temple.roles_arr_id);
     return;
     //if member has role remove it else add
     
   }catch(err){console.log(err);};
};//onclickEmoji end

/*
exports.autoreload=async(client,message,args)=>{

  try{
   if(module.exports.system.messagesID.length==0) return;
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
     let channel = client.channels.get(module.exports.system.channelID);

    args=[module.exports.system.main_command_name,'reset',i,module.exports.system.messagesID[i]];
    await module.exports.reset(client,message,args);
     
     };//for end
  }catch(err){console.log(err);};    

};//autoreload end

*/
exports.autoreload=async(client,message,args)=>{
if(args[2]&&!isNaN(args[2])){module.exports.system.step =Number(args[2])};
  try{
   if(module.exports.system.messagesID.length==0) return;
   for(let i = 0 ;i<module.exports.system.messagesID.length;i++){
     let channel = client.channels.get(module.exports.system.channelID);
/*
     let msg =   await  channel.send(module.exports.system.prefix+module.exports.system.main_command_name+' reset '+i+' '+module.exports.system.messagesID[i]);
    console.log(msg.content);
     await msg.delete();
*/
   // args[2]=i;
    args=[module.exports.system.main_command_name,'reset',i,module.exports.system.messagesID[i]];
    await module.exports.reset(client,message,args);
     
     };//for end
    module.exports.system.step =10;
  }catch(err){console.log(err);};    

};//autoreload end