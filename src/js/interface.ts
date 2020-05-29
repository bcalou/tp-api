export interface Article {
  title: string,
  urlToImage: string,
  description: string,
  url: string,
  publishedAt: string,
}

export interface CreateElement {
  type: string;
  content?: string;
  urlToImage?: string;
  url?: string;
  parent?: HTMLElement;
}

export interface Values {
  data: string | number,
  $element: HTMLElement,
  type: string
}
