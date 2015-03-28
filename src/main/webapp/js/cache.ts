import constants = require("./common/constants")
var C = constants.CONSTANTS;
class Cache {
    private id2NodeMap;
    private id2LinkMap;

    constructor() {
        this.id2LinkMap = {};
        this.id2NodeMap = {};
    }

    addElement(element) {
        if (element.type == C.TYPE_NODE) {
            this.id2NodeMap[element.id] = element;
        } else if (element.type = C.TYPE_LINK) {
            this.id2LinkMap[element.id] = element;
        }
    }

    getId2NodeMap() {
        return this.id2NodeMap;
    }

    getId2LinkMap() {
        return this.id2LinkMap;
    }
}
export = Cache;