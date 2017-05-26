            
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
            
            socket.on('newLocationMessage', function (message){
                var li = jQuery('<li></li>');
                var a = jQuery('<a target="_blank">My current location</a>')
                console.log(message.url);
                li.text(`${message.from}: `);
                a.attr('href',message.url);
                
                li.append(a);
                jQuery('#messages').append(li);
            });
            
            //SENDING A MESSAGE WITH SUBMIT FORM
            jQuery('#message-form').on('submit', function(e){
                e.preventDefault();
                
                var messageTextbox = jQuery('[name=message]');
                
                socket.emit('createMessage',{
                    from:'User',
                    text:jQuery('[name=message]').val()
                }, function(){
                    jQuery('[name=message]').val('');
                });
            });
            
            var locationButton = jQuery('#send-location');
            locationButton.on('click', function(){
               if (!navigator.geolocation) {
                   return alert('Geolocation not supported by your browser');
               }
               
               locationButton.attr('disabled', 'disabled').text("Sending location...");
               
               navigator.geolocation.getCurrentPosition(function(position){
                   locationButton.removeAttr('disabled');
                   socket.emit('createLocationMessage',{
                       latitude:position.coords.latitude,
                       longitude:position.coords.longitude
                   });
                   locationButton.removeAttr('disabled').text('Send location');
                   console.log(position);
               }, function(){
                   locationButton.removeAttr('disabled').text('Send location');
                   alert('Unable to fetch location.');
               })
            });