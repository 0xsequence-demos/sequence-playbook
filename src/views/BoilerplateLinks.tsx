import { Demo, niceDemoNames } from "../data";
import IconGithub from "../images/icon-github.svg?react";
import IconDemo from "../images/icon-demo.svg?react";

export const BoilerplateLinks = (props: { demos?: Demo[] }) => {
  const { demos } = props;
  if (demos) {
    return (
      <>
        <div className="divider"></div>
        <div className="footer-cta-boilerplates">
          <img src="/bots-cloning.svg"></img>
          <p>
            You can quickly try it by cloning and extending{" "}
            {demos.length > 1 ? "these boilerplates" : "this boilerplate"}:
          </p>
          {demos.map((demoName) => (
            <div key={demoName}>
              {niceDemoNames[demoName]}
              <span>
                <a
                  href={`http://github.com/0xsequence/${demoName}`}
                  target="_blank"
                >
                  <button>
                    <IconGithub className="icon" />
                    <span>SOURCE</span>
                  </button>
                </a>
                <a href={`http://${demoName}.pages.dev`} target="_blank">
                  <button>
                    <IconDemo className="icon" />
                    <span>DEMO</span>
                  </button>
                </a>
              </span>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
};
