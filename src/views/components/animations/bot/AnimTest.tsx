import Lottie from "lottie-react";
import groovyWalkAnimation from "./throw-plane.json";

const AnimTest = () => (
  <Lottie
    className="lottie-bot"
    animationData={groovyWalkAnimation}
    loop={true}
  />
);
export default AnimTest;
