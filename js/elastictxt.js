
/**
 * ComputedStyle
 *  Borrowed with modifcation from YUI: 
 *  https://github.com/yui/yui3/blob/master/src/dom/js/dom-style-ie.js#L34
 *  Special thanks to Matt Sweeney at Yahoo! for memorizing everything
 *  wrong with IE.
 **/
COMPUTED_STYLE = {};
if(navigator.appName == 'Microsoft Internet Explorer'){
    var rv = -1,
        re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(navigator.userAgent) !== null){
      rv = parseFloat( RegExp.$1 );
    }

    if(rv !== -1 && rv < 9){
        var HAS_LAYOUT = 'hasLayout',
            PX = 'px',
            FILTER = 'filter',
            FILTERS = 'filters',
            OPACITY = 'opacity',
            AUTO = 'auto',
            isIE8 = (rv <= 8),
            BORDER_WIDTH = 'borderWidth',
            BORDER_TOP_WIDTH = 'borderTopWidth',
            BORDER_RIGHT_WIDTH = 'borderRightWidth',
            BORDER_BOTTOM_WIDTH = 'borderBottomWidth',
            BORDER_LEFT_WIDTH = 'borderLeftWidth',
            WIDTH = 'width',
            HEIGHT = 'height',
            TRANSPARENT = 'transparent',
            VISIBLE = 'visible',
            GET_COMPUTED_STYLE = 'getComputedStyle',
            UNDEFINED = undefined,
            re_unit = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,
            /* get Style object from node */
            _getStyleObj = function(node) {
                return node.currentStyle || node.style;
            };

        //setup computed style for IE
        COMPUTED_STYLE = {
            isIE8: isIE8,
            CUSTOM_STYLES: {},
            getComputedStyle: function(el, prop){
                var value = '',
                    current;
                if(el){
                    current = _getStyleObj(el)[prop];
                    if (prop === OPACITY && COMPUTED_STYLE.CUSTOM_STYLES[OPACITY]) {
                        value = COMPUTED_STYLE.CUSTOM_STYLES[OPACITY].get(el);        
                    } else if (!current || (current.indexOf && current.indexOf(PX) > -1)) { // no need to convert
                        value = current;
                    } else if(COMPUTED_STYLE.CUSTOM_STYLES[prop]){
                        value = COMPUTED_STYLE.CUSTOM_STYLES[prop](el, prop);
                    } else if (re_unit.test(current)) { // convert to pixel
                        value = COMPUTED_STYLE.getPixel(el, prop) + PX;
                    } else {
                        value = current;
                    }
                }
                return value;
            },
            sizeOffsets: {
                width: ['Left', 'Right'],
                height: ['Top', 'Bottom'],
                top: ['Top'],
                bottom: ['Bottom']
            },
            getOffset: function(el, prop) {
                var current = _getStyleObj(el)[prop],                     // value of "width", "top", etc.
                capped = prop.charAt(0).toUpperCase() + prop.substr(1), // "Width", "Top", etc.
                offset = 'offset' + capped,                             // "offsetWidth", "offsetTop", etc.
                pixel = 'pixel' + capped,                               // "pixelWidth", "pixelTop", etc.
                sizeOffsets = COMPUTED_STYLE.sizeOffsets[prop], 
                mode = el.ownerDocument.compatMode,
                value = '';

                // IE pixelWidth incorrect for percent
                // manually compute by subtracting padding and border from offset size
                // NOTE: clientWidth/Height (size minus border) is 0 when current === AUTO so offsetHeight is used
                // reverting to auto from auto causes position stacking issues (old impl)
                if (current === AUTO || current.indexOf('%') > -1) {
                    value = el['offset' + capped];

                    if (mode !== 'BackCompat') {
                        if (sizeOffsets[0]) {
                            value -= COMPUTED_STYLE.getPixel(el, 'padding' + sizeOffsets[0]);
                            value -= COMPUTED_STYLE.getBorderWidth(el, 'border' + sizeOffsets[0] + 'Width', 1);
                        }

                        if (sizeOffsets[1]) {
                            value -= COMPUTED_STYLE.getPixel(el, 'padding' + sizeOffsets[1]);
                            value -= COMPUTED_STYLE.getBorderWidth(el, 'border' + sizeOffsets[1] + 'Width', 1);
                        }
                    }

                } else { // use style.pixelWidth, etc. to convert to pixels
                    // need to map style.width to currentStyle (no currentStyle.pixelWidth)
                    if (!el.style[pixel] && !el.style[prop]) {
                        el.style[prop] = current;
                    }
                    value = el.style[pixel];

                }
                return value + PX;
            },

            borderMap: {
                thin: (isIE8) ? '1px' : '2px',
                medium: (isIE8) ? '3px': '4px', 
                thick: (isIE8) ? '5px' : '6px'
            },

            getBorderWidth: function(el, property, omitUnit) {
                var unit = omitUnit ? '' : PX,
                current = el.currentStyle[property];

                if (current.indexOf(PX) < 0) { // look up keywords if a border exists
                    if (COMPUTED_STYLE.borderMap[current] &&
                        el.currentStyle.borderStyle !== 'none') {
                        current = COMPUTED_STYLE.borderMap[current];
                    } else { // otherwise no border (default is "medium")
                        current = 0;
                    }
                }
                return (omitUnit) ? parseFloat(current) : current;
            },

            getPixel: function(node, att) {
                // use pixelRight to convert to px
                var val = null,
                style = _getStyleObj(node),
                styleRight = style.right,
                current = style[att];

                node.style.right = current;
                val = node.style.pixelRight;
                node.style.right = styleRight; // revert

                return val;
            },

            getMargin: function(node, att) {
                var val,
                style = _getStyleObj(node);

                if (style[att] == AUTO) {
                    val = 0;
                } else {
                    val = COMPUTED_STYLE.getPixel(node, att);
                }
                return val + PX;
            }
        };
        COMPUTED_STYLE.CUSTOM_STYLES = {
             height: COMPUTED_STYLE.getOffset,
             width: COMPUTED_STYLE.getOffset
        };
    }
}
/**
* Unless otherwise indicated, Source Code is licensed under MIT license.
* See further explanation attached in License Statement (distributed in the file
* LICENSE).
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
* of the Software, and to permit persons to whom the Software is furnished to do
* so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
**/
/**
 * ElasticTextbox that expands vertically or horizonally
 *  config:
 *      node: {HTMLDOMElement} : DOM Element to attach to :: Required
 *      vert: {Boolean} : Expand vertically :: Optional (default: true)
 *      horz: {Boolean} : Expand horizonally :: Optional (default: false)
 *      height: {Integer} : Beginning static height :: Optional
 *      maxHeight: {Integer} : Maximum height of node :: Optional
 *      minHeight: {Integer} : Minimum height of node :: Optional
 *      maxWidth: {Integer} : Maximum width of node :: Optional
 *      minWidth: {Integer} : Minimum width of node :: Optional
 *      width: {Integer} : Beginning static width :: Optional
 *      resize: {Boolean} : CSS Resize :: Optional (default: false)
 *      overflow: {string} : CSS Overflow :: Optional (default: hidden)
 *      NOTE: most of these values should be set with CSS
 **/
function ElasticText(config){
    this._init(config);
}

//////////////////////
//static vars
//////////////////////
/**
 * Textarea node
 * @value {HTMLDOMElement#TEXTAREA} _node : Textarea attached to object
 *
 **/
ElasticText.prototype._node = null;
/**
 * PRE node
 * @value {HTMLDOMElement#PRE} _copyNode : PRE node attached to object
 *
 **/
ElasticText.prototype._copyNode = null;
//static strings
ElasticText.prototype.PX = 'px';
ElasticText.prototype.AUTO = 'auto';
ElasticText.prototype.HIDDEN = 'hidden';
ElasticText.prototype.WIDTH = 'width';
ElasticText.prototype.HEIGHT = 'height';
ElasticText.prototype.TEXTAREA = 'textarea';
ElasticText.prototype.CLASSNAME = 'elastic-text';
ElasticText.prototype.OWNER_DOCUMENT = 'ownerDocument';
ElasticText.prototype.DOCUMENT_ELEMENT = 'documentElement';
ElasticText.prototype.DEFAULT_VIEW = 'defaultView';
ElasticText.prototype.PARENT_WINDOW = 'parentWindow';
ElasticText.prototype.PARENT = 'parentNode';
ElasticText.prototype.STYLE = 'style';
ElasticText.prototype.GET_COMPUTED_STYLE = 'getComputedStyle';
ElasticText.prototype.PRE = 'pre';
ElasticText.prototype.PRE_STYLE = ['top: -10000px; left: -10000px; white-space:pre-wrap;white-space:-pre-wrap;',
                                   'white-space:-o-pre-wrap;word-wrap:break-word;_white-space:pre;position:absolute;visibility:hidden;',
                                  ].join('');
ElasticText.prototype.STYLE_MIMICS = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'fontVariant',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'textIndent',
    'textTransform',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'borderTopWidth',
    'borderBottomWidth',
    'width'
  ];
//////////////////////
//functions
//////////////////////
ElasticText.prototype.getComputedStyle = null;

/**
 * Intialization function
 * @private
 * @method _init
 * @param {object} config config with the options:
 *      node: {HTMLDOMElement} : DOM Element to attach to :: Required
 *      vert: {Boolean} : Expand vertically :: Optional (default: true)
 *      horz: {Boolean} : Expand horizonally :: Optional (default: false)
 *      height: {Integer} : Beginning static height :: Optional
 *      maxHeight: {Integer} : Maximum height of node :: Optional
 *      minHeight: {Integer} : Minimum height of node :: Optional
 *      maxWidth: {Integer} : Maximum width of node :: Optional
 *      minWidth: {Integer} : Minimum width of node :: Optional
 *      width: {Integer} : Beginning static width :: Optional
 *      resize: {Boolean} : CSS Resize :: Optional (default: false)
 *      overflow: {string} : CSS Overflow :: Optional (default: hidden)
**/
ElasticText.prototype._init = function(config){
    if(!config.node || this.TEXTAREA.indexOf(config.node.nodeName.toLowerCase()) < 0){
        //sorry peeps, we're only supporting TEXTAREA here.
        throw new Error("node is required");
    }
    //we're gonna need this
    this.getComputedStyle = this._setGetComputedStyle();
    this.isIE8 = (COMPUTED_STYLE.hasOwnProperty('isIE8') && COMPUTED_STYLE.isIE8) ? true : false;
    //setup config
    this._node = config.node;
    //setup styles
    if(config['minHeight']){
        this.minHeight = parseInt(config.minHeight, 10) || this._getNodeHeight();
        this._node.style.minHeight = this.minHeight + this.PX;
    }
    
    if(config['maxHeight']){
        this.maxHeight = parseInt(config.maxHeight, 10) || this._getNodeHeight();
        this._node.style.maxHeight = this.maxHeight + this.PX;
    }

    if(config['height']){
        this._node.style.height = parseInt(config.height, 10) || this._getNodeHeight();
    }

    if(config['minWidth']){
        this._node.style.minWidth = parseInt(config.minWidth, 10) || this._getNodeWidth();
    }
    
    if(config['maxWidth']){
        this._node.style.maxWidth =  parseInt(config.maxWidth, 10) || this._getNodeWidth();
    }

    if(config['width']){
        this._node.style.width = parseInt(config.width, 10) || this._getNodeWidth();
    }

    this._node.style.resize = config['resize'] || 'none';
    this._node.style.overflow = config['overflow'] || 'hidden';
    this._createCopyNode();
    this._createListeners();
    this.update();
};

/**
 * Set us up the bomb! Uses getComputedStyle to find attribute values
 * @private
 * @method _setGetComputedStyle
 * @return {string}
 *
 **/
ElasticText.prototype._setGetComputedStyle = function(){
    var fn;
    if('getComputedStyle' in COMPUTED_STYLE){
        fn = COMPUTED_STYLE.getComputedStyle;
    }else{
        fn = function(node, att) {
            var val = '',
                doc = node[this.OWNER_DOCUMENT];

            if (node[this.STYLE] && doc[this.DEFAULT_VIEW] && doc[this.DEFAULT_VIEW][this.GET_COMPUTED_STYLE]) {
                val = doc[this.DEFAULT_VIEW][this.GET_COMPUTED_STYLE](node, null)[att];
            }
            return val;
        };

    }
    return fn;
};

/**
 * Destory the little world that is ElasticTextArea (instance)
 * @private
 * @method _destructor
 *
 **/
ElasticText.prototype._destructor = function(){
    this._destoryCopyNode();
    this._destroyListeners();
};

/**
 * Set up listeners on the node
 * @private
 * @method _destructor
 *
 **/
ElasticText.prototype._createListeners = function(){
    this._keyupListener = this._addEvent(this._node, 'keyup', this.update);
    this._keyupListener = this._addEvent(this._node, 'keypress', this.update);
    this._keyupListener = this._addEvent(this._node, 'keydown', this.update);
    /* these are kind of meh in browsers */
    this._pasteListener = this._addEvent(this._node, 'paste', this.update);
    this._pasteListener = this._addEvent(this._node, 'cut', this.update);
};

/**
 * Bind function and setup contexts 
 * @method bind
 * @param {function} f : Function to bind
 * @param {object} c : Context to set to the function
 * @param {Array} arguments : Pass arbitrary list of args to function
 **/
ElasticText.prototype.bind = function(f, c) {
    var xargs = arguments.length > 2 ?
            arguments.slice(2) : null;
    return function() {
        var fn = (typeof(x) === 'string') ? c[f] : f,
            args = (xargs) ?
                xargs.concat(arguments.slice(0)) : arguments;
        return fn.apply(c || fn, args);
    };
};

/**
 * Add an event listener
 * @private
 * @method _addEvent
 * @param {HTMLDOMElement} node : Element to attach event to
 * @param {string} event : Name of event to listen for
 * @param {function} callback : Callback for listener
 **/
ElasticText.prototype._addEvent = function(node, event, callback){
    if (node.addEventListener){
        node.addEventListener(event, this.bind(callback, this), false);
    } else if (node.attachEvent){
        node.attachEvent('on'+event, this.bind(callback, this));
    }
};

/**
 * Remove an event listener
 * @private
 * @method _detach
 * @param {Event} event : Event object to detach
 **/
ElasticText.prototype._detach = function(event){
    if (node.addEventListener){
        node.removeEventListener(event, this.bind(callback, this), false);
    } else if (node.attachEvent){
        node.detachEvent(event, this.bind(callback, this));
    }
};
/**
 * Destroy all listeners on object
 * @private
 * @method _destroyListeners
 **/
ElasticText.prototype._destroyListeners = function(){
    if(this._keyupListener){
        this._detach(this._keyupListener);
        this._keyupListener = null;
    }
    if(this._pasteListener){
        this._detach(this._pasteListener);
        this._pasteListener = null;
    }
};

/**
 * Creates the node to copy contents into
 * @private
 * @method _createCopyNode
 **/
ElasticText.prototype._createCopyNode = function(){
    var i = 0, len = this.STYLE_MIMICS.length,
        cn = document.createElement(this.PRE);
    if(this.isIE8){
        cn.style.cssText = this.PRE_STYLE;
    }else{
        cn.setAttribute(this.STYLE, this.PRE_STYLE);
    }
    for(;i < len; i++){
        var mim = this.STYLE_MIMICS[i];
        cn.style[mim] = this.getComputedStyle(this._node, mim);
    }
    document.body.appendChild(cn);
    this._copyNode = cn;
};

/**
 * Updates the node to copy contents into
 * @private
 * @method _updateCopyNode
 **/
ElasticText.prototype._updateCopyNode = function(){
    var txt = this._node.value + "\n ";
    //TODO: check for ie and replace with \r's
    if(this._copyTextNode){
        //remove from dom.
        this._remove(this._copyTextNode);
    }
    this._copyTextNode = document.createTextNode(txt);
    this._copyNode.appendChild(this._copyTextNode);
};

/**
 * Retrieve the height of the _node object
 * @private
 * @method _getNodeHeight
 * @return {Integer}
 **/
ElasticText.prototype._getNodeHeight = function(){
    return parseInt(this.getComputedStyle(this._node, this.HEIGHT), 10);
};
/**
 * Retrieve the width of the _node object
 * @private
 * @method _getNodeWidth
 * @return {Integer}
 **/
ElasticText.prototype._getNodeWidth = function(){
    return parseInt(this.getComputedStyle(this._node, this.WIDTH), 10);
};
/**
 * Retrieve the height of the _copyNode object
 * @private
 * @method _getCopyNodeHeight
 * @return {Integer}
 **/
ElasticText.prototype._getCopyNodeHeight = function(){
    return parseInt(this.getComputedStyle(this._copyNode, this.HEIGHT), 10);
};
/**
 * Retrieve the wight of the _copyNode object
 * @private
 * @method _getCopyNodeWight
 * @return {Integer}
 **/
ElasticText.prototype._getCopyNodeWidth = function(){
    return parseInt(this.getComputedStyle(this._copyNode, this.WIDTH), 10);
};

/**
 * Remove a node from the DOM
 * @private
 * @method _remove
 **/
ElasticText.prototype._remove = function(node){
    if(node && node[this.PARENT]){
        var parent = node[this.PARENT];
        parent.removeChild(node);
    }
};

/**
 * Update the object and the attached nodes 
 * @method update
 *
 **/
ElasticText.prototype.update = function(){
    this._updateCopyNode();
    var nh = this._getNodeHeight(),
        ch = this._getCopyNodeHeight();
    if(nh !== ch){
        var maxh = this.maxHeight,
            minh = this.minHeight,
            h = ((minh && ch < minh) ? minh : ch) + this.PX,
            overflow = ((minh && ch < minh) ? this.AT : this.HIDDEN);
            //set styles
            this._node.style.height = h;
            this._node.style.overflow = overflow;
    }
};
