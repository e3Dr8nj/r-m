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

  
 }catch(err){console.log(err);};
};//run end