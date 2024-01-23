document.addEventListener('DOMContentLoaded', function() {
    loadAvailableRecipes();
    checkVotingStatus();
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
    const method = 'POST';

    const requestOptions = {
        method: method,
    };

    if (startVoting) {
        const menuData = getMenuData();

        console.log(menuData);

        requestOptions.headers = {
            'Content-Type': 'application/json',
        };
        requestOptions.body = JSON.stringify(menuData);
    }

    fetch(`http://localhost:3000/api/menu/${action}`, requestOptions)
        .then(response => {
            if (response.ok) {
                console.log(startVoting ? 'Голосование запущено' : 'Голосование остановлено');
                updateVotingButtons(startVoting ? 'active' : 'inactive');
            } else {
                console.error('Ошибка при попытке изменить состояние голосования');
            }
        })
        .catch(error => console.error('Ошибка:', error));
}

function getMenuData() {
    const menus = ['menu1', 'menu2', 'menu3'];
    const menuData = menus.map(menuId => {
        const menuContainer = document.getElementById(menuId);
        const selectedOptions = menuContainer.querySelectorAll('select');
        const courses = Array.from(selectedOptions).map(select => select.value);
        return {
            menuId: menuId,
            firstCourseId: courses[0],
            secondCourseId: courses[1],
            dessertId: courses[2],
            drinkId: courses[3],
        };
    });

    return { menus: menuData };
}

function updateVotingButtons(status) {
    const launchButton = document.getElementById('launch-voting');
    const stopButton = document.getElementById('stop-voting');

    console.log(status);

    if (status == "active") {
        launchButton.style.display = 'none';
        stopButton.style.display = 'block';
    } else {
        launchButton.style.display = 'block';
        stopButton.style.display = 'none';
    }
}

function checkVotingStatus() {
    fetch('http://localhost:3000/api/voting-status')
        .then(response => response.json())
        .then(data => {
            updateVotingButtons(data.status);
        })
        .catch(error => {
            console.error('Ошибка при проверке статуса голосования:', error);
        });
}