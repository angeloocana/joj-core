joj-core
================
[![Build Status](https://travis-ci.org/angeloocana/joj-core.svg)](https://travis-ci.org/angeloocana/joj-core)   
[![NPM](https://img.shields.io/npm/v/joj-core.svg)](https://www.npmjs.com/package/joj-core)
[![Code Climate]()](https://img.shields.io/codeclimate/github/angeloocana/joj-core.svg)
[![Code Coverage]()](https://img.shields.io/codeclimate/coverage/github/angeloocana/joj-core.svg)
[![Dependency Status](https://gemnasium.com/angeloocana/joj-core.svg)](https://gemnasium.com/angeloocana/joj-core)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/angeloocana/joj-core)
![License](https://img.shields.io/npm/l/joj-core.svg)

> JumpOverJump.com core library

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

let players = new Players({
    white: new Player({
        name: "Computer",
        getMove: new AiMedium().getComputerMove
    }),
    black: new Player({ name: "Gabi" })
});

let game = new Game({
    players
});

game.move({ x: 2, y: 7 }, { x: 2, y: 6 });
game.move({ x: 2, y: 0 }, { x: 2, y: 1 });

```
