

class OGMOParser {

    xmlhttp: XMLHttpRequest;
    xmlData: XMLDocument;
    level: Element;
    width: number;
    height: number;
    ready: boolean;


    constructor(source: string) {
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
    getTileData(tag: string): string {
        while (this.xmlData == null) {
            this.xmlData = this.xmlhttp.responseXML;
            console.log("Cant get file");
        }
        return this.xmlData.body.getElementsByTagName(tag).item(0).textContent;
    }

    getEntityData(group: string, name: string): NodeListOf<Element> {
        var entities: NodeListOf<Element>;
        entities = this.xmlData.getElementsByTagName(group).item(0).getElementsByTagName(name);
        return entities;
    }

    getWidth(tileWidth: number) {
        return this.width / tileWidth;
    }

    getHeight(tileHeight: number) {
        return this.height / tileHeight;
    }

    xmlResponseReady = () => {
        this.xmlData = this.xmlhttp.responseXML;
        this.level = this.xmlData.getElementsByTagName("level").item(0);
        this.width = parseInt(this.level.getAttribute("width"));
        this.height = parseInt(this.level.getAttribute("height"));
        this.ready = true;
    }

    readyState(): boolean {
        return this.ready;
    }

}