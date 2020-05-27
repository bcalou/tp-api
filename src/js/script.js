import {
  handleInputChanges,
  submitForm,
  infiniteLoading,
} from './pages/recipes/recipesFuntions';

import { setFavoritesRecipesList } from './pages/favorites/favoritesFunctions';

//localStorage.removeItem('favoritesRecipes');

import { createElement } from './global/creatElements';
import { $nav, $list } from './components/nav/nav';
import { $recipesPageContent } from './pages/recipes/recipesFormTemplate';
import { $favoritePageTemplate } from './pages/favorites/favotitesTemplate';

document.addEventListener('DOMContentLoaded', () => {
  class Model {
    constructor() {
      this.test = document.getElementById('recipe');
      this.recipesDynamism = () => {
        handleInputChanges();
        submitForm();
        infiniteLoading();
      };
      this.favoritesDynamism = () => {
        setFavoritesRecipesList(
          JSON.parse(localStorage.getItem('favoritesRecipes'))
        );
      };
      this.pages = [
        {
          url: '#',
          documentTitle: 'Keskon mange??',
          content: $recipesPageContent,
          dynamism: this.recipesDynamism,
        },
        {
          url: '#favoris',
          documentTitle: 'Mes favoris',
          content: $favoritePageTemplate,
          dynamism: this.favoritesDynamism,
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url === url);
    }
  }

  class View {
    constructor(pages) {
      this.container = document.getElementById('container');
      this.container.innerHTML = '';
      this.addHeader(pages);
    }

    changeDocumentTitle(option) {
      document.title = option;
    }

    addHeader(pages) {
      this.container.appendChild($nav);
      $list.innerHTML = '';
      pages.forEach((page) => {
        const $liElt = createElement({
          type: 'li',
          content: page.documentTitle,
        });
        $liElt.addEventListener('click', () => {
          location.hash = page.url;
          $nav.classList.toggle('is-visible');
        });
        $list.appendChild($liElt);
      });
    }

    addContent(content) {
      this.container.appendChild(content);
    }

    run(dynamism) {
      dynamism();
    }
  }

  function controller() {
    const data = new Model();

    const currentPage = data.getPageByUrl(location.hash || '#');

    const render = new View(data.pages);
    render.changeDocumentTitle(currentPage.documentTitle);

    if (currentPage.content) {
      render.addContent(currentPage.content);
    }

    if (typeof currentPage.dynamism === 'function') {
      render.run(currentPage.dynamism);
    }
  }

  window.addEventListener('hashchange', () => {
    controller();
  });

  controller();
});
