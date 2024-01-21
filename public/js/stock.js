document.addEventListener('DOMContentLoaded', function() {
    loadStockData();
});

function loadStockData() {
    fetch('http://localhost:3000/api/stock')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных со склада');
            }
            return response.json();
        })
        .then(data => {
            populateStockTable(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить данные о запасах.');
        });
}

function populateStockTable(stockData) {
    const tableBody = document.getElementById('stock-table').querySelector('tbody');
    tableBody.innerHTML = '';

    stockData.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.ProductName}</td>
            <td>${item.Quantity} ${item.UnitName}</td>
            <td>${calculateDaysToExpiry(item.ArrivalDate, item.ShelfLife)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function calculateDaysToExpiry(arrivalDate, shelfLife) {
    const expiryDate = new Date(arrivalDate);
    expiryDate.setDate(expiryDate.getDate() + shelfLife);
    const today = new Date();

    return Math.max(0, Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)));
}
