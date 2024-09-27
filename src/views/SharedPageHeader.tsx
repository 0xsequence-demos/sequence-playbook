import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const SharedPageHeader = (props: {
  category: string;
  currentPageName: string;
  currentPageDescription: string;
}) => {
  const { category, currentPageName, currentPageDescription } = props;
  const [hidePageHeader, setHidePageHeader] = useState(false);
  useEffect(() => {
    setHidePageHeader(currentPageName === "");
  }, [currentPageName]);
  return (
    <div className={`page-header ${hidePageHeader ? "closed" : ""}`}>
      <NavLink to={category}>
        <div className="back-to-category">back to {category}</div>
      </NavLink>
      <span>{currentPageDescription}</span>
    </div>
  );
};

export default SharedPageHeader;
