import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BufferGeometry, Mesh, MeshStandardMaterial, Object3D } from "three";

const size = 1.2;
const spacingRock = 1.6;

export default function Rock(props: {
  index: number;
  health: number;
  depth: number;
  highlight: boolean;
}) {
  const { health, depth, index, highlight } = props;
  const { nodes: nodesMine } = useGLTF("/rock-mine.glb");
  const [laggedHealth, setLaggedHealth] = useState(3);

  const myMesh = useRef<Object3D>();

  const rockMesh1 = nodesMine["rock-1"] as Mesh<
    BufferGeometry,
    MeshStandardMaterial
  >;
  const rockMesh2 = nodesMine["rock-2"] as Mesh<
    BufferGeometry,
    MeshStandardMaterial
  >;
  const rockMesh3 = nodesMine["rock-3"] as Mesh<
    BufferGeometry,
    MeshStandardMaterial
  >;
  useFrame((_state, delta) => {
    if (laggedHealth > health) {
      setLaggedHealth(laggedHealth - delta * 3);
    } else if (health === 3) {
      setLaggedHealth(3);
    }
    const str = laggedHealth - health;
    const now = _state.clock.getElapsedTime();
    if (myMesh.current) {
      myMesh.current.rotation.x = Math.sin(now * 74) * 0.1 * str;
      myMesh.current.rotation.z = Math.cos(now * 44) * 0.1 * str;
    }
  });
  return (
    <group
      position={[
        (~~(index / 4) - 1.5) * spacingRock,
        ((index % 4) - 1.5) * spacingRock,
        -depth,
      ]}
      scale={[size, size, size]}
      rotation={[
        Math.PI * 0.5,
        (depth + index) * 10231.123,
        (depth + index * 2) * 6231.123,
      ]}
    >
      <mesh
        ref={myMesh}
        // scale={[1, 1, 1]}
        geometry={
          health === 3
            ? rockMesh1.geometry
            : health === 2
              ? rockMesh2.geometry
              : rockMesh3.geometry
        }
      >
        <meshStandardMaterial
          transparent
          opacity={0.15}
          visible={false}
          {...rockMesh1.material}
          color={highlight ? [0.25, 0.25, 0.25] : rockMesh1.material.color}
          // emissive={highlights[i] ? [0.125, 0.25, 0] : [0, 0, 0]}
        />
      </mesh>
    </group>
  );
}
