import View from "./View";
import icons from "url:../../img/icons.svg"; // parcel 2

class paginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      //   console.log(btn);
      //   console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkupButtons(currentPage, numPages) {
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // last page

    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currentPage - 1}</span>
      </button>`;
    }
    // other page(page in a middle of other pages)

    if (currentPage < numPages) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${currentPage - 1}</span>
          </button>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
          <span>${currentPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>`;
    }

    // page 1, and there are No other pages
    return ``;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.resaults.length / this._data.resaultsPerPage
    );
    // console.log(numPages);

    return this._generateMarkupButtons(currentPage, numPages);
  }
}

export default new paginationView();
