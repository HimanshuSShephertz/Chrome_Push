'use strict';
 var regID ;
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
 
  navigator.serviceWorker.register('sw.js').then(function() {
	  
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker is ready :^)', reg);
    reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
      console.log('endpoint:', sub.endpoint);
	 
	   regID = sub.endpoint
	    var idD = regID.substring(regID.indexOf("d/")+1);
       	regID =  idD.substring(idD.indexOf("/")+1);
        console.log(regID)
			localStorage.setItem("_App42_DeviceId",regID)		 
       
	
    });
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
 
}


function registerDeviceWithApp42(userName ,token, type ){
	
	var pushNotificationService  = new App42Push();
	var  result;
	var res="success";
	pushNotificationService.storeDeviceToken(userName,token,type,{  
		success: function(object) 
		{  
			var pushNotification = JSON.parse(object);  
			localStorage.setItem("register",1)		 
			localStorage.setItem("userName",userName)
			result = pushNotification.app42.response.push;
			console.log("UserName is : " + result.userName)	
			console.log("Type is : " +  result.type);
			console.log("DeviceToken is : " +  result.deviceToken);	
			console.log("result",result)
			res="success";
			console.log("res",res)
		},  
		error: function(error) {  
		res="failure";
		}  
	});  
		
}


function registerSendMessage(message,token){	
	var pushNotificationService  = new App42Push();
	var  result;
	var userName= localStorage.getItem("userName")
	//
	pushNotificationService.sendPushMessageToDevice(userName,message,token,{  
		success: function(object) 
		{  
			var pushNotification = JSON.parse(object); 
			result = pushNotification.app42.response.push;
			console.log("UserName is : " + result.userName)	
		},  
		error: function(error) {  
		}  
	}); 
}



function showCommands(data) {
  console.log("#datadatadata############", data)
 }


