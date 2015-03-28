/// <reference path="../lib/define/jquery.d.ts" />
/// <reference path="../lib/define/jtopo.d.ts"/>
import $ = require("jquery");
import constants = require("common/constants")
var M = constants.MSG_TYPE;

class TopoUI{
    private __comp;
    private __scene;
    constructor(comp){
        this.__comp = comp;
        this.__subscriptMsg();
        var canvas = document.getElementById('topo_canvas');
        var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
        this.__scene = new JTopo.Scene(stage); // 创建一个场景对象
    }
    __subscriptMsg () {
        this.__comp.msgBus.subscribe(M.EVENT_REFRESH_TOPO, this);
    }
    onEvent (msg) {
        if (msg.msgType == M.EVENT_REFRESH_TOPO) {
            this.refreshTopoView();
        }
    }
    refreshTopoView = function () {
        var self = this;
        var id2NodeMap = this.__comp.cache.getId2NodeMap();

        var nodeUI;
        $.each(id2NodeMap, function (id, node) {
            nodeUI = new JTopo.Node(node.name);    // 创建一个节点
            nodeUI.setSize(30, 20)
            nodeUI.setLocation(10, 10);    // 设置节点坐标
            self.__scene.add(nodeUI); // 放入到场景中
        });

        var id2LinkMap = this.__comp.cache.getId2LinkMap();
    }
}
export =TopoUI;