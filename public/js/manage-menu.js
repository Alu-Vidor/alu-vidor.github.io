document.addEventListener('DOMContentLoaded', function() {
    loadAvailableRecipes();
});

document.getElementById('launch-voting').addEventListener('click', function() {
    toggleVoting(true);
});

document.getElementById('stop-voting').addEventListener('click', function() {
    toggleVoting(false);
});

function loadAvailableRecipes() {
    fetch('http://localhost:3000/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке рецептов');
            }
            return response.json();
        })
        .then(recipes => {
            ['menu1', 'menu2', 'menu3'].forEach(menuId => {
                const menuContainer = document.getElementById(menuId);
                addRecipeSelectors(menuContainer, recipes);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить рецепты.');
        });
}

function addRecipeSelectors(menuContainer, recipes) {
    const courseTypes = ['Первое блюдо', 'Второе блюдо', 'Десерт', 'Напиток'];
    courseTypes.forEach(courseType => {
        const label = document.createElement('label');
        label.textContent = courseType;
        menuContainer.appendChild(label);

        const select = document.createElement('select');
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.RecipeID;
            option.textContent = recipe.DishName;
            select.appendChild(option);
        });
        menuContainer.appendChild(select);
    });
}

function toggleVoting(startVoting) {
    const action = startVoting ? 'start-voting' : 'stop-voting';
    fetch(`http://localhost:3000/api/menu/${action}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            console.log(startVoting ? 'Голосование запущено' : 'Голосование остановлено');
            updateVotingButtons(startVoting);
        } else {
            console.error('Ошибка при попытке изменить состояние голосования');
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

function updateVotingButtons(votingStarted) {
    const launchButton = document.getElementById('launch-voting');
    const stopButton = document.getElementById('stop-voting');

    if (votingStarted) {
        launchButton.style.display = 'none';
        stopButton.style.display = 'block';
    } else {
        launchButton.style.display = 'block';
        stopButton.style.display = 'none';
    }
}