//Date: 09/06/2018
//Version 1, Author: Jielong Cong



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
//It will return a Array which change the tile's revealed.
//parameter:  Array, Game, row, column
function clickReveal(Array, Game, row, column)
{
    for (var i = 0; i < Array.length; i++)
    {
        var temp = Array[i];
        for (var j = 0; j < temp.length; j++)
        {
            if (temp[j].isMine == true) {
                Game.isLose = true;
                break;                          //need debug is that stop this function or not.
            }
            else
            {
                if (temp[j].revealed == false)
                {
                    temp[j].revealed == true;
                }
            }
        }
    }
}