document.addEventListener('DOMContentLoaded', function() {
    checkVotingStatus();
});

function checkVotingStatus() {
    fetch('http://localhost:3000/api/voting-status')
        .then(response => response.json())
        .then(data => {
            if (data.status == "inactive") {
                showVotingResult(data.winningMenu);
            } else {
                enableVoting();
                if (data.votingEndTime) {
                    startTimer(data.votingEndTime);
                }
            }
        })
        .catch(error => console.error('Ошибка:', error));
}

function enableVoting() {
    document.querySelectorAll('.vote-button').forEach(button => {
        button.addEventListener('click', function() {
            const menuId = this.parentElement.id;
            castVote(menuId);
        });
    });
}

function castVote(menuId) {
    console.log(`Голос за ${menuId}`);
}

function showVotingResult(winningMenu) {
    stopTimer();
    document.getElementById('menus').style.display = 'none';
    const resultDiv = document.getElementById('voting-result');
    resultDiv.innerHTML = `<h2>Победившее меню: ${winningMenu}</h2>`;
    resultDiv.style.display = 'block';
}

let timerInterval;

function startTimer(endTime) {
    timerInterval = setInterval(() => {
        const timerDiv = document.getElementById('timer');
        const now = new Date().getTime();
        const distance = new Date(endTime) - now;

        if (distance < 0) {
            stopTimer();
            checkVotingStatus();
            return;
        }

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerDiv.innerHTML = `До окончания голосования: ${minutes}м ${seconds}с`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}