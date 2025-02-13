import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  Euler,
  Group,
  Object3D,
  Quaternion,
  Ray,
  Sphere,
  Vector3,
} from "three";
import Rock from "./three/Rock";

const spacingRock = 1.6;
const tempSphere = new Sphere(undefined, 1.5);
const tempVec3 = new Vector3();

const pickaxeHomePosition = new Vector3(0.75, -1.25, 2);
const pickaxeHomeRotation = new Euler(0, -1.25, -0.75);
const pickaxeHomeQuaternion = new Quaternion().setFromEuler(
  pickaxeHomeRotation,
);

function MiningGame() {
  const { nodes: nodesPickaxe } = useGLTF("/pickaxe-iron.glb");
  const { nodes: nodesMine } = useGLTF("/rock-mine.glb");
  const [pickaxePosition, setPickaxePosition] = useState(new Vector3());
  const [pickaxeQuaternion, setPickaxeQuaternion] = useState(new Quaternion());
  const [pickaxeAction, setPickaxeAction] = useState(0);
  const myFlash = useRef<Object3D>();
  const myPickaxe = useRef<Object3D>();
  const myTunnel1 = useRef<Object3D>();
  const myTunnel2 = useRef<Object3D>();
  const myRailTie1 = useRef<Object3D>();
  const myRailTie2 = useRef<Object3D>();
  const myGroup = useRef<Group>();

  const [flashPos, setFlashPos] = useState(new Vector3());
  useFrame((_state, delta) => {
    if (!myGroup.current) {
      return;
    }
    if (pickaxeAction > 0) {
      setPickaxeAction(Math.max(0, pickaxeAction - delta * 3));
    }
    if (myPickaxe.current) {
      const a = Math.pow(pickaxeAction, 2);
      myPickaxe.current.position.lerpVectors(
        pickaxeHomePosition,
        pickaxePosition,
        a,
      );
      myPickaxe.current.quaternion.slerpQuaternions(
        pickaxeHomeQuaternion,
        pickaxeQuaternion,
        a,
      );
    }
    // const now = clock.getElapsedTime();
    if (myFlash.current) {
      const newScale = myFlash.current.scale.x - 6 * delta;
      if (newScale > 0) {
        myFlash.current.visible = true;
        myFlash.current.scale.setScalar(newScale);
      } else {
        myFlash.current.visible = false;
      }
    }
    if (
      myGroup.current.position.z <
      rockDepths.reduce((pv, cv) => Math.min(pv, cv)) - 1
    ) {
      myGroup.current.position.z += delta;
    }
    const posZ = myGroup.current.position.z;
    if (myTunnel1.current && myTunnel2.current) {
      myTunnel1.current.position.z = Math.round(-posZ / 8) * 8;
      myTunnel2.current.position.z = Math.round(-posZ / 8 + 0.5) * 8 - 4;
    }
    if (myRailTie1.current && myRailTie2.current) {
      myRailTie1.current.position.z = Math.round(-posZ / 4) * 4;
      myRailTie2.current.position.z = Math.round(-posZ / 4 + 0.5) * 4 - 2;
    }
  });
  const [rockDepths, setRockDepths] = useState(
    Array.from({ length: 16 }, () => 0),
  );
  const [rockHighlights, setRockHighlights] = useState(
    Array.from({ length: 16 }, () => false),
  );

  const [rockHealths, setRockHealths] = useState(
    Array.from({ length: 16 }, () => 3),
  );

  const [ray, setRay] = useState<Ray>();

  useEffect(() => {
    if (!myGroup.current || !ray) {
      return;
    }
    // let bestHitIndex = -1;
    // let bestHitDepth = Infinity;
    const candidates: number[] = [];
    const newRockHighlights = rockHighlights.slice();
    const flashPos = new Vector3();
    for (let i = 0; i < rockDepths.length; i++) {
      tempSphere.center.x = (~~(i / 4) - 1.5) * spacingRock;
      tempSphere.center.y = ((i % 4) - 1.5) * spacingRock;
      tempSphere.center.z = myGroup.current.position.z - rockDepths[i];
      if (
        ray.intersectSphere(tempSphere, tempVec3) &&
        Math.abs(tempVec3.x) < 2.4 &&
        Math.abs(tempVec3.y) < 2.6 &&
        tempSphere.center.z > -1.5
      ) {
        candidates.push(i);
        flashPos.add(tempVec3);
      }
    }
    flashPos.divideScalar(candidates.length);
    flashPos.z -= 5;
    flashPos.multiplyScalar(0.9);
    flashPos.z += 5;
    setFlashPos(flashPos.clone());
    for (let i = 0; i < rockHighlights.length; i++) {
      newRockHighlights[i] = candidates.includes(i);
    }
    // rockHighlights[i] = !!ray.intersectSphere(tempSphere, tempVec3);
    let changed = false;
    for (let i = 0; i < rockHighlights.length; i++) {
      if (rockHighlights[i] !== newRockHighlights[i]) {
        changed = true;
        break;
      }
    }
    if (changed) {
      setRockHighlights(newRockHighlights);
    }
  }, [ray, rockDepths, rockHighlights]);
  return (
    <>
      <mesh
        visible
        position={[0, 0, 3.75]}
        rotation={[0, 0, 0]}
        onPointerMove={(ev) => {
          setRay(ev.ray.clone());
        }}
        onPointerDown={(ev) => {
          setRay(ev.ray.clone());
          if (!myGroup.current) {
            return;
          }
          let changed = false;
          for (let i = 0; i < rockHighlights.length; i++) {
            if (rockHighlights[i]) {
              if (rockHealths[i] > 1) {
                rockHealths[i]--;
              } else {
                rockDepths[i]++;
                rockHealths[i] = 3;
              }
              changed = true;
            }
          }
          if (changed) {
            if (myFlash.current) {
              myFlash.current.scale.setScalar(0.5);
              myFlash.current.position.copy(flashPos);
            }
            setRockHealths(rockHealths.slice());
            setRockDepths(rockDepths.slice());
            const mpa = myPickaxe.current;
            if (mpa) {
              mpa.position.copy(flashPos);
              mpa.lookAt(new Vector3(0, 0, 3));
              mpa.rotateY(Math.PI * -0.5);
              mpa.translateY(-1);
              mpa.translateZ(-0.2);
              setPickaxePosition(mpa.position.clone());
              setPickaxeQuaternion(mpa.quaternion.clone());
              setPickaxeAction(1);
              // mpa.rotateX(Math.PI * -0.35);
            }
          }
        }}
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <meshStandardMaterial
          color="green"
          transparent
          opacity={0.15}
          visible={false}
        />
      </mesh>
      <Clone
        ref={myPickaxe}
        scale={[2, 2, 2]}
        position={pickaxeHomePosition}
        rotation={pickaxeHomeRotation}
        object={nodesPickaxe["iron-pickaxe"]}
      />
      {/* <ambientLight intensity={0.25} /> */}
      <pointLight position={[0, 0, 5]} intensity={70} color={[1, 0.7, 0.3]} />
      <mesh
        ref={myFlash}
        position={[0, 0, 2]}
        scale={[0.3, 0.3, 0.3]}
        rotation={[Math.PI * 0.5, 0, 0]}
        // scale={[1, 1, 1]}
        geometry={nodesMine["flash"].geometry}
      >
        <meshBasicMaterial
          transparent
          opacity={1}
          color={[3.25, 2.75, 1.25]}
          // emissive={highlights[i] ? [0.125, 0.25, 0] : [0, 0, 0]}
        />
      </mesh>
      <Clone object={nodesMine["rail-metal"]} position={[0, -2.7, 2.5]} />
      <group ref={myGroup} position={[0, 0, -1]}>
        <Clone
          ref={myRailTie1}
          // scale={[1, 1, 1]}
          position={[0.7, -3, 0]}
          object={nodesMine["rail-tie"]}
        />
        <Clone
          ref={myRailTie2}
          // scale={[1, 1, 1]}
          position={[0.7, -3, 0]}
          rotation={[Math.PI, Math.PI * 0.5, 0]}
          object={nodesMine["rail-tie"]}
        />
        <Clone
          ref={myTunnel1}
          object={nodesMine["tunnel"]}
          position={[0, 0, 0]}
        />
        <Clone
          ref={myTunnel2}
          object={nodesMine["tunnel"]}
          position={[0, 0, 0]}
        />
        {Array.from({ length: 16 }, (_, i) => (
          <Rock
            key={i}
            index={i}
            health={rockHealths[i]}
            depth={rockDepths[i]}
            highlight={rockHighlights[i]}
          />
        ))}
      </group>
    </>
  );
}

useGLTF.preload("/pickaxe-iron.glb");

export default MiningGame;
