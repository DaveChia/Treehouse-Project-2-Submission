/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Initialize of Variables
let elementList = document.querySelector("ul").children;// Variables holding all the DOM elements for the students list
const numberOfEntriesPerPage = 10;// Indicates the maximum number of students will be displayed the page


appendPageLinks(elementList);//Running the function to start the page


//Function to display the 'numberOfEntriesPerPage' numbers of students per page
function showPage(list,page){
	
	let startIndex = (page * numberOfEntriesPerPage) - numberOfEntriesPerPage;
	let endIndex = page * numberOfEntriesPerPage;
	
	resetAndHideAllLists(list);// This function hides all the DOM elements of all students 
	
	for(let i = startIndex; i < endIndex ; i++){
		
		if(list[i]){
			
			list[i].style.display = 'block';
			
		}
		
	}
	
}

// This function hides all the DOM elements of all students 
function resetAndHideAllLists(list){
	
	for(let i = 0; i < list.length ; i++){
		
		list[i].style.display = 'none';
		
	}
	
}

//This function generate append and add functionality to the pagination buttons, once formed, will run showPage function to display the first page of students
function appendPageLinks(list){
	
	const pageNumberNeeded = Math.ceil(list.length/numberOfEntriesPerPage);
	
	let elementListParent = document.getElementsByClassName("page")[0];

	let pageLinksDiv = document.createElement("DIV");
	pageLinksDiv.className = "pagination";
	elementListParent.appendChild(pageLinksDiv); 
	
	let pageLinksUL = document.createElement("UL");
	elementListParent.lastElementChild.appendChild(pageLinksUL); 
	
	for(let i = 0 ; i < pageNumberNeeded ; i++){
		
		let pageLinksLI = document.createElement("LI");
		elementListParent.lastElementChild.lastElementChild.appendChild(pageLinksLI); 
		
		let pageLinksA = document.createElement("A");
		pageLinksA.setAttribute("href", "#"); 
		pageLinksA.textContent = i+1;
		pageLinksLI.appendChild(pageLinksA); 
		if(i === 0){
			
			pageLinksA.className = "active";
			showPage(list,1);
			
		}
		pageLinksA.addEventListener("click", linkClicked); 
	
	}
	
	//This function changes the page once the respection pagination link is clicked
	function linkClicked (event){
		
		let targetClicked = event.target;
		let getULChildren = elementListParent.lastElementChild.lastElementChild.children;
		
		
		for(let i = 0 ; i < pageNumberNeeded ; i++){
			
			getULChildren[i].lastElementChild.classList.remove("active");
			
			if((targetClicked.textContent - 1) === i){
				
				targetClicked.className = "active";
				
				showPage(list,targetClicked.textContent);
				
			}
			
		}
		
	}
	
}

//This function generates the search input element for users to search for students
function generateSearchBar(list){
	
	let elementListHeaderParent = document.getElementsByClassName("page-header")[0];
	
	let pageSearchDiv = document.createElement("DIV");
	pageSearchDiv.className = "student-search";
	
	let pageSearchInput = document.createElement("INPUT");
	pageSearchInput.placeholder  = "Search for students...";
	pageSearchInput.addEventListener("keyup", searchButtonTyped); 
	pageSearchDiv.appendChild(pageSearchInput); 
	
	
	let pageSearchButton = document.createElement("BUTTON");
	pageSearchButton.textContent  = "Search";
	pageSearchButton.addEventListener("click", searchButtonClicked); 
	pageSearchDiv.appendChild(pageSearchButton); 
	
	
	elementListHeaderParent.appendChild(pageSearchDiv); 
	
	//The function below runs the search once the search input detected any input
	function searchButtonTyped(){
		
		let searchValueLocator = elementListHeaderParent.lastElementChild.firstElementChild;
		let searchInputValue = searchValueLocator.value;
		let searchResultChecker = "no";
		let searchResultArray = [];
		
		
		if(searchInputValue !== ""){
			
			resetAndHideAllLists(list);
			
			for(let i = 0; i < list.length ; i++){
		
				if(list[i]){
					
					let currentListName = list[i].firstElementChild.children[1].textContent;
					
					if(currentListName.includes(searchInputValue)){
		
						list[i].style.display = 'block';
						searchResultArray.push(list[i]);
					}
					
				}
				
			}
			
			if(searchResultArray.length!=0){
				
				searchResultChecker = "yes";
				
			}
			
	
			document.querySelectorAll('.pagination').forEach(function(a){
			a.remove()
			})
			hideDisplayNoResultsFromSearch(searchResultChecker);
			appendPageLinks(searchResultArray);
			
		}else if(searchInputValue == ""){
			
			showPage(elementList,1);
			document.querySelectorAll('.pagination').forEach(function(a){
			a.remove()
			})
			hideDisplayNoResultsFromSearch("yes");
			appendPageLinks(elementList);
	
		}
		
	}
	
	function searchButtonClicked(){
		
		let searchValueLocator = elementListHeaderParent.lastElementChild.firstElementChild;
		let searchInputValue = searchValueLocator.value;
		
		if(searchInputValue !== ""){
			
			resetAndHideAllLists(list);
			
			for(let i = 0; i < list.length ; i++){
		
				if(list[i]){
					
					let currentListName = list[i].firstElementChild.children[1].textContent;
					
					if(currentListName.includes(searchInputValue)){
						
						list[i].style.display = 'block';
						
					}
					
				}
				
			}
			
		}else{
			
			alert("Please fill up the search input.");
			
		}
		
		searchValueLocator.value= "";
	}
	
	
}
generateSearchBar(elementList);



//This function displayes a HTML element showing that no results were ontained with the search bar
function hideDisplayNoResultsFromSearch(inputChecker){
	
	let msgContainerDisplayStatus = document.getElementById("searchNoResultMessage").style.display;
	let msgContainer = document.getElementById("searchNoResultMessage").style.display;

	if(inputChecker == "no"){
		
		document.getElementById("searchNoResultMessage").style.display = "block";
		
	}else{
		
		document.getElementById("searchNoResultMessage").style.display = "none";
		
	}
}
