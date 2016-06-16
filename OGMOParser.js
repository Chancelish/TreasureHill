var OGMOParser = (function () {
    function OGMOParser(source) {
        var _this = this;
        this.xmlResponseReady = function () {
            _this.xmlData = _this.xmlhttp.responseXML;
            _this.level = _this.xmlData.getElementsByTagName("level").item(0);
            _this.width = parseInt(_this.level.getAttribute("width"));
            _this.height = parseInt(_this.level.getAttribute("height"));
            _this.ready = true;
        };
        this.xmlhttp = new XMLHttpRequest();
        this.xmlhttp.onreadystatechange = this.xmlResponseReady;
        this.xmlhttp.open('GET', source);
        this.xmlhttp.send();
        this.ready = false;
    }
    /**
     * Returns a CSV string from OGMO oel file. Tilemaps must be exported as CSV files
     * @param tag The name of the tag to get the CSV string from.
     */
    OGMOParser.prototype.getTileData = function (tag) {
        while (this.xmlData == null) {
            this.xmlData = this.xmlhttp.responseXML;
            console.log("Cant get file");
        }
        return this.xmlData.body.getElementsByTagName(tag).item(0).textContent;
    };
    OGMOParser.prototype.getEntityData = function (group, name) {
        var entities;
        entities = this.xmlData.getElementsByTagName(group).item(0).getElementsByTagName(name);
        return entities;
    };
    OGMOParser.prototype.getWidth = function (tileWidth) {
        return this.width / tileWidth;
    };
    OGMOParser.prototype.getHeight = function (tileHeight) {
        return this.height / tileHeight;
    };
    OGMOParser.prototype.readyState = function () {
        return this.ready;
    };
    return OGMOParser;
}());
//# sourceMappingURL=OGMOParser.js.map