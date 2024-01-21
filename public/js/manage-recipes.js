document.addEventListener('DOMContentLoaded', loadRecipes);
document.getElementById('add-ingredient').addEventListener('click', addIngredientField);
document.getElementById('recipe-form').addEventListener('submit', submitRecipe);

function addIngredientField() {
    const container = document.getElementById('ingredients-container');
    const inputGroup = document.createElement('div');
    inputGroup.innerHTML = `
        <select class="ingredient-select">
            <option value="">Выберите ингредиент</option>
            <!-- Динамически заполненные опции -->
        </select>
        <input type="number" placeholder="Количество" class="ingredient-quantity">
        <button type="button" onclick="openAddIngredientModal()">+</button>
    `;
    container.appendChild(inputGroup);
    loadIngredients(inputGroup.querySelector('.ingredient-select'));
}

function submitRecipe(event) {
    event.preventDefault();

    const dishName = document.getElementById('dish-name').value;
    const description = document.getElementById('description').value;
    const ingredientElements = document.querySelectorAll('.ingredient-select, .ingredient-quantity');
    const ingredients = [];
    for (let i = 0; i < ingredientElements.length; i += 2) {
        ingredients.push({
            productId: ingredientElements[i].value,
            quantity: ingredientElements[i + 1].value
        });
    }

    const recipeData = { dishName, description, ingredients };

    fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadRecipes();
    })
    .catch(error => console.error('Ошибка:', error));

    document.getElementById('recipe-form').reset();
    document.getElementById('ingredients-container').innerHTML = '';
}

function loadRecipes() {
    fetch('http://localhost:3000/api/recipes')
        .then(response => response.json())
        .then(recipes => {
            const recipesTable = document.getElementById('recipes-table');
            const tbody = recipesTable.querySelector('tbody');
            tbody.innerHTML = '';
            recipes.forEach(recipe => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${recipe.DishName}</td>
                    <td>${recipe.Description}</td>
                    <td>
                        <button onclick="editRecipe(${recipe.RecipeID})">Изменить</button>
                        <button onclick="deleteRecipe(${recipe.RecipeID})">Удалить</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Ошибка:', error));
}

function loadIngredients(selectElement) {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.ProductID;
                option.textContent = product.Name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка:', error));
}

function openAddIngredientModal() {
    document.getElementById('add-ingredient-modal').style.display = 'block';
}

function addNewIngredient() {
    const ingredientName = document.getElementById('new-ingredient-name').value;
    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: ingredientName })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('add-ingredient-modal').style.display = 'none';
        document.querySelectorAll('.ingredient-select').forEach(select => {
            const option = document.createElement('option');
            option.value = data.insertId;
            option.textContent = ingredientName;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Ошибка:', error));
}

function editRecipe(recipeId) {
    console.log('Редактирование рецепта', recipeId);
    // Здесь должна быть логика редактирования рецепта
}

function deleteRecipe(recipeId) {
    fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadRecipes();
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

const closeModalButton = document.getElementById('close-modal');
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        document.getElementById('add-ingredient-modal').style.display = 'none';
    });
}

const addNewIngredientButton = document.getElementById('add-new-ingredient');
if (addNewIngredientButton) {
    addNewIngredientButton.addEventListener('click', addNewIngredient);
}
