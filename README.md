# joj-core

[![Build Status](https://travis-ci.org/angeloocana/joj-core.svg)](https://travis-ci.org/angeloocana/joj-core)
[![NPM](https://img.shields.io/npm/v/joj-core.svg)](https://www.npmjs.com/package/joj-core)
[![codecov.io](http://codecov.io/github/angeloocana/joj-core/coverage.svg)](http://codecov.io/github/angeloocana/joj-core)
[![Dependency Status](https://gemnasium.com/angeloocana/joj-core.svg)](https://gemnasium.com/angeloocana/joj-core)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/joj-core)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Translations
[pt-br](https://github.com/angeloocana/joj-core/blob/master/README.pt-br.md)
[en-us](https://github.com/angeloocana/joj-core/blob/master/README.md)

> JumpOverJump.com core library
> 
> JumpOverJump is an open source, complete functional programming, AI game board.
> 
> Be welcome to learn, help and play!!!

## Docs
[Full docs](https://angeloocana.github.io/joj-core/)


## Use

### Install
```
    npm install --save joj-core
```

### New Game

```js

import { Game, Move } from 'joj-core';

const players = {
    white: { name: "Angelo" },
    black: { name: "Gabi" }
};

const game = Game.createGame({ players });

const gameAfterMove = Move.getGameAfterMove(game, { x: 5, y: 7 }, { x: 5, y: 6 });

const gameAfterMove2 = Move.getGameAfterMove(gameAfterMove, { x: 2, y: 0 }, { x: 2, y: 1 });

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
