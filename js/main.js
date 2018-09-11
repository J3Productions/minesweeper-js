//Date: 09/06/2018
//Version 1, Author: Jielong Cong

//Date: 09/07/2018
//Version 2, Author: Jason Purinton

//Date: 09/07/2018
//Version 3, Author: Jielong Cong



//An Object Constructor of Tile, the element inside a board.
function Tile(isMine, adjNum, flagged, revealed)
{
    this.isMine = isMine;           //bool
    this.adjNum = adjNum;           //int
    this.flagged = flagged;         //bool
    this.revealed = revealed;       //bool
}


//An Object that record the status of the game.
var Game = {isWin: false, isLose: false};


//This function create an Array, whcih size is based on user input.
//Parameter: rows, columns.
function createBoard(rows, columns)  //all int type.
{
    var Array = new Array(rows); //Fixed size 2d array from user input parameters
    for(var i = 0; i<rows; i++)
    {
        Array[i]= new Array(columns);
        for(var j = 0; i<columns; i++)
        {
            Array[i][j] = new Tile(false, 0,false,false); /*****TODO  LOOK AT ARRAY, TILE ADD HERE?*What do you think  place the tile as we build the array?*/
        }
    }
    return Array
}

function boardGen() {
	'use strict';
	let lengthField = document.getElementById("boardLength");
	let heightField = document.getElementById("boardHeight");
	let minesField = document.getElementById("minesInput");

	if (lengthField.validity.valid == true && heightField.validity.valid == true && minesField.validity.valid == true) {
		let length = lengthField.value;
		let height = heightField.value;
		let numMines = minesField.value;
		
		document.getElementById("gameBoard").innerHTML = "";
		
		for (let i = 0; i < height; i++) {
			let row = document.createElement("tr");
			for (let j = 0; j < length; j++) {
				let cell = document.createElement("td");
				cell.setAttribute("data-x", j);
				cell.setAttribute("data-y", i);
				row.appendChild(cell);
			}
			document.getElementById("gameBoard").appendChild(row);
		}
		
		createBoard(length, height);
		
		document.getElementById("status").hidden = false;
		document.getElementById("startButton").setAttribute("class", "btn btn-danger btn-lg btn-block");
		document.getElementById("startButton").innerHTML = "Restart";
		document.getElementById("flagsPlaced").innerHTML = 0;
		document.getElementById("minesOnBoard").innerHTML = numMines;
	}
	else {
		window.alert("One or more of your input fields is invalid. Please check your inputs and try again.");
	}
	
	
}


//This function plant the Mines inside the Array.
//The Number of Mines are given by player.
//Using Math.random() to ramdomly plant the Mines.
//parameter: Array, number of Mine.
function plantMine(Array, MineNums)
{

}



//This function change each tile's adjNum.
//parameter: Array.
function plantAdjNum(Array)
{

}


//This function change one tile's falgged.
//parameter: Array, row, column.
function setFlag(Array, row, column)
{

}


//The is a recursive function.
//It will execute any one of block on the block been clicked.
//It will change all the tile's revealed = true, who have number 0.
//Even the tile set with flagged.
//parameter:  Array, Game, row(i), column(j).

function clickReveal(Array, Game, i, j)
{
    if (Array[i][j].isMine == true)
    {
        Array[i][j].revealed = true;
                Game.isLose = true;             //If the click by player and it was a bomb, the game is over.
    }
    else
    {
        if (Array[i][j].revealed == false)
        {
            Array[i][j].revealed = true;
            Array[i][j].flagged = false;

            if ((i - 1) > 0 && (j - 1) > 0 && (i + 1) < Array.length && (j + 1) < Array[i].length)
            {
                //Upper left block check.
                if (Array[(i - 1)][(j - 1)].adjNum == 0)
                {
                    clickReveal(Array, Game, (i - 1), (j - 1));
                }
                //Upper block check.
                else if (Array[(i - 1)][j].adjNum == 0)
                {
                    clickReveal(Array, Game, (i - 1), j);
                }
                //Upper right block check.
                else if (Array[(i - 1)][(j + 1)].adjNum == 0)
                {
                     clickReveal(Array, Game, (i - 1), (j + 1));
                }
                //left block check.
                else if (Array[i][(j - 1)].adjNum == 0)
                {
                     clickReveal(Array, Game, i, (j - 1));
                }
                //Right block check.
                else if (Array[i][(j + 1)].adjNum == 0)
                {
                     clickReveal(Array, Game, i, (j + 1));
                }
                //Lower left block check.
                else if (Array[(i + 1)][(j - 1)].adjNum == 0)
                {
                      clickReveal(Array, Game, (i + 1), (j - 1));
                }
                //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0)
                {
                      clickReveal(Array, Game, (i + 1), j);
                }
                //Lower right block check.
                else if (Array[(i + 1)][(j + 1)].adjNum == 0)
                {
                      clickReveal(Array, Game, (i + 1), (j + 1));
                }
            }
            //check speical left column without two corner blocks
            else if ((i - 1) > 0 && (i + 1) < Array.length && j == 0)
            {
                //Upper block check.
                if (Array[(i - 1)][j].adjNum == 0)
                {
                    clickReveal(Array, Game, (i - 1), j);
                }
                //Upper right block check.
                else if (Array[(i - 1)][(j + 1)].adjNum == 0)
                {
                    clickReveal(Array, Game, (i - 1), (j + 1));
                }
                //Right block check.
                else if (Array[i][(j + 1)].adjNum == 0)
                {
                    clickReveal(Array, Game, i, (j + 1));
                }
                //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0)
                {
                    clickReveal(Array, Game, (i + 1), j);
                }
                //Lower right block check.
                else if (Array[(i + 1)][(j + 1)].adjNum == 0)
                {
                    clickReveal(Array, Game, (i + 1), (j + 1));
                }
            }
            //check speical Lower row
            else if (i == Array.length && (j - 1) > 0 && (j + 1) < Array[i].length)
            {
                //Upper left block check.
                if (Array[(i - 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), (j - 1));
                }
                    //Upper block check.
                else if (Array[(i - 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), j);
                }
                    //Upper right block check.
                else if (Array[(i - 1)][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), (j + 1));
                }
                    //left block check.
                else if (Array[i][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j - 1));
                }
                    //Right block check.
                else if (Array[i][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j + 1));
                }
            }
            //check speical right column
            else if ((i - 1) > 0 && (i + 1) < Array.length && j == Array[i].length)
            {
                //Upper left block check.
                if (Array[(i - 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), (j - 1));
                }
                    //Upper block check.
                else if (Array[(i - 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), j);
                }
                    //left block check.
                else if (Array[i][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j - 1));
                }
                    //Lower left block check.
                else if (Array[(i + 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), (j - 1));
                }
                    //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), j);
                }
            }
            //check speical Upper row
            else if (i == 0 && (j - 1) > 0 && (j + 1) < Array[i].length)
            {
                    //left block check.
                if (Array[i][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j - 1));
                }
                    //Right block check.
                else if (Array[i][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j + 1));
                }
                    //Lower left block check.
                else if (Array[(i + 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), (j - 1));
                }
                    //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), j);
                }
                    //Lower right block check.
                else if (Array[(i + 1)][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), (j + 1));
                }
            }
            //Upper left corner
            else if (i == 0 && j == 0)
            {
                    //Right block check.
                if (Array[i][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j + 1));
                }
                    //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), j);
                }
                    //Lower right block check.
                else if (Array[(i + 1)][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), (j + 1));
                }
            }
            //Upper right corner
            else if (i == 0 && j == Array[i].length)
            {
                    //left block check.
                if (Array[i][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j - 1));
                }
                    //Lower left block check.
                else if (Array[(i + 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), (j - 1));
                }
                    //Lower block check.
                else if (Array[(i + 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i + 1), j);
                }
            }
            //Lower left corner
            else if (i == Array.length && j == 0)
            {
                    //Upper block check.
                if (Array[(i - 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), j);
                }
                    //Upper right block check.
                else if (Array[(i - 1)][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), (j + 1));
                }
                    //Right block check.
                else if (Array[i][(j + 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j + 1));
                }
            }
            //Lower right corner
            else if (i == Array.length && j == Array[i].length)
            {
                //Upper left block check.
                if (Array[(i - 1)][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), (j - 1));
                }
                    //Upper block check.
                else if (Array[(i - 1)][j].adjNum == 0) {
                    clickReveal(Array, Game, (i - 1), j);
                }
                    //left block check.
                else if (Array[i][(j - 1)].adjNum == 0) {
                    clickReveal(Array, Game, i, (j - 1));
                }
            }
        }length
    }
}

function checkMinesInput() {
	'use strict';
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
