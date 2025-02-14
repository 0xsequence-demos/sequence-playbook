import { Html, useProgress } from "@react-three/drei";

export default function Loader3D() {
  const { progress } = useProgress();
  return <Html center>{progress} %</Html>;
}
