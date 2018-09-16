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
        this.rows = Number(rows);

        /** Number of columns (length) on the board. Range: 2-50
		* @type {number} */
        this.columns = Number(columns);

        /** Number of mines on the board. Range: 1-2499 (Depending on board size)
		* @type {number} */
        this.minesTotal = Number(numMines);

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

        /** Variable to keep track of mines left that haven't been flagged.
		*@type {number}*/
        this.minesNotFlagged = numMines;

        /** Variable to keep track of  number of  flags.
		*@type {number}*/
        this.numFlags = this.minesTotal;

        /** Variable to keep track of tiles without a mine in it.
		*@type {number}*/
        this.noMineTiles = ((rows * columns) - numMines);

        for(let i = 0; i<rows; i++)
        {
            this.arr[i]= [];
            for(let j = 0; j<columns; j++)
            {
                this.arr[i][j] = new Tile();// Adding default tiles
            }
        }
    }

    /**
	* This function plant the Mines inside the arr. The Number of Mines are given by player. Using Math.random() to ramdomly plant the Mines.
	*/
    plantMine() {
        let numMines = this.minesTotal;
        while(numMines> 0)
        {
            let i= Math.floor(Math.random() * this.rows); // Assign random i no larger than numRows
            let j= Math.floor(Math.random() * this.columns);// Assign random j no larger than numColumns
            if(this.arr[i][j].getMine()== false)
            {
                this.arr[i][j].setMine(true); // Reassign mine to equal true
                numMines= numMines- 1;
            }
        }
    }

    /**
	* This function change each tile's adjNum.
	*/
    plantAdjNum() {
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.columns; j++)
            {
                if(this.arr[i][j].getMine() == false)
                {
                    let tempAdjNum= 0;
                    //"if, elseif" tiles on the edge of the board so we don't search outside the board. Starting top left and moving clockwise.

                    //Top left tile
                    if (i == 0 && j == 0)
                    {
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //TopRow && 0<column<this.arr[j].length-1
                    else if( i == 0 && j > 0 && j < this.arr[i].length - 1)
                    {
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Top Right tile
                    else if ( i == 0 && j == this.arr[i].length -1)
                    {
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Right column 0<i<this.arr[j].length-1
                    else if(i > 0 &&  j == this.arr[i].length - 1 && i < this.arr.length - 1)
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Bottom right tile
                    else if(i == this.arr.length - 1 && j == this.arr[i].length - 1)
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Bottom row 0<j<this.arr[i].length-1
                    else if(i == this.arr.length - 1 && j > 0 && j < this.arr[i].length - 1)
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Bottom left tile
                    else if(i == this.arr.length - 1 && j == 0)
                    {
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Left column 0<i<this.arr[j].length
                    else if(i > 0 && j == 0 && i < this.arr.length - 1)
                    {
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                        //Every tile inside of the outer rows and columns
                    else if (i > 0 && j > 0 && i < this.arr.length - 1 && j < this.arr[i].length - 1)
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].getMine() == true)
                        {
                            tempAdjNum= tempAdjNum+ 1;
                        }
                    }
                    this.arr[i][j].setAdjacent(tempAdjNum);
                }
            }
        }
    }

    /**
	* This function changes one tile's flagged status, changes the number of flags and sets winner to true if all flags have been placed on all mines.
	* @param {number} row Row of tile being flagged.
	* @param {number} column Column of tile being flagged.
	* @return {boolean|null} The status of the tile - true for flagged, false for not flagged, null if nothing can be done
	*/
    setFlag(row, column) {
		//Executes if tile is not currently flagged, revealed, and there are enough flags to place
        if(this.arr[row][column].flagged== false && this.arr[row][column].getRevealed()== false && this.numFlags > 0)
        {
            this.arr[row][column].flagged= true;
            this.numFlags = this.numFlags -1;
            /**
            *@desc decrease how many mines are left without a flag.
            */
            if(this.arr[row][column].isMine == true)
                this.minesNotFlagged = this.minesNotFlagged - 1;

            if(this.minesNotFlagged == 0 && this.numFlags == 0)
            this.winner = true;//Check if all mines are flagged

			return true;
        }
        //Executes if they already have flagged and want to remove the flag.
        else if(this.arr[row][column].flagged== true && this.arr[row][column].getRevealed()== false)
        {
            this.arr[row][column].flagged= false;//Remove flag
            this.numFlags = this.numFlags + 1;
            /**
			*@desc increase how many mines are left without a flag if player removes flag from a mine.
			*/
            if(this.arr[row][column].isMine == true)
                this.minesNotFlagged = this.minesNotFlagged + 1;

            if(this.minesNotFlagged == 0 && this.numFlags == 0)
            this.winner = true;//Check if all mines are flagged

			return false;
        }
		//Executes if all the flags have been used or the tile has already been revealed
		else {
			return null;
		}
    }

    /*
    *When the status of the game is Win or Lose, call this function to reveal all the blocks.
    */
    showAllMine() {
        for (var i = 0; i < this.arr.length; i++) {
            for (var j = 0; j < this.arr[i].length; j++) {
                this.arr[i][j].revealed = true;
            }
        }
    }

    /**
	* This is a recursive function. It will execute any one of block on the block been clicked. It will change all the tile's revealed = true, who have number 0. Even the tile set with flagged.
	* @param {number} i Row property of tile being revealed.
	* @param {number} j Column property of tile being revealed.
	*/
    clickReveal(i, j) {

        let self = this;

        if (this.arr[i][j].getMine() == true) {
            this.arr[i][j].revealed = true;
            this.loser = true;             //If the click by player and it was a bomb, the game is over.
        }
        else {
			if (this.arr[i][j].flagged == true) {
				this.setFlag(i, j);
			}
			
            if (this.arr[i][j].adjNum > 0 && this.arr[i][j].adjNum < 9) {
                if (this.arr[i][j].revealed == false) {
                    if(this.arr[i][j].flagged == true)
                    {
                        this.setFlag(i, j);
                    }
                    this.arr[i][j].revealed = true;
                }
            }
            else if (this.arr[i][j].adjNum == 0) {
                if (this.arr[i][j].revealed == false) {
                    if(this.arr[i][j].flagged == true)
                    {
                        this.setFlag(i, j);
                    }
                    this.arr[i][j].revealed = true;

                    if (i > 0 && j > 0 && i < this.arr.length - 1 && j < this.arr[i].length - 1) {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j - 1));
                        }
                        else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j - 1));
                            }

                            this.arr[(i - 1)][(j - 1)].revealed = true;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j + 1));
                        }
                        else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j + 1));
                            }
                            
                            this.arr[(i - 1)][(j + 1)].revealed = true;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j - 1));
                        }
                        else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j - 1));
                            }
                            
                            this.arr[(i + 1)][(j - 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j + 1));
                        }
                        else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j + 1));
                            }
                            
                            this.arr[(i + 1)][(j + 1)].revealed = true;
                        }
                    }
                        //check speical left column without two corner blocks							//fixed
                    else if (i > 0 && i < this.arr.length - 1 && j == 0) {
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j + 1));
                        }
                        else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j + 1));
                            }
                            
                            this.arr[(i - 1)][(j + 1)].revealed = true;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j + 1));
                        }
                        else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j + 1));
                            }
                            
                            this.arr[(i + 1)][(j + 1)].revealed = true;
                        }
                    }
                        //check speical Lower row
                    else if (i == this.arr.length - 1 && j > 0 && j < this.arr[i].length - 1) 		//fixed
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j - 1));
                        }
                        else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j - 1));
                            }

                            this.arr[(i - 1)][(j - 1)].revealed = true;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j + 1));
                        }
                        else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j + 1));
                            }
                            
                            this.arr[(i - 1)][(j + 1)].revealed = true;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                    }
                        //check speical right column
                    else if (i > 0 && i < this.arr.length - 1 && j == this.arr[i].length - 1) 			//fixed
                    {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j - 1));
                        }
                        else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j - 1));
                            }

                            this.arr[(i - 1)][(j - 1)].revealed = true;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j - 1));
                        }
                        else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j - 1));
                            }
                            
                            this.arr[(i + 1)][(j - 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                    }
                        //check speical Upper row												//fixed
                    else if (i == 0 && j > 0 && j < this.arr[i].length - 1) {
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j - 1));
                        }
                        else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j - 1));
                            }
                            
                            this.arr[(i + 1)][(j - 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j + 1));
                        }
                        else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j + 1));
                            }
                            
                            this.arr[(i + 1)][(j + 1)].revealed = true;
                        }
                    }
                        //Upper left corner
                    else if (i == 0 && j == 0) {
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                        //Lower right block check.
                        if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j + 1));
                        }
                        else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j + 1));
                            }
                            
                            this.arr[(i + 1)][(j + 1)].revealed = true;
                        }
                    }
                        //Upper right corner
                    else if (i == 0 && j == this.arr[i].length - 1) {
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                        //Lower left block check.
                        if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i + 1), (j - 1));
                        }
                        else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), (j - 1));
                            }
                            
                            this.arr[(i + 1)][(j - 1)].revealed = true;
                        }
                        //Lower block check.
                        if (this.arr[(i + 1)][j].adjNum == 0) {
                            self.clickReveal((i + 1), j);
                        }
                        else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i + 1), j);
                            }
                            
                            this.arr[(i + 1)][j].revealed = true;
                        }
                    }
                        //Lower left corner
                    else if (i == this.arr.length - 1 && j == 0) {
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //Upper right block check.
                        if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j + 1));
                        }
                        else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j + 1));
                            }
                            
                            this.arr[(i - 1)][(j + 1)].revealed = true;
                        }
                        //Right block check.
                        if (this.arr[i][(j + 1)].adjNum == 0) {
                            self.clickReveal(i, (j + 1));
                        }
                        else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j + 1));
                            }
                            
                            this.arr[i][(j + 1)].revealed = true;
                        }
                    }
                        //Lower right corner
                    else if (i == this.arr.length - 1 && j == this.arr[i].length - 1) {
                        //Upper left block check.
                        if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
                            self.clickReveal((i - 1), (j - 1));
                        }
                        else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), (j - 1));
                            }

                            this.arr[(i - 1)][(j - 1)].revealed = true;
                        }
                        //Upper block check.
                        if (this.arr[(i - 1)][j].adjNum == 0) {
                            self.clickReveal((i - 1), j);
                        }
                        else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag((i - 1), j);
                            }

                            this.arr[(i - 1)][j].revealed = true;
                        }
                        //left block check.
                        if (this.arr[i][(j - 1)].adjNum == 0) {
                            self.clickReveal(i, (j - 1));
                        }
                        else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
                            if(this.arr[i][j].flagged == true)
                            {
                                this.setFlag(i, (j - 1));
                            }
                            
                            this.arr[i][(j - 1)].revealed = true;
                        }
                    }
                }
            }
        }
    }

    isTileRevealed(row, column) {
        //var test = this.arr[row][column].revealed;
		return this.arr[row][column].revealed;
	}

	getTileAdj(row, column) {
		return this.arr[row][column].getAdjacent();
	}
}
