exports.name='userPointsBD';
exports.system={
     DATA_BASE_NAME:'points_bd.bd',
     TABLE_NAME:'users_points5',
  
     CHANNEL_ID:''
};

exports.run=async(client,message,args)=>{
 
   if(message.content.search('test')!=-1) {
          console.log('usersPointsBD run');
    };

    
    
};//run end


exports.setRolesByMessage=async(client,server_ID,channel_ID,arg,roles_name_arr,picks_arr,phrases_arr)=>{
try{
 //let msg_cnt = message.content.trim().split(/ +/g);
 // msg_cnt.shift();
 // msg_cnt.join(' ');
  if(!arg){console.log('empty');return;};
  console.log(arg);
  await module.exports.setRoles(client,server_ID,channel_ID,arg,roles_name_arr,picks_arr,phrases_arr);
 
}catch(err){console.log(err);};
};//setRolesByMessage end

exports.setRoles=async(client,server_ID,channel_ID,Top3ID_str,roles_name_arr,picks_arr,phrases_arr)=>{
try{
 
 let str=Top3ID_str;
 if(!str){console.log('ids strings are empty, need:client,server_ID,channel_ID,Top3ID_str'); return;};
  if(!roles_name_arr){console.log('roles are not difined');return;};
  if(!picks_arr){console.log('picks are not difined');return;};
  if(!phrases_arr){console.log('phrases are not difined');return;};
//let str = '';
  let server = client.guilds.get(server_ID); if(!server){console.log('server does not found'); return;};
  let roles=[];
  for(var i=0;i<3;i++){roles[i]=server.roles.find('name',roles_name_arr[i]); if(!roles[0]) {console.log('role does not found');}; };
  let mmb='';
  let arr=(str.indexOf('|')!=-1)?str.split('|'):[str];
  console.log(arr);
  for(var i=0;i<arr.length;i++){if(arr[i].indexOf(',')!=-1){arr[i]=arr[i].split(','); }else{arr[i]=[arr[i]];}; };//for end
 for(var i=0;i<arr.length;i++){
    arr[i].map(m_id=>{
  mmb=client.guilds.get(server_ID).members.get(m_id); 
  if(!mmb){console.log('member does not found');}else 
  if(roles[i]){mmb.addRole(roles[i]);server.channels.get(channel_ID).send(mmb+phrases_arr[i],{file:picks_arr[i]});};
   });//arr[0]
  };//for end
 console.log(arr);
}catch(err){console.log(err);};
};//setRoles end
exports.getTop3ID_str=async(client,server_ID,limit_)=>{
try{
    
    let log = (arg) => {console.log(module.exports.name+':getTopTIds:'+arg);};
    let resolve = await module.exports.getTop(client,server_ID,limit_);
    log('ids');console.log(resolve);
    let str = '';
    let ids_arr=[];
    let pos=0; let lst_pnts=resolve[0].points;let str1='';
     resolve.map(e=>{
         if(e.points!=lst_pnts){pos++};
         if(pos==3) return;
         ids_arr[pos]=(ids_arr[pos])?ids_arr[pos]+','+e.userID:e.userID;
         lst_pnts=e.points;
     });
    str = ids_arr.join('|');
    console.log(str);
    return str;
}catch(err){console.log(err);};     
};//getTopIds end
exports.getTopTableStr=async(client,server_ID,limit_)=>{
try{
    let log = (arg) => {console.log(module.exports.name+':getTopTableCode:'+arg);};
    let top_arr=await module.exports.getTop(client,server_ID,limit_);
    log('top:');console.log(top_arr);
     let str='======РЕЙТИНГ УМНИКОВ=======🎓\n';
     let lst_pnts=top_arr[0].points;
     let max=top_arr[0].points; 
     let pos_smb=[0,'🏆','🏅'];
    // let plase=[];
     let pos=1;
     top_arr.map(e=>{
           
           let mmb_name=(client.guilds.get(server_ID).members.get(e.userID))?client.guilds.get(server_ID).members.get(e.userID).user.username+'#'+client.guilds.get(server_ID).members.get(e.userID).user.discriminator:'userID'+e.userID;
           if(e.points!=lst_pnts){pos++};
           let smb = (!!pos_smb[pos])?pos_smb[pos]:'   ';
           str+=pos+smb+' '+e.points+' '+mmb_name+'\n';
           lst_pnts=e.points;
         });

      return str;
}catch(err){console.log(err);};
};//getTopTableCode end
exports.getTop = async(client,server_ID,limit_)=>{
try{
 
   
    let log = (arg) => {console.log(module.exports.name+':getTop:'+arg);};
    const fs = require('fs');
    const sqlite = require('./aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;

    async function getPointsTable(){
       limit_=(!!limit_)?Number(limit_):25;
       await sqlite.open(`./$DATA_BASE_NAME`).catch(err=>console.log(err));
       log('try to getPointsTable...'); 
         let resolve = await sqlite.all(`SELECT * FROM ${TABLE_NAME}  ORDER BY points DESC LIMIT ${limit_}`); 
          
         console.log(resolve);
//WHERE serverID='${server_id}'
        let resolve1 = await sqlite.all(`SELECT * FROM ${TABLE_NAME}  WHERE serverID=='${server_ID}'  ORDER BY points DESC LIMIT ${limit_}`).then(row=>{return row;}).catch(err=>console.log(err));  
         log(':sorted:');console.log(resolve);
       return resolve1;    
    };//getPointsTable end
   return getPointsTable();
}catch(err){console.log(err);};
};//end get
exports.insert = async(client,points_,memberID,server_ID)=>{
try{
   
    let log = (arg) => {console.log(module.exports.name+':insert:'+arg);};
    const fs = require('fs');
    const sqlite = require('./aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
   
  

   async function process(){
    
    await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));
   console.log('points insert');
   let resolve=await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID='${memberID}' AND serverID='${server_ID}'`).then(row=>{ return (row)?'has':'apsend';}).catch(err=>{console.log(err);});
    
     log(memberID+' member '+resolve+' into table'); //
  if(resolve=='has'){
   let  prev_points=await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID='${memberID}' AND serverID='${server_ID}'`).then(row=>{ return (row.points)?row.points : 0;}).catch(err=>{console.log(err);});
    points_=Number(points_)+Number(prev_points);
    resolve = await sqlite.run(`UPDATE ${TABLE_NAME} SET points=${points_} WHERE userID='${memberID}' AND serverID='${server_ID}'`).catch(err=>{console.log(err);});
     log(memberID+' member info is updated');
      console.log(resolve);
   }else if(resolve=='absend'){
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (points,userID,serverID) VALUES(${points_},'${memberID}','${server_ID}')`).catch(err=>{console.log(err)});
     log(memberID+' member info inserted into table');
   }else{
     await sqlite.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} ( points INTEGER,userID TEXT, serverID TEXT)`).then(r=>{return true;}).catch(err=>{console.log(err);});
     log(' table created');
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (points,userID,serverID) VALUES(${points_},'${memberID}','${server_ID}')`).then(r=>{return true;}).catch(err=>{console.log(err);});  
     log(memberID + ' member info inserted into table');
    };//else end
/*
    let table = await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID=='${memberID}' AND serverID=='${server_ID}'`).then(table=>{return table;}).catch(err=>{console.log(err);});
*/
    
    let table = await sqlite.all(`SELECT * FROM ${TABLE_NAME}`).then(table=>{return table;}).catch(err=>{console.log(err);});
    log('table: ');
    console.log(table);
    return;
 };//process end

 process();
        return;
}catch(err){console.log(err)};
};//exports.insert end

