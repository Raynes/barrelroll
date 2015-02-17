"use 6to5";

import {View} from "space-pen";
import CommonView from "./common.js";

class Home extends View {
  static content() {
    this.div({class: "centered"}, () => {
      this.p("Hello, world!");
    });
  }
}

export default Home;
