import icons from "url:../../img/icons.svg"; // parcel 2

export default class View {
  _data;

  // Using jsdoc (https://jsdoc.app/) to write documentation about the code

  /**
   * Render the received object to the DOM.(quick description of render function)
   * @param {Object|Object[]} data The data to be rendered. (e.g. recipe)(quick description of data parameter)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM.(quick description of render parameter)
   * @returns {undefined|string} A markup string is returned if render=false
   * @this {object} View instance (quick description of this keyword)
   * @author Barhome
   * @todo write what todo description to remind you what implementations you need to do next.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // to update the dom in place where text and attributes is only changing
  update(data) {
    // removing if condition to keep the search resaults on the view
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl));

      // we are updating changed text

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        //console.log("😃", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // we are updating changed attributes

      if (!newEl.isEqualNode(curEl)) {
        //console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
