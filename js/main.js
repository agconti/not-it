// import dependencies
var Engine = famous.core.Engine
  , Modifier = famous.core.Modifier
  , Transform = famous.core.Transform
  , Surface = famous.core.Surface
  , GenericSync = famous.inputs.GenericSync
  
  //  interaction varaibles 
  , TransitionableTransform = new famous.transitions.TransitionableTransform()
  , Draggable = famous.modifiers.Draggable
  , tranformOptions = {curve: "easeInOut", duration: 150}
  
  // view 
  , mainContext = Engine.createContext()
  
  // helpers
  , initialTime = Date.now()
  , isToggled = false
  , angle = 0
  , index = 0


// surfaces 

function surfaceFactory (){
  var surface = new Surface({ 
    size: [100, 100] 
  , origin: [0.5, 0.5]
  , align: [0.5, 0.5]
  , properties: {
      background: 'red'
    }
  })
  console.log('newSurface ' + index)
  index += 1
  console.log(surface)
  return surface
}

var surface = surfaceFactory()

var block = new Surface({
    size: [100, 100],
    properties: {
        backgroundColor: '#FA5C4F'
    }
})

// Modifers


function activeSpin () {
  return Transform.rotateY(0.004 * (Date.now() - initialTime))
}

var touchModifier = new Modifier({
  origin: [0.5, 0.5]
, align: [0.5, 0.15]
}) 


var modifier = new Modifier({
    origin: [0.5,0.5],
    align: [0.5,0.85],
})

// Interaction 

// Touch events
var sync = new GenericSync(['mouse', 'touch'])
Engine.pipe(sync)

sync.on('start', function (e) {
  block.setContent('start')
  
  // create new touch surface
  var newSurface = surfaceFactory()
  var newDraggable = new Draggable()
  newSurface.setContent('start -- new ' +  index)
  newSurface.properties.background = randomColor()
  newSurface.pipe(newDraggable)
  touchState.add(newDraggable).add(newSurface)

  // rotate all touch surfaces 
  touchModifier.transformFrom(rotate)
})

sync.on('update', function (e) {
  block.setContent('update')
})

sync.on('end', function (e) {
  block.setContent('end')
  touchModifier.halt()
})


function rotateManger (modifer) {
  
  if(isToggled){
    isToggled = !isToggled
    return modifer.transformFrom(rotate)
  }
  isToggled = !isToggled
  modifer.halt()
}


function rotate () {
    angle += 0.01
    return Transform.rotateZ(angle)
}


function randomColor () {
  return '#'+Math.floor(Math.random()*16777215).toString(16)
}

// allow the surfaceto be dragged
var draggable = new Draggable()
surface.pipe(draggable)
// assigns the transform property of the modifier
// as the argument of .transformFrom()
modifier.transformFrom(rotate)

block.on('click', function(){
  rotateManger(modifier)
})



// Tree
var touchState = mainContext.add(touchModifier)
touchState.add(draggable).add(surface)
mainContext.add(modifier).add(block)




