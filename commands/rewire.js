exports.run =(client,message,args)=>{
  if(!message.author.bot) return;
 message.content=message.content.slice(7);
  message.channel.send(message.content);
};