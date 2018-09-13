'use strict';
import { Tile } from './tile.js';

/**
 * Board class, which stores the game board and all related methods
 * @implements {Tile}
 */
export class Board {
	/**
	* Constructor creates a board, setting all necessary variables and creating a 2D array to store the tiles based on user input.
	* @param {number} numMines Number of mines on the board.
	* @param {number} rows Number of rows (height) on the board.
	* @param {number} columns Number of columns (length) on the board.
	*/
	constructor(numMines, rows, columns) {
		/** Number of rows (height) on the board. Range: 2-50
		* @type {number} */
		this.rows = rows;
		
		/** Number of columns (length) on the board. Range: 2-50
		* @type {number} */
		this.columns = columns;
		
		/** Number of mines on the board. Range: 1-2499 (Depending on board size)
		* @type {number} */
		this.minesTotal = numMines;
		
		/** 2D array storing all tile objects on the board.
		* @type {Tile[]} */
		this.arr = [];
		
		/** Number of mines that the user has flagged. Must be equal to minesTotal to win the game.
		* @type {number} */
		this.minesFlagged = 0;
		
		/** Flag that indicates if the player has won the game.
		* @type {boolean} */
		this.winner = false;
		
		/** Flag that indicates if the player has lost the game.
		* @type {boolean} */
		this.loser = false;
		
		for(let i = 0; i<rows; i++)
		{
			arr[i]= [];
			for(let j = 0; j<columns; j++)
			{
				arr[i][j] = new Tile();// Adding default tiles
			}
		}
	}
	
	plantMine() {
		let numMines = this.minesTotal;
		while(numMines> 0)
		{
			let i= Math.floor(Math.random() * this.rows); // Assign random i no larger than numRows
			let j= Math.floor(Math.random() * this.columns);// Assign random j no larger than numColumns
			if(arr[i][j].isMine== false)
			{
				arr[i][j].isMine= true; // Reassign mine to equal true
				numMines= numMines- 1;
			}
		}
	}
}

/*

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
            if(arr[i][j].isMine == false)
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
                else if(i > 0 &&  j == arr[i].length - 1 && i < arr.length - 1)
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
                else if(i == arr.length - 1 && j == arr[i].length - 1)
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
                else if(i == arr.length - 1 && j > 0 && j < arr[i].length - 1)
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
                else if(i == arr.length - 1 && j == 0)
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
                else if(i > 0 && j == 0 && i < arr.length - 1)
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
                else if (i > 0 && j > 0 && i < arr.length - 1 && j < arr[i].length - 1)
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
*/