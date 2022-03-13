function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

var divs = ["section1", "section2", "section3"]

function show(id) {
  for(var i = 0; i < divs.length; i++){
    if(id == divs[i]){
      document.getElementById(divs[i]).style.display="block"
      document.getElementById(divs[i]).style.height="auto"
    }else{
      document.getElementById(divs[i]).style.display="none"
    }
  }
  }

