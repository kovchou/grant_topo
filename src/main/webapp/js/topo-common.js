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
    var Util = {
        format: function (str) {
            var formatted = str;
            var regexp, i;
            for (i = 1; i < arguments.length; i++) {
                regexp = new RegExp('\\{\\{' + (i - 1) + '\\}\\}', 'gi');
                formatted = formatted.replace(regexp, "\"" + arguments[i] + "\"");
            }
            for (i = 1; i < arguments.length; i++) {
                regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gi');
                formatted = formatted.replace(regexp, arguments[i]);
            }
            return formatted;
        },
        extend:function(child, parent, methods){
            var ctor = function () {};
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.prototype.constructor = child;
            child.superClass = parent.prototype;
            Util.forEach(methods, function(methodName, method){
                child.prototype[methodName] = method;
            })
        },
        forEach:function(obj, iteratee, context){
            if (obj == null) return obj;
            var i, length = obj.length;
            if (length === +length) {
                for (i = 0; i < length; i++) {
                    iteratee.call(context, i,obj[i], obj);
                }
            } else {
                var keys = [];
                for (var key in obj) if (obj.hasOwnProperty(key)) keys.push(key);
                for (i = 0, length = keys.length; i < length; i++) {
                    iteratee.call(context, keys[i],obj[keys[i]], obj);
                }
            }
            return obj;
        }
    };
    function MessageBus(){
        this.__messages = {};
    }
    Util.extend(MessageBus, Object, {
        publish:function(msgType, data){
            var msgTypeList = this.__messages[msgType];
            if($.isArray(msgTypeList)){
                $.each(msgTypeList,function(_, obj){
                    obj.onEvent.call(obj, {
                        msgType: msgType,
                        data:data
                    });
                })
            }
        },
        subscribe : function (msgType,obj) {
            var msgTypeList = this.__messages[msgType];
            if (!$.isArray(msgTypeList)){
                this.__messages[msgType] = [];
                msgTypeList = this.__messages[msgType];
            }
            msgTypeList.push(obj);
        }
    });
    GrantTopo.Util = Util;
    GrantTopo.MessageBus = MessageBus;
    GrantTopo.MSG_TYPE = MSG_TYPE;
    GrantTopo.CONSTANTS = CONSTANTS;
})();