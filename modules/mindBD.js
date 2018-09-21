
exports.system={
     DATA_BASE_NAME2:'points_bd_2.bd',
     TABLE_NAME:'users_points_5'
  
};
exports.show_table=async()=>{
  const fs = require('fs');
    const sqlite = require('./aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
 await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));
      let table = await sqlite.all(`SELECT * FROM ${TABLE_NAME}`).then(table=>{return table;}).catch(err=>{console.log(err);});
    
    console.log(table);
    return;
};
exports.drop=async()=>{
  const fs = require('fs');
    const sqlite = require('./aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
 await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));
     await sqlite.run(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
};
exports.run=(a,b,c)=>{  
   
  
  
  module.exports.insert(a,b,c);
  
   return 'bd response' ;

};

exports.insert = async(obj)=>{
try{
 // let val_id=obj.id;
  obj.id='0';
  let atr=Object.keys(obj);
  
  let val_w=obj.w;
  let val_r= obj.r;
  
  obj.id=0;
    let log = (arg) => {console.log(module.exports.name+':insert:'+arg);};
    const fs = require('fs');
    const sqlite = require('./aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
   
   //let val_id='id0';
   //let val_w='w0';
   //let val_r='r0';

   async function process(){
     
    await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));
  
    // let query='id TEXT,w TEXT,r TEXT';
    // let query2='id,w,r';
     //let atr=['id','w','r'];
     let query2=atr.join(',');
     let query =atr.join(' TEXT,')+' TEXT'; console.log(query);
     
     await sqlite.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${query})`).then(r=>{return true;}).catch(err=>{console.log(err);});
     log(' table created');
     let vals=`'${obj.n}','${obj.e}','${obj.type}','${obj.w}','${obj.q}','${obj.a}','${obj.r}','${obj.s}','${obj.id}'`;
    // let arr=[`'${obj.n}'`,`'${obj.n}'`];
     let arr=[];
     for(let key in obj){arr.push(`'${obj[key]}'`);};
     //let vals;
    // for(let key in obj){vals+=`${obj[key]}`+','};
    // vals=vals.slice(0,-1);
    // console.log(vals);
     
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (${query2}) `+`VALUES(`+arr+`)`).then(r=>{return true;}).catch(err=>{console.log(err);}); 
  /*  
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
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (id TEXT,w TEXT,r TEXT) VALUES(${points_},'${memberID}','${server_ID}')`).catch(err=>{console.log(err)});
     log(memberID+' member info inserted into table');
   }else{
     await sqlite.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} ( id TEXT,w TEXT,r TEXT)`).then(r=>{return true;}).catch(err=>{console.log(err);});
     log(' table created');
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (id TEXT,w TEXT,r TEXT) VALUES(${points_},'${memberID}','${server_ID}')`).then(r=>{return true;}).catch(err=>{console.log(err);});  
     log(memberID + ' member info inserted into table');
    };//else end

   */ 
   return;
 };//process end

 process();
        return;
}catch(err){console.log(err)};
};//exports.insert end