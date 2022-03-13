'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var convertColor = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.figmaRGBToWebRGB = figmaRGBToWebRGB;
exports.webRGBToFigmaRGB = webRGBToFigmaRGB;
exports.figmaRGBToHex = figmaRGBToHex;
exports.hexToFigmaRGB = hexToFigmaRGB;
const namesRGB = ['r', 'g', 'b'];
/**
 * this function converts figma color to RGB(A) (array)
 */
// figmaRGBToWebRGB({r: 0.887499988079071, g: 0.07058823853731155, b: 0.0665624737739563})
//=> [226, 18, 17]

function figmaRGBToWebRGB(color) {
  const rgb = [];
  namesRGB.forEach((e, i) => {
    rgb[i] = Math.round(color[e] * 255);
  });
  if (color['a'] !== undefined) rgb[3] = Math.round(color['a'] * 100) / 100;
  return rgb;
}
/**
 * this function converts RGB(A) color (array) to figma color
 */
// webRGBToFigmaRGB([226, 18, 17])
//=> {r: 0.8862745098039215, g: 0.07058823529411765, b: 0.06666666666666667}


function webRGBToFigmaRGB(color) {
  const rgb = {};
  namesRGB.forEach((e, i) => {
    rgb[e] = color[i] / 255;
  });
  if (color[3] !== undefined) rgb['a'] = color[3];
  return rgb;
}
/**
 * this function converts figma color to HEX (string)
 */
// figmaRGBToHex({ r: 0, g: 0.1, b: 1 })
//=> #001aff


function figmaRGBToHex(color) {
  let hex = '#';
  const rgb = figmaRGBToWebRGB(color);
  hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);

  if (rgb[3] !== undefined) {
    const a = Math.round(rgb[3] * 255).toString(16);

    if (a.length == 1) {
      hex += '0' + a;
    } else {
      if (a !== 'ff') hex += a;
    }
  }

  return hex;
}
/**
 * this function converts HEX color (string) to figma color
 */
// hexToFigmaRGB(#001aff)
//=> { r: 0, g: 0.10196078431372549, b: 1 }


function hexToFigmaRGB(color) {
  let opacity = '';
  color = color.toLowerCase();
  if (color[0] === '#') color = color.slice(1);

  if (color.length === 3) {
    color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
  } else if (color.length === 8) {
    const arr = color.match(/(.{6})(.{2})/);
    color = arr[1];
    opacity = arr[2];
  }

  const num = parseInt(color, 16);
  const rgb = [num >> 16, num >> 8 & 255, num & 255];

  if (opacity) {
    rgb.push(parseInt(opacity, 16) / 255);
    return webRGBToFigmaRGB(rgb);
  } else {
    return webRGBToFigmaRGB(rgb);
  }
}
});

unwrapExports(convertColor);
var convertColor_1 = convertColor.figmaRGBToWebRGB;
var convertColor_2 = convertColor.webRGBToFigmaRGB;
var convertColor_3 = convertColor.figmaRGBToHex;
var convertColor_4 = convertColor.hexToFigmaRGB;

figma.loadFontAsync({ family: "Roboto", style: "Regular" });
let fontsize = 12;
let radiusSize = 0;
let dash = "1 2";
let getTheme, getSize, getRadius, getStroke;
let arrayAll = [];
let page = figma.currentPage;
let colorBorder = convertColor_4("#0072DC");
let colorText = convertColor_4("#0072DC");
let colorFill = convertColor_4("#0072DC");
function setStorage(storageName, storageValue) {
    figma.clientStorage.setAsync(storageName, JSON.stringify(storageValue)).catch(err => { console.log('error setting data'); });
}
function getSavedColor() {
    return new Promise((success, error) => {
        figma.clientStorage.getAsync('theme').then(theme => {
            let data = (theme) ? JSON.parse(theme) : [];
            success(data);
            getTheme = data;
            if (getTheme.length) {
                figma.ui.postMessage({
                    'theme': data
                });
            }
        }).catch(err => {
            error(err);
        });
    });
}
function getSavedSize() {
    return new Promise((success, error) => {
        figma.clientStorage.getAsync('size').then(size => {
            let data = (size) ? JSON.parse(size) : [];
            success(data);
            getSize = data;
            if (getSize.length) {
                figma.ui.postMessage({
                    'size': data
                });
            }
        }).catch(err => {
            error(err);
        });
    });
}
function getSavedRadius() {
    return new Promise((success, error) => {
        figma.clientStorage.getAsync('radius').then(radius => {
            let data = (radius) ? JSON.parse(radius) : [];
            success(data);
            getRadius = data;
            if (getRadius.length) {
                figma.ui.postMessage({
                    'radius': data
                });
            }
        }).catch(err => {
            error(err);
        });
    });
}
function getSavedStroke() {
    return new Promise((success, error) => {
        figma.clientStorage.getAsync('stroke').then(stroke => {
            let data = (stroke) ? JSON.parse(stroke) : [];
            success(data);
            getStroke = data;
            if (getStroke.length) {
                figma.ui.postMessage({
                    'stroke': data
                });
            }
        }).catch(err => {
            error(err);
        });
    });
}
figma.showUI(__html__, { width: 260, height: 322 });
getSavedColor();
getSavedSize();
getSavedRadius();
getSavedStroke();
function fireItUp() {
    setTimeout(function () {
        const nodes = figma.currentPage.selection;
        let selectedLayers = nodes;
        function errorMsg() {
            figma.notify('Make a selection to run Outline');
        }
        if (selectedLayers.length === 0) {
            errorMsg();
        }
        else {
            nodes.forEach(node => {
                if (node.type == 'INSTANCE' || node.type == 'FRAME' || node.type == 'COMPONENT' || node.type == 'COMPONENT_SET') {
                    if (node.layoutMode !== 'NONE') {
                        let transformPos = node.absoluteTransform;
                        let newX = transformPos[0][2];
                        let newY = transformPos[1][2];
                        let widthRight = node.paddingRight;
                        let heigthBottom = node.paddingBottom;
                        let widthLeft = node.paddingLeft;
                        let heightTop = node.paddingTop;
                        let height = node.height;
                        let width = node.width;
                        let sides = ['Top', 'Right', 'Bottom', 'Left'];
                        let children = node.children;
                        children = children.slice(0, -1);
                        sides.forEach(side => {
                            function create(rectHeight, rectWidth, rectX, rectY, textHeight, textwidth, textChar, textRotate, textX, textY, dash) {
                                const rect = figma.createRectangle();
                                const text = figma.createText();
                                rect.resize(rectWidth, rectHeight);
                                rect.name = node.name + " : " + side;
                                rect.strokeWeight = 1;
                                rect.fills = [{ type: 'SOLID', opacity: 0.1, color: colorFill }];
                                rect.strokes = [{ type: 'SOLID', color: colorBorder }];
                                rect.cornerRadius = radiusSize;
                                if (dash == "1 2") {
                                    rect.dashPattern = [2, 2];
                                }
                                if (dash == "2 3") {
                                    rect.dashPattern = [2, 3];
                                }
                                if (dash == "4 5") {
                                    rect.dashPattern = [4, 5];
                                }
                                if (dash == "10 2") {
                                    rect.dashPattern = [10, 2];
                                }
                                rect.x = rectX;
                                rect.y = rectY;
                                text.resize(textwidth, textHeight);
                                text.fills = [{ type: 'SOLID', color: colorText }];
                                text.textAlignHorizontal = 'CENTER';
                                text.textAlignVertical = 'CENTER';
                                text.fontSize = fontsize;
                                text.x = textX;
                                text.y = textY;
                                text.characters = textChar.toString();
                                text.rotation = textRotate;
                                arrayAll.push(rect);
                                arrayAll.push(text);
                            }
                            if (side == 'Right') {
                                if (widthRight) {
                                    create(height, widthRight, newX + node.width - node.paddingRight, newY, widthRight, height, widthRight, 90, newX + node.width - node.paddingRight, newY + height, dash);
                                }
                            }
                            if (side == 'Left') {
                                if (widthLeft) {
                                    create(height, widthLeft, newX, newY, widthLeft, height, widthLeft, 90, newX, newY + height, dash);
                                }
                            }
                            if (side == 'Top') {
                                if (heightTop) {
                                    create(heightTop, width, newX, newY, heightTop, width, heightTop, 0, newX, newY, dash);
                                }
                            }
                            if (side == 'Bottom') {
                                if (heigthBottom) {
                                    create(heigthBottom, width, newX, newY + node.height - heigthBottom, heigthBottom, width, heigthBottom, 0, newX, newY + node.height - heigthBottom, dash);
                                }
                            }
                        });
                        if (node.itemSpacing) {
                            children.forEach(child => {
                                if (child.visible == true) {
                                    let transformPos = child.absoluteTransform;
                                    let newX = transformPos[0][2];
                                    let newY = transformPos[1][2];
                                    let height = child.height;
                                    let width = child.width;
                                    const rect = figma.createRectangle();
                                    const text = figma.createText();
                                    if (node.layoutMode == 'VERTICAL') {
                                        rect.resize(width, node.itemSpacing);
                                        text.resize(width, node.itemSpacing);
                                        text.x = newX;
                                        text.y = newY + height;
                                        rect.x = newX;
                                        rect.y = newY + height;
                                    }
                                    else {
                                        rect.resize(node.itemSpacing, height);
                                        text.resize(height, node.itemSpacing);
                                        text.rotation = 90;
                                        text.x = newX + width;
                                        text.y = newY + height;
                                        rect.x = newX + width;
                                        rect.y = newY;
                                    }
                                    rect.strokeWeight = 1;
                                    rect.fills = [{ type: 'SOLID', opacity: 0.1, color: colorFill }];
                                    rect.strokes = [{ type: 'SOLID', color: colorBorder }];
                                    rect.cornerRadius = radiusSize;
                                    if (dash == "1 2") {
                                        rect.dashPattern = [2, 2];
                                    }
                                    if (dash == "2 3") {
                                        rect.dashPattern = [2, 3];
                                    }
                                    if (dash == "4 5") {
                                        rect.dashPattern = [4, 5];
                                    }
                                    if (dash == "10 2") {
                                        rect.dashPattern = [10, 2];
                                    }
                                    text.characters = node.itemSpacing.toString();
                                    text.fills = [{ type: 'SOLID', color: colorText }];
                                    text.textAlignHorizontal = 'CENTER';
                                    text.textAlignVertical = 'CENTER';
                                    text.fontSize = fontsize;
                                    arrayAll.push(rect);
                                    arrayAll.push(text);
                                }
                            });
                        }
                    }
                }
            });
            if (arrayAll.length >= 1) {
                let group = figma.group(arrayAll, page);
                group.name = "Outline";
                figma.notify("Outline ran");
            }
            else {
                figma.notify("Nothing to Outline");
            }
            setTimeout(() => {
                arrayAll = [];
            }, 400);
        }
    }, 100);
}
figma.ui.onmessage = msg => {
    page = figma.currentPage;
    if (msg.type === 'outline') {
        setStorage('theme', msg.theme);
        setStorage('size', msg.size);
        setStorage('radius', msg.radius);
        setStorage('stroke', msg.stroke);
        dash = msg.stroke;
        switch (msg.theme) {
            case "blue":
                colorBorder = convertColor_4("#0072DC");
                colorText = convertColor_4("#0072DC");
                colorFill = convertColor_4("#0072DC");
                break;
            case "purple":
                colorBorder = convertColor_4("#5E40F8");
                colorText = convertColor_4("#5E40F8");
                colorFill = convertColor_4("#7B61FF");
                break;
            case "pink":
                colorBorder = convertColor_4("#DD00A9");
                colorText = convertColor_4("#DD00A9");
                colorFill = convertColor_4("#DD00A9");
                break;
            case "yellow":
                colorBorder = convertColor_4("#A07D00");
                colorText = convertColor_4("#4d3c00");
                colorFill = convertColor_4("#FFD339");
                break;
            case "lime":
                colorBorder = convertColor_4("#01856A");
                colorText = convertColor_4("#024538");
                colorFill = convertColor_4("#16FFD0");
                break;
            case "black":
                colorBorder = convertColor_4("#000000");
                colorText = convertColor_4("#000000");
                colorFill = convertColor_4("#000000");
                break;
            case "white":
                colorBorder = convertColor_4("#FFFFFF");
                colorText = convertColor_4("#FFFFFF");
                colorFill = convertColor_4("#FFFFFF");
                break;
        }
        switch (msg.size) {
            case "small":
                fontsize = 8;
                break;
            case "medium":
                fontsize = 12;
                break;
            case "large":
                fontsize = 16;
                break;
        }
        switch (msg.radius) {
            case "small":
                radiusSize = 0;
                break;
            case "medium":
                radiusSize = 5;
                break;
            case "large":
                radiusSize = 10;
                break;
        }
        fireItUp();
    }
};
