const toDom = document.getElementById('joke');

const getJoke = async () => {
    const fromApi = await fetch("https://icanhazdadjoke.com/", {method: "get",
    headers: {
        Accept: "application/json"
    }});
    const convert = await fromApi.json();

    const joke = convert.joke;

    toDom.innerHTML = `${joke}`;


    store(joke)
    /* Save joke */
    /* const likedJokes = [1];

    likedJokes.push(joke);//problem it keeps renewing, prevent it from renew someHow
    console.log(likedJokes); */

}

function store(Joke) {
    // retrieve existing jokes from session storage if available
    const existingJokes = JSON.parse(sessionStorage.getItem("likedJokes")) || [];

    //push the new joke to the existiong jokes array
    existingJokes.push(Joke);

    //save the updated jokes back to session storage
    sessionStorage.setItem("likedJokes", JSON.stringify(existingJokes));

    const retrievedJokes = JSON.parse(sessionStorage.getItem("likedJokes"));

    console.log(retrievedJokes)
     
}


/* Start */
getJoke()


/* create History interface */

function History() {
    // select element
    const showInHistory = document.getElementById('store-jokes');
  
    const StoredJokes = JSON.parse(sessionStorage.getItem('likedJokes')) || [];
    const shownJokes = JSON.parse(sessionStorage.getItem('shownJokes')) || [];
  
    // Filter the new jokes that haven't been shown yet
    const newJokes = StoredJokes.filter(joke => !shownJokes.includes(joke));
  
    // Append the new jokes to the container
    newJokes.forEach(joke => {
      const newParagraph = document.createElement('p');
      newParagraph.textContent = joke;
      showInHistory.appendChild(newParagraph);
    });
  
    // Update the list of shown jokes in session storage
    const updatedShownJokes = [...shownJokes, ...newJokes];
    sessionStorage.setItem('shownJokes', JSON.stringify(updatedShownJokes));
  }






/* Switching Interfaces */

function SwitchToHistory() {
    const historyInterface = document.getElementById('history-interface');

    const historyInterfaceStyle = window.getComputedStyle(historyInterface);

    const checkHistoryStyle = historyInterfaceStyle.getPropertyValue('display');

    const homeInterface = document.getElementById('home-interface');


    if(checkHistoryStyle === "none") {
        historyInterface.style.display = "flex";
        homeInterface.style.display = "none";
    }

}

function SwitchToHome() {
    const historyInterface = document.getElementById('history-interface');

    const homeInterface = document.getElementById('home-interface');

    const homeInterfaceStyle = window.getComputedStyle(homeInterface);

    const checkHomeStyle = homeInterfaceStyle.getPropertyValue('display');

    if(checkHomeStyle === "none") {
        homeInterface.style.display = "block";
        historyInterface.style.display = "none";
    }
}


function handleInterfaceClick(event) {
    // Get the clicked element
    const clickedElement = event.currentTarget;
  
    // Remove the 'active' class from all interface elements
    const interfaceElements = document.querySelectorAll('.home-interface, .history-interface');
    interfaceElements.forEach(element => element.classList.remove('active'));
  
    // Add the 'active' class to the clicked element
    clickedElement.classList.add('active');
  }
  
  // Add click event listeners to the interface elements
  const interfaceElements = document.querySelectorAll('.home-interface, .history-interface');
  interfaceElements.forEach(element => {
    element.addEventListener('click', handleInterfaceClick);
  });
  
  // Set the initial active interface (You can set it based on the user's current page or other logic)
  const initialActiveInterface = document.querySelector('.home-interface');
  initialActiveInterface.classList.add('active');