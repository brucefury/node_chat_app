            
            //CALLING THE IO PACKAGE
            var socket = io();
            
            //CONNECTING TO THE SERVER
            socket.on('connect', function(){
                console.log('Connected to server.');
                //SENDING AN E-MAIL (MAKING SURE YOU'RE CONNECTED FIRST)
                socket.emit('createEmail',{
                    to:'Jen',
                    text:'What the fuck?'
                });
                //SENDING A NEW MESSAGE
                socket.emit("createMessage", {
                user:'Bruce',
                message:"I'm tired of your shit too.",
                createAt:Date
                });
    
            });
            //LISTENING FOR THE SERVER TO DISCONNECT
            socket.on('disconnect', function(){
                console.log('Disconnected from server.');
            });
            //LISTENING FOR A NEW E-MAIL
            socket.on('newEmail', function(email){
                console.log('New email', email);
            });
            

    
            //RECEIVING A NEW MESSAGE
            socket.on("newMessage", (message)=>{
                console.log(message);
            });
            