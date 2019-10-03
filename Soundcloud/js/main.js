		function backward() {
            document.getElementById("forward").disabled = false;
        }
		function createAccountCheckUsername(){	
			document.getElementById("username1").innerHTML = "";
			document.forms["FormCreateAccount"]["uname1"].style.border=" 1px solid gray ";
		}
		function createAccountCheckPassword(){	
			document.getElementById("passw1").innerHTML = "";
			document.forms["FormCreateAccount"]["password1"].style.border=" 1px solid gray ";
		}
		function createAccount() {
			var username = document.forms["FormCreateAccount"]["uname1"].value;
			var password = document.forms["FormCreateAccount"]["password1"].value;
			document.getElementById("passw1").innerHTML =  "";
			document.getElementById("username1").innerHTML =  "";
			if (username == null || username == "") 
			{
				document.getElementById("username1").innerHTML =  "Enter a username";
				document.forms["FormCreateAccount"]["uname1"].style.border=" 1px solid red ";
				document.forms["FormCreateAccount"]["password1"].style.border=" 1px solid gray ";
				return true;
			}		 
			else if(password == null || password == "") 
			{
				document.getElementById("passw1").innerHTML =  "Enter a password";
				document.forms["FormCreateAccount"]["password1"].style.border=" 1px solid red";
				document.forms["FormCreateAccount"]["uname1"].style.border=" 1px solid gray ";
				return true;
			} 
			else  
			{
				var username=document.forms["FormCreateAccount"]["uname1"].value;
				var password=document.forms["FormCreateAccount"]["password1"].value;
				alert("Dear username:  "   +   username   +"  you successfully created account on Sound Cloud.");
			}
		}
		function singUpForFreeCheckUsername() {
			document.getElementById("username").innerHTML =  "";
			document.forms["FormSingUpForFree"]["uname"].style.border="";
		}
		function singUpForFreeCheckPassword() {
			document.getElementById("passw").innerHTML =  "";
			document.forms["FormSingUpForFree"]["password"].style.border="";
		}
		function singUpForFree() {
				var username = document.forms["FormSingUpForFree"]["uname"].value;
				var password = document.forms["FormSingUpForFree"]["password"].value;
				document.getElementById("passw").innerHTML =  "";
				document.getElementById("username").innerHTML =  "";
			if (username == null || username == "") 
			{
				document.getElementById("username").innerHTML =  "Enter a username";
				document.forms["FormSingUpForFree"]["uname"].style.border=" 1px solid red";
				document.forms["FormSingUpForFree"]["password"].style.border="";
				return true;
			}		 
			else if(password == null || password == "") 
			{
				document.getElementById("passw").innerHTML =  "Enter a password";
				document.forms["FormSingUpForFree"]["password"].style.border=" 1px solid red";
				document.forms["FormSingUpForFree"]["uname"].style.border="";
				return true;
			} 
			else  
			{
				var username=document.forms["FormSingUpForFree"]["uname"].value;
				var password= document.forms["FormSingUpForFree"]["password"].value;
				alert("Welcome  username:  " + username +"  password:  "+ password +" ");
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
		var language = document.getElementById("Language");
		function openLanguageModal() {
			language.style.display = "block";
			document.body.style.overflow="hidden";
		}
		function closeLanguageModal() {
			language.style.display = "none";
			document.body.style.overflow="auto";
		}
		function closeButtonLanguageModal(){
			language.style.display = "none";
			document.body.style.overflow="auto";
		}
		window.onclick = function(event) {
			if (event.target == language ||	event.target == singUpForFreeModal || event.target == createAccountModal ) {
				language.style.display = "none";
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
		var imageList=document.getElementsByClassName("VideoImage");
		var videoList=document.getElementsByClassName("IFrameYoutube");
		var imageClickValue;
		var controlPanel=0;
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
				}
			}
			if (controlPanel==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";
			}
			else{
				controlPanel=controlPanel+1;
			}
		};