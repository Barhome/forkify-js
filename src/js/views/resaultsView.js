import View from "./View";
import icons from "url:../../img/icons.svg"; // parcel 2
import previewView from "./previewView";

class ResaultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = `No recipes found for your query! Please try again`;
  _message = ``;

  _generateMarkup() {
    return this._data
      .map((resault) => previewView.render(resault, false))
      .join("");
  }
}

export default new ResaultsView();
