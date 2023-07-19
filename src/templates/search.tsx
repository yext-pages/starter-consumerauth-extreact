// src/templates/search.tsx
import { getRuntime } from "@yext/pages/util";
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";

import SearchExperience from "../components/SearchExperience";

import { experienceKey, locale, experienceVersion } from "../common/consts";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    //Update title to match Search starter
    title: `Consumer Authenticated Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Search: Template<TemplateRenderProps> = () => {
  const runtime = getRuntime();
  console.log(runtime);

  let token = "123456789";
  if (runtime.name === "browser") {
    token = window?.YEXT_TOKENS?.yextauthsigningkey.token;
  }

  const searcher = provideHeadless({
    token: token,
    // comment in the verticalKey if you are building a vertical-only search experience
    // verticalKey: "REPLACE_ME_VERTICAL_KEY",
    experienceKey: experienceKey,
    locale: locale,
    experienceVersion: experienceVersion,
  });

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <SearchExperience />
    </SearchHeadlessProvider>
  );
};

export default Search;
