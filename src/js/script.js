import {
  handleInputChanges,
  submitForm,
  infiniteLoading,
} from './pages/recipes/recipesFuntions';

import { $recipesPageContent } from './pages/recipes/formTemplate';

document.addEventListener('DOMContentLoaded', () => {
  class Model {
    constructor() {
      this.test = document.getElementById('recipe');
      this.recipesDynamism = () => {
        handleInputChanges();
        submitForm();
        infiniteLoading();
      };
      this.pages = [
        {
          url: '#',
          documentTitle: 'Recipes',
          content: $recipesPageContent,
          dynamism: this.recipesDynamism,
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url === url);
    }
  }

  class View {
    constructor() {
      this.container = document.getElementById('container');
    }

    changeDocumentTitle(option) {
      document.title = option;
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

    const render = new View();
    render.changeDocumentTitle(currentPage.documentTitle);
    render.addContent(currentPage.content);
    render.run(currentPage.dynamism);
  }

  controller();
});
