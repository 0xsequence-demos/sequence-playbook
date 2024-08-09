import "./Home.css";
import { Tabs, Text } from "@0xsequence/design-system";
import { categories, categoryIcons, userStories } from "../data";
import { BoilerplateLinks } from "./BoilerplateLinks";

const Home = () => {
  return (
    <div>
      <Tabs
        className="navBar major"
        defaultValue="Onboard"
        tabs={categories.map((category) => {
          return {
            label: `${categoryIcons[category]} ${category}`,
            value: category,
            content: (
              <>
                <Tabs
                  className="navBar minor"
                  defaultValue={
                    userStories.filter((us) => us.category === category)[0]
                      .label
                  }
                  tabs={userStories
                    .filter((us) => us.category === category)
                    .map((us) => {
                      return {
                        label: us.label,
                        value: us.label,
                        content: (
                          <>
                            {us.page}
                            <BoilerplateLinks demos={us.demos} />
                          </>
                        ),
                      };
                    })}
                ></Tabs>
              </>
            ),
          };
        })}
      ></Tabs>
      <footer className="homepage__footer">
        <Text>
          Want to learn more? Read the{" "}
          <a
            href={
              "https://docs.sequence.xyz/solutions/wallets/sequence-kit/overview/"
            }
            target="_blank"
            rel="noreferrer "
          >
            docs
          </a>
          !
        </Text>
      </footer>
    </div>
  );
};

export default Home;
