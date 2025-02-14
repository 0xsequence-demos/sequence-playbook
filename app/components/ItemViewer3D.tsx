import { ReactNode } from "react";
function ItemViewer3D(props: { children: ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 2]} intensity={50} color={[1, 0.7, 0.3]} />
      <pointLight position={[0, -3, 2]} intensity={50} color={[1, 0.4, 0.8]} />
      {props.children}
    </>
  );
}

export default ItemViewer3D;
