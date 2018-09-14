'use strict';
import { Board } from './board.js'

let game = undefined;

//Date: 09/06/2018
//Version 1, Author: Jielong Cong

//Date: 09/07/2018
//Version 2, Author: Jason Purinton

//Date: 09/07/2018
//Version 3, Author: Jielong Cong

export function checkMinesInput() {
    let lengthField = document.getElementById("boardLength");
    let heightField = document.getElementById("boardHeight");
    let minesField = document.getElementById("minesInput");

    if (lengthField.validity.valid == true && heightField.validity.valid == true) {
        minesField.max = (lengthField.value * heightField.value) - 1;
        minesField.readOnly = false;
    }
    else {
        minesField.readOnly = true;
    }
}

export function boardGen() {
	let lengthField = document.getElementById("boardLength");
	let heightField = document.getElementById("boardHeight");
	let minesField = document.getElementById("minesInput");
    

	if (lengthField.validity.valid == true && heightField.validity.valid == true && minesField.validity.valid == true) {
		let length = lengthField.value;
		let height = heightField.value;
		let mines = minesField.value;
        
        game = new Board(mines, height, length);
        game.plantMine();
        game.plantAdjNum();

		document.getElementById("gameBoard").innerHTML = "";

		for (let i = 0; i < height; i++) {
			let row = document.createElement("tr");
			for (let j = 0; j < length; j++) {
				let tileID = (i * length) + j;
				let cell = document.createElement("td");
				cell.setAttribute("id", tileID);
				cell.setAttribute("oncontextmenu", "return false;");
				row.appendChild(cell);
			}
			document.getElementById("gameBoard").appendChild(row);
		}


		document.getElementById("status").hidden = false;
		document.getElementById("startButton").setAttribute("class", "btn btn-danger btn-lg btn-block");
		document.getElementById("startButton").innerHTML = "Restart";
		document.getElementById("flagsPlaced").innerHTML = 0;
		document.getElementById("minesOnBoard").innerHTML = mines;
	}
	else {
		window.alert("One or more of your input fields is invalid. Please check your inputs and try again.");
	}
}

export function leftClick() {
	let clicked = event.target;
	let cellID = Number(clicked.getAttribute("id"));
	let flags = document.getElementById("flagsPlaced").innerHTML;
	if (game.loser || game.winner) {
		window.alert("The game is over! Care to try again?");
		return;
	}
	
	//[row, column]
	let coord = [Math.floor(cellID / game.columns), (cellID % game.columns)];
	if (game.isTileRevealed(coord[0], coord[1]) == false)  {
		game.clickReveal(coord[0], coord[1]);
	}
	else {
		return;
	}
	
	if (game.loser == true) {
		game.showAllMine();
		for (let i = 0; i < game.rows; i++) {
			for (let j = 0; j < game.columns; j++) {
				let cID = (i * game.columns) + j;
				if (game.getTileAdj(i, j) == 9) {
					document.getElementById(cID).innerHTML = "X";
				}
				clicked.setAttribute("style", "color: red;");
			}
		}
		window.alert("KABLOOEY! Game over! Care to try again?");
	}
	else if (game.getTileAdj(coord[0], coord[1]) >= 1 && game.getTileAdj(coord[0], coord[1]) <= 8) {
		clicked.innerHTML = game.getTileAdj(coord[0], coord[1]);
	}
	//This part doesn't quite work yet, need to figure out the problem here
	else {
		for (let i = 0; i < game.rows; i++) {
			for (let j = 0; j < game.columns; j++) {
				let cID = (i * game.columns) + j;
				if (game.isTileRevealed(i, j)) {
					document.getElementById(cID).innerHTML = game.getTileAdj(i, j);
					if (game.getTileAdj(i, j) == 0) {
						document.getElementById(cID).innerHTML = "0";
						document.getElementById(cID).setAttribute("style", "backround-color: gainsboro;");
					}
				}
			}
		}
	}
}

export function rightClick() {
	let clicked = event.target;
	let cellID = Number(clicked.getAttribute("id"));
	let flags = document.getElementById("flagsPlaced").innerHTML;
	if (game.loser || game.winner) {
		window.alert("The game is over! Care to try again?");
		return;
	}
	
	//[row, column]
	let coord = [Math.floor(cellID / game.columns), (cellID % game.columns)];
	let flagTile = game.setFlag(coord[0], coord[1]);
	
	if (flagTile) {
		clicked.innerHTML = "&#9873;";
		flags++;
	}
	else {
		clicked.innerHTML = "";
		flags--;
	}
	
	document.getElementById("flagsPlaced").innerHTML = flags;
}