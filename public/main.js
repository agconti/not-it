function surfaceFactory(){var e=new Surface({size:[100,100],origin:[.5,.5],align:[.5,.5],properties:{background:"red"}});return console.log("newSurface "+index),index+=1,console.log(e),e}function activeSpin(){return Transform.rotateY(.004*(Date.now()-initialTime))}function rotateManger(e){return isToggled?(isToggled=!isToggled,e.transformFrom(rotate)):(isToggled=!isToggled,void e.halt())}function rotate(){return angle+=.01,Transform.rotateZ(angle)}function randomColor(){return"#"+Math.floor(16777215*Math.random()).toString(16)}var Engine=famous.core.Engine,Modifier=famous.core.Modifier,Transform=famous.core.Transform,Surface=famous.core.Surface,GenericSync=famous.inputs.GenericSync,TransitionableTransform=new famous.transitions.TransitionableTransform,Draggable=famous.modifiers.Draggable,tranformOptions={curve:"easeInOut",duration:150},mainContext=Engine.createContext(),initialTime=Date.now(),isToggled=!1,angle=0,index=0,surface=surfaceFactory(),block=new Surface({size:[100,100],properties:{backgroundColor:"#FA5C4F"}}),touchModifier=new Modifier({origin:[.5,.5],align:[.5,.15]}),modifier=new Modifier({origin:[.5,.5],align:[.5,.85]}),sync=new GenericSync(["mouse","touch"]);Engine.pipe(sync),sync.on("start",function(e){block.setContent("start");var o=surfaceFactory(),n=new Draggable;o.setContent("start -- new "+index),o.properties.background=randomColor(),o.pipe(n),touchState.add(n).add(o),touchModifier.transformFrom(rotate)}),sync.on("update",function(e){block.setContent("update")}),sync.on("end",function(e){block.setContent("end"),touchModifier.halt()});var draggable=new Draggable;surface.pipe(draggable),modifier.transformFrom(rotate),block.on("click",function(){rotateManger(modifier)});var touchState=mainContext.add(touchModifier);touchState.add(draggable).add(surface),mainContext.add(modifier).add(block);