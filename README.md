# Minesweeper-js

EECS 448 Project 1: Minesweeper - Written in Javascript and HTML

To play the game, enter a number between 2 and 45 for the dimensions of your Minesweeper board, and then enter how many mines you want on the board (between 1 and 1 less than the total number of tiles on the board) and click "Start". Then, to reveal a space, left-click on it. To flag a space, right-click on it (and right-click again to un-flag it). Once all the mines have been flagged, you win the game. But if you reveal a mine, the game is over. You may change the board dimensions and mine count at any time and click "Restart" to start a new game.

### [Play the Game](https://j3productions.github.io/minesweeper-js)

## Authors

**[J3 Productions](https://github.com/J3Productions)** - [Jielong Cong](https://github.com/JielongCong), [Jacob Parnell](https://github.com/jake-penguins), [Jason Purinton](https://github.com/JasonPurinton)

#### [Team Log and Retrospective](https://j3productions.github.io/minesweeper-js/documentation/j3-meeting-log-retrospective.docx)

## Codebase Structure

* [main.js](https://j3productions.github.io/minesweeper-js/documentation/function) - The only class file that interacts with index.html. Contains methods for form input processing, generating a board, and for left and right clicks. Interfaces only with Board object.
* [board.js](https://j3productions.github.io/minesweeper-js/documentation/class/js/board.js~Board.html) - The class file that stores all game board methods and variables. Responsible for creating the board, planting the mines and adjacent numbers, and revealing/flagging tiles. Interfaces with Tile object.
* [tile.js](https://j3productions.github.io/minesweeper-js/documentation/class/js/tile.js~Tile.html) - The class file that stores info for one tile of the game board. Stores adjacent number info, status as a mine and whether it has been flagged and/or revealed or not. Interfaces with no other class.

## Works Cited

- [Bootstrap 4.1.3](http://getbootstrap.com/) Front-end framework used to create web interface. `index.html:13, 119`
- [ESDoc 1.1.0](https://esdoc.org/) Documentation software used.
- [HTML5 Boilerplate 6.1.0](https://html5boilerplate.com/) Basic front-end template used to create index.html and main.css (also includes plugins.js). `index.html; css/main.css; js/plugins.js`
- [jQuery 3.3.1](https://jquery.com/) Javascript library, required by Bootstrap. `index.html:117, 120; js/vendor/jquery-3.3.1.min.js`
- [Modernizr 3.6.0](https://modernizr.com/) Javascript library to optimize web interface, included as part of HTML5 Boilerplate. `index.html:116; js/vendor/modernizr-3.6.0.min.js`
- [Normalize.css 8.0.0](https://necolas.github.io/normalize.css/) CSS file to render web interface consistently across all devices, included as part of HTML5 Boilerplate. `index.html:14; css/normalize.css`
- [Popper.js 1.14.3](https://popper.js.org/) Javascript library required for popovers in Bootstrap. `index.html:118`
