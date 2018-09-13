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

		/** Variable to keep track of mines left that haven't been flagged.
		*@type {number}*/
		this.minesNotFlagged = numMines;

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
	* This function change one tile's flagged status.
	* @param {number} row Row of tile being flagged.
	* @param {number} column Column of tile being flagged.
	*/
	setFlag(row, column) {
		if(this.arr[row][column].flagged== false && this.arr[row][column].getRevealed()== false)
		{
		this.arr[row][column].flagged= true;
		/**
		*@desc decrease how many mines are left without a flag.
		*/
		if(this.arr[row][column].isMine == true)
			this.minesNotFlagged == this.minesNotFlagged - 1;
		}
		//If they already have flagged and want to remove the flag.
		else if(this.arr[row][column].flagged== true && this.arr[row][column].getRevealed()== false)
		{
			this.arr[row][column].flagged== false;//Remove flag
			/**
			*@desc decrease how many mines are left without a flag.
			*/
			if(this.arr[row][column].isMine == true)
				this.minesNotFlagged == this.minesNotFlagged + 1;
		}
	}

	/**
	* This is a recursive function. It will execute any one of block on the block been clicked. It will change all the tile's revealed = true, who have number 0. Even the tile set with flagged.
	* @param {number} i Row property of tile being revealed.
	* @param {number} j Column property of tile being revealed.
	*/
	clickReveal(i, j) {
		if (this.arr[i][j].getMine() == true) {
			this.arr[i][j].revealed = true;
			this.loser = true;             //If the click by player and it was a bomb, the game is over.
		}
		else {

			if (this.arr[i][j].adjNum > 0 && this.arr[i][j].adjNum < 9) {
				if (this.arr[i][j].revealed == false) {
					this.arr[i][j].revealed = true;
					this.arr[i][j].flagged = false;
				}
			}
			else if (this.arr[i][j].adjNum == 0) {
				if (this.arr[i][j].revealed == false) {
					this.arr[i][j].revealed = true;
					this.arr[i][j].flagged = false;

					if ((i - 1) > 0 && (j - 1) > 0 && (i + 1) < this.arr.length && (j + 1) < this.arr[i].length) {
						//Upper left block check.
						if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
							clickReveal((i - 1), (j - 1));
						}
						else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
							this.arr[(i - 1)][(j - 1)].revealed = true;
							this.arr[(i - 1)][(j - 1)].flagged = false;
						}
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//Upper right block check.
						if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
							clickReveal((i - 1), (j + 1));
						}
						else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
							this.arr[(i - 1)][(j + 1)].revealed = true;
							this.arr[(i - 1)][(j + 1)].flagged = false;
						}
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
						//Lower left block check.
						if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
							clickReveal((i + 1), (j - 1));
						}
						else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
							this.arr[(i + 1)][(j - 1)].revealed = true;
							this.arr[(i + 1)][(j - 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {
							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
						//Lower right block check.
						if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
							clickReveal((i + 1), (j + 1));
						}
						else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
							this.arr[(i + 1)][(j + 1)].revealed = true;
							this.arr[(i + 1)][(j + 1)].flagged = false;
						}
					}
						//check speical left column without two corner blocks							//fixed
					else if (i > 0 && i < this.arr.length - 1 && j == 0) {
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//Upper right block check.
						if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
							clickReveal((i - 1), (j + 1));
						}
						else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
							this.arr[(i - 1)][(j + 1)].revealed = true;
							this.arr[(i - 1)][(j + 1)].flagged = false;
						}
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {
							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
						//Lower right block check.
						if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
							clickReveal((i + 1), (j + 1));
						}
					}
						//check speical Lower row
					else if (i == this.arr.length - 1 && j > 0 && j < this.arr[i].length - 1) 		//fixed
					{
						//Upper left block check.
						if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
							clickReveal((i - 1), (j - 1));
						}
						else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
							this.arr[(i - 1)][(j - 1)].revealed = true;
							this.arr[(i - 1)][(j - 1)].flagged = false;
						}
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//Upper right block check.
						if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
							clickReveal((i - 1), (j + 1));
						}
						else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
							this.arr[(i - 1)][(j + 1)].revealed = true;
							this.arr[(i - 1)][(j + 1)].flagged = false;
						}
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
					}
						//check speical right column
					else if (i > 0 && i < this.arr.length - 1 && j == this.arr[i].length - 1) 			//fixed
					{
						//Upper left block check.
						if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
							clickReveal((i - 1), (j - 1));
						}
						else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
							this.arr[(i - 1)][(j - 1)].revealed = true;
							this.arr[(i - 1)][(j - 1)].flagged = false;
						}
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
						//Lower left block check.
						if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
							clickReveal((i + 1), (j - 1));
						}
						else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
							this.arr[(i + 1)][(j - 1)].revealed = true;
							this.arr[(i + 1)][(j - 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {

							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
					}
						//check speical Upper row												//fixed
					else if (i == 0 && j > 0 && j < this.arr[i].length - 1) {
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
						//Lower left block check.
						if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
							clickReveal((i + 1), (j - 1));
						}
						else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
							this.arr[(i + 1)][(j - 1)].revealed = true;
							this.arr[(i + 1)][(j - 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {
							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
						//Lower right block check.
						if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
							clickReveal((i + 1), (j + 1));
						}
						else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
							this.arr[(i + 1)][(j + 1)].revealed = true;
							this.arr[(i + 1)][(j + 1)].flagged = false;
						}
					}
						//Upper left corner
					else if (i == 0 && j == 0) {
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {
							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
						//Lower right block check.
						if (this.arr[(i + 1)][(j + 1)].adjNum == 0) {
							clickReveal((i + 1), (j + 1));
						}
						else if (this.arr[(i + 1)][(j + 1)].adjNum < 9 && this.arr[(i + 1)][(j + 1)].revealed == false) {
							this.arr[(i + 1)][(j + 1)].revealed = true;
							this.arr[(i + 1)][(j + 1)].flagged = false;
						}
					}
						//Upper right corner
					else if (i == 0 && j == this.arr[i].length - 1) {
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
						//Lower left block check.
						if (this.arr[(i + 1)][(j - 1)].adjNum == 0) {
							clickReveal((i + 1), (j - 1));
						}
						else if (this.arr[(i + 1)][(j - 1)].adjNum < 9 && this.arr[(i + 1)][(j - 1)].revealed == false) {
							this.arr[(i + 1)][(j - 1)].revealed = true;
							this.arr[(i + 1)][(j - 1)].flagged = false;
						}
						//Lower block check.
						if (this.arr[(i + 1)][j].adjNum == 0) {
							clickReveal((i + 1), j);
						}
						else if (this.arr[(i + 1)][j].adjNum < 9 && this.arr[(i + 1)][j].revealed == false) {
							this.arr[(i + 1)][j].revealed = true;
							this.arr[(i + 1)][j].flagged = false;
						}
					}
						//Lower left corner
					else if (i == this.arr.length - 1 && j == 0) {
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//Upper right block check.
						if (this.arr[(i - 1)][(j + 1)].adjNum == 0) {
							clickReveal((i - 1), (j + 1));
						}
						else if (this.arr[(i - 1)][(j + 1)].adjNum < 9 && this.arr[(i - 1)][(j + 1)].revealed == false) {
							this.arr[(i - 1)][(j + 1)].revealed = true;
							this.arr[(i - 1)][(j + 1)].flagged = false;
						}
						//Right block check.
						if (this.arr[i][(j + 1)].adjNum == 0) {
							clickReveal(i, (j + 1));
						}
						else if (this.arr[i][(j + 1)].adjNum < 9 && this.arr[i][(j + 1)].revealed == false) {
							this.arr[i][(j + 1)].revealed = true;
							this.arr[i][(j + 1)].flagged = false;
						}
					}
						//Lower right corner
					else if (i == this.arr.length - 1 && j == this.arr[i].length - 1) {
						//Upper left block check.
						if (this.arr[(i - 1)][(j - 1)].adjNum == 0) {
							clickReveal((i - 1), (j - 1));
						}
						else if (this.arr[(i - 1)][(j - 1)].adjNum < 9 && this.arr[(i - 1)][(j - 1)].revealed == false) {
							this.arr[(i - 1)][(j - 1)].revealed = true;
							this.arr[(i - 1)][(j - 1)].flagged = false;
						}
						//Upper block check.
						if (this.arr[(i - 1)][j].adjNum == 0) {
							clickReveal((i - 1), j);
						}
						else if (this.arr[(i - 1)][j].adjNum < 9 && this.arr[(i - 1)][j].revealed == false) {
							this.arr[(i - 1)][j].revealed = true;
							this.arr[(i - 1)][j].flagged = false;
						}
						//left block check.
						if (this.arr[i][(j - 1)].adjNum == 0) {
							clickReveal(i, (j - 1));
						}
						else if (this.arr[i][(j - 1)].adjNum < 9 && this.arr[i][(j - 1)].revealed == false) {
							this.arr[i][(j - 1)].revealed = true;
							this.arr[i][(j - 1)].flagged = false;
						}
					}
				}
			}
		}
	}

	/**
	* This function show all mines, even the game is win or lose.
	*/
	showAllMine() {

	}
}
