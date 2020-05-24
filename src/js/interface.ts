export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface FetchParams {
  countrySelected: string;
  categorySelected?: string;
}

export interface ElToCreate {
  type: string;
  content?: string;
  classes?: Array<string>;
  imgSrc?: string;
  url?: string;
  styles?: {
    maxWidth: string;
  };
  value?: string;
}
