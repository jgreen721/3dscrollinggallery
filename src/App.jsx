import {Canvas} from "@react-three/fiber"
import { Environment, ScrollControls } from "@react-three/drei"
import Experience from "./Experience"
import './App.css'

function App() {

  return (
    <div className="app">
      <Canvas>
        <color attach="background" args={["black"]}/>
        <Environment preset="city" background={false}/>
        <ScrollControls pages={5}>
          <Experience/>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
