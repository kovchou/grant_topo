/**
 * Created by andy on 1/2/15.
 */
(function(){
    var CONSTANTS={
        TYPE_NODE: "NODE",
        TYPE_LINK: "LINK"
    };
    var MSG_TYPE={
        EVENT_REFRESH_TOPO:"EVENT_REFRESH_TOPO"
    };
    var MessageBus=function(){
        this.__messages = {};
    };
    MessageBus.prototype.publish=function(msgType, data){
        var msgTypeList = this.__messages[msgType];
        if($.isArray(msgTypeList)){
            $.each(msgTypeList,function(_, obj){
                obj.onEvent.call(obj, {
                    msgType: msgType,
                    data:data
                });
            })
        }
    };
    MessageBus.prototype.subscribe = function (msgType,obj) {
        var msgTypeList = this.__messages[msgType];
        if (!$.isArray(msgTypeList)){
            this.__messages[msgType] = [];
            msgTypeList = this.__messages[msgType];
        }
        msgTypeList.push(obj);
    };
    GrantTopo.MessageBus = MessageBus;
    GrantTopo.MSG_TYPE = MSG_TYPE;
    GrantTopo.CONSTANTS = CONSTANTS;
})();