export const endpoint: string = "https://newsapi.org/v2";
export const API_key: string = "519203cf48914461a65a6d8908306907";
export const proxyUrl: string = 'https://cors-anywhere.herokuapp.com/'

export const $search_forms: NodeListOf<Element> = document.querySelectorAll('.search-form');
export const $language: HTMLElement = document.getElementById('language');
export const $pageSize: HTMLElement = document.getElementById('pageSize');
export const $sortBy: HTMLElement = document.getElementById('sortBy');
export const $category: HTMLElement = document.getElementById('category');
export const $refreshButton: HTMLElement = document.getElementById('refresh');