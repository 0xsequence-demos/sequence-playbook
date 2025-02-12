import { Clone, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MintStatus } from "src/examples/MintTokenWidget-example";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";
function PickAxe3D(props: { mintStatus: MintStatus }) {
  const { mintStatus } = props;
  const { nodes, materials } = useGLTF("/pickaxe-iron.glb");
  const glowMesh = nodes["glow"] as Mesh<BufferGeometry, Material>;
  const myGroup = useRef<Group>();
  const myGlow = useRef<Mesh<BufferGeometry, Material>>();
  const { opacity } = useSpring({ opacity: mintStatus === "pending" ? 1 : 0 });
  useFrame(({ clock }) => {
    if (!myGroup.current) {
      return;
    }
    const now = clock.getElapsedTime();
    myGroup.current.rotation.y = now;
    myGroup.current.rotation.x = Math.sin(now * 4) * 0.1;
  });
  console.log(nodes, materials);
  return (
    <group ref={myGroup}>
      {mintStatus === "successs" ? (
        <Clone
          scale={[5, 5, 5]}
          position={[0, -1.75, 0]}
          object={nodes["iron-pickaxe"]}
        />
      ) : (
        <>
          <Clone
            scale={[5, 5, 5]}
            position={[0, -1.75, 0]}
            object={nodes["wire"]}
          />
          <Clone
            renderOrder={9}
            scale={[5, 5, 5]}
            position={[0, -1.75, 0]}
            object={nodes["black"]}
          />
        </>
      )}
      <mesh
        ref={myGlow}
        renderOrder={10}
        scale={[5, 5, 5]}
        position={[0, -1.75, 0]}
        geometry={glowMesh.geometry}
      >
        <animated.material {...glowMesh.material} opacity={opacity} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/pickaxe-iron.glb");

export default PickAxe3D;
