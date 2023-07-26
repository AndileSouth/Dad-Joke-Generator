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
