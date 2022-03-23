const gridElement = document.getElementById('grid')
const gridItems = gridElement.querySelectorAll('.grid-item')
const msgElement = document.getElementById('msg')

let destinations = {
  x: 10,
  y: 10
}

let nodes = []
let destinationSelected = false

for (let i = 1; i < 11; ++i) {
  for (let j = 1; j < 11; ++j) {
    const cost = Math.floor(Math.random() * 20) + 1
    nodes = [
      ...nodes,
      {
        x: i,
        y: j,
        cost
      }
    ]
    gridItems[(i - 1) * 10 + (j - 1)].innerText = cost
  }
}

console.log('nodes: ', nodes)

let totalCost = 0;
let costArray = [[]]
let path = []

let outputCost = [];
for(let i=1;i<11;i++){
  for (let j = 1; j < 11; j++){
    const currentCost = nodes.find((item) => item.x == i && item.y === j).cost
    if (i == 1 && j == 1) {
      outputCost = [
        ...outputCost,
        nodes.find((item) => item.x == 1 && item.y == 1)
      ];
      path.push({
        x: 0, 
        y: 0
      })
    }
    else {
      if (i == 1) {
        outputCost = [
          ...outputCost,
          {
            x: i,
            y: j,
            cost:
              outputCost.find((item) => item.x == i && item.y === j - 1).cost + currentCost
          }
        ]
        console.log('i == 1; i, j', i, j)
        path.push({
          x: i,
          y: j - 1,
        })
      } else if (j == 1) {
        outputCost = [
          ...outputCost,
          {
            x: i,
            y: j,
            cost:
              outputCost.find((item) => item.x == i - 1 && item.y === j).cost + currentCost
          }
        ]
        path.push({
          x: i - 1,
          y: j,
        })
      } else {
        const cost1 = outputCost.find((item) => item.x === i - 1 && item.y === j)
        const cost2 = outputCost.find((item) => item.x === i && item.y === j - 1) 
        // console.log('costs: ',i, j, cost1, cost2)
        const minCost = cost1.cost > cost2.cost ? cost2 : cost1

        outputCost = [
          ...outputCost,
          {
            x: i,
            y: j,
            cost: minCost.cost + currentCost
          }
        ]
        
        path.push({
          x: minCost.x,
          y: minCost.y,
        })
      }
    }
    // console.log('i, j, outputCost: ', i, j, outputCost)
  }
}
   
console.log('outputCost: ', outputCost)
console.log('path: ', path)

const colorizeTree = (_index) => {
  let x = Math.floor(_index / 10) + 1
  let y = _index % 10 + 1
  console.log('sm x, y: ', x, y)
  totalCost = outputCost.find((item) => item.x === x && item.y === y).cost
  msgElement.innerText = 'Minimum Cost: ' + totalCost
  while (1) {
    let index = (x - 1) * 10 + (y - 1)
    x = path[index].x
    y = path[index].y
    index = (x - 1) * 10 + (y - 1)
    if(x==1 && y==1) break
    gridItems[index].style.backgroundColor = 'green'
  }
}

gridElement.addEventListener('click', (e) => {
  const target = e.target
  if (target.classList.contains('grid-item')
    && !target.classList.contains('grid-item1')
    && !destinationSelected
  ) {
    target.style.backgroundColor = 'Blue'
    const _index = Array.from(gridItems).findIndex((item) => item === target)
    destinationSelected = true
    colorizeTree(_index)
  }
})