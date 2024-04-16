'use client'
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import { MeshProps, useFrame } from "@react-three/fiber";

export default function Experience(props :any) {
  const r = document.querySelector(':root');
  const rs = getComputedStyle(r!);
  const threeModelColorType = rs.getPropertyValue('--three-model-mode').trim().split('"')[1];
  const threeModelPlaceHolder = rs.getPropertyValue('--special-font').trim();
  const { scene } = useGLTF("/model/Stage5.glb");
  const lightRef = useRef();
  useHelper(lightRef, THREE.HemisphereLightHelper, 2);;
  const materialNew = {
    "Material": props.threeModelColorType === "dark" ? new THREE.MeshStandardMaterial({color: new THREE.Color('#d3deea')}) :  new THREE.MeshStandardMaterial({color: new THREE.Color('#484b6a')}),
  }
  // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// scene.add( light );
  return (
    <>
    <hemisphereLight  ref={lightRef} skyColor={0xffffbb} groundColor="white"  position={ [0, 5, 0] } intensity={ 1.0 } />
    {/* <directionalLight castShadow position={ [ 0, 2, -3 ] } intensity={ 1.0 } rotation={[0,Math.PI/2,0]} /> */}
    {/* <directionalLight castShadow position={ [ 0, 2, 0 ] } intensity={ 1.0 } /> */}
    {/* <ambientLight color="rgb(255, 192, 203)" intensity={ 13.5 } /> */}

    <Suspense
      fallback={
        <mesh position-y={-0.8} scale={[2, 3, 2]}>
          <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
          <meshBasicMaterial wireframe color={threeModelPlaceHolder} />
        </mesh>
      }
    >
      <group {...props} dispose={null} position={[0, -1.3, 0]} scale={[0.3,0.28,0.28]} rotation={[0,Math.PI + (Math.PI/2),0]}><primitive object={scene} /></group>
    </Suspense>
    </>
  );
}
useGLTF.preload("./Stage5.glb");
