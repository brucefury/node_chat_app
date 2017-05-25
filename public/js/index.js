            
            //CALLING THE IO PACKAGE
            var socket = io();
            
            //CONNECTING TO THE SERVER
            socket.on('connect', function(){
                console.log('Connected to server.');

            });
            //LISTENING FOR THE SERVER TO DISCONNECT
            socket.on('disconnect', function(){
                console.log('Disconnected from server.');
            });

            //RECEIVING A NEW MESSAGE
            socket.on("newMessage", (message)=>{
                console.log(message);
                var li = jQuery('<li></li>');
                li.text(`${message.from}: ${message.text}`);
                
                jQuery('#messages').append(li);
            });
            
            //SENDING A MESSAGE WITH SUBMIT FORM
            jQuery('#message-form').on('submit', function(e){
                e.preventDefault();
                
                socket.emit('createMessage',{
                    from:'User',
                    text:jQuery('[name=message]').val()
                }, function(){
                    
                });
            });