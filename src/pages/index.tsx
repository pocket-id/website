import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import FeatureBox from "../components/feature-box";
import { getInstanceCount } from "../utils/instance-count";
import "/styles.css";

const Home: React.FC = () => {
  const [instanceCount, setInstanceCount] = useState<number | undefined>();

  useEffect(() => {
    getInstanceCount()
      .then((c) => setInstanceCount(c))
      .catch();
  }, []);

  return (
    <div className="text-gray-800 dark:text-white h-screen flex flex-col bg-muted/40 dark:bg-muted/40 dark:bg-neutral-900 bg-white">
      {/* Announcement Banner */}
      <div className="bg-rose-600/50 py-1.5 text-center text-md font-medium text-block  dark:text-white">
        <span>🚀</span> Pocket ID v1.0 has been released! -{" "}
        <a
          href="/docs/setup/migrate-to-v1"
          target="_blank"
          className="inline-flex items-center font-semibold underline-offset-2 hover:underline"
          style={{ color: "white" }}
        >
          See how to migrate →
        </a>
      </div>
      <header style={{ backgroundColor: "hsl(240, 10%, 3.9%)" }}>
        <div className="w-full border-b border-black">
          <div className="container flex w-full items-center justify-between px-4 md:px-10">
            <div className="flex h-16 items-center">
              <img
                src="/img/logo.png"
                alt="Pocket ID Logo"
                className="mr-3 h-8 w-8"
              />
              <h2
                className="text-white text-sm font-medium"
                style={{ margin: 0, color: "white" }}
              >
                Pocket ID
              </h2>
            </div>
            {/* Instance count badge */}
            {!!instanceCount && (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-600/20 border border-green-600/30 rounded-full">
                  <span className="text-xs text-green-400 font-medium">
                    <i className="fas fa-server mr-1"></i>
                    {instanceCount} active instances
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-0 container">
        <section className="flex items-center mt-10 flex-col-reverse lg:flex-row gap-5">
          <div>
            <h1 className="text-sm font-extrabold">
              Secure Your Services with OIDC
            </h1>
            <p className="mt-4 text-lg">
              Pocket ID is a simple and easy-to-use OIDC provider that allows
              users to authenticate with their passkeys to your services.
            </p>
            <a
              href="/docs/introduction"
              className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold dark:bg-white dark:text-black! bg-black text-white!"
            >
              Get Started
            </a>
          </div>
          <img
            src="/img/landing/authorize-screenshot.png"
            alt="Pocket ID Logo"
            className="max-h-[350px] xl:max-h-[450px]"
          />
        </section>

        <section className="mt-15">
          <h2 className="!text-3xl font-bold">Features</h2>
          <div className="flex flex-col gap-5">
            <FeatureBox
              title="Passwordless Authentication"
              description="Pocket ID only supports passkey authentication, which means you don't need a password."
              imgSrc="/img/landing/passkey-auth-screenshot.png"
            />
            <FeatureBox
              title="Restrict User Groups"
              description="You can select which user groups are allowed to authenticate with your services."
              imgSrc="/img/landing/allowed-usergroups-screenshot.png"
              imgLeft={false}
            />
            <FeatureBox
              title="Audit Logs"
              description="Keep track of personal and global account activities. If SMTP is configured, you can even receive sign-in notifications."
              imgSrc="/img/landing/auditlog-screenshot.png"
            />
            <FeatureBox
              title="LDAP"
              description="Sync your users and groups from your LDAP server to Pocket ID."
              imgSrc="/img/landing/ldap-screenshot.png"
              imgLeft={false}
            />
            <FeatureBox
              title="API Keys"
              description="Control and access information via the Pocket ID API."
              imgSrc="/img/landing/apikey-screenshot.png"
              imgLeft={false}
            />
          </div>

          <p className="!mt-5 text-center">And much more...</p>
        </section>
      </main>

      <div className="flex flex-col items-center mt-10">
        <p className="py-3 text-xs text-gray-600 dark:text-muted-foreground">
          &copy; {new Date().getFullYear()} Pocket ID
        </p>
      </div>
    </div>
  );
};

export default Home;
