
figma.showUI(__html__, {width: 320, height: 237 })


figma.ui.onmessage = msg => {

  if (msg.type === 'create-shapes') {

    const nodes: SceneNode[] = [];

    for (let i = 0; i < msg.count; i++) {

      var shape;

      if (msg.shape === 'rectangle') {
        shape = figma.createRectangle();
      } else if (msg.shape === 'triangle') {
        shape = figma.createPolygon();
      } else {
        shape = figma.createEllipse();
      }

      shape.x = i * 150;
      shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(shape);
      nodes.push(shape);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
