# BarrelRoll

**This is currently a hello world project...**

I'm kind of sick of logging into 15 different banks/lenders to get a
consolidated view of the status of my finances. Mint.com is heavyweight, has a
crapton of ads, etc.

BarrelRoll is meant to be a desktop dashboard for your finances.

## Why?

Mostly to learn atom-shell and ES6.

## Dev

First of all, get [atom-shell](https://github.com/atom/atom-shell) by running:

```
./bin/bootstrap-atom
```

If you don't have the grunt-cli installed globally, get that:

```
npm install -g grunt-cli
```

Now you'll need to fetch barrelroll's dependencies:

```
apm install .
```

Next up, run `grunt` with no arguments to compile/copy ES6 files. To run the
output:

```
./atom-shell/Atom.app/Contents/MacOS/Atom .
```

You could also just run the `Atom.app` package directly, because grunt
copies the files into the appropriate place.
