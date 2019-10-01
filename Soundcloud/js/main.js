	
            function backward() {
            document.getElementById("button2").disabled = false;
        }

		function CreateAccountCheckUsername(){	
			document.getElementById("username1").innerHTML =  "";
			document.forms["FormCreateAccount"]["uname1"].style.border="";


		}
		function CreateAccountCheckPassword(){	
			document.getElementById("passw1").innerHTML =  "";
			document.forms["FormCreateAccount"]["password1"].style.border="";

		}
		
		function CreateAccount() {
			var username = document.forms["FormCreateAccount"]["uname1"].value;
			var password = document.forms["FormCreateAccount"]["password1"].value;
			document.getElementById("passw1").innerHTML =  "";
			document.getElementById("username1").innerHTML =  "";

			if (username == null || username == "") {
				document.getElementById("username1").innerHTML =  "Enter a username";
				document.forms["FormCreateAccount"]["uname1"].style.border=" 1px solid red";
				document.forms["FormCreateAccount"]["password1"].style.border="";
				return true;
				}		 
				
			else if(password == null || password == "") {
				document.getElementById("passw1").innerHTML =  "Enter a password";
				document.forms["FormCreateAccount"]["password1"].style.border=" 1px solid red";
				document.forms["FormCreateAccount"]["uname1"].style.border="";
				return true;
			} 
			
			else  
			{
				var username=document.forms["FormCreateAccount"]["uname1"].value;
				var password=document.forms["FormCreateAccount"]["password1"].value;
				alert("Dear username:  "   +   username   +"  you successfully created account on Sound Cloud.");
			}
		}



		function SingUpForFreeCheckUsername() {
			document.getElementById("username").innerHTML =  "";
			document.forms["FormSingUpForFree"]["uname"].style.border="";
		}

		function SingUpForFreeCheckPassword() {
			document.getElementById("passw").innerHTML =  "";
			document.forms["FormSingUpForFree"]["password"].style.border="";
		}
		function SingUpForFree() {
				var username = document.forms["FormSingUpForFree"]["uname"].value;
				var password = document.forms["FormSingUpForFree"]["password"].value;
				document.getElementById("passw").innerHTML =  "";
				document.getElementById("username").innerHTML =  "";

			if (username == null || username == "") {
				document.getElementById("username").innerHTML =  "Enter a username";
				document.forms["FormSingUpForFree"]["uname"].style.border=" 1px solid red";
				document.forms["FormSingUpForFree"]["password"].style.border="";
					return true;
				}		 
				
			else if(password == null || password == "") {
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

		function randomImage(){
			var images = ["image/head1.jpg","image/head2.jpg","image/head3.jpg"];
			var size = images.length;
			var x = Math.floor(size * Math.random());
			console.log(x);
			document.getElementById("randomImageHeader").style.backgroundImage = 
			"url("+images[x] +")";
		}
		document.addEventListener("DOMContentLoaded", randomImage);


		var CreateAccountModal= document.getElementById("CreateAccountModal");
		var buttonCreateAccount= document.getElementById("CreateAccountButtonModal");
		var spanCreateAccount= document.getElementsByClassName("close2")[0];

		buttonCreateAccount.onclick = function() {
		CreateAccountModal.style.display = "block";
		document.body.style.overflow="hidden";
		}
		spanCreateAccount.onclick = function() {
		CreateAccountModal.style.display = "none";
		document.body.style.overflow="auto";

		}


		var SingUpForFreeModal= document.getElementById("SingUpForFreeModal");
		var buttonSingUpForFree= document.getElementById("SingUpForFreeButtonModal");
		var spanSingUpForFree= document.getElementsByClassName("close3")[0];

		buttonSingUpForFree.onclick = function() {
		SingUpForFreeModal.style.display = "block";
		document.body.style.overflow="hidden";
		}
		spanSingUpForFree.onclick = function() {
		SingUpForFreeModal.style.display = "none";
		document.body.style.overflow="auto";
		}

		var Language = document.getElementById("Language");
		var buttonLanguage = document.getElementById("myBtn");
		var spanLanguage = document.getElementsByClassName("close")[0];
		var clsLanguage = document.getElementsByClassName("closeLanguageButton")[0];
		
		buttonLanguage.onclick = function() {
		Language.style.display = "block";
		document.body.style.overflow="hidden";
		}

		spanLanguage.onclick = function() {
		Language.style.display = "none";
		document.body.style.overflow="auto";
		}
		clsLanguage.onclick = function(){
		Language.style.display = "none";
		document.body.style.overflow="auto";
		}
		window.onclick = function(event) {
		if (event.target == Language ||	event.target == SingUpForFreeModal ||	event.target == CreateAccountModal ) {
		Language.style.display = "none";
		SingUpForFreeModal.style.display = "none";
		CreateAccountModal.style.display = "none";
		document.body.style.overflow="auto";

		}}


		var videoContainer = document.getElementById('video-container');
		function authenticate() {
			return gapi.auth2.getAuthInstance()
				.signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
				.then(function() { console.log("Sign-in successful"); },
					function(err) { console.error("Error signing in", err); });
		}
		function loadClient() {
			gapi.client.setApiKey("AIzaSyCtffNfszKZii5EWz8SdxlQg424AcjIiTQ");
			return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
				.then(function() { console.log("GAPI client loaded for API"); },
					function(err) { console.error("Error loading GAPI client for API", err); });
		}
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
				<img class="VideoImage" id="img${position}" onclick="YouTubeVideo${position}()" src=" https://img.youtube.com/vi/${videoId}/hqdefault.jpg" style=" position:absolute; ">
				<iframe class="IFrameYoutube"  id="ifr${position}"  src="https://www.youtube.com/embed/${videoId}" frameborder="0"  allow="autoplay; encrypted-media"   ></iframe>
			<p id="vid${position}" style="display:none;">https://www.youtube.com/embed/${videoId}</p>
			</div>

				`;

			});
			videoContainer.innerHTML=output;
			},

			function(err) { console.error("Execute error", err); });
		}
		

		gapi.load("client:auth2", function() {
			gapi.auth2.init({client_id: "272099904269-22euf40hdr21i671lgjrsrgispea40cg.apps.googleusercontent.com"});
		})
		
		var p=0;
		function YouTubeVideo0() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
				y[i].style.display = "block"; 
				document.getElementById("img0").style.display = "none"; 
			} 
			document.getElementById("ifr0").src +="?autoplay=1";
			var x = document.getElementById("vid1").innerHTML;
			var x1 = document.getElementById("vid2").innerHTML;
			var x2 = document.getElementById("vid3").innerHTML;
			var x3 = document.getElementById("vid4").innerHTML;
			var x4 = document.getElementById("vid5").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[1].src=x;
				y1[2].src=x1;
				y1[3].src=x2;
				y1[4].src=x3;
				y1[5].src=x4;				
			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";
			}
			else{
				p=p+1;
			}

		}
		function YouTubeVideo1() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
	
				y[i].style.display = "block"; 
				document.getElementById("img1").style.display = "none";

			}				
			document.getElementById("ifr1").src +="?autoplay=1";
			var x = document.getElementById("vid0").innerHTML;
			var x1 = document.getElementById("vid2").innerHTML;
			var x2 = document.getElementById("vid3").innerHTML;
			var x3 = document.getElementById("vid4").innerHTML;
			var x4 = document.getElementById("vid5").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[0].src=x;
				y1[2].src=x1;
				y1[3].src=x2;
				y1[4].src=x3;
				y1[5].src=x4;
			
			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";

			}
			else{
				p=p+1;
			}
		}
		function YouTubeVideo2() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
				y[i].style.display = "block"; 
				document.getElementById("img2").style.display = "none";

			}
			document.getElementById("ifr2").src +="?autoplay=1";
			var x = document.getElementById("vid1").innerHTML;
			var x1 = document.getElementById("vid0").innerHTML;
			var x2 = document.getElementById("vid3").innerHTML;
			var x3 = document.getElementById("vid4").innerHTML;
			var x4 = document.getElementById("vid5").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[1].src=x;
				y1[0].src=x1;
				y1[3].src=x2;
				y1[4].src=x3;
				y1[5].src=x4;
		
			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";

			}
			else{
				p=p+1;
			}

		}
		function YouTubeVideo3() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
				
				y[i].style.display = "block"; 
				document.getElementById("img3").style.display = "none";
			}	
			document.getElementById("ifr3").src +="?autoplay=1";	
			var x = document.getElementById("vid1").innerHTML;
			var x1 = document.getElementById("vid2").innerHTML;
			var x2 = document.getElementById("vid0").innerHTML;
			var x3 = document.getElementById("vid4").innerHTML;
			var x4 = document.getElementById("vid5").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[1].src=x;
				y1[2].src=x1;
				y1[0].src=x2;
				y1[4].src=x3;
				y1[5].src=x4;
		
			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";
			}
			else{
				p=p+1;
			}

		}
		function YouTubeVideo4() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
				y[i].style.display = "block"; 
				document.getElementById("img4").style.display = "none";

			}	
			document.getElementById("ifr4").src +="?autoplay=1";		
			var x = document.getElementById("vid1").innerHTML;
			var x1 = document.getElementById("vid2").innerHTML;
			var x2 = document.getElementById("vid3").innerHTML;
			var x3 = document.getElementById("vid0").innerHTML;
			var x4 = document.getElementById("vid5").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[1].src=x;
				y1[2].src=x1;
				y1[3].src=x2;
				y1[0].src=x3;
				y1[5].src=x4;

			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";

			}
			else{
				p=p+1;
			}
		}
		function YouTubeVideo5() {
			var y= document.getElementsByClassName("VideoImage");
			for(var i = 0; i < y.length; i++){
				
				y[i].style.display = "block"; 			
				document.getElementById("img5").style.display = "none";
			}
			document.getElementById("ifr5").src +="?autoplay=1";
			var x = document.getElementById("vid1").innerHTML;
			var x1 = document.getElementById("vid2").innerHTML;
			var x2 = document.getElementById("vid3").innerHTML;
			var x3 = document.getElementById("vid4").innerHTML;
			var x4 = document.getElementById("vid0").innerHTML;
			var y1= document.getElementsByClassName("IFrameYoutube");
				y1[1].src=x;
				y1[2].src=x1;
				y1[3].src=x2;
				y1[4].src=x3;
				y1[0].src=x4;
			
			if (p==1){
				var cont =	document.getElementById("control");
				cont.style.display = "block";

			}
			else{
				p=p+1;
			}
		}
        ;