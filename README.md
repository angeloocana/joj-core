joj-core
================
[![Build Status](https://travis-ci.org/angeloocana/joj-core.svg)](https://travis-ci.org/angeloocana/joj-core)
[![NPM](https://img.shields.io/npm/v/joj-core.svg)](https://www.npmjs.com/package/joj-core)
[![codecov.io](http://codecov.io/github/angeloocana/joj-core/coverage.svg)](http://codecov.io/github/angeloocana/joj-core)
[![Dependency Status](https://gemnasium.com/angeloocana/joj-core.svg)](https://gemnasium.com/angeloocana/joj-core)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/joj-core)
![License](https://img.shields.io/npm/l/joj-core.svg)

> JumpOverJump.com core library
> 
> JumpOverJump is an opensource AI game board.
> Be welcome to learn, help and play!!!

## Install

Install with npm:

```bash
    $ npm install joj-core --save
```

or clone from github:

```bash
    $ git clone https://github.com/angeloocana/joj-core.git
```

## Setup

```bash
    $ npm install 
    $ typings install
```

*Add to your typings/index.d.ts

```ts
/// <reference path="../node_modules/joj-core/src/typings/index.d.ts" />
```

## Test

```bash
    $ npm test
``` 

## Usage

### New Game - Human vs Human

```js

import {Game, Players, Player} from 'joj-core';

let players = new Players({
    white: new Player({ name: "Angelo" }),
    black: new Player({ name: "Gabi" })
});

let game = new Game({
    players
});

game.move({ x: 2, y: 7 }, { x: 2, y: 6 });

```

### New Game - AI vs Human

```js

import {Game, Players, Player, AiMedium} from 'joj-core';
import ai from 'joj-ai';

let players = new Players({
    white: new Player({
        name: "Computer",
        ai
    }),
    black: new Player({ name: "Gabi" })
});

let game = new Game({
    players
});

game.move({ x: 2, y: 7 }, { x: 2, y: 6 });
//Computer plays automatic after a move
game.move({ x: 2, y: 0 }, { x: 2, y: 1 });

```
