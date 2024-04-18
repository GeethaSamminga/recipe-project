function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const apiUrl = 'https://low-carb-recipes.p.rapidapi.com/search';
    const queryParams = `name=${searchInput}&tags=keto%3Bdairy-free&limit=1`; 
    const url = `${apiUrl}?${queryParams}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd25feed07dmsh5a66cfd6f3570dcp188189jsnae32a3b20c21',
            'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
        
            sessionStorage.setItem('recipeData', JSON.stringify(data));
            displayRecipe(data[0]);
            hideSuggestionImages();
            document.querySelector('.suggestion').style.display = 'flex';
            document.querySelectorAll('.suggestion img').forEach(img => img.style.display = 'none');
 
        })
        .catch(error => console.error('Error fetching data:', error));
        function hideSuggestionImages() {
            document.querySelectorAll('.suggestion img').forEach(img => img.style.display = 'none');
        }
}


function displayRecipe(recipe) {
    const recipeResults = document.getElementById('recipeResults');

    if (!recipe) {
        recipeResults.innerHTML = 'No recipe found.';
        return;
    }


    recipeResults.innerHTML = ''; 

    const recipeContainer = document.createElement("div");
    recipeContainer.setAttribute("class", "food");

    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("class", "card");


    recipeCard.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>Calories: ${recipe.nutrients.caloriesKCal}</h3>
        <p style="font-weight: 300;">Description: ${recipe.description}</p>
        <button onclick="viewDetails('${recipe.id}')">View Details</button>
    `;

    recipeContainer.appendChild(recipeCard);

    
    recipeResults.appendChild(recipeContainer);
}



function viewDetails(recipeId) {

    window.location.href = `extrapage.html?recipeId=${recipeId}`;
}
