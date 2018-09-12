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


//An Object that record the status of the game.
var Game = {isWin: false, isLose: false};


//This function create an arr, whcih size is based on user input.
//Parameter: rows, columns.
function createBoard(numMines, rows, columns)  //all int type.
{
    var arr = [rows]; //Fixed size 2d arr from user input parameters
    for(var i = 0; i<rows; i++)
    {
        arr[i]= [];
        for(var j = 0; j<columns; j++)
        {
            arr[i][j] = new Tile(false, 9,false,false);// Adding default tiles
        }
    }
    plantMine(arr, numMines, rows, columns);//Call to plantMine which returns arr with mines planted and numMines inserted.
    return arr;
}

function boardGen() {
	'use strict';
	let lengthField = document.getElementById("boardLength");
	let heightField = document.getElementById("boardHeight");
	let minesField = document.getElementById("minesInput");

	if (lengthField.validity.valid == true && heightField.validity.valid == true && minesField.validity.valid == true) {
		let length = lengthField.value;
		let height = heightField.value;
		let mines = minesField.value;

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

		//createBoard(mines, length, height);

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


//This function plant the Mines inside the arr.
//The Number of Mines are given by player.
//Using Math.random() to ramdomly plant the Mines.
//parameter: arr, number of Mine.
function plantMine(arr, numMines, rows, columns)
{
	'use strict';
    while(numMines> 0)
    {
        let i= Math.floor(Math.random() * rows); // Assign random i no larger than numRows
        let j= Math.floor(Math.random() * columns);// Assign random j no larger than numColumns
        if(arr[i][j].isMine== false)
        {
            arr[i][j].isMine= true; // Reassign mine to equal true
            numMines= numMines- 1;
        }
    }
    plantAdjNum(arr);// Call to assign adjNum in tiles
    return arr;
}



//This function change each tile's adjNum.
//parameter: arr.
function plantAdjNum(arr)
{
	'use strict';
    for (let i = 0; i < arr.length; i++)
    {
        for (let j = 0; j < arr[i].length; j++)
        {
            if(arr[i][j].isMine == true)
            {
                var tempAdjNum= 0;
                //"if, elseif" tiles on the edge of the board so we don't search outside the board. Starting top left and moving clockwise.

                //Top left tile
                if (i == 0 && j == 0)
                {
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //TopRow && 0<column<arr[j].length-1
                else if( i == 0 && j > 0 && j < arr[i].length - 1)
                {
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Top Right tile
                else if ( i == 0 && j == arr[i].length -1)
                {
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Right column 0<i<arr[j].length-1
                else if(i > 0 &&  j == arr[i].length - 1 && i < arr[j].length - 1)
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Bottom right tile
                else if(i == arr[j].length - 1 && j == arr[i].length - 1)
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Bottom row 0<j<arr[i].length-1
                else if(i == arr[j].length - 1 && j > 0 && j < arr[i].length - 1)
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Bottom left tile
                else if(i == arr[j].length - 1 && j == 0)
                {
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Left column 0<i<arr[j].length
                else if(i > 0 && j == 0 && i < arr[j].length - 1)
                {
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                //Every tile inside of the outer rows and columns
                else if (i > 0 && j > 0 && i < arr[j].length - 1 && j < arr[i].length - 1)
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].isMine == true)
                    {
                        tempAdjNum= tempAdjNum+ 1;
                    }
                }
                arr[i][j].adjNum= tempAdjNum;
            }
        }
    }
    return arr;
}


//This function change one tile's falgged.
//parameter: arr, row, column.
function setFlag(arr, row, column)
{
    if(arr[row][column].flagged== false && arr[row][column].revealed== false)
    {
    arr[row][column].flagged= true;
    }
    //If they already have flagged and want to remove the flag.
    else if(arr[row][column].flagged== true && arr[row][column].revealed== false)
    {
        document.getElementById("demo").innerHTML = "What are you doing?  You changed your mind?";
        arr[row][column].flagged== false;//Remove flag
    }
    return arr;
}


//The is a recursive function.
//It will execute any one of block on the block been clicked.
//It will change all the tile's revealed = true, who have number 0.
//Even the tile set with flagged.
//parameter:  arr, Game, row(i), column(j).

//Something in this function is breaking the whole script. For the sake of having a functioning demo on the website, I have commented this out. If it is fixed, feel free to delete this.

function clickReveal(arr, Game, i, j) {
    if (arr[i][j].isMine == true) {
        arr[i][j].revealed = true;
        Game.isLose = true;             //If the click by player and it was a bomb, the game is over.
    }
    else {

        if (arr[i][j].adjNum > 0 && arr[i][j].adjNum < 9) {
            if (arr[i][j].revealed == false) {
                arr[i][j].revealed = true;
                arr[i][j].flagged = false;
            }
        }
        else if (arr[i][j].adjNum == 0) {
            if (arr[i][j].revealed == false) {
                arr[i][j].revealed = true;
                arr[i][j].flagged = false;

                if ((i - 1) > 0 && (j - 1) > 0 && (i + 1) < arr.length && (j + 1) < arr[i].length) {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j - 1));
                    }
                    else if (arr[(i - 1)][(j - 1)].adjNum < 9 && arr[(i - 1)][(j - 1)].revealed == false) {
                        arr[(i - 1)][(j - 1)].revealed = true;
                        arr[(i - 1)][(j - 1)].flagged = false;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j + 1));
                    }
                    else if (arr[(i - 1)][(j + 1)].adjNum < 9 && arr[(i - 1)][(j + 1)].revealed == false) {
                        arr[(i - 1)][(j + 1)].revealed = true;
                        arr[(i - 1)][(j + 1)].flagged = false;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j - 1));
                    }
                    else if (arr[(i + 1)][(j - 1)].adjNum < 9 && arr[(i + 1)][(j - 1)].revealed == false) {
                        arr[(i + 1)][(j - 1)].revealed = true;
                        arr[(i + 1)][(j - 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j + 1));
                    }
                    else if (arr[(i + 1)][(j + 1)].adjNum < 9 && arr[(i + 1)][(j + 1)].revealed == false) {
                        arr[(i + 1)][(j + 1)].revealed = true;
                        arr[(i + 1)][(j + 1)].flagged = false;
                    }
                }
                    //check speical left column without two corner blocks							//fixed
                else if (i > 0 && i < arr.length - 1 && j == 0) {
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j + 1));
                    }
                    else if (arr[(i - 1)][(j + 1)].adjNum < 9 && arr[(i - 1)][(j + 1)].revealed == false) {
                        arr[(i - 1)][(j + 1)].revealed = true;
                        arr[(i - 1)][(j + 1)].flagged = false;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j + 1));
                    }
                }
                    //check speical Lower row
                else if (i == arr.length - 1 && j > 0 && j < arr[i].length - 1) 		//fixed
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j - 1));
                    }
                    else if (arr[(i - 1)][(j - 1)].adjNum < 9 && arr[(i - 1)][(j - 1)].revealed == false) {
                        arr[(i - 1)][(j - 1)].revealed = true;
                        arr[(i - 1)][(j - 1)].flagged = false;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j + 1));
                    }
                    else if (arr[(i - 1)][(j + 1)].adjNum < 9 && arr[(i - 1)][(j + 1)].revealed == false) {
                        arr[(i - 1)][(j + 1)].revealed = true;
                        arr[(i - 1)][(j + 1)].flagged = false;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                }
                    //check speical right column
                else if (i > 0 && i < arr.length - 1 && j == arr[i].length - 1) 			//fixed
                {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j - 1));
                    }
                    else if (arr[(i - 1)][(j - 1)].adjNum < 9 && arr[(i - 1)][(j - 1)].revealed == false) {
                        arr[(i - 1)][(j - 1)].revealed = true;
                        arr[(i - 1)][(j - 1)].flagged = false;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j - 1));
                    }
                    else if (arr[(i + 1)][(j - 1)].adjNum < 9 && arr[(i + 1)][(j - 1)].revealed == false) {
                        arr[(i + 1)][(j - 1)].revealed = true;
                        arr[(i + 1)][(j - 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {

                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                }
                    //check speical Upper row												//fixed
                else if (i == 0 && j > 0 && j < arr[i].length - 1) {
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j - 1));
                    }
                    else if (arr[(i + 1)][(j - 1)].adjNum < 9 && arr[(i + 1)][(j - 1)].revealed == false) {
                        arr[(i + 1)][(j - 1)].revealed = true;
                        arr[(i + 1)][(j - 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j + 1));
                    }
                    else if (arr[(i + 1)][(j + 1)].adjNum < 9 && arr[(i + 1)][(j + 1)].revealed == false) {
                        arr[(i + 1)][(j + 1)].revealed = true;
                        arr[(i + 1)][(j + 1)].flagged = false;
                    }
                }
                    //Upper left corner
                else if (i == 0 && j == 0) {
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                    //Lower right block check.
                    if (arr[(i + 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j + 1));
                    }
                    else if (arr[(i + 1)][(j + 1)].adjNum < 9 && arr[(i + 1)][(j + 1)].revealed == false) {
                        arr[(i + 1)][(j + 1)].revealed = true;
                        arr[(i + 1)][(j + 1)].flagged = false;
                    }
                }
                    //Upper right corner
                else if (i == 0 && j == arr[i].length - 1) {
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                    //Lower left block check.
                    if (arr[(i + 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), (j - 1));
                    }
                    else if (arr[(i + 1)][(j - 1)].adjNum < 9 && arr[(i + 1)][(j - 1)].revealed == false) {
                        arr[(i + 1)][(j - 1)].revealed = true;
                        arr[(i + 1)][(j - 1)].flagged = false;
                    }
                    //Lower block check.
                    if (arr[(i + 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i + 1), j);
                    }
                    else if (arr[(i + 1)][j].adjNum < 9 && arr[(i + 1)][j].revealed == false) {
                        arr[(i + 1)][j].revealed = true;
                        arr[(i + 1)][j].flagged = false;
                    }
                }
                    //Lower left corner
                else if (i == arr.length - 1 && j == 0) {
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //Upper right block check.
                    if (arr[(i - 1)][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j + 1));
                    }
                    else if (arr[(i - 1)][(j + 1)].adjNum < 9 && arr[(i - 1)][(j + 1)].revealed == false) {
                        arr[(i - 1)][(j + 1)].revealed = true;
                        arr[(i - 1)][(j + 1)].flagged = false;
                    }
                    //Right block check.
                    if (arr[i][(j + 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j + 1));
                    }
                    else if (arr[i][(j + 1)].adjNum < 9 && arr[i][(j + 1)].revealed == false) {
                        arr[i][(j + 1)].revealed = true;
                        arr[i][(j + 1)].flagged = false;
                    }
                }
                    //Lower right corner
                else if (i == arr.length - 1 && j == arr[i].length - 1) {
                    //Upper left block check.
                    if (arr[(i - 1)][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), (j - 1));
                    }
                    else if (arr[(i - 1)][(j - 1)].adjNum < 9 && arr[(i - 1)][(j - 1)].revealed == false) {
                        arr[(i - 1)][(j - 1)].revealed = true;
                        arr[(i - 1)][(j - 1)].flagged = false;
                    }
                    //Upper block check.
                    if (arr[(i - 1)][j].adjNum == 0) {
                        clickReveal(arr, Game, (i - 1), j);
                    }
                    else if (arr[(i - 1)][j].adjNum < 9 && arr[(i - 1)][j].revealed == false) {
                        arr[(i - 1)][j].revealed = true;
                        arr[(i - 1)][j].flagged = false;
                    }
                    //left block check.
                    if (arr[i][(j - 1)].adjNum == 0) {
                        clickReveal(arr, Game, i, (j - 1));
                    }
                    else if (arr[i][(j - 1)].adjNum < 9 && arr[i][(j - 1)].revealed == false) {
                        arr[i][(j - 1)].revealed = true;
                        arr[i][(j - 1)].flagged = false;
                    }
                }
            }
        }
    }
}

//This function show all mines, even the game is win or lose.
function showAllMine()
{

}