import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
function ItemViewer3D(props: { children: ReactNode }) {
  return (
    <Canvas>
      <Environment files="/test.hdr" background backgroundIntensity={0.5} />
      <group rotation={[0.5, 0, -0.25]}>{props.children}</group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 2]} intensity={50} color={[1, 0.7, 0.3]} />
      <pointLight position={[0, -3, 2]} intensity={50} color={[1, 0.4, 0.8]} />
      <EffectComposer>
        <Bloom
          mipmapBlur={true}
          luminanceThreshold={0}
          luminanceSmoothing={1.5}
          intensity={2}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default ItemViewer3D;
