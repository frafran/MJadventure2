module.exports = (client, message) => {   
  const eventName = 'MJ' 
  if (message.content.startsWith('!newMJ')){
    const member = message.mentions.members.first()
    let role1 = message.guild.roles.find(r => r.name === eventName);

    member.addRole(role1).catch(console.error);
    if(!message.member.roles.some(r=>["Admin", "MODO","MODO tyrannique"].includes(r.name)) ){
      message.delete()
      return message.author.send("tu n'as pas les conditions nécessaires pour effectuer cette commande")}
    if (!member) {
      message.delete()
      return message.author.send(`Aucun utilisateur sélectionner`)
    }
    let dUser = message.guild.member(message.mentions.users.first())
    var server = message.guild;
    var permsName = eventName+"-"+member;
    message.guild.createRole({
        //data: {
            name: permsName,
            permissions: ['MANAGE_ROLES']
        //},
        //reason: 'new Event'
    }).then(role => {
        member.addRole(role,permsName)
        .catch(error => client.catch(error))
    }).catch(error => client.catch(error))
    let role = message.guild.roles.find(r => r.name === permsName);
    message.delete()
    server.createChannel(eventName, 'category').then( // Create the actual voice channel.
        (chan2) => {
            console.log("stage 3");
            console.log(chan2);
            //console.log(`Set the category of ${chan2.name} to ${chan2.parent.name}`);
            chan2.overwritePermissions(message.guild.roles.find('name', '@everyone'), { // Disallow Everyone to see, join, invite, or speak
              'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
            });
            chan2.overwritePermissions(message.guild.roles.find('name', permsName),   {//Explicitely allow the role to see, join and speak
            'VIEW_CHANNEL': true,                    'CREATE_INSTANT_INVITE' : true,        'MANAGE_CHANNELS': true,
            });
              console.log("stage 4");
        }
      
  ).catch(console.error);
    
  return dUser.send(`Bonne nouvelle tu as été promu au rang de MJ, bien joué à toi!!`)
  }
}
