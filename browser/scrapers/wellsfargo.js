"use 6to5";

import Scraper from "../scraper";
import phantom from "phantom";

class WellsFargoScraper extends Scraper {
  login() {
    let user = this.account.username;
    let pass = this.account.password;
    console.log(user, pass)
  }

  fetchItems() {
    this.phantom("https://wellsfargo.com", (page, ph) => {
      console.log("Logging into Wells Fargo!");
      this.login();
    });
  }
}

export default WellsFargoScraper;
