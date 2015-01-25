/**
 * Created by andy on 1/2/15.
 */
(function () {
    function Component(){
        this.__init();
    }

    Component.prototype.displayTopo = function () {
        this.dataSource.getData();
    };
    Component.prototype.__init = function () {
        this.cache = new GrantTopo.Cache();
        this.msgBus = new GrantTopo.MessageBus();
        this.dataSource = new GrantTopo.DataSource(this);
        this.ui = new GrantTopo.TopoUI(this);
    };
    GrantTopo.Component = Component;
})();