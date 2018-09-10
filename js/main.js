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
    plantMine(arr, numMines, rows, columns)//Call to plantMine which returns arr with mines planted and numMines inserted.
    return arr;
}


//This function plant the Mines inside the arr.
//The Number of Mines are given by player.
//Using Math.random() to ramdomly plant the Mines.
//parameter: arr, number of Mine.
function plantMine(arr, numMines, rows, columns)
{
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
    let tempAdjNum= 0;
    for (var i = 0; i < arr.length; i++)
    {
        for (var j = 0; j < arr[i].length; j++)
        {
            //Upper left block check.
            if (arr[(i - 1)][(j - 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //Upper block check.
            if (arr[(i - 1)][j].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;;
            }
            //Upper right block check.
            if (arr[(i - 1)][(j + 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //left block check.
            if (arr[i][(j - 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //Right block check.
            if (arr[i][(j + 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //Lower left block check.
            if (arr[(i + 1)][(j - 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //Lower block check.
            if (arr[(i + 1)][j].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            //Lower right block check.
            if (arr[(i + 1)][(j + 1)].isMine == true)
            {
                tempAdjNum= tempAdjNum+ 1;
            }
            arr[i][j].adjNum= tempAdjNum;
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
    //If they already have flagged and want to remove the flag. Ask them first, then allow them to perform the task to removbe flag.
    else if(arr[row][column].flagged== true && arr[row][column].revealed== false)
    {
        document.getElementById("demo").innerHTML = "What are you doing?  Want to change your mind and remove the flag?" + "Click \"y\" for yes";

        arr[row][column].flagged== false;

    }
    return arr;
}


//The is a recursive function.
//It will execute any one of block on the block been clicked.
//It will change all the tile's revealed = true, who have number 0.
//Even the tile set with flagged.
//parameter:  arr, Game, row(i), column(j).

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
                    clickReveal(arr, Game, i, (j - 1));
                }
            }
        }
    }
}
