import { UniversalLimit } from "@yext/search-headless-react";

//Replace with Your Yext Business ID
export const businessId = "[YOUR_BUSINESS_ID]"; 
//Replace with Your Search Experience experience key
export const experienceKey = "consumer-auth-search";
//Replace with Your Search Experience locale
export const locale = "en";
//Replace with Your Search Experience versopm
export const experienceVersion = "PRODUCTION";

export const additionalQueryParams: any = {
      "source": "search-basic"
    };

//set universal result limits for each vertical
export const UNIVERSAL_LIMITS: UniversalLimit = {
  files: 5,
  //add additional vertical limits for universal search below, make sure to assign the correct vertical key
  // vertical2: 5,
  // vertical3: 5
}
