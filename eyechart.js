function drawEyeChart() {
  const svg = document.getElementById('eyechart');
  const gridSize = 50; // Grid size in millimeters
  const gridSpacing = 10; // Spacing between grids in millimeters

  // Create a group element to hold the grid shapes
  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svg.appendChild(gridGroup);

  // Define the grid types
  const gridTypes = [
    // North type: Black grid col 0 and row 4
    {
      name: 'north',
      fill: (row, col) => (col === 0 || row === 4) ? 'black' : 'white'
    },
    // ... other grid types (define them here)
  ];

  // Draw multiple rows of grids
  const numRows = 10; // Number of rows
  const gridOffset = 50; // Offset from the top of the SVG
  
  const shape = draw5x5Grid(100);
  svg.appendChild(shape)
}

function draw5x5Grid(sideLength, shapeName) {

  const eastShape = createNumberPairSet([[1,2], [1,3]]);
  const northShape = createNumberPairSet([[1,2], [2,2]]);

  currentShape = northShape

  if (shapeName == "north") {
    currentShape = northShape;
  } else if (shapeName == "east") {
    currentShape = eastShape;
  }

 
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const cellWidth = Math.round(sideLength / 5) ;
  const cellHeight = cellWidth;

  console.log (cellWidth)

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      console.log( row, col)
      const cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cell.setAttribute("x", row * cellWidth);
      cell.setAttribute("y", col * cellHeight);
      console.log( row, row * cellWidth,  col, col * cellHeight)
      cell.setAttribute("width", cellWidth);
      cell.setAttribute("height", cellHeight);
 //     cell.setAttribute("stroke-width", 0); // Set stroke width to 0

      if (isPairInSet(currentShape, row,col)) {
        cell.setAttribute("fill", "white");
      } else {
        cell.setAttribute("fill", "black");
      }
      group.appendChild(cell);
    }
  }

  return group;
}




function createNumberPairSet(pairs) {
  const set = new Set();
  for (const pair of pairs) {
    const pairString = `${pair[0]} ${pair[1]}`;
    set.add(pairString);
  }
  return set;
}

function isPairInSet(set, a, b) {
  const pairString = `${a} ${b}`;
  return set.has(pairString);
}


function drawEyeChart(svgContainer, scale = 1) {

  let sideLength = 50

  // Create the SVG element if it doesn't exist
  if (svgContainer.childElementCount  == 0) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", sideLength + "mm");
      svg.setAttribute("height", sideLength + "mm");
      svgContainer.appendChild(svg);
  } else {
    svg = svgContainer.firstElementChild
    // Remove the previous grids
    svg.innerHTML = "";

    // Update the SVG element's dimensions
    svg.setAttribute("width", sideLength + "mm");
    svg.setAttribute("height", sideLength + "mm");

  }



  group = drawEShape(10, "eastShape", scale)
  
  svg.appendChild(group);
  group = drawEShape(10, "eastShape", scale)
  
  svg.appendChild(group);

}

///// Main Program
let svg;
let scale = 1;
// Get the draw button element
const drawButton = document.getElementById("drawButton");
const svgContainer = document.getElementById("svgContainer");

// Add a click event listener to the button
drawButton.addEventListener("click", () => {
  // Get a random side length between 100 and 200 mm
  scale += 2

  drawEyeChart(svgContainer, scale)
});