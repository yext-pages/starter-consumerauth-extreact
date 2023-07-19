// src/components/UniversalSearch.tsx

import * as React from "react";
import {
  UniversalResults,
  SpellCheck
  } from "@yext/search-ui-react";

import Card from "./Card";
import { useSearchActions, useSearchState} from "@yext/search-headless-react";
import { UNIVERSAL_LIMITS } from "../common/consts";

const UniversalSearch = () => {
  const searchActions = useSearchActions();
  searchActions.setUniversalLimit(UNIVERSAL_LIMITS);

  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
    );
    const universalResultsCount = useSearchState((state) => state.universal.verticals?.length);

  return (
      <div className="universal-search py-4">
          <div className="spell-check">
            <SpellCheck/>
          </div>
            <UniversalResults
              verticalConfigMap={{
                  files: {
                      label: "Files",
                      CardComponent: Card
                  },
                // uncomment below to add an additonal vertical configuration
                //   [REPLACE_ME_VERTICAL_KEY]: {
                //     label: "REPLACE ME VERTICAL NAME",
                //     CardComponent: REPLACE_ME_VERTICAL_CARD
                // },
              }}/>
          {mostRecentSearch && universalResultsCount === 0 && (
            <div>
              {/* provide a no results message for searches that return no results  */}
              <p>
                The search
                <span className="mx-1 font-semibold">{mostRecentSearch}</span>
                did not match any results.
              </p>
            </div>
          )}
      </div>
  );
};

export default UniversalSearch;