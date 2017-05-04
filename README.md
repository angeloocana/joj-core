# joj-core

[![Build Status](https://travis-ci.org/polutz/joj-core.svg)](https://travis-ci.org/polutz/joj-core)
[![NPM](https://img.shields.io/npm/v/joj-core.svg)](https://www.npmjs.com/package/joj-core)
[![codecov.io](http://codecov.io/github/polutz/joj-core/coverage.svg)](http://codecov.io/github/polutz/joj-core)
[![Dependency Status](https://gemnasium.com/polutz/joj-core.svg)](https://gemnasium.com/polutz/joj-core)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/polutz/joj-core)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Translations
[pt-br](https://github.com/polutz/joj-core/blob/master/README.pt-br.md)
[en-us](https://github.com/polutz/joj-core/blob/master/README.md)

> JumpOverJump.com core library
> 
> JumpOverJump is an opensource AI game board.
> Be welcome to learn, help and play!!!


## Use

### Install
```
    npm install --save joj-core
```

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



## Contribute

### NPM Global packages
```
    npm install -g ts-node babel-cli
```

### Setup
```
    npm install   
```

### Test
```
    npm test
```
