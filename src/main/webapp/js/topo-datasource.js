/**
 * Created by andy on 1/2/15.
 */
(function(){
    var M = GrantTopo.MSG_TYPE;
    function DataSource(comp){
        this.__comp = comp;
    }
    DataSource.prototype.getData = function(){
        var self = this;
        $.ajax({
            url: "/topo/allElements.do",
            dataType: "json"
        }).done(function (allElements) {
            self.__processData(allElements);
        });
    };
    DataSource.prototype.__processData = function (allElements) {
        var self =this;
        $.each(allElements,function(_,element){
            self.__comp.cache.addElement(element);
        });
        this.__comp.msgBus.publish(M.EVENT_REFRESH_TOPO);
    };

    GrantTopo.DataSource = DataSource;
})();