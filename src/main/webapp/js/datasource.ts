/// <reference path="../lib/define/jquery.d.ts" />
import $ = require("jquery");
import constants = require("common/constants")
import Component = require("component")
class DataSource {
    private comp:Component;
    constructor(comp) {
        this.comp = comp
    }

    getData() {
        var self = this;
        $.ajax({
            url: "/topo/allElements.do",
            dataType: "json"
        }).done(function (allElements) {
            self.__processData(allElements);
        });
    }

    __processData(allElements) {
        var self =this;
        $.each(allElements,  function(_, element){
            self.comp.cache.addElement(element);
        });
        this.comp.msgBus.publish(constants.MSG_TYPE.EVENT_REFRESH_TOPO);
    }
}
export = DataSource;