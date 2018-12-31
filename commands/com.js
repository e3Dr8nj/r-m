
exports.run=(client,message,args)=>{
//args[0] args[1]
//root_command user.id
let commands={};
let reactions_name={
   one:{id:'1⃣',name:'Mike'},
   two:{id:'2⃣',name:'Armando'},
   three:{id:'3⃣',name:'Kevin'},
   four:{id:'4⃣',name:'Lance'},
   five:{id:'5⃣',name:'Susan'},
    six:{id:'6⃣',name:'Tongtyed'},
    seven:{id:'7⃣',name:'Hugh'},
    eigth:{id:'8⃣',name:'Scotty'},
    nine:{id:'9⃣',name:'Cro'},
    ten:{id:'🔟',name:'Sage'}
   
// lyennea, sage, maynard,
};//


let process = async()=>{
    let msgs = await message.channel.fetchMessages({limit:20}).then(messages=>{
         let msg_arr= messages.array();
         let arr=[];
        msg_arr.map(m=>{
         
           let reactions_key_array=m.reactions.keyArray();
           if(reactions_key_array.length==0) return;
  
         for( var key in reactions_name){
               if (reactions_key_array.indexOf(reactions_name[key].id)!=-1) {
                    
                    //let bool = await m.reactions.get(reactions_name[key].id).fetchUsers().then(users=>{return users.has(message.author.id);});
                    //console.log(bool);
                   // arr.push({name:reactions_name[key].name,phrase:m.content}) ; 
                      arr.push([m,reactions_name[key].id,key]);
               };//if end
          };//for end
           console.log(m.reactions.keyArray());
    
              
         });//msg_arr end
         return arr;
        
         }).catch(err=>console.error(err));//await message end
        
   
     let arr2=[];
      for(var ii=0;ii<msgs.length;ii++){
          
       let bool= await msgs[ii][0].reactions.get(msgs[ii][1]).fetchUsers().then(users=>{return users.has(message.author.id);});
       if (bool){arr2.push({name:reactions_name[msgs[ii][2]].name,phrase:msgs[ii][0].content}) ;};
       };//for end
   console.log(arr2);

      arr2=arr2.reverse();
      let str = '@Septapus customcomic ';
        for(var i=0;i<arr2.length;i++){
          let sp_smb=(i==arr2.length-1)?' ':'|';
          str+= await arr2[i].name+':'+arr2[i].phrase+sp_smb;
           
         };//for end
       
       console.log(await str);
       message.channel.send(str);

     //   console.log(arr2);
};//process end
process();
};//exports end

