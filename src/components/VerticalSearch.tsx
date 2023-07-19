// src/components/VerticalSearch.tsx

import * as React from "react";
import {
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  Facets,
  StandardFacet
  } from "@yext/search-ui-react";

import {
  useSearchState
  } from "@yext/search-headless-react";

import Card from "./Card";

const VerticalSearch = () => {

    const mostRecentSearch = useSearchState(
        (state) => state.query.mostRecentSearch
        );
    const resultsCount =
        useSearchState((state) => state.vertical.resultsCount) ?? -1;

  return (
      <div className="vertical-search py-4">
          <div className="spell-check">
            <SpellCheck/>
          </div>
            {resultsCount > 0 && (
              <>
              <ResultsCount />
              <div className="flex">
                  <div className="mr-5 w-56 shrink-0">
                    <div className="flex flex-col rounded border bg-zinc-100 p-4 shadow-sm">
                        <Facets>
                          <StandardFacet
                          fieldId="c_category"
                          transformOptions={(options) =>
                            [...options].sort((a,b) =>
                              a.displayName.localeCompare(b.displayName))
                          }
                          label= "File Category"
                          />
                        </Facets>
                    </div>
                  </div>
                  <VerticalResults
                  CardComponent={Card}
                  displayAllOnNoResults={false}
                  />
              </div>
              </>
            )}
          {mostRecentSearch && resultsCount === 0 && (
            <div>
              {/* provide a no results message for searches that return no results  */}
              <p>
                The search
                <span className="mx-1 font-semibold">{mostRecentSearch}</span>
                did not match any Files.
              </p>
            </div>
          )}
          <Pagination
            customCssClasses={{
              icon: "text-stone-900",
              label: "text-stone-900",
              selectedLabel: "text-blue-700 border-blue-700 bg-blue-100",
            }}/>
      </div>
  );
};

export default VerticalSearch;