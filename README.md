# starter-search-basic-react

This repository provides a basic example of how to start developing a React Search experiences on the Yext Pages system. This Basic Search Starter is built on top of the built-in Files entity and contains both Universal and Vertical Search.

## Getting Started

### Prerequisites

1. Have the Yext CLI installed: https://hitchhikers.yext.com/guides/cli-getting-started-resources/01-install-cli/
1. Have Deno installed, version 1.21.0 or later: https://deno.land/manual/getting_started/installation
1. Have node installed, version 17 or later: https://nodejs.org/en/download/

   - It's recommend to use nvm: https://github.com/nvm-sh/nvm#installing-and-updating or via brew `brew install nvm`

1. Have a Yext account. This is necessary for production builds, deploying on Yext Pages, and pulling local stream document data via `yext pages generate-test-data`.

### Clone this repo and install dependencies

```shell
git clone https://github.com/YextSolutions/starter-search-basic-react.git
cd starter-search-basic-react
npm install
npm i @yext/search-ui-react@1.3.0-beta.1
```

### Recommended Development Flow

While _developing locally_, run the following command:

```
npm run dev
```

This command will start a Vite-powered dev server that will enable hot-reloading. Additionally, the command will generate a `localData` directory that contains a subset of your Knowledge Graph data. This command is automatically in "dynamic" mode, which means it will pull data updates automatically from your Knowledge graph, so real-time data changes in your Yext account will be reflected in your local dev site.

NOTE: Whenever you make changes to your stream definitions, you must re-run `npm run dev` for the system to update the `features.json` and the required entities to power your site.

_Before committing_ your code, we recommend running the following command:

```
npm run build:serve
```

This command will generate a production build of your site, so you can ensure there are no build errors or unexpected behavior. This build step replicates the production build environment used in the Yext system, and serves your data at `localhost:8000`.

In practice, development builds (via `npm run dev`) and production builds compile and bundle assets differently. For local development, ES Modules are loaded directly by the browser, allowing fast iteration during local development and also allows for hot module replacement (HMR). Other things like CSS are also loaded directly by the browser, including linking to sourcemaps. During a production build all of the different files are compiled (via ESBuild for jsx/tsx) and minified, creating assets as small as possible so that the final html files load quickly when served to a user. Tree-shaking also occurs during the build step, in which any unused dependencies are removed from your final build.

### Other Useful commands

`yext init` - Authenticates the Yext CLI with your Yext account

`yext types generate search src/types --experienceKey [INSERT EXPERIENCE KEY]` - Generates a new Typescript interface for each vertical in your Search experience.

`yext pages generate-test-data` - Pulls an example set of `localData` from your account. This command is packaged within `npm run dev'.

`npm run build` - Runs a production build against your `localData`: part one of `npm run build:serve`

`npm run serve` - Runs a local server against your production-built files: part two of `npm run build:serve`

`npm run fmt` - Automatically formats all code

`npm run lint` - Run ESLint to check for errors and warnings

## Repository Layout

```
root
└───localData
└───sites-config
│   │   ci.json
└───src
│   │   index.css
│   │
│   └───common
│       │   consts.ts
│       │   verticals.ts
│   │
│   └───components
│       │   SearchExperience.tsx
│       │   Card.tsx
│       │   UniversalSearch.tsx
│       │   VerticalNav.tsx
│       │   VerticalSearch.tsx
│   │
│   └───templates
│       │   search.tsx
│   │
│   └───types
│       │   files.ts
```

### localData

Contains example stream documents that are used while local developing. By default this repo contains example files that work with the provided example templates. You can generate real stream documents specific to your Yext account via `yext pages generate-test-data`.

NOTE: You normally wouldn't want to check in the localData folder as it's only used for local dev. It is gitignored by default.

### sites-config

Contains a single `ci.json` file. This file defines how the Yext CI system will build your project. It is not used during local dev. However, it is used when running a local production build (i.e. `yext pages build`).

NOTE: A `features.json` file will automatically be generated during CI build for you based on the template configs defined in your templates. If this file doesn't exist then `yext pages build` will implicitly generate a new one when it calls `npm run build:local` (defined in `sites-config/ci.json`). In the recommended devleopment flow with `npm run dev`, the `features.json` will be automatically generated.

NOTE: After changing your stream definitions, you should rerun `yext pages generate` and `yext pages generate-text-data` to ensure your local build pulls in the required data from the Knowledge Graph

### src

### common

This is where all your common constants _may_ live. This folder is not required and you can set up your own folder structure for storing constants any way you'd like. It is best practice that you

#### components

This is where all of your custom components _may_ live. This folder is not required and you can set up your own custom folder structure for your own components in any way you'd like, as long as it lives in the `src` directory. This repository contains the following components:
1. SearchExperience.tsx
   The SearchExperience component is a basic search functionality with a title, search bar, and vertical navigation menu. It retrieves the currently selected vertical and renders either the VerticalSearch component for the selected vertical or the UniversalSearch component for a search query. It offers a simple user interface for conducting searches within specific verticals or across all verticals.
2. Card.tsx
   The Card component renders a styled card that displays information about your entity. It extracts data from the relevant fields you specify and displays the information on the card along with clickable CTAs. The component also includes basic analytics tracking for click events on the card's title and CTA buttons.
3. UniversalSearch.tsx
   The UniversalSearch component allows users to search across multiple verticals. It includes the SpellCheck component as well as a message indicating when a search query does not match any results in any of the configured verticals. You must configure the vertical in the verticalConfigMap prop of the UniversalSearch component for it to be included in Universal Search.
4. VerticalNav.tsx
   If you would like to configure both Universal and Vertical search for your Search experience, you will need to configure the VerticalNav component. This component allows users to switch between the universal and subsequent vertical tabs while conducting a search.
5. VerticalSearch.tsx
   The VerticalSearch component represents the search functionality with a specified vertical. It includes the SpellCheck, Facets, and Pagination components. It also includes a no results message and shows result count.

#### templates

Required. This is where your actual templates live. There are effectively two types of components:

1. stream-based templates: those that have an exported `config`
1. static templates: those that don't have an exported `config`.

#### types

Here you can define any custom TypeScript types you need.

#### index.css

Not required. In this example this sets up Tailwind CSS.

### vite.config.js

Vite is now a first class member of the starter! This file defines any custom Vite configuration you want, giving you full control over your setup. Specifically, it will allows users to pass additional configuration options to the vite-plugin-yext-sites-ssg plugin when they become more widely available.

### Everything else

The rest of the files are basic config setup common to many other React projects. In this example we've enabled:

1. Tailwind CSS (which leverages PostCSS) - used for easy styling
1. ESLint - catches errors in your code
1. Prettier - formats your code (you can add .prettierrc to override any default settings)
1. TypeScript - adds typing to Javascript for a better developer experience
