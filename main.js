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
//It will change all the tile's revealed = true, who have number 0. 
//Even the tile set with flagged.
//parameter:  Array, Game, row(i), column(j), counter.

//This counter help to figure it was click by player or it revealed auto.
//If the counter is equal to 0, it means it was click by player.
//If the counter is bigger than 0, it means it was auto click.
//need to define in the main function and make it equal to 0 after each click event.

function clickReveal(Array, Game, i, j, counter)
{
    if (Array[i][j].isMine == true && counter == 0)
    {
        Array[i][j].revealed = true;
                Game.isLose = true;             //If the click by player and it was a bombo, the game is over.
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
        }
    }
}