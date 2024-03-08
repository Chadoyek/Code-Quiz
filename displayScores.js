document.addEventListener("DOMContentLoaded", function() {
    function getScoresFromLocalStorage() {
        return JSON.parse(localStorage.getItem("quizScores")) || [];
    }

    function displayScores() {
        var scores = getScoresFromLocalStorage();
        var scoreList = document.getElementById("score-list");

        scoreList.innerHTML = "";

        scores.forEach(function(score, index) {
            var listItem = document.createElement("li");
            listItem.textContent = "Score " + (index + 1) + ": " + score.initials + " - " + score.score;
            scoreList.appendChild(listItem);
        });
    }

    displayScores();
});

