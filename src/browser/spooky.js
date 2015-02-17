"use 6to5";

import Spooky from "spooky";
import esprima from "esprima";
import escodegen from "escodegen";
import _ from "lodash";

export function spookyFn(...args) {
  let fn = args.pop();
  let parsedFn = esprima.parse("f = " + fn.toString())
    .body[0]
    .expression
    .right;
  let names = _.pluck(parsedFn.params, 'name');

  // Generate a paramless function for spooky to inject args into.
  parsedFn.params = [];

  return [_.zipObject(names, args), escodegen.generate(parsedFn)];
}

Spooky.prototype.waitForUrl = function(url) {
  this.then(spookyFn(url, function(url) { this.waitForUrl(url) }));
}

function setupEvents(sp) {
  sp.on('error', (e, stack) => {
    console.error(e);
    if (stack) console.log(stack)
  });

  sp.on('console', text => console.log(text));
}

function spookyWrapper(sp, cb) {
  return err => {
    if (err) {
      let e = new Error("SpookyJS ain't spooky today.");
      e.details = err;
      throw e;
    }

    setupEvents(sp);
    cb(sp);
  };
}

export default function spooky(cb) {
  let options = {
    child: {
      transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true,
      waitTimeout: 20000
    }
  };

  let sp = new Spooky(options, (err) => spookyWrapper(sp, cb)(err));

  return sp;
}
