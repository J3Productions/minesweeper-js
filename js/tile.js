'use strict';
//An Object Constructor of Tile, the element inside a board.

export class Tile {
	constructor(isMine, adjNum) {
		this.isMine = isMine;
		this.adjNum = adjNum;
		this.flagged = false;
		this.revealed = false;
	}
	
	getMine() {
		return this.isMine;
	}
	getAdjacent() {
		return this.adjNum;
	}
	getFlagged() {
		return this.flagged;
	}
	getRevealed() {
		return this.revealed;
	}
	
	flag() {
		if (this.flagged) {
			this.flagged = false;
		}
		else {
			this.flagged = true;
		}
	}
	reveal() {
		this.revealed = true;
	}
	
}