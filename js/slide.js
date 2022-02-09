var i = 0; 			// Start Point
var images = [];	// Images Array
var time = 3000;	// Time Between Switch
	 
// Image List
images[0] = "../img/slideIMG1.jpeg";
images[1] = "../img/slideIMG2.jpeg";
images[2] = "../img/slideIMG3.jpeg";


// Change Image
function changeImg(){
	// document.slide.src = images[i];
	document.getElementById("slide").src = images[i];

	// Check If Index Is Under Max
	if(i < images.length - 1){
	  // Add 1 to Index
	  i++; 
	} else { 
		// Reset Back To O
		i = 0;
	}

	// Run function every x seconds
	setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload=changeImg;