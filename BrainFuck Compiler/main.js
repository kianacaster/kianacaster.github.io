const textArea = document.getElementById('text');
const outputBox = document.getElementById('output');
let code;
let cells = [];
let str = "";
function defineCells(matrix, length){
	for(var i = 0; i < length; i++){
		matrix.push(0);
	}
	return matrix;
}

function parseInstructions(instructions){
	let instructionArray = [];
	for(var i = 0; i < instructions.length; i++){
		instructionArray.push(instructions[i]);
	}
	return instructionArray;
}

function getCellLength(instructions){
	let total = 1;
	let buffer  = 0;
	for(var i = 0; i < instructions.length; i++){
		if(instructions[i] == ">"){
			if(buffer > 0){
				buffer--;
			} else {
				total++;
			}	
		}else if(instructions[i] == "<"){
			buffer++;
		}
	}
	if(total > 1){
		return total;
	}else{
		return 1;
	}
}

function execute(matrix, instructions){
	let pointer = 0;
	let finalStringArray = [];
	for(var i = 0; i < instructions.length; i++){
		switch(instructions[i])
		{
			case "+":
				matrix[pointer]++;
				break;
			
			case "-":
				matrix[pointer]--;
				break;
			
			case ">":
				pointer++;
				break;
			
			case "<":
				pointer--;
				break;
			
			case ".":
					outputBox.value += String.fromCharCode(matrix[pointer]);
					break;
			case "[":
				let loop = [];
				let index = i;
				let stopper = instructions.length;
				for(var j = index + 1; j < stopper; j++){
					if(instructions[j] !== "]"){
						loop.push(instructions[j]);
					} else {
						stopper = j;
					}
				}
				
				while(matrix[pointer] > 0){
					execute(matrix, loop);
				}
				
				i = j-1;
				break;
				
			default:
				break;
		}
	}
	return matrix;
}

function submit(){
	document.getElementById('debug').value  = outputBox.value = "";
	cells.splice(0, cells.length);
	code = textArea.value;
	defineCells(cells, getCellLength(code));
	execute(cells, code);
	document.getElementById('debug').value += "Debugging" + "\n\n[" + cells + "]";
}