exports.system={
   ali:{ SERVER_ID:'301063859702071316'}
};
exports.run = async(client, oldMember, newMember) => {
try{ 

      console.log('guildMemberUpdate event');
      let member = newMember;
    if(member.guild.id!=module.exports.system.ali.SERVER_ID) return;
    
  
    
    async function process(){

        //member.roles.keyArray().map(r=>{console.log(r.name)});
        let isMuted=!!member.roles.find(r=>r.name=='Muted');
        console.log('member '+member.user.username+' isMuted '+isMuted);
        if(isMuted){
            member.roles.map(r=>{                
              if(r.name!='Muted' ) {
             member.removeRole(r); console.log('role was removed!'); 
              };
                
             });
          };
    };//process end
    await process();
    
  
  
    
      let muted_role_name='пикапикачу';
   if(oldMember.roles.find(r=>r.name==muted_role_name)||newMember.roles.find(r=>r.name==muted_role_name)){
         console.log('role is find Muted ');
/*
      console.log('guildMemberUpdate event');
      let member = newMember;
  
    
    const fs = require('fs');    
    const usersRolesBD=require(`../commands/usersRolesBD.js`);
    
    async function process(){
          await usersRolesBD.insert(client,member).then(resolve=>console.log(member.user.username+' roles data updated')).catch(err=>console.log(err));
    };
    await process();
*/
    };//if muted
  
 }catch(err){console.log(err);};
};//run end