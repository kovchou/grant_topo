/**
 * Created by andy on 1/2/15.
 */
(function () {
    var C = GrantTopo.CONSTANTS;
    function Cache(){
        this.__id2NodeMap = {};
        this.__id2LinkMap = {};
    }

    Cache.prototype.addElement = function (element) {
        if(element.type == C.TYPE_NODE){
            this.__id2NodeMap[element.id] = element;
        }else if(element.type = C.TYPE_LINK){
            this.__id2LinkMap[element.id] = element;
        }
    };
    Cache.prototype.getId2NodeMap = function () {
        return this.__id2NodeMap;
    };
    Cache.prototype.getId2LinkMap = function () {
        return this.__id2LinkMap;
    };
    GrantTopo.Cache = Cache;
})();