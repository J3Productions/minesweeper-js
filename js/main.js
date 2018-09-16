'use strict';
import { Board } from './board.js'

/**
 * Global game object that Main interfaces with
 * @type {Board}
 */
let game = undefined;

/**
 * Run when length input and height field are changed, enables and disables the number of mines input field based on validity of length and height input field. Checks length and height input fields and checks whether they are valid or not. If they are both valid (non-empty and within the range 2-45), the input field for the number of mines is set to non-read only and the maximum value is set to be equal to the area of the board - 1. If not, the input field for the number of mines is set to read only.
 * PRECONDITION: boardLength and boardHeight have been changed by the user and both are valid inputs.
 * POSTCONDITION: minesInput's readOnly attribute has been set to true or false.
 */
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

/**
 * Run when start/restart button is pressed, generates a game board if input conditions are met. Checks the validitiy of every input field (non-empty and within their respective ranges). If they are all valid, a new {@link Board} object is created and stored in game. The Board then plants the mines and all adjacent numbers calling {@link plantMine} and {@link plantAdjNum}. The game board area is then cleared and a table is created by creating element nodes of type TD, attaching a numeric ID to each one. These are then appended into TR nodes, which are then appended to the TABLE node in index.html. The status display is then unhidden and the start button is changed to a reset button. If all input fields are not valid, display an alert and force the user to try their inputs again.
 * PRECONDITION: startButton has been clicked by the user and boardLength, boardHeight, and minesInput are valid inputs.
 * POSTCONDITION: game is now a Board with mines and adjacent numbers planted, game is represented as a table, startButton is now red and reads Restart, and flags/mines stat bar is now shown.
 */
export function boardGen() {
	let lengthField = document.getElementById("boardLength");
	let heightField = document.getElementById("boardHeight");
	let minesField = document.getElementById("minesInput");
	
	lengthField.setAttribute("class", "form-control");
	heightField.setAttribute("class", "form-control");
	minesField.setAttribute("class", "form-control");
    

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
		if (lengthField.validity.valid == false) {
			lengthField.setAttribute("class", "form-control is-invalid");
		}
		if (heightField.validity.valid == false) {
			heightField.setAttribute("class", "form-control is-invalid");
		}
		if (minesField.validity.valid == false) {
			minesField.setAttribute("class", "form-control is-invalid");
		}
		$(function(){
			$('#validation').modal('show');
		});
	}
}

/**
 * Run when any tile in the game table is clicked, reveals the tile clicked on. Checks if tile clicked on is unrevealed and if the game is still happening. If not, return null. If so, run {@link clickreveal} on the tile, determining its coordinates from the tile's ID. If the tile is a mine, run {@link showAllMine}, display all mines on the board and show the game over display. If the tile is a number not equal to 0, show the number on the clicked tile. If the tile is equal to 0, loop through the whole board looking for revealed tiles and display all revealed tiles.
 * PRECONDITION: A tile on the game board has been left-clicked by the user, the game is still running, the tile clicked on has not yet been revealed
 * POSTCONDITION: The tile clicked on has been revealed, as well as any adjacent tiles if the tile clicked on is a 0
 * @param {Object} clicked The TD object that was clicked, gotten from event.target
 * @return {null} Return null only if the game is over or the tile has already been revealed.
 */
export function leftClick(clicked) {
	let cellID = Number(clicked.getAttribute("id"));
	let flags = document.getElementById("flagsPlaced").innerHTML;
	if (game.loser || game.winner) {
		$(function(){
			$('#reset-game').modal('show');
		});
		return null;
	}
	
	//[row, column]
	let coord = [Math.floor(cellID / game.columns), (cellID % game.columns)];
	if (game.isTileRevealed(coord[0], coord[1]) == false)  {
		game.clickReveal(coord[0], coord[1]);
	}
	else {
		return null;
	}
	
	if (game.loser == true) {
		game.showAllMine();
		clicked.setAttribute("style", "color: red;");
		for (let i = 0; i < game.rows; i++) {
			for (let j = 0; j < game.columns; j++) {
				let cID = (i * game.columns) + j;
				if (game.getTileAdj(i, j) == 9) {
					document.getElementById(cID).innerHTML = "X";
				}
			}
		}
		$(function(){
			$('#game-over').modal('show');
		});
	}
	else if (game.getTileAdj(coord[0], coord[1]) >= 1 && game.getTileAdj(coord[0], coord[1]) <= 8) {
		clicked.setAttribute("style", "color: blue;");
		clicked.innerHTML = game.getTileAdj(coord[0], coord[1]);
	}
	else {
		for (let i = 0; i < game.rows; i++) {
			for (let j = 0; j < game.columns; j++) {
				let cID = (i * game.columns) + j;
				if (game.isTileRevealed(i, j)) {
					if (game.getTileAdj(i, j) == 0) {
						document.getElementById(cID).setAttribute("style", "color: gainsboro;");
						document.getElementById(cID).innerHTML = "0";
					}
					else {
						document.getElementById(cID).setAttribute("style", "color: blue;");
						document.getElementById(cID).innerHTML = game.getTileAdj(i, j);
					}
				}
			}
		}
	}
	
	flags = game.minesTotal - game.numFlags;
	document.getElementById("flagsPlaced").innerHTML = flags;
}

/**
 * Run when any tile in the game table is right-clicked, places or removes a flag on the tile clicked. Checks if if the game is still happening. If not, return null. If so, determine coordinates of the tile clicked using its ID and execute {@link flagTile}. If {@link flagTile} returns true, change the space inside the tile to be a flag. If {@link flagTile} returns false, remove the flag inside the tile. If {@link flagTile} returns null, return null. Then check if the game was won (all flags placed on all mines). If so, show the winner display.
 * PRECONDITION: A tile on the game board has been right-clicked by the user, the game is still running, the tile clicked on has not yet been revealed
 * POSTCONDITION: The tile clicked on has been flagged if not already, the flag is removed if it was already flagged.
 * @param {Object} clicked The TD object that was clicked, gotten from event.target
 * @return {null} Return null only if the game is over or the tile has already been revealed.
 */
export function rightClick(clicked) {
	let cellID = Number(clicked.getAttribute("id"));
	let flags = document.getElementById("flagsPlaced").innerHTML;
	if (game.loser || game.winner) {
		$(function(){
			$('#reset-game').modal('show');
		});
		return null;
	}
	
	//[row, column]
	let coord = [Math.floor(cellID / game.columns), (cellID % game.columns)];
	let flagTile = game.setFlag(coord[0], coord[1]);
	
	if (flagTile == true) {
		clicked.innerHTML = "&#9873;";
	}
	else if (flagTile == false) {
		clicked.innerHTML = "";
	}
	else {
		return null;
	}
	
	flags = game.minesTotal - game.numFlags;
	document.getElementById("flagsPlaced").innerHTML = flags;
	
	if (game.winner == true) {
		$(function(){
			$('#winner').modal('show');
		});
	}
	
}