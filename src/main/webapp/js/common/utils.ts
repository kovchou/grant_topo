/// <reference path="../../lib/define/jquery.d.ts" />
import $ = require("jquery");
import constants = require("./constants");

export function format(str:string) {
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
}
export function forEach(obj:any,
                        iteratee:Function,
                        context?:any) {
    if (obj == null) return obj;
    var i, length = obj.length;
    if (length === +length) {
        for (i = 0; i < length; i++) {
            iteratee.call(context, i, obj[i], obj);
        }
    } else {
        var keys = [];
        for (var key in obj) if (obj.hasOwnProperty(key)) keys.push(key);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee.call(context, keys[i], obj[keys[i]], obj);
        }
    }
    return obj;
}

export class MessageBus {
    private messages={};

    publish(msgType:constants.MSG_TYPE,
            data:any) {
        debugger;
        var msgTypeList = this.messages[msgType];
        if ($.isArray(msgTypeList)) {
            $.each(msgTypeList, function (_, obj) {
                obj.onEvent.call(obj, {
                    msgType: msgType,
                    data: data
                });
            })
        }
    }

    subscribe(msgType:constants.MSG_TYPE,
              obj: any) {
        var msgTypeList = this.messages[msgType];
        if (!$.isArray(msgTypeList)) {
            this.messages[msgType] = [];
            msgTypeList = this.messages[msgType];
        }
        msgTypeList.push(obj);
    }
}