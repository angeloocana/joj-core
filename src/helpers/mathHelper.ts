export default class MathHelper {
    static getRandom(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
}