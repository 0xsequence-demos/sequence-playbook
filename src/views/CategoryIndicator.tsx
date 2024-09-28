import { useEffect, useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

function makeNavlinkStyleMaker(thisCategory: string, activeCategory: string) {
  return (props: NavLinkRenderProps) => {
    const navLinkStatus = props.isPending
      ? "pending"
      : props.isActive
        ? "active"
        : "";
    const expandStyle =
      activeCategory === thisCategory
        ? "banner-full"
        : activeCategory !== ""
          ? "banner-hide"
          : "";
    return `big-nav-link ${navLinkStatus} ${expandStyle}`;
  };
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
  return (
    <div>
      <div className={`big-nav ${hideBigNav ? "closed" : ""}`}>
        {["Onboard", "Monetize", "Power"].map((catName) => (
          <NavLink
            className={makeNavlinkStyleMaker(catName.toLowerCase(), category)}
            to={catName.toLowerCase()}
          >
            {catName}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CategoryIndicator;
