import { ElToCreate } from "./interface";

export const NEWS_API_KEY: string = "f948f26cdab7436aa9731869f4fc9d59";
export const NEWS_ENDPOINT: string = "https://newsapi.org/v2";
export const REST_COUNTRY_ENDPOINT: string = "https://restcountries.eu/rest/v2";
export const PROXY_URL: string = "https://cors-anywhere.herokuapp.com/";

export const ALERTS: Record<string, string> = {
  NO_NEWS: "No news were found, try another country",
};

export const CARD_CONTAINER: ElToCreate = {
  type: "div",
  classes: ["card", "mb-3", "mt-5"],
  styles: {
    maxWidth: "540px",
  },
};

export const CARD_BODY: ElToCreate = {
  type: "div",
  classes: ["card-body", "bg-light"],
};

export const CARD_IMG: ElToCreate = {
  type: "img",
  classes: ["card-img-top"],
};

export const CARD_TITLE: ElToCreate = {
  type: "h5",
  classes: ["card-title"],
};

export const CARD_TEXT: ElToCreate = {
  type: "p",
  classes: ["card-text"],
};

export const CARD_SMALL: ElToCreate = {
  type: "small",
  classes: ["text-muted"],
};

export const CARD_LINK: ElToCreate = {
  type: "a",
  classes: ["btn", "btn-info"],
  content: "Read the article",
};

export const COUNTRY_OPTION: ElToCreate = {
  type: "option",
  classes: ["btn", "btn-info"],
  content: "Read the article",
};
