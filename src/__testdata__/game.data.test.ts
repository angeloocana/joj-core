import { Game } from '../index';

export const initialGame = Game.createGame({
    players: {
        white: { name: 'Angelo', foto: 'img/black_user.png' },
        black: { name: 'Gabi', foto: 'img/white_user.png' }
    }
});
