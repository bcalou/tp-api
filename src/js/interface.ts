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
