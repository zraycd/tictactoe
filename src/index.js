import "./style.css";
import Gameboard from "./gameboard";
import handleClick from "./handleClick";

const normalBtn = document.querySelector("#normalBtn");
const ultimateBtn = document.querySelector("#ultimateBtn");
const resetBtn = document.querySelector("#resetBtn");

const normalGame = new Gameboard("normal");
const ultimateGame = new Gameboard("ultimate");

let current;

normalGame.displayBoard();
current = normalGame;

normalBtn.addEventListener("click", () => {
  current = normalGame;
  ultimateGame.hideBoard();
  normalGame.displayBoard();
});

ultimateBtn.addEventListener("click", () => {
  current = ultimateGame;
  normalGame.hideBoard();
  ultimateGame.displayBoard();
});

resetBtn.addEventListener("click", () => {
  current.winner = false;
  current.resetBoard();
  current.hideBoard();
  current.displayBoard();
});

document.querySelector(".mainContainer").addEventListener("click", (event) => {
  handleClick(event.target, current);
});
export default current;
