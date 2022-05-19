import View from "./View";
import icons from "url:../../img/icons.svg"; // parcel 2

class resaultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = `No recipes found for your query! Please try again`;
  _message = ``;

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(resault) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
    <a class="preview__link ${
      resault.id == id ? "preview__link--active" : ""
    }" href="#${resault.id}">
    <figure class="preview__fig">
        <img src="${resault.image}" alt="Test" />
    </figure>
    <div class="preview__data">
        <h4 class="preview__title">${resault.title}</h4>
        <p class="preview__publisher">${resault.publisher}</p>
      
    </div>
    </a>
</li>
`;
  }
}

export default new resaultsView();
