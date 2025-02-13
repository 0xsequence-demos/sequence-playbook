import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, Suspense } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { WebGLRenderer } from "three";
import Loader3D from "./Loader3D";
function View3D(props: { children: ReactNode; env: "mine" | "item" }) {
  const { env } = props;
  return (
    <Canvas
      gl={(canvas) => {
        // hacky override to fix canvas resizing
        const ce = canvas as HTMLElement;
        ce.style.width = "100%";
        const renderer = new WebGLRenderer({ canvas });
        const originalSetSize = renderer.setSize;
        renderer.setSize = (x: number, y: number) =>
          originalSetSize.call(renderer, x, y, false);
        return renderer;
      }}
    >
      <Suspense fallback={<Loader3D />}>
        <Environment
          files={`/env-${env}.hdr`}
          background
          backgroundIntensity={0.5}
        />
        {props.children}
        <EffectComposer>
          <Bloom
            mipmapBlur={true}
            luminanceThreshold={0}
            luminanceSmoothing={1.5}
            intensity={2}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default View3D;
