"use 6to5";

import path from "path";
import Config from "./config";
import phantom from "phantom";
import {System} from "es6-module-loader";

var jqueryCDN = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';

class Scraper {
  constructor(accountName) {
    this.account = Config.getAccount(accountName);
    this._config = Config;
    this._items = {};

    this.refresh();
  }

  // Return the config object associated with this object.
  get config() {
    return this._config;
  }

  // Set the Config object for this scraper.
  set config(obj) {
    this._config = obj;
  }

  // Return all savings accounts, cards, bank accounts, etc, associated
  // with this account.
  get items() {
    return Object.keys(this._items);
  }

  // Set the items object.
  set items(items) {
    this._items = items;
  }

  // Subclasses override this to fetch account items and set this.items.
  // Items should be a hash of ids of some sort to info about the account.
  // The info should include 'balance', 'transactions', and if payments are
  // applicable to the account, 'paymentDue' amount.
  fetchItems() {}

  // Simplified phantoming. Takes a URL and a function. This function will
  // recieve arguments 'page' and 'phantom', corresponding to the respective
  // phantom objects. Automatically injects jquery into the page for you.
  phantom(url, bloodhound) {

    // We'll do something more interesting with these errors when we have client
    // communication.
    phantom.create(ph => {
      ph.createPage(page => {
        page.open(url, status => {
          if (status === "success")
            page.includeJs(jqueryCDN, () => bloodhound(page, ph));
          else
            console.error(`Failed to open ${url}`);
        });
      });
    });
  }

  // Refresh the object's data.
  refresh() {
    // Could be more complex in the future, might as well abstract it.
    this.fetchItems();
  }

  // Returns transactions for an item.
  getTransactions(item) {
    let item = this.items[item];
    return item.transactions;
  }

  // Get the current balance of the item. This will be current debt owed,
  // if a credit card or such, and for other types of accounts it'll be
  // current total.
  getBalance(item) {
    let item = this.items[item];
    return item.balance;
  }

  // If applicable, get current payment due for the account item.
  getPayment(item) {
    let item = this.items[item];
    if (item.paymentDue)
      return item.paymentDue;
  }

  // Get an instance of Scraper for this account.
  static getScraper(accountName) {
    let account = Config.getAccount(accountName);
    if (account) {
      let ScraperImpl = require(`./scrapers/${account.type}`);
      return new ScraperImpl(accountName);
    } else {
      log.err(`Can't find the '${accountName}' account...`);
    }
  }
}

export default Scraper;
