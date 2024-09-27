import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function bannerExpandRule(actual: string, target: string) {
  return actual === target ? "banner-full" : actual !== "" ? "banner-hide" : "";
}

const CategoryIndicator = (props: {
  category: string;
  currentPageName: string;
}) => {
  const { category, currentPageName } = props;
  const [hideBigNav, setHideBigNav] = useState(false);
  useEffect(() => {
    setHideBigNav(category !== "" && currentPageName !== "");
  }, [category, currentPageName]);
  // if (hideBigNav) {
  //   return <div>big nav hidden</div>;
  // }
  return (
    <div>
      <div className={`big-nav ${hideBigNav ? "closed" : ""}`}>
        <NavLink
          className={({ isActive, isPending }) =>
            `${isPending ? "pending" : isActive ? "active" : ""} big-nav-link ${bannerExpandRule(category, "onboard")}`
          }
          to={`onboard`}
        >
          Onboard
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            `${isPending ? "pending" : isActive ? "active" : ""} big-nav-link ${bannerExpandRule(category, "monetize")}`
          }
          to={`monetize`}
        >
          Monetize
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            `${isPending ? "pending" : isActive ? "active" : ""} big-nav-link ${bannerExpandRule(category, "power")}`
          }
          to={`power`}
        >
          Power
        </NavLink>
      </div>
    </div>
  );
};

export default CategoryIndicator;
