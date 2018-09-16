'use strict';
/**
 * A class for Tile, the element inside a board.
 */
export class Tile {
	/**
	* Constructor creates a tile that stores whether the tile is a mine or not, the number of mines adjacent to it, and whether the tile has been flagged or not.
	* POSTCONDITION: isMine, adjNum, flagged, and revealed, all now have set values.
	*/
	constructor() {
		/**
		* A mine or not a mine.
     	* @type {boolean}
     	*/
		this.isMine = false;
		/**
		* Number of mines adjacent to the tile.
     	* @type {number}
     	*/
		this.adjNum = 9;
		/**
		* Flag status of the tile.
     	* @type {boolean} 
     	*/
		this.flagged = false;
		/**
		* Revealed status of the tile.
     	* @type {boolean}
     	*/
		this.revealed = false;
	}
	
	/**
	* Gets whether the tile is a mine or not.
	* @return {boolean} isMine
	*/
	getMine() {
		return this.isMine;
	}
	
	/**
	* Gets the number of mines adjacent to the tile.
	* @return {number} adjNum
	*/
	getAdjacent() {
		return this.adjNum;
	}
	
	/**
	* Gets whether the tile has been flagged or not.
	* @return {boolean} flagged
	*/
	getFlagged() {
		return this.flagged;
	}
	
	/**
	* Gets whether the tile has been revealed or not.
	* @return {boolean} flagged
	*/
	getRevealed() {
		return this.revealed;
	}
	
	/**
	* Sets the tile's status to be a mine.
	* POSTCONDITION: isMine is true.
	*/
	setMine() {
		this.isMine = true;
	}
	
	/**
	* Sets the number of mines adjacent to the tile.
	* POSTCONDITION: adjNum could be anywhere from 0 to 8
	* @param {number} adj Number of mine adjacent to this tile, retrieved from plantAdjNum()
	*/
	setAdjacent(adj) {
		this.adjNum = adj;
	}
	
	/**
	* Reverses the flag status of the tile. If it has been flagged, set to false. If it has not, set to true.
	* POSTCONDTION: flagged is inverted
	*/
	flag() {
		if (this.flagged) {
			this.flagged = false;
		}
		else {
			this.flagged = true;
		}
	}
	
	/**
	* Reveals the tile, setting revealed to true.
	* POSTCONDTION: revealed is true.
	*/
	reveal() {
		this.revealed = true;
	}
	
}