import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { WebGLRenderer } from "three";
function ItemViewer3D(props: { children: ReactNode }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={(canvas) => {
        // hacky override to fix canvas resizing
        const ce = canvas as HTMLElement;
        ce.style.width = "100%";
        ce.style.height = "100%";
        const renderer = new WebGLRenderer({ canvas });
        const originalSetSize = renderer.setSize;
        renderer.setSize = (x: number, y: number) =>
          originalSetSize.call(renderer, x, y, false);
        return renderer;
      }}
    >
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
