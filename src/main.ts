import "./style.css";
import { App } from "./App";

new App().init(document.getElementById("game")!).catch(console.error);
