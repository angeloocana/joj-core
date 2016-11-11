joj-core
================
[![Build Status](https://travis-ci.org/angeloocana/joj-core.svg)](https://travis-ci.org/angeloocana/joj-core)

JumpOverJump.com core library

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
