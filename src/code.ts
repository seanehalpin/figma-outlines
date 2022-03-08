figma.loadFontAsync({ family: "Roboto", style: "Regular" })

let r = 221
let g = 0
let b = 169
let fontsize = 12
let radiusSize = 0
let dash = "1 2"
let frameId = ''
let getTheme, getSize, getRadius, getStroke

let arrayAll = [] as any
let page = figma.currentPage

function setStorage(storageName,storageValue) {
  figma.clientStorage.setAsync(storageName, JSON.stringify(storageValue)).catch(err => { console.log('error setting data') })
  console.log("storage set",storageName,storageValue)
}

function getSavedColor() {
  return new Promise((success, error) => {
    figma.clientStorage.getAsync('theme').then(theme => {
      let data = (theme) ? JSON.parse(theme) : [] ;
      success(data)
      getTheme = data
      if(getTheme.length){
        figma.ui.postMessage({
          'theme': data
        })
      }
    }).catch(err => {
      error(err)
    })
  })
}

function getSavedSize() {
  return new Promise((success, error) => {
    figma.clientStorage.getAsync('size').then(size => {
      let data = (size) ? JSON.parse(size) : [] ;
      success(data)
      getSize = data
      if(getSize.length){
        figma.ui.postMessage({
          'size': data
        })
      }
    }).catch(err => {
      error(err)
    })
  })
}

function getSavedRadius() {
  return new Promise((success, error) => {
    figma.clientStorage.getAsync('radius').then(radius => {
      let data = (radius) ? JSON.parse(radius) : [] ;
      success(data)
      getRadius = data
      if(getRadius.length){
        figma.ui.postMessage({
          'radius': data
        })
      }
    }).catch(err => {
      error(err)
    })
  })
}

function getSavedStroke() {
  return new Promise((success, error) => {
    figma.clientStorage.getAsync('stroke').then(stroke => {
      let data = (stroke) ? JSON.parse(stroke) : [] ;
      success(data)
      getStroke = data
      if(getStroke.length) {
        figma.ui.postMessage({
          'stroke': data
        })
      }
    }).catch(err => {
      error(err)
    })
  })
}

figma.showUI(__html__, {width: 260, height: 322 })

getSavedColor()
getSavedSize()
getSavedRadius()
getSavedStroke()

function fireItUp(){

  let color1 = r/255
  let color2 = g/255
  let color3 = b/255

  setTimeout(function(){

    const nodes = figma.currentPage.selection
    let selectedLayers = nodes  

    function errorMsg() {
      figma.notify('Make a selection to run Outline')
    }

    if (selectedLayers.length === 0) {
      errorMsg()
    } else {

      nodes.forEach(node => {
        
        if(node.type == 'INSTANCE' || node.type == 'FRAME' || node.type =='COMPONENT' || node.type == 'COMPONENT_SET') {

          if(node.layoutMode !== 'NONE') {

            let transformPos = node.absoluteTransform
            let newX = transformPos[0][2]
            let newY = transformPos[1][2] 

            let widthRight = node.paddingRight
            let heigthBottom = node.paddingBottom
            let widthLeft = node.paddingLeft
            let heightTop = node.paddingTop
            let height = node.height
            let width = node.width

            // frameId = node.id

            let sides = ['Top', 'Right', 'Bottom', 'Left']

            let children = node.children
            children = children.slice(0, -1)

            sides.forEach(side => {

              function create(rectHeight,rectWidth,rectX,rectY,textHeight,textwidth,textChar,textRotate,textX,textY,dash) {
                
                const rect = figma.createRectangle()
                const text = figma.createText()
                rect.resize(rectWidth,rectHeight)
                rect.name = node.name + " : " + side
                rect.strokeWeight = 1
                rect.fills = [{type: 'SOLID', opacity: 0.1, color: {r: color1, g: color2, b: color3}}]
                rect.strokes = [{type: 'SOLID', color: {r: color1, g: color2, b: color3}}]
                rect.cornerRadius = radiusSize
                if (dash == "1 2") {
                  rect.dashPattern = [2,2]
                }
                if(dash == "2 3") {
                  rect.dashPattern = [2,3]
                }
                if(dash == "4 5") {
                  rect.dashPattern = [4,5]
                }
                if(dash == "10 2") {
                  rect.dashPattern = [10,2]
                }
                
                rect.x = rectX
                rect.y = rectY
                text.resize(textwidth,textHeight)
                text.fills = [{type: 'SOLID', color: {r: color1, g: color2, b: color3}}]
                text.textAlignHorizontal = 'CENTER'
                text.textAlignVertical = 'CENTER'
                text.fontSize = fontsize
                text.x = textX
                text.y = textY
                text.characters = textChar.toString()
                text.rotation = textRotate

                arrayAll.push(rect)
                arrayAll.push(text)
              }

              if (side == 'Right') {
                if (widthRight) {
                  create(height,widthRight, newX + node.width - node.paddingRight, newY, widthRight,height, widthRight, 90, newX + node.width - node.paddingRight, newY + height, dash)
                }
              }
              if (side == 'Left') {
                if (widthLeft) {
                  create(height,widthLeft, newX, newY, widthLeft, height, widthLeft, 90, newX, newY + height, dash)
                }
              }
              if (side == 'Top') {
                if (heightTop) {
                  create(heightTop,width, newX, newY, heightTop, width, heightTop, 0, newX, newY, dash)
                }
              }
              if (side == 'Bottom') {
                if (heigthBottom) {
                  create(heigthBottom,width, newX, newY + node.height - heigthBottom, heigthBottom, width, heigthBottom, 0, newX, newY + node.height - heigthBottom, dash)
                }
              }
            })

            // console.log(children)

            if(node.itemSpacing) {

              children.forEach(child => {

                if(child.visible == true) {

                  let transformPos = child.absoluteTransform
                  let newX = transformPos[0][2]
                  let newY = transformPos[1][2]
                  let height = child.height
                  let width = child.width

                  const rect = figma.createRectangle()
                  const text = figma.createText()

                  if(node.layoutMode == 'VERTICAL') {
                    rect.resize(width, node.itemSpacing)
                    text.resize(width, node.itemSpacing)
                    text.x = newX
                    text.y = newY + height
                    rect.x = newX
                    rect.y = newY + height
                    
                  } else {
                    rect.resize(node.itemSpacing, height)
                    text.resize(height, node.itemSpacing)
                    text.rotation = 90
                    text.x = newX + width
                    text.y = newY + height
                    rect.x = newX + width
                    rect.y = newY
                  }

                  rect.strokeWeight = 1
                  rect.fills = [{type: 'SOLID', opacity: 0.1, color: {r: color1, g: color2, b: color3}}]
                  rect.strokes = [{type: 'SOLID', color: {r: color1, g: color2, b: color3}}]

                  rect.cornerRadius = radiusSize

                  if (dash == "1 2") {
                    rect.dashPattern = [2,2]
                  }
                  if(dash == "2 3") {
                    rect.dashPattern = [2,3]
                  }
                  if(dash == "4 5") {
                    rect.dashPattern = [4,5]
                  }
                  if(dash == "10 2") {
                    rect.dashPattern = [10,2]
                  }

                  text.characters = node.itemSpacing.toString()
                  text.fills = [{type: 'SOLID', color: {r: color1, g: color2, b: color3}}]
                  text.textAlignHorizontal = 'CENTER'
                  text.textAlignVertical = 'CENTER'
                  text.fontSize = fontsize
                  arrayAll.push(rect)
                  arrayAll.push(text)
                }
              })
            }
          }
        }
      })
      // console.log(arrayAll.length)

      if (arrayAll.length >= 1) {
        let group = figma.group(arrayAll,page)
        group.name = "Outline"
        figma.notify("Outline ran")
      } else {
        figma.notify("Nothing to Outline")
      }

      setTimeout(() => {
        arrayAll = []
      }, 400);
      
    }
  }, 100)
}

figma.ui.onmessage = msg => {

  page = figma.currentPage

  if (msg.type === 'outline') {
    
    setStorage('theme', msg.theme)
    setStorage('size', msg.size)
    setStorage('radius', msg.radius)
    setStorage('stroke', msg.stroke)

    dash = msg.stroke
    // radiusSize = msg.radius

    switch(msg.theme){
      case "blue":
        r = 0
        g = 114
        b = 220
        break
      case "purple":
        r = 94
        g = 64
        b = 248
        break
      case "pink":
        r = 221
        g = 0
        b = 169
        break
      case "yellow":
        r = 255
        g = 221
        b = 57
        break
      case "lime":
        r = 22
        g = 255
        b = 208
        break
      case "black":
        r = 0
        g = 0
        b = 0
        break
      case "white":
        r = 255
        g = 255
        b = 255
        break
    }

    switch(msg.size){
      case "small":
        fontsize = 8
        break
      case "medium":
        fontsize = 12
        break
      case "large":
        fontsize = 16
        break
    }

    switch(msg.radius){
      case "small":
        radiusSize = 0
        break
      case "medium":
        radiusSize = 5
        break
      case "large":
        radiusSize = 10
        break
    }

    fireItUp()
  }
}





