import { Clone, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { BufferGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { lightColors } from "./lightColors";

const size = 0.75;

export default function Gem(props: { gemType: "sun" | "moon" }) {
  const { nodes: nodesGame } = useGLTF("/gems.glb");
  const { gemType } = props;

  const gemMesh = nodesGame[`gem-${gemType}`] as Mesh<
    BufferGeometry,
    MeshStandardMaterial
  >;
  const myGem = useRef<Group>(null);
  return (
    <Clone
      ref={myGem}
      scale={[size, size, size]}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      object={gemMesh}
    >
      <pointLight
        position={[0, 0, 0]}
        intensity={30}
        color={lightColors[gemType]}
      />
    </Clone>
  );
}
