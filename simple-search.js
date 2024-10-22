

const input = document.getElementsByClassName("search-input");
const submit = document.getElementById("submit");
const results = document.getElementsByClassName("results");

function displayCards(data){
    array.forEach(function(card) {
        const result = document.createElement("div");
        result.textContent = "pokemon: " + card.name + ", attack:" + card.attacks.name;
        results.appendChild(result);
    });
}

function clearCards(){
    // Get all child elements of the <html> element
    const children = results.children;

    // Loop through the child elements and log them
    Array.from(children).forEach(child => {
        results.removeChild(child);
    });
}

// URL of the API endpoint
const apiUrl = "https://api.pokemontcg.io/v2/cards";

// Your API key
const apiKey = "c1d54c8d-eaf0-4895-80c0-8f1ddbefd07f";

// Make a GET request with the API key in the headers
function fetchCards(val) {
    console.log("1");
    const query = "name:" + val; // You can adjust the query as needed

    fetch(`${apiUrl}?q=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", // Set the content type
            "Authorization": `Bearer ${apiKey}`, // Include API key if required
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(results => {
        console.log("2");
        console.log(results.data[0].name); // Handle the data returned from the API
        //displayCards(results.data); // Assuming you have a displayCards function defined
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


submit.addEventListener("click", ()=>{
    console.log("0");
    let val = input.value;

    // Call the function to fetch cards
    fetchCards(val);

});




