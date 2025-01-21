document.addEventListener('DOMContentLoaded', () => {
    const ingredientInput = document.getElementById('ingredientInput');
    const searchBtn = document.getElementById('searchBtn');
    const typeFilter = document.getElementById('typeFilter');
    const recipeList = document.getElementById('recipeList');

    const recipes = [
        { name: 'Pancakes', ingredients: ['flour', 'milk', 'eggs'], type: 'Breakfast' },
        { name: 'Omelette', ingredients: ['eggs', 'cheese', 'ham'], type: 'Breakfast' },
        { name: 'Grilled Cheese Sandwich', ingredients: ['bread', 'cheese', 'butter'], type: 'Lunch' },
        { name: 'Spaghetti', ingredients: ['pasta', 'tomato sauce', 'meat'], type: 'Dinner' },
        { name: 'Caesar Salad', ingredients: ['lettuce', 'croutons', 'parmesan'], type: 'Lunch' },
    ];

    const displayRecipes = (filteredRecipes) => {
        recipeList.innerHTML = '';
        if (filteredRecipes.length === 0) {
            recipeList.innerHTML = '<li>No recipes found.</li>';
            return;
        }

        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';

            const title = document.createElement('h3');
            title.textContent = recipe.name;
            li.appendChild(title);

            const ingredients = document.createElement('p');
            ingredients.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;
            li.appendChild(ingredients);

            const type = document.createElement('p');
            type.textContent = `Type: ${recipe.type}`;
            li.appendChild(type);

            recipeList.appendChild(li);
        });
    };

    const searchRecipes = () => {
        const query = ingredientInput.value.trim().toLowerCase();
        const type = typeFilter.value;

        const filteredRecipes = recipes.filter(recipe => {
            const matchesIngredients = query === '' || recipe.ingredients.some(ingredient => query.split(',').map(i => i.trim()).includes(ingredient.toLowerCase()));
            const matchesType = type === '' || recipe.type === type;
            return matchesIngredients && matchesType;
        });

        displayRecipes(filteredRecipes);
    };

    searchBtn.addEventListener('click', searchRecipes);
    typeFilter.addEventListener('change', searchRecipes);
});
