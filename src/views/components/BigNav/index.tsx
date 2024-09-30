import { useEffect, useState } from "react";
import { NavLink, NavLinkRenderProps } from "react-router-dom";
import "./style.css";
import { Categories, CategoryDescriptions } from "../../../data/Categories";
import { getIcon } from "../../utils/getIcon";

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

const BigNav = (props: { category: string; currentPageName: string }) => {
  const { category, currentPageName } = props;
  const [hideBigNav, setHideBigNav] = useState(false);
  useEffect(() => {
    setHideBigNav(category !== "" && currentPageName !== "");
  }, [category, currentPageName]);
  return (
    <div>
      <div
        className={`big-nav ${hideBigNav ? "closed" : ""} ${category === "" ? "no-category" : "one-category"}`}
      >
        {Categories.map((catName, i) => (
          <NavLink
            key={`big-nav-${catName.toLowerCase()}`}
            id={catName.toLowerCase()}
            className={makeNavlinkStyleMaker(catName.toLowerCase(), category)}
            to={catName.toLowerCase()}
          >
            {getIcon(catName.toLowerCase())}
            <br />
            {catName}
            <br />
            <div className="description">{CategoryDescriptions[i]}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BigNav;
