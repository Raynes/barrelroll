"use 6to5";

import CommonView from "./views/common.js";
import Home from "./views/home.js";
import {$} from "space-pen";


function setPage(view) {
  $("body").html(view);
}

$(() => {
  setPage(new Home());
});
