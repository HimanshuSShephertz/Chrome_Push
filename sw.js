console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
 console.log('Push message', event);
  var title = 'Push message';
  var FETCH_ENDPOINT = "https://api.shephertz.com/cloud/1.0/storage/getAllNotications/deviceId/";  
	event.waitUntil(self.registration.pushManager.getSubscription().then(function(subscription) {
        var regID = null;
        if ('subscriptionId' in subscription) {
            regID = subscription.subscriptionId;
        } else {
            //in Chrome 44+ and other SW browsers, reg ID is part of endpoint, send the whole thing and let the server figure it out.
            regID = subscription.endpoint;
        }
        var idD = regID.substring(regID.indexOf("d/")+1);
       	regID =  idD.substring(idD.indexOf("/")+1);
        console.log(regID)
		var URL = FETCH_ENDPOINT +regID+ "/CHROME"+"?apiKey=d794ed6fd8fa49da69e8cb6f3e19ac4a63a22f92d19f1aa7e658ba1d09b645be&";
		console.log(URL);
        return fetch(URL).then(function(response) {
				
            return response.json().then(function(json) {
				var jsonOBJECT = json.app42.response.notification.messages
				var messagePayload
				var id
				console.log(messagePayload)
				console.log(jsonOBJECT.length)
				for(var i=0;i<jsonOBJECT.length;i++){
					var jsonPayload = jsonOBJECT[i];
					
					//promise.push(jsonPayload)
					messagePayload = jsonPayload.message
					id= jsonPayload.id
					console.log(messagePayload)
					console.log(id)
					
					 self.registration.showNotification(title, {  
					  body: messagePayload,  
					  icon: "images/icon.png"
					})
					
				}
            });
        });
    }));
	//return Promise.all(promise)
});

self.addEventListener('message', function(event) {
  event.ports[0].postMessage({'test': 'This is my response.'});
});

function endpointCorrection(pushSubscription) {
  if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
    return pushSubscription.endpoint;
  }

  var mergedEndpoint = pushSubscription.endpoint;
  if (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
    mergedEndpoint = pushSubscription.endpoint + '/' +
      pushSubscription.subscriptionId;
  }
  return mergedEndpoint;
}
self.addEventListener('notificationclick', function(event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  console.log("Through click "+ event)
    if (Notification.prototype.hasOwnProperty('data')) {
    console.log('Using Data');
    var url = event.notification.body;
	console.log("Through click "+ url)
	}
  
  event.notification.close();
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
   }
    if (clients.openWindow){
		return clients.openWindow("www.facebook.com");
	}
  }));

});

