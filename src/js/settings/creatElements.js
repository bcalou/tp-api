export function createElement(options) {
  const $element = document.createElement(options.type);

  if (options.id) {
    $element.dataset.id = options.id;
  }

  if (options.clickFunction) {
    $element.addEventListener('click', options.clickFunction);
  }

  if (options.content) {
    $element.textContent = options.content;
  }

  if (options.$parent) {
    options.$parent.appendChild($element);
  }

  if (options.attributes) {
    for (const attribute in options.attributes) {
      $element.setAttribute(attribute, options.attributes[attribute]);
    }
  }

  return $element;
}
