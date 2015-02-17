"use 6to5";

import fs from "fs";
import path from "path";

// A config class where all operations trigger a refresh and/or persist of it.
class Config {
  constructor(configPath="config.json") {
    this.configPath = configPath;
    this.readConfig()
  }

  // Get the list of configured accounts.
  get accounts() {
    this.readConfig();
    return this.config.accounts;
  }

  // Add an account and persist it to disk. Returns the account's config.
  addAccount(name, config) {
    this.readConfig();
    this.config.accounts[name] = config;
    this.persist();
    return config;
  }

  // Get an account.
  getAccount(name) {
    this.readConfig();
    return this.accounts[name];
  }

  // Remove an account and persist the change to disk. Returns the deleted
  // account config.
  removeAccount(name) {
    let config = this.config.accounts[name];
    this.readConfig();
    delete this.config.accounts[name];
    this.persist();
    return config;
  }

  // Read config from disk and parse it. Sets the config property and returns
  // it.
  readConfig() {
    this.config = JSON.parse(fs.readFileSync(this.configPath));
    return this.config;
  }

  // Write the current config state to disk.
  persist() {
    fs.writeFileSync(JSON.stringify(this.config, null, 2));
    return this.config;
  }
}

export default new Config();
