import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BufferGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import Gem from "./Gem";

const size = 1.2;
const spacingRock = 1.6;

export default function Rock(props: {
  index: number;
  health: number;
  depth: number;
  highlight: boolean;
  gem?: "sun" | "moon";
}) {
  const { health, depth, index, highlight, gem } = props;
  const { nodes: nodesMine } = useGLTF("/rock-mine.glb");
  const maxHealth = gem ? 10 : 3;
  const [laggedHealth, setLaggedHealth] = useState(maxHealth);
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

  const myMesh = useRef(rockMesh1);
  useFrame((_state, delta) => {
    if (laggedHealth > health) {
      setLaggedHealth(laggedHealth - delta * 3);
    } else if (health > laggedHealth) {
      setLaggedHealth(health);
    }
    const str = laggedHealth - health;
    const now = _state.clock.getElapsedTime();
    if (myMesh.current) {
      myMesh.current.rotation.x = Math.sin(now * 74) * 0.1 * str;
      myMesh.current.rotation.z = Math.cos(now * 44) * 0.1 * str;
    }
  });

  const colorDepth =
    Math.round(
      depth / 2 + Math.sin(index * 0.043 * (3 + Math.sin(depth))) * 2,
    ) / 2;
  const colorVar = Math.min(colorDepth / 100, 0.025);

  const color = [
    0.15 + Math.sin(colorDepth + 4) * colorVar,
    0.15 + Math.cos(colorDepth * -2 + 3) * colorVar,
    0.15 + Math.sin(colorDepth * 3 + 4) * colorVar,
  ];
  if (highlight) {
    for (let i = 0; i < color.length; i++) {
      color[i] += 0.125;
    }
  }
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
          health === maxHealth
            ? rockMesh1.geometry
            : health >= maxHealth / 2
              ? rockMesh2.geometry
              : rockMesh3.geometry
        }
      >
        <meshStandardMaterial
          {...rockMesh1.material}
          color={new Color(color[0], color[1], color[2])}
          // emissive={highlights[i] ? [0.125, 0.25, 0] : [0, 0, 0]}
        />
        {gem && health < maxHealth && <Gem gemType={gem} />}
      </mesh>
    </group>
  );
}
