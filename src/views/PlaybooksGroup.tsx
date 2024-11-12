import { ReactNode, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { slugify } from "./utils/slugify";
import { PageNothingHere } from "./pages/PageNothingHere";

const PlaybooksGroup = (props: {
  children?: ReactNode;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPageName: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPageDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    setCategory,
    setCurrentPageName,
    setCurrentPageDescription,
    category,
    children,
  } = props;
  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);
  if (!(children instanceof Array)) {
    return null;
  }
  const slugs = children.map((child) => slugify(child.props.label as string));
  return (
    <div>
      <Routes>
        <Route
          path={``}
          element={
            <div className="page-nav">
              {children.map((child, i) => (
                <NavLink
                  key={`nav-${slugs[i]}`}
                  className={({ isActive, isPending }) =>
                    `${isPending ? "pending" : isActive ? "active" : ""} page-nav-link`
                  }
                  to={slugs[i]}
                >
                  <div className="child">{child.props.label}</div>
                </NavLink>
              ))}
            </div>
          }
        />
      </Routes>
      <Routes>
        <Route
          key={`route-empty`}
          path=""
          element={
            <PageNothingHere
              label=""
              setCurrentPageName={setCurrentPageName}
              description=""
              setCurrentPageDescription={setCurrentPageDescription}
            />
          }
        />
        {children.map((child, i) => (
          <Route key={`route-${slugs[i]}`} path={slugs[i]} element={child} />
        ))}
      </Routes>
    </div>
  );
};

export default PlaybooksGroup;
