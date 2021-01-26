const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//class for field

class Field {
  constructor(field, typeOfField){
    this._field = field;
    this._typeOfField = typeOfField;
  }

  //generate a field
  static createField(width, height, holes){
    let newField = [];

    //create a 2d array
    for (let i = 0; i < height; i++) {
      newField[i] = [];
        for (let j = 0; j < width; j++) {
        newField[i][j] = fieldCharacter;
      }
    }

    //starting location
    newField[0][0] = pathCharacter;

    //hat location
    let hatX = 0;
    let hatY = 0;
    while (hatX === 0 && hatY === 0) {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    }
    newField[hatY][hatX] = hat;

    //hole locations
    for (let h = holes; h > 0; h--) {
      let holeX = Math.floor(Math.random() * width);
      let holeY = Math.floor(Math.random() * height);
      if (holeX === 0 && holeY === 0){
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      } else if (holeX === hatX && holeY === hatY) {
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      };
      newField[holeY][holeX] = hole;
    } 
    return newField;
  }

  //play game function
  playGame() {
    let x = 0;
    let y = 0;
    console.log(this._field);

    while (this._typeOfField[y][x] === pathCharacter || this._typeOfField[y][x] === fieldCharacter) {
      const direction = prompt('Where would you like to go? Enter N for North, S for  South, E for East, or W for West.');
    
      if (direction.toUpperCase() === 'N') {
        if (y === 0) {
          console.log('You cannot go further North. Please choose another direction');
        } else {
          y -=1;
        }
      } else if (direction.toUpperCase() === 'S') {
        if (y >= this._field.length - 1) {
          console.log('You cannot move any further South. Please choose another direction')
        } else {
          y +=1
        }
      } else if (direction.toUpperCase() === 'W') {
        if (x === 0) {
          console.log('You cannot move any further West. Please choose another direction')
        } else {
          x -= 1
        }
      } else if (direction.toUpperCase() === 'E') {
        if (x >= this._field[x].length - 1) {
          console.log('You cannot move any further East. Please choose another direction')
        } else {
          x += 1
      } 
  
    }

      //win or lose parameters
      if (this._typeOfField[y][x] === hat) {
        console.log('You found the hat! You win!')
        break; //ends the code
      } else if (this._typeOfField[y][x] === hole) {
        console.log('You fell in a hole. Game Over')
        break; //ends the code
      } else {
        this._field[y][x] = pathCharacter; //shows your location on the map
        console.log(this._field);
      }
    } 
  }
}

let testField = Field.createField(5, 10, 5);
const myField = new Field(testField, testField);
myField.playGame();