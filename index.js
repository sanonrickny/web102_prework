/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" style="width: 100%; height: auto;"/>
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
        `;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerHTML = GAMES_JSON.reduce((total, game) => total + game.backers, 0).toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${GAMES_JSON.reduce((total, game) => total + game.pledged, 0).toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    addGamesToPage(GAMES_JSON.filter(game => game.pledged < game.goal));

    // use the function we previously created to add the unfunded games to the DOM
    
}




// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    addGamesToPage(GAMES_JSON.filter(game => game.pledged >= game.goal));

    // use the function we previously created to add unfunded games to the DOM
    
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter or reduce to count the number of unfunded games
let total_games_unfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;
let total_games_raised = GAMES_JSON.length - total_games_unfunded;
let total_amount_raised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Create a string that explains the number of unfunded games using the ternary operator
const newParagraph = document.createElement("p");
newParagraph.textContent = `A total of ${total_amount_raised.toLocaleString()} has been 
raised for ${total_games_raised} games. Currently, ${total_games_unfunded} game(s)
remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(newParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUp] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("div");
topGameElement.innerHTML = `
    <h2>${topGame.name}</h2>
`;
firstGameContainer.appendChild(topGameElement);
// do the same for the runner up item
const runnerUpElement = document.createElement("div");
runnerUpElement.innerHTML = `
    <h2>${runnerUp.name}</h2>
`;
secondGameContainer.appendChild(runnerUpElement);

document.getElementById('add-name-btn').addEventListener('click', function() {
    const nameInput = document.getElementById('name-input');
    nameInput.style.display = 'block';
    nameInput.addEventListener('change', function() {
        const nameDisplay = document.getElementById('name-display');
        nameDisplay.textContent = `Your name is ${nameInput.value}`;
        nameInput.style.display = 'none';
    });
});