import { ElToCreate } from "./interface";

// Custom function to add several classes
export function addClasses(element: HTMLElement, classes: Array<string>) {
  classes.forEach((className) => {
    element.classList.add(className);
  });
}

// Custom function to create an element
export function createElement(params: ElToCreate): HTMLElement {
  let element = document.createElement(params.type);

  if (params.classes) {
    addClasses(element, params.classes);
  }

  if (params.content) {
    element.innerText = params.content;
  }

  if (params.imgSrc && params.type === "img") {
    element.setAttribute("src", params.imgSrc);
    element.setAttribute("alt", "preview");
  }

  if (params.url && params.type === "a") {
    element.setAttribute("href", params.url);
    element.setAttribute("target", "_blank");
  }

  if (params.value) {
    element.setAttribute("value", params.value);
  }

  if (params.styles) {
    element.style.maxWidth = params.styles.maxWidth;
  }

  return element;
}

// Custom function to appendSeveralChild
export function appendSeveralChild(
  father: HTMLElement,
  childs: Array<HTMLElement>
): void {
  childs.forEach((child) => {
    father.appendChild(child);
  });
}

// Get the diff between the time (param) and now;
export function getPublishedTime(time: string): string {
  if (time === "") return "No informations on published time.";
  let dateNow: any = new Date();
  let d2: any = new Date(time);
  let diff: any = dateNow - d2;

  if (diff > 60e3) {
    let minutes = Math.floor(diff / 60e3);
    if (minutes / 60 < 1) {
      return `${Math.floor(diff / 60e3)} minutes ago`;
    } else {
      let m: number = minutes % 60;
      let h: number = Math.floor(minutes / 60);
      return `${h} ${h > 1 ? "hours" : "hour"} and ${m} ${
        m > 1 ? "minutes" : "minute"
      } ago`;
    }
  } else return `${Math.floor(diff / 1e3)} seconds ago`;
}
