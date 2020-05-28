import { createElement } from '../../settings/creatElements';

export const $nav = createElement({
  type: 'nav',
});

const $openMenu = createElement({
  type: 'div',
  attributes: {
    class: 'open-menu',
  },
  $parent: $nav,
  clickFunction: showHideMenu,
});

createElement({
  type: 'div',
  attributes: {
    class: 'menu-icon',
  },
  $parent: $openMenu,
});

function showHideMenu() {
  $nav.classList.toggle('is-visible');
}

window.addEventListener('resize', (e) => {
  if (e.target.innerWidth < 768) {
    $nav.classList.remove('is-visible');
  }
});

export const $list = createElement({
  type: 'ul',
  $parent: $nav,
});
