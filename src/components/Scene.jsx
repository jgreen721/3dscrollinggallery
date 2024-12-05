import React, {useState,useEffect, useMemo, useRef} from 'react'
import { Scroll,PerspectiveCamera, useScroll } from '@react-three/drei';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

const LINE_NB_POINTS = 1200;


const Scene = () => {
    const gallery = useGLTF("./hallwaygallery1a.glb");
    // const [cameraX,setCameraX] = useState(-3)
    const [cameraCoord,setCameraCoord] = useState([-3,.615,1.85])
    const [scale,setScale] = useState(.35)
    const scroll = useScroll();
    const cameraRef = useRef();
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(-3.5, .6, 1.85),
            new THREE.Vector3(-3, .65, 1.8),
            new THREE.Vector3(-2.5, .6, 1.85),
            new THREE.Vector3(-2, .65, 1.78),
            new THREE.Vector3(-1, .6, 1.87),
            new THREE.Vector3(0, .65, 1.85),
            new THREE.Vector3(.5, .6, 1.84),
            new THREE.Vector3(1, .65, 1.85),
      
          ],
          false,
          "catmullrom",
          0.5
        );
    });

        const linePoints = useMemo(() => {
            return curve.getPoints(LINE_NB_POINTS);
          }, [curve]);


          const shape = useMemo(() => {
            const shape = new THREE.Shape();
            shape.moveTo(0, -0.2);
            shape.lineTo(0, 0.2);
        
            return shape;
          }, [curve]);


          console.log(linePoints.length)


    useEffect(()=>{
        if(window.innerWidth < 650){
            // set to mobile
            setScale(.265);
     
            setCameraCoord([-2.1,.45,1.35])
        }
    },[]);

    useFrame((_state,delta)=>{
        // console.log("Frame!!!",scroll.offset);
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
          );
          const curPoint = linePoints[curPointIndex];
          // console.log(curPoint);
          cameraRef.current.position.lerp(curPoint,delta * 24);
        
    })
  return (
    <Scroll>
        <group ref={cameraRef} position={[-3,.615,1.85]}>
            <PerspectiveCamera makeDefault={true}/>
        </group>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} />
        </mesh>
        <group>
            <primitive scale={scale} rotation={[0,-Math.PI * .5,0]} object={gallery.scene}/>
        </group>
    </Scroll>
  )
}

export default Scene