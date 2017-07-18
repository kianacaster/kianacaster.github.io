const scoreButton = document.getElementById('scoreButton');
const scoreElement = document.getElementById('score');
let score = 0;
	
setInterval(function(){
	scoreElement.innerHTML = Math.floor(score) + " Points";
})

scoreButton.addEventListener('click', event => {
	score++;
});