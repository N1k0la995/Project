		function createAccountResetInput(){	
				document.getElementById("usernameCreateAccount").style.display =  "none";
				document.forms["FormCreateAccount"]["username"].style.border=" 1px solid gray ";
				document.getElementById("passwordCreateAccount").style.display =  "none";
				document.forms["FormCreateAccount"]["password"].style.border=" 1px solid gray ";
		}
		function createAccount() {
			var username = document.forms["FormCreateAccount"]["username"].value;
			var password = document.forms["FormCreateAccount"]["password"].value;
			if (username == null || username == "") 
			{
				document.getElementById("usernameCreateAccount").style.display = "block";				
				document.forms["FormCreateAccount"]["username"].style.border=" 1px solid red ";
				document.forms["FormCreateAccount"]["password"].style.border=" 1px solid gray ";
				return true;
			}		 
			else if(password == null || password == "") 
			{
				document.getElementById("passwordCreateAccount").style.display = "block";
				document.forms["FormCreateAccount"]["password"].style.border=" 1px solid red";
				document.forms["FormCreateAccount"]["username"].style.border=" 1px solid gray ";
				return true;
			} 
			else  if( document.getElementById("createAccountBtn").innerHTML ==  document.getElementById("createAccountCheck").innerHTML  )
			{
				var username=document.forms["FormCreateAccount"]["username"].value;
				var password=document.forms["FormCreateAccount"]["password"].value;
				alert("Dear username:  "   +   username   +"  you successfully created account on Sound Cloud.");
			}
			else{
				var username=document.forms["FormCreateAccount"]["username"].value;
				var password=document.forms["FormCreateAccount"]["password"].value;
				alert("querido nombre de usuario:  "   +   username   +  "   has creado una cuenta con éxito en Sound Cloud.");

			}
		}
		function singUpForFreeResetInput() {
			document.getElementById("usernameSingUpForFree").style.display =  "none";
			document.forms["FormSingUpForFree"]["username"].style.border="1px solid gray";
			document.getElementById("passwordSingUpForFree").style.display =  "none";
			document.forms["FormSingUpForFree"]["password"].style.border="1px solid gray";
		}
		function singUpForFree() {
				var username = document.forms["FormSingUpForFree"]["username"].value;
				var password = document.forms["FormSingUpForFree"]["password"].value;
			if (username == null || username == "") 
			{
				document.getElementById("usernameSingUpForFree").style.display = "block";
				document.forms["FormSingUpForFree"]["username"].style.border= "1px solid red";
				document.forms["FormSingUpForFree"]["password"].style.border="";
				return true;
			}		 
			else if(password == null || password == "") 
			{
				document.getElementById("passwordSingUpForFree").style.display = "block";
				document.forms["FormSingUpForFree"]["password"].style.border= "1px solid red";
				document.forms["FormSingUpForFree"]["username"].style.border="";
				return true;
			} 
			else  if(document.getElementById("singUpForFreeBtn").innerHTML ==  document.getElementById("singUpForFreeChechAlert").innerHTML )
			{
				var username=document.forms["FormSingUpForFree"]["username"].value;
				var password= document.forms["FormSingUpForFree"]["password"].value;
				alert("Welcome  username:  " + username +"  password:  "+ password +" ");
			}
			else {
				var username=document.forms["FormSingUpForFree"]["username"].value;
				var password= document.forms["FormSingUpForFree"]["password"].value;
				alert("Bienvenidas  nombre de usuario:  " + username +"  contraseña:  "+ password +" ");
			}
		}
		function randomImage() {
			var images = ["image/head1.jpg","image/head2.jpg","image/head3.jpg"];
			var size = images.length;
			var x = Math.floor(size * Math.random());
			console.log(x);
			document.getElementById("randomImageHeader").style.backgroundImage = 
			"url("+images[x] +")";
		}
		document.addEventListener("DOMContentLoaded", randomImage);
		var createAccountModal= document.getElementById("CreateAccountModal");
		function buttonCreateAccountModal() {
			createAccountModal.style.display = "block";
			document.body.style.overflow="hidden";
		}
		function closeCreateAccount() {
			createAccountModal.style.display = "none";
			document.body.style.overflow="auto";
		}
		var singUpForFreeModal= document.getElementById("SingUpForFreeModal");
		function buttonSingUpForFreeModal() {
			singUpForFreeModal.style.display = "block";
			document.body.style.overflow="hidden";
		}
		function closeSingUpForFreeModal() {
			singUpForFreeModal.style.display = "none";
			document.body.style.overflow="auto";
		}
		var languageModal = document.getElementById("Language");
		function openLanguageModal() {
			languageModal.style.display = "block";
			document.body.style.overflow="hidden";
		}
		function closeLanguageModal() {
			languageModal.style.display = "none";
			document.body.style.overflow="auto";
		}
		window.onclick = function(event) {
			if (event.target == languageModal ||	event.target == singUpForFreeModal || event.target == createAccountModal ) {
				languageModal.style.display = "none";
				singUpForFreeModal.style.display = "none";
				createAccountModal.style.display = "none";
				document.body.style.overflow="auto";
			}
		}		
		var videoContainer = document.getElementById('video-container');
		function authenticate() {
			return gapi.auth2.getAuthInstance()
				.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
				.then(function() { console.log("Sign-in successful"); },
					function(err) { console.error("Error signing in", err); });
		};
		function loadClient() {
			gapi.client.setApiKey("AIzaSyCtffNfszKZii5EWz8SdxlQg424AcjIiTQ");
			return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
				.then(function() { console.log("GAPI client loaded for API"); },
					function(err) { console.error("Error loading GAPI client for API", err); });
		};
		// Make sure the client is loaded and sign-in is complete before calling this method.
		function execute() {
			return gapi.client.youtube.playlistItems.list({
			"part": "snippet,contentDetails",
			"maxResults": 6,
			"playlistId": "PLC8Ks0CgsKJNyw4-zQhzN8FO2x7D_dzai"
			})
		.then(function(response) {
			// Handle the results here (response.result has the parsed body).
			console.log("Response", response);
			const playlistItems=response.result.items;
			let output = '';
			playlistItems.forEach(item => {
				const videoId=item.snippet.resourceId.videoId;
				const title =item.snippet.title;
				const position =item.snippet.position;
				output +=  `
				<div class="col-2">
				<img class="VideoImage" value="${position}" id="img${position}" onclick="removeImageAndPlayYouTubeVideo(this)" src=" https://img.youtube.com/vi/${videoId}/hqdefault.jpg" style=" position:absolute; ">
				<iframe class="IFrameYoutube"  id="ifr${position}"  src="https://www.youtube.com/embed/${videoId}" frameborder="0"  allow="autoplay; encrypted-media"   ></iframe>
				<p id="vid${position}" style="display:none;">https://www.youtube.com/embed/${videoId}</p>
				</div>`;
			});
			videoContainer.innerHTML=output;
			},
			function(err) { console.error("Execute error", err); });
		};
		gapi.load("client:auth2", function() {
			gapi.auth2.init({client_id: "272099904269-22euf40hdr21i671lgjrsrgispea40cg.apps.googleusercontent.com"});
		})
		var imageList = document.getElementsByClassName("VideoImage");
		var videoList = document.getElementsByClassName("IFrameYoutube");
		var imageClickValue;
		var controlPanel = 0;
		var playlist = [];
		function removeImageAndPlayYouTubeVideo(value) {
			for(var i = 0; i < imageList.length; i++){
				if (imageList[i] !== this) {
					imageList[i].style.display = "block";  
				}
				value.style.display = "none";
				imageClickValue = value.getAttribute("value"); 
			}
			for(var u = 0; u < videoList.length; u++){
				if (u != imageClickValue) {
				videoList[u].src= document.getElementById("vid" + u).innerHTML;
				}
				else{
					document.getElementById("ifr" + imageClickValue).src +="?autoplay=1";
					var counter = value.getAttribute("id");
					playlist.push(counter);
					document.getElementById("previousVideoId").innerHTML = playlist[playlist.length -2];
					document.getElementById("nextVideoId").innerHTML = playlist[playlist.length -1];
				}
			}
			if (controlPanel==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";
			}
			else{
				controlPanel=controlPanel+1;
			} 
		}
		function backward() {
			document.getElementById("forward").disabled = false;
			var backwardVideo = document.getElementById("previousVideoId").innerHTML;
			removeImageAndPlayYouTubeVideo(backwardVideo);
		}
		function forward() {
			forwardVideo = document.getElementById("nextVideoId").innerHTML;
			removeImageAndPlayYouTubeVideo(forwardVideo);
		};