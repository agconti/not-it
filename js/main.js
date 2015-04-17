// import dependencies
var Engine = famous.core.Engine
  , Modifier = famous.core.Modifier
  , Transform = famous.core.Transform
  , Surface = famous.core.Surface
  , GenericSync = famous.inputs.GenericSync
  
  //  interaction varaibles 
  , TransitionableTransform = new famous.transitions.TransitionableTransform()
  , Draggable = famous.modifiers.Draggable
  , tranformOptions = { curve: "easeInOut", duration: 150 }
  
  // view 
  , mainContext = Engine.createContext()
  
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
  console.log('surface ' + index)
  index += 1
  console.log(surface)
  return surface
}

var surface = surfaceFactory()

// Modifers

var touchModifier = new Modifier({
  origin: [0.5, 0.5]
, align: [0.5, 0.15]
}) 


// Interaction 

// Touch events
var sync = new GenericSync(['mouse', 'touch'])
Engine.pipe(sync)

sync.on('start', function (e) {
  
  // create new touch surface
  var surface = surfaceFactory()
    , draggable = new Draggable()
    , touchPosition = new Modifier({
        align: [ e.clientX / window.innerWidth
               , e.clientY / window.innerHeight
               ]
      })
  surface.setContent('start -- new ' +  index)
  surface.properties.background = randomColor()
  surface.pipe(draggable)
  touchState
    .add(draggable)
    .add(touchPosition)
    .add(surface)

  // rotate all touch surfaces 
  touchModifier.transformFrom(rotate)
})

sync.on('update', function (e) {

})

sync.on('end', function (e) {

  // stop all touch modifiers
  touchModifier.halt()
})


function rotate () {
    angle += 0.02
    return Transform.rotateZ(angle)
}


function randomColor () {
  return '#'+Math.floor(Math.random()*16777215).toString(16)
}


// Tree
var touchState = mainContext.add(touchModifier)
