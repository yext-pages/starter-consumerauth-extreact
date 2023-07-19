// src/components/VerticalNav.tsx

import * as React from "react";
import { verticals } from "../common/verticals";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import classNames from "classnames";

const VerticalNav = () => {
  const searchActions = useSearchActions();
  const selectedVertical = useSearchState(state => state.vertical.verticalKey);
  const shownVerticals = verticals.filter(v => v.showInNav)
  return (
    <div className="flex flex-row w-full mx-auto border-b">
      {shownVerticals.map((vertical, value) => {
        const selected = selectedVertical === vertical.key;
        return (
            <button
                key={vertical.key ? vertical.key : "universal"}
                onClick={async () => {
                    if (vertical.key) {
                        searchActions.setVertical(vertical.key);
                        searchActions.setVerticalLimit(vertical.limit || 15);
                        searchActions.executeVerticalQuery();
                    } else {
                        await searchActions.setUniversal();
                        searchActions.executeUniversalQuery();
                        const params = new URLSearchParams(window.location.search);
                        params.delete("verticalKey");
                        window.history.pushState({}, "", `?${params.toString()}`);
                    }
                }}
                className={classNames(value > 0 ? "group rounded-full cursor-pointer px-4" : "group rounded-full cursor-pointer pr-4")} >
                <div className="flex flex-row gap-x-4">
                <div className={classNames(
                  selected ? "text-primary border-b  border-b-2 border-primary-blue" : "text-gray-700 group-hover:text-black",
                  "my-auto font-semibold text-lg pb-[8px]"
                )} >
                  {vertical.label}
                </div>
              </div>
            </button>
        );
      }
      )}
    </div >
  );
}

export default VerticalNav;