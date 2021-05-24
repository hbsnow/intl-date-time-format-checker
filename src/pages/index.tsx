import React from "react";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { classnames } from "tailwindcss-classnames";
import { useSnapshot } from "valtio";

import { AddCard } from "../components/AddCard";
import { IntlForm } from "../components/IntlForm";
import { Props as IntlListProps } from "../components/IntlList";
import { IntlTitle } from "../components/IntlTitle/IntlTitle";
import { store } from "../stores/store";
import { generateOptionByKey } from "../utils/generateOptionByKey";

const IntlList = dynamic<IntlListProps>(
  () => import("../components/IntlList/IntlList").then((mod) => mod.IntlList),
  { ssr: false }
);

const dateStyleOption = generateOptionByKey("dateStyle");
const timeStyleOption = generateOptionByKey("timeStyle");

const Page: NextPage = () => {
  const snap = useSnapshot(store);

  return (
    <div className={classnames("grid", "grid-flow-row", "auto-rows-max")}>
      <header className={classnames("p-4", "bg-white")}>
        <div
          className={classnames(
            "flex",
            "justify-between",
            "items-center",
            "container",
            "mx-auto"
          )}
        >
          <div>
            <IntlTitle />
          </div>

          <a
            href="https://github.com/hbsnow/intl-date-time-format-checker"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </header>

      <main className={classnames("grid", "grid-flow-row", "auto-rows-max")}>
        <div
          className={classnames(
            "p-4",
            "bg-gradient-to-r",
            "from-blue-600",
            "to-purple-500"
          )}
        >
          <div
            className={classnames(
              "container",
              "mx-auto",
              "p-4",
              "bg-white",
              "rounded-lg"
            )}
          >
            <IntlForm />
          </div>
        </div>

        <div className={classnames("p-4")}>
          <div className={classnames("container", "mx-auto")}>
            <AddCard />
          </div>
        </div>

        {snap.options.length > 0 && (
          <>
            <hr className={classnames("border-purple-200")} />

            <div className={classnames("p-4")}>
              <div className={classnames("container", "mx-auto")}>
                <IntlList options={snap.options} deletable />
              </div>
            </div>
          </>
        )}

        <hr className={classnames("border-purple-200")} />

        <div className={classnames("p-4")}>
          <div className={classnames("container", "mx-auto")}>
            <IntlList options={dateStyleOption} />
          </div>
        </div>

        <hr className={classnames("border-purple-200")} />

        <div className={classnames("p-4")}>
          <div className={classnames("container", "mx-auto")}>
            <IntlList options={timeStyleOption} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
