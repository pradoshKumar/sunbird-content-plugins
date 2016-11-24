Plugin.extend({
    _type: 'org.ekstep.scribblepad',
    _render: true,
    _isContainer: true,
    _data: undefined,
    _oldPt: undefined,
    _oldMidPt: undefined,
    _startPoint: undefined,
    _endPoint: undefined,
    initPlugin: function(data) { 
    console.log('scribble plugin data', data);       
        this._data = data;
        this._data['z-index']=1;
        var color = data.color || "#000";
        var background = data.fill || "#fff"
        var dims = this.relativeDims();
        this._self = new createjs.Container();
        this._self.x = dims.x;
        this._self.y = dims.y;
        //var bgShape = new createjs.Shape();

        // addEventListener for container
        this._self.on("mousedown", this.handleMouseDown.bind(this), true);


        createjs.Ticker.setFPS(50);

        //bgShape.graphics = new createjs.Graphics().beginFill(background).drawRect(0, 0, dims.w, dims.h);
        //bgShape.alpha = data.opacity || 1;
        //this._self.addChild(bgShape);
        
        var shapeData = { "shape": { "type": "rect", "x": 0, "y": 0, "w": 100, "h": 100} };
        if (data.fill) shapeData.shape.fill = data.fill;
        if (data.stroke) shapeData.shape.stroke = data.stroke;
        if (data["stroke-width"]) shapeData.shape["stroke-width"] = data["stroke-width"];
        this.invokeChildren(shapeData, this, this._stage, this._theme);
        

        // create paint brush
        this.paintBrush = new createjs.Shape();
        this.paintBrush.x = 0;
        this.paintBrush.y = 0;        
        this.addEraser(shapeData);
        this._self.addChild(this.paintBrush);
        
    },
    addEraser: function(shapeData) {        
        var data = { asset: "org.ekstep.scribblepad.eraser", x: this._data.x-10, y: this._data.y, w: 5, h: 7, "z-index": this._data['z-index']+10};
        var erData = {'image': data};
        data.event = { type: "click", action: { asset: this._data.id, command: "erase", type: "command" } };
        PluginManager.invoke('image', data, this._stage, this._stage, this._theme);
        //this.invokeChildren(erData, this, this._stage, this._theme);
    },
    setBounderies: function() {
        if (this._startPoint && this._endPoint)
            return;
        var dims = this.relativeDims();
        var startPoint = this._self.localToGlobal(0, 0);
        this._startPoint = new createjs.Point(startPoint.x + 5, startPoint.y + 5);
        var x = startPoint.x + dims.w - 5;
        var y = startPoint.y + dims.h - 5;
        this._endPoint = new createjs.Point(x, y);
    },
    handleMouseDown: function(event) {
        this.setBounderies();
        var mousePoint = { x: event.stageX, y: event.stageY };
        mousePoint = this._self.globalToLocal(mousePoint.x, mousePoint.y);
        this._oldPt = new createjs.Point(mousePoint.x, mousePoint.y);
        this._self.on("pressmove", this.handleMouseMove.bind(this), true);
        this._self.on("pressup", this.handleMouseUp.bind(this), true);
    },
    handleMouseMove: function(event) {
        var mousePoint = { x: event.stageX, y: event.stageY };
        var thickness = this.isInt(this._data.thickness) ? this._data.thickness : 3;
        if (((mousePoint.x > this._startPoint.x) && (mousePoint.x < this._endPoint.x)) && ((mousePoint.y > this._startPoint.y) && (mousePoint.y < this._endPoint.y))) {
            mousePoint = this._self.globalToLocal(mousePoint.x, mousePoint.y);
            this.paintBrush.graphics.setStrokeStyle(thickness, 'round').beginStroke(this._data.color || "#000");
            this.paintBrush.graphics.mt(this._oldPt.x, this._oldPt.y).lineTo(mousePoint.x, mousePoint.y);
            this._oldPt = new createjs.Point(mousePoint.x, mousePoint.y);
            Renderer.update = true;
        }
    },
    handleMouseUp: function(event) {
        this._self.off("pressmove", this.handleMouseMove);
        this._self.off("pressup", this.handleMouseUp);
    },
    clear: function(action) {
        this.paintBrush.graphics.clear();
        Renderer.update = true;
    },
    isInt: function(value) {
        var x = parseFloat(value);
        return !isNaN(value) && (x | 0) === x;
    },
    drawBorder: function() {}
});