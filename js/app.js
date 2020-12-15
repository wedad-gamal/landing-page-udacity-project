/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
 
/**
 * Define Global Variables

 * 
*/
const getAllSections = document.getElementsByTagName("section");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


 
const CreateAnchorInsideNav = (parentElement, element) =>{

	 
	const anchor = document.createElement("A");
	const data = document.createTextNode(element.getAttribute("data-nav"));
	anchor.appendChild(data);
	anchor.setAttribute("href",`#${element.id}`);
	

	const liElement = document.createElement("LI");
	liElement.classList.add("menu__link");
	
	if(element.id =="section1")
	liElement.classList.add("navbar__link__active");
		
	

	liElement.appendChild(anchor);

	parentElement.appendChild(liElement);
	return anchor;
}

const setScrollSmoothlyEvent = (element)=>{
	const scrollToElementId =  element.getAttribute("href").substring(1);

	const scrollToElement = document.getElementById(scrollToElementId);

	element.addEventListener('click', function(e){
	 
		removeActiveClassFromSection();
		removeActiveClassFromLinks();
		e.preventDefault();
		element.parentElement.classList.add("menu__link");
		element.parentElement.classList.add("navbar__link__active");
		scrollToElement.classList.toggle("your-active-class");
		const topPos = scrollToElement.getBoundingClientRect().top + window.pageYOffset;

		window.scrollTo({
		  top: topPos, // scroll so that the element is at the top of the view
		  behavior: 'smooth' // smooth scroll
		})

	});
}


const removeActiveClassFromSection = () =>{

	
	for(const element of getAllSections){
		element.classList.remove("your-active-class");
	}

}


const removeActiveClassFromLinks = () =>{

	const getAllLinks = document.getElementsByClassName("menu__link");
	for(const element of getAllLinks){
		element.classList.remove("navbar__link__active");
	}
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


const CreateNavigation = ()=>{
	 
   
	const fragment = document.createDocumentFragment();

  for (const element of getAllSections) {
 
  	const anchor = CreateAnchorInsideNav(fragment,element);
  	setScrollSmoothlyEvent(anchor);
	}

	let parentElement = document.getElementById("navbar__list");
	parentElement.appendChild(fragment);
}

CreateNavigation();



const collapseSections = ()=>{
var i;

for (i = 0; i < getAllSections.length; i++) {
  getAllSections[i].addEventListener("click", function() {
    var content = this.getElementsByClassName("collapse")[0];
    if (content.style.display === "block" || content.style.display === "") {
      content.style.display = "none"; 
    } else {
      content.style.display = "block";
    }
  });
}
}

collapseSections();

const getLinkByData = (data) => {
	const liElements = document.getElementsByTagName("A");
	for(const element of liElements){
		const elementHref = element.getAttribute("href").substring(1);
		if(elementHref == data){
			return element;
		}
	}
}

document.addEventListener('scroll', function(e) {
	const prevYOffset = window.pageYOffset;
	let currentYOffset = window.pageYOffset;
	document.getElementsByTagName("nav")[0].style.display = "block";
	
	setTimeout(function(){ 
		currentYOffset = window.pageYOffset;

		if(currentYOffset === prevYOffset)
		document.getElementsByTagName("nav")[0].style.display = "none";
		else
		document.getElementsByTagName("nav")[0].style.display = "block";

	}, 2000);
		
 

	for(const element of getAllSections){

		const currentElementPositionTop = element.getBoundingClientRect().top + window.pageYOffset -200;
		const currenElementPositionBottom = element.getBoundingClientRect().bottom + window.pageYOffset ;
		

		const currentYCoordinate = (window.pageYOffset < 270 ? 271: window.pageYOffset) + 200; 
		

		
		if((currentYCoordinate == currentElementPositionTop || currentYCoordinate == currenElementPositionBottom)
			||(currentYCoordinate > currentElementPositionTop && currentYCoordinate < currenElementPositionBottom )){
			
			removeActiveClassFromSection();

			element.classList.add("your-active-class");
			
			removeActiveClassFromLinks();
			const anchor = getLinkByData(element.id);
			anchor.parentElement.classList.add("menu__link");
			anchor.parentElement.classList.add("navbar__link__active");
		}
	
    }


});





