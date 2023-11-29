
// Get the modal
const modal = document.getElementById("myModal");

//Get the modal content

const modalContent = document.getElementById("modal-content");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


//get the event list 
const eventList = document.getElementById("events-list");

// // When the user clicks on the button, open the modal
// eventList.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function nextDate() {
  let today = new Date();
  today.setDate(today.getDate() + 1);

  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}






loadingDiv()

 fetch(`https://v3.football.api-sports.io/fixtures?date=${nextDate()}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "3f50d3c4e003b513fda486ce909bc183"
	}
})
.then((response => {
        
        if(response.ok){
          eventList.innerHTML='';
          return response.json()
          
        }

       
    }))
.then((data => {
  
  
  for(let i =0 ;i <= 10;  i++) {
		console.log(data.response[i]);
		let eventData = data.response[i];
		//  console.log(eventData.fixture.date);
		// console.log(eventData.league.name);
		// console.log(eventData.league.logo);
		// console.log(eventData.teams.away.name);
		// console.log(eventData.teams.away.logo);
		// console.log(eventData.teams.home.name);
		// console.log(eventData.teams.home.logo);
    // const boxId = eventData.fixture.id;

    // Create a div element
const eventBox = document.createElement('div');
eventBox.id = 'event-box';
eventBox.classList.add('event-box');
let box = document.getElementsByClassName('event-box');
// box.style.backgroundImage =`url(${eventData.league.logo})`;

// Create and append elements inside eventBox
const boxFeature1 = document.createElement('div');
boxFeature1.classList.add('box-feature');
const h1Liga = document.createElement('h1');
h1Liga.classList.add('fs-2');
h1Liga.textContent = `${eventData.league.name}|`;
const h1Country = document.createElement('h1');
h1Country.textContent = `${eventData.league.country}`;
boxFeature1.appendChild(h1Liga);
boxFeature1.appendChild(h1Country);
eventBox.appendChild(boxFeature1);

const teamBox = document.createElement('div');
teamBox.classList.add('teamBox');
const team1 = document.createElement('div');
team1.classList.add('team');
const img1 = document.createElement('img');
img1.classList.add('img-thumbnail');
img1.src = `${eventData.teams.home.logo}`;
img1.alt = 'home team logo';
team1.appendChild(img1);
teamBox.appendChild(team1);

const team2 = document.createElement('div');
team2.classList.add('team');
const img2 = document.createElement('img');
img2.classList.add('img-thumbnail');
img2.src = `${eventData.teams.away.logo}`;
img2.alt = '';
team2.appendChild(img2);
teamBox.appendChild(team2);

eventBox.appendChild(teamBox);

const boxFeature2 = document.createElement('div');
boxFeature2.classList.add('box-feature');
const futureDate = new Date(`${eventData.fixture.date}`);
const remainingTimeElement = displayTimeRemaining(futureDate);
boxFeature2.appendChild(remainingTimeElement);
eventBox.appendChild(boxFeature2);

// Append the eventBox to the event list
eventList.appendChild(eventBox);

/*Modal  Logic*/

 // When the user clicks on the box, open the modal
 eventBox.onclick = function() {
  displayEventDetail(boxId);
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

	}
}))
.catch(err => {
	eventList.innerHTML='';
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('container','d-flex','justify-content-center','mt-3');
  
  
  const Div2 = document.createElement('div');
  Div2.classList.add('col-md-12');

  const Div3 = document.createElement('div');
  Div3.classList.add('alert', 'alert-danger');

  const errorText  = document.createElement('h1');
  errorText.textContent = 'Sorry we have encountered some issues with the server, We are trying to load the content...'
  
  Div3.appendChild(errorText);
  Div2.appendChild(Div3);
  errorDiv.appendChild(Div2);
  eventList.appendChild(errorDiv);
  eventList.classList.add('justify-content-center', 'w-80')

 
});






function displayTimeRemaining(futureDate) {
  // Current date
  const currentDate = new Date();

  // Calculating the time difference (in milliseconds)
  const timeDifference = futureDate.getTime() - currentDate.getTime();

  // Converting the difference in milliseconds to days, hours, minutes, seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Creating an h1 element with the remaining time
  const h1Element = document.createElement('h1');
  h1Element.classList.add('fs-2');
  h1Element.textContent = `Start in ${days} days, ${hours} hours, ${minutes} minutes`;

  return h1Element;
}

//loading div
function loadingDiv() {
  // Create a div element with Bootstrap classes
  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add( 'container' ,'d-flex', 'align-items-center', 'justify-content-center');

  // Create an image element for the loading GIF
  const loadingImg = document.createElement('img');
  loadingImg.src = 'images/loading.gif';
  loadingImg.alt = 'Loading...';

  

  // Append the image and text elements to the loading div
  loadingDiv.appendChild(loadingImg);
  eventList.appendChild(loadingDiv);
}

function displayEventDetail(id) {
  fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "3f50d3c4e003b513fda486ce909bc183"
    }
  })

  .then(response => {
          
          if(response.ok){
            return response.json()
            
          } else {
            throw new Error('Network response was not ok.');
          }
         
      })
.then((data => {
    	console.log(data);
     // console.log(data.response[0].league.name);
    	// console.log(data.response[0].league.country);
    	// console.log(data.response[0].teams.away.name);
    	// console.log(data.response[0].teams.away.logo);
    	// console.log(data.response[0].teams.home.name);
    	// console.log(data.response[0].teams.home.logo);
     // console.log(data.response[0].fixture.date);
    	// console.log(data.response[0].fixture.timezone);

     const leagueName = `${data.response[0].league.name}`;
     const leagueCountry = `${data.response[0].league.country}`;
     const awayTeamName = `${data.response[0].teams.away.name}`;
     const awayTeamLogoSrc = `${data.response[0].teams.away.logo}`;
     const homeTeamName = `${data.response[0].teams.home.name}`;
     const homeTeamLogoSrc = `${data.response[0].teams.away.logo}`;
     const matchDate = `${data.response[0].fixture.date} ` + ` ${data.response[0].fixture.timezone}`;

     //Creating Modal Content

     const mainDiv = document.createElement('div');
     mainDiv.classList.add('container','d-flex', 'flex-column','text-center','justify-content-center');

     const row1 = document.createElement('div');
     row1.classList.add('d-flex','flex','text-center','justify-content-around');

     const firstDiv =document.createElement('div');
    //  firstDiv.classList.add('team');
     const teamOneImage = document.createElement('img');
     teamOneImage.src=homeTeamLogoSrc;
     firstDiv.appendChild(teamOneImage);
     row1.appendChild(firstDiv);

     const secondDiv = document.createElement('div');
     secondDiv.classList.add('team');
     const h1Vs = document.createElement('h1');
     h1Vs.classList.add('fs-1');
     h1Vs.textContent='VS';
     secondDiv.appendChild(h1Vs);
    row1.appendChild(secondDiv);

     const thirdDiv = document.createElement('div');
     thirdDiv.classList.add('team');
     const teamTwoImage = document.createElement('img');
     teamTwoImage.src=awayTeamLogoSrc;
     thirdDiv.appendChild(teamTwoImage);
     row1.appendChild(thirdDiv);

     mainDiv.appendChild(row1);


     const row2 = document.createElement('div');
     row2.classList.add('d-flex','flex','text-center','justify-content-around');
     const div1 = document.createElement('div');
     div1.classList.add('team', 'd-flex' ,'justify-content-center' ,'align-items');
     const h1HomeName = document.createElement('h1');
     h1HomeName.textContent= homeTeamName;
     div1.appendChild(h1HomeName);
     row2.appendChild(div1);

     const div2 =  document.createElement('div');
     div2.classList.add('team');
     row2.appendChild(div2);
    

     const div3 = document.createElement('div');
     div3.classList.add('team', 'd-flex' ,'justify-content-center' ,'align-items');
     const h1AwayName = document.createElement('h1');
     h1AwayName.textContent= awayTeamName;
     div3.appendChild(h1AwayName);
     row2.appendChild(div3);
     mainDiv.appendChild(row2);



     
     const row3 = document.createElement('div');
     row3.classList.add('d-flex','flex','text-center','justify-content-center');
     const secondDiv3 = document.createElement('div');
     secondDiv3.classList.add('team', 'd-flex' ,'justify-content-center' ,'align-items');
     const eventDate= document.createElement('h1');
     eventDate.textContent= matchDate;
     secondDiv3.appendChild(eventDate);
     mainDiv.appendChild(row3);


     const row4 = document.createElement('div');
     row4.classList.add('d-flex','flex','text-center','justify-content-around');
     const secondDiv4 = document.createElement('div');
     secondDiv4.classList.add('team', 'd-flex' ,'justify-content-center' ,'align-items');
     const eventName= document.createElement('h1');
     eventName.textContent= leagueName;
     secondDiv4.appendChild(eventName);
     mainDiv.appendChild(row4);


     const row5 = document.createElement('div');
     row5.classList.add('d-flex','flex','text-center','justify-content-around');
     const secondDiv5 = document.createElement('div');
     secondDiv5.classList.add('team', 'd-flex' ,'justify-content-center' ,'align-items');
     const eventCountry= document.createElement('h1');
     eventCountry.textContent= leagueCountry;
     secondDiv5.appendChild(eventCountry);
     mainDiv.appendChild(row5);

     modalContent.innerHTML="";
     modalContent.appendChild(mainDiv);

   
   }))
.catch(err => {
	console.log(err);
})
  
  
}



