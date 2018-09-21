exports.run =async(client,message,args)=>{
try{
  let str='```\n';
  str+='Список ролей \n';

  
  let roles_arr=[];
  message.guild.roles.map(r=>{if(r.name.endsWith('*')) {roles_arr.push(r); }           });
  for(let i=0;i<roles_arr.length;i++){str+=i+" "+roles_arr[i].name+"\n"};
  str+='роль+ 1 [добавить роль 1]   роль- [убрать роль 1]\n';
  str+='\n```'
  let msg=await message.channel.send(str);
  let filter =(m)=>(m.author.id==message.author.id&&(m.content.startsWith('роль+ ')||m.content.startsWith('роль-') )  );

  let resolve=await message.channel.awaitMessages(filter,{max:1,time:1000*60*3,errors:["time"]}).then(collected=>{
          return collected.first().content;
  }).catch(err=>{console.log(err);return 'no';});
    console.log(resolve);
  if(resolve=='no'){await message.reply('Роль не добавлена');};
    let r_s=await (resolve.startsWith('роль+'))?'+':resolve.startsWith('роль-')?'-':'n'; 
     console.log(r_s); resolve = resolve.slice(5);  resolve=Number(resolve.slice(0));
     console.log(resolve);
  if(resolve!='no'&&resolve>=0&&resolve<roles_arr.length){
      let role = await message.guild.roles.find(r=>r.name==roles_arr[resolve].name);
     if(role){
         if(r_s=='+'){
              await message.member.addRole(role);
              await message.reply('роль '+role.name+' успешно добавлена!');
           }else if(r_s=='-'){
              await message.member.removeRole(role);
              await message.reply('роль '+role.name+' успешно удалена!');
            }else{await message.reply('Роль не добавлена');};
     }else{message.reply('Роль не добавлена');};
   }else{message.reply('Роль не добавлена')}//if resolve
  await msg.delete();
}catch(err){console.log(err)};
};//exports.run end
