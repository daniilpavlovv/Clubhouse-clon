import React from "react";
import Cookies from "js-cookie";
import Div100vh from "react-div-100vh";

import { HelperBlock } from "../../HelperBlock";
import { Button } from "../../Button";
import { StepInfo } from "../../StepInfo";
import { MainContext, UserData } from "../../../pages";
import { Header, BackButton } from "../../Header";

import styles from "./SocialAuthStep.module.scss";
import router from "next/router";

export const SocialAuthStep: React.FC = () => {
  const { onNextStep, onPreviousStep, onKeyBack, setUserData } =
    React.useContext(MainContext);
  console.log(process.env.PORT_SERVER);

  const onClickAuth = () => {
    const windowWidth = 500;
    const windowHeight = 745;
    const left = screen.width / 2 - windowWidth / 2;
    const top = screen.height / 2 - windowHeight / 2;
    window.open(
      `http://localhost:5000/auth/github`,
      "Auth",
      `width=${windowWidth},height=${windowHeight}, left=${left}, top=${top},status=yes,toolbar=no,menubar=no,location=no`
    );
  };

  React.useEffect(() => {
    let onFirst = false;
    window.addEventListener("message", ({ data }) => {
      const user: string = data;
      if (typeof user === "string" && user.includes("username")) {
        Cookies.remove("token");
        const json: UserData = JSON.parse(user);
        const UserData = JSON.parse(user);
        setUserData(json);
        Cookies.set("token", json.token);
        if (UserData.isActive === 1) {
          router.push("/rooms");
        } else {
          if (!onFirst) {
            onNextStep();
            onFirst = true;
          }
        }
      }
    });
  }, []);

  onKeyBack();

  return (
    <>
      <Header>
        <BackButton onClick={onPreviousStep} />
      </Header>
      <Div100vh className="centering">
        <HelperBlock>
          <StepInfo
            icon="/static/connect.png"
            title="Do you want to import information?"
            description="This will help you fill out the data faster"
          />
          <div className={styles.btnsWrapper}>
            <Button
              disabled
              className={styles.twitterBtn}
              onClick={onClickAuth}
            >
              <svg
                className={styles.twitterLogo}
                width="16"
                height="14"
                fill="none"
              >
                <path
                  d="M16 1.54c-.59.26-1.22.44-1.88.52A3.3 3.3 0 0015.55.24c-.65.39-1.35.65-2.09.8a3.28 3.28 0 00-5.59 3A9.32 9.32 0 011.11.6 3.28 3.28 0 002.13 5a3.27 3.27 0 01-1.49-.41v.04a3.28 3.28 0 002.64 3.22c-.49.13-1 .15-1.49.05a3.28 3.28 0 003.07 2.28A6.59 6.59 0 010 11.53a9.28 9.28 0 005.03 1.48c6.04 0 9.34-5 9.34-9.34v-.43A6.67 6.67 0 0016 1.54z"
                  fill="#fff"
                />
              </svg>
              Twitter
            </Button>
            <Button onClick={onClickAuth} className={styles.githubBtn}>
              <svg
                className={styles.githubLogo}
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0a12 12 0 00-3.8 23.4c.6 0 .8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.9 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.3 2.9.1 3.2a4.6 4.6 0 011.3 3.2c0 4.6-2.8 5.6-5.5 5.9.4.4.8 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z"
                  fill="#fff"
                />
              </svg>
              GitHub
            </Button>
          </div>
          <div>
            <Button onClick={onNextStep} className={styles.skipBtn}>
              Enter my info manually
            </Button>
          </div>
        </HelperBlock>
      </Div100vh>
    </>
  );
};
