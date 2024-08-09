import { Demo } from "../data";

export const BoilerplateLinks = (props: { demos?: Demo[] }) => {
  const { demos } = props;
  if (demos) {
    return (
      <>
        <p>
          To quickly try it out yourself, you can clone and extend{" "}
          {demos.length > 1 ? "these boilerplates" : "this boilerplate"}:
        </p>
        <ul>
          {demos.map((demoName) => (
            <li key={demoName}>
              <a href={`http://github.com/0xsequence/${demoName}`}>
                {demoName}
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  } else {
    return null;
  }
};
