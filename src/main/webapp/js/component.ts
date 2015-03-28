import Cache = require("./cache");
import util = require("./common/utils");
import DataSource = require("./datasource");
import TopoUI = require("./topoui")

class component{
    private _cache;
    private _msgBus;
    private _dataSource;
    private _ui;
    constructor(){
        this.init();
    }
    private init(){
        this._cache = new Cache();
        this._msgBus = new util.MessageBus();
        this._dataSource = new DataSource(this);
        this._ui = new TopoUI(this);
    }
    public displayTopo(){
        this._dataSource.getData();
    }
    get msgBus(){
        return this._msgBus;
    }
    get cache(){
        return this._cache;
    }
}
export = component