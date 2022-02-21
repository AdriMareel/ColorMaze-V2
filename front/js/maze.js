class Pos{
	constructor(){
		this.x;
		this.y;
	}
}


class game{
	constructor(level){
		this.maze;
		this.level = level;
		this.score = 0;
		this.start = new Pos();
		this.finish = new Pos();
		this.position = new Pos();
		this.currentColor;
	}


	initMaze(){
		if(this.level == 0){
			this.maze = mazeTuto;
		}

		if(this.level == 1){
			this.maze = mazeLevel1;
		}
	}

	initPos(){
		let id;

		for(let i = 0; i < this.maze.length ; i++){
			for(let j = 0 ; j < this.maze.length; j++){
				id = this.maze.length*i+j;

				if (this.maze[i][j].includes('D')){
					this.start.x = j;
					this.start.y = i;
				}

				if (this.maze[i][j].includes('A')){
					this.finish.x = j;
					this.finish.y = i;
				} 
			}
		}

		this.position.x = this.start.x;
		this.position.y = this.start.y;
	}

	initView(){
		let html = "";
		let counter = 0;

		for(let i = 0; i < this.maze.length;i++){
			html += "<div class=\"row\">";
			for (let j = 0; j < this.maze.length;j++){
				html += '<div class="tile" id="'+counter+'"></div>';
				counter++;
			}
			html += "</div>";
		}
		document.getElementsByClassName("maze")[0].innerHTML = html;

	}

	updateScore(){
		let html = document.getElementById('score');
		html.innerHTML = this.score;
	}

	displayColor(color){
		let colorText;
		let id;

		this.score++;
		this.updateScore();

		switch(color){
			case "blue":
				colorText = 'B';
			break;

			case "red":
				colorText = 'R';
			break;

			case "yellow":
				colorText = 'Y';
			break;

			case "green":
				colorText = 'G';
			break;
		}

		this.currentColor = colorText;

		//reinitialisation
		for(let i = 0 ; i < this.maze.length;i++){
			for(let j = 0 ; j < this.maze.length;j++){
				id = this.maze.length*i+j;
				document.getElementById(id).style.backgroundColor = '';
			}
		}

		for(let i = 0 ; i < this.maze.length;i++){
			for(let j = 0 ; j < this.maze.length;j++){
				id = this.maze.length*i+j;
				if (this.maze[i][j].includes(colorText)) {
					document.getElementById(id).style.backgroundColor = color;
				}

				if(this.maze[i][j].includes("A")){
					document.getElementById(id).innerHTML = '<img src="../images/damier.png">';
				}
			}
		}
	}

	unfade(){
		let x = this.position.x;
		let y = this.position.y;
		document.getElementById(this.maze.length*y+x).style.animation = '';
	}

	fade(){
		let x = this.position.x;
		let y = this.position.y;
		document.getElementById(this.maze.length*y+x).style.animation = 'fade 0.75s ease infinite';
	}

	unfade(){
		let x = this.position.x;
		let y = this.position.y;
		document.getElementById(this.maze.length*y+x).style.animation = '';
	}

	move(way){
		switch(way){
			case "up":
				if(this.position.y != 0 && this.maze[this.position.y-1][this.position.x].includes(this.currentColor)){
					this.unfade();
					this.position.y -= 1;
					this.fade();
					this.score++;
					this.updateScore();				
				}
					
			break;

			case "down":
				if(this.position.y != this.maze.length-1 && this.maze[this.position.y+1][this.position.x].includes(this.currentColor)){
					this.unfade();
					this.position.y += 1;
					this.fade();
					this.score++;
					this.updateScore();	
				}
			break;

			case "right":
				if(this.position.x != this.maze.length-1 && this.maze[this.position.y][this.position.x+1].includes(this.currentColor)){
					this.unfade();
					this.position.x += 1;
					this.fade();
					this.score++;
					this.updateScore();	
				}
			break;

			case "left":
				if(this.position.x != 0 && this.maze[this.position.y][this.position.x-1].includes(this.currentColor)){
					this.unfade();
					this.position.x -= 1;
					this.fade();
					this.score++;
					this.updateScore();	
				}
			break;
		}

		if(this.maze[this.position.y][this.position.x].includes("A")){
			this.endLevel();
		}
	}

	endLevel(){
		document.getElementsByClassName("play")[0].style.display = "none";

		document.getElementsByClassName("endScreen")[0].style.display = "block";
		document.getElementById("endScore").innerHTML = this.score;
	}
}

//keyboard listener for movement
document.addEventListener('keydown', (event) =>{
	if(event.code == "ArrowDown" || event.code == "KeyS") gameVar.move('down');
	if(event.code == "ArrowUp" || event.code == "KeyW") gameVar.move('up');
	if(event.code == "ArrowLeft" || event.code == "KeyA") gameVar.move('left');
	if(event.code == "ArrowRight" || event.code == "KeyD") gameVar.move('right');
})


let gameVar = new game(1);
gameVar.initMaze();
gameVar.initView();
gameVar.initPos();
gameVar.displayColor('red');
gameVar.score = 0;
gameVar.updateScore();

gameVar.fade();

console.log(gameVar);