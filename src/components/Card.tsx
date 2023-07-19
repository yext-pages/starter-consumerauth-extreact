// src/components/Card.tsx

import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { provideSearchAnalytics } from "@yext/analytics";

//replace with the vertical typescript interface this custom card applies to
import FILE from "../types/files";

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId
})

const Card = ({
    result,
    //replace the interface Files with the typescript interface of your vertical
  }: CardProps<FILE>) => {
    //pull in the relevant fields from your entity to display on the card
    const data: any = {
        name: result.rawData.name,
        answer: result.rawData.answer,
        landingPageUrl: result.rawData.landingPageUrl,
        category: result.rawData.c_category,
        cta1: result.rawData.c_primaryCTA,
        cta2: result.rawData.c_secondaryCTA
    }

    //replace below with the appropriate vertical key
    const verticalKey = 'files'

    //analytics configuration for the card
    const queryId = useSearchState((state)=>state.query.queryId) || "";
    const fireClick = (id:string,label:string)=>{
        searchAnalytics.report({
            type: "CTA_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
            ctaLabel: label
        })
    };
    const fireTitle = (id:string)=> {
        searchAnalytics.report({
            type: "TITLE_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
        })
    }

    return (
        <div className="mb-4 justify-between rounded-lg border p-4 text-stone-900 shadow-sm">
            <div className="body flex flex-col">
                {data.landingPageUrl && (
                    <a href={`${data.landingPageUrl}`} target = "_blank" rel="noreferrer">
                        <div className="title text-lg font-semibold text-blue-700 hover:underline" onClick ={() => fireTitle(result.id || "")}>
                            {data.name}
                        </div>
                    </a>
                )}
                <div className= "category-label flex gap-1 mt-2">
                        {data.category && (
                            <div className="flex rounded bg-gray-600 px-1 text-sm text-gray-100">
                                {`${data.category}`}
                            </div>
                        )}
                    </div>
                <div className="description py-2 flex justify-between">
                    {data.answer}
                    <div className="ctas flex flex-col justify-center ml-4">
                        {data.cta1.label && (
                            <a href={`${data.cta1.link}`} target = "_blank" rel="noreferrer">
                                <button className="cta1 whitespace-nowrap bg-primary text-white font-medium rounded-lg py-2 px-5 shadow mb-4 hover:bg-blue-400" onClick={() => fireClick(result.id || "", data.cta1.label)}>
                                    {data.cta1.label}
                                </button>
                            </a>)}
                        {data.cta2?.label && (
                            <a href={`${data.cta2.link}`} target = "_blank" rel="noreferrer">
                                <button className="cta2 whitespace-nowrap bg-primary text-white font-medium rounded-lg py-2 px-5 shadow hover:bg-blue-400" onClick={() => fireClick(result.id || "", data.cta2.label)}>
                                    {data.cta2.label}
                                </button>
                            </a>)}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;