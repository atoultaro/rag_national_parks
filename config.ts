import { Config } from "./src/config";

export const defaultConfig: Config = {
  url: "https://www.nps.gov/index.htm",
  match: "https://www.nps.gov/**/*.htm",
  maxPagesToCrawl: 100000,
  outputFileName: "output_all_parks_direct.json",
};
