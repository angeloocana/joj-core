export default class ObjectHelper {

    static getCopy(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

}
