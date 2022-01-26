import parentView from "./parentView.js";

class CommentBoxView extends parentView {
  //Properties to be uses
  _parentElement = document.querySelector(".form-upload");
  _overlay = document.querySelector(".blured");
  _commentBox = document.querySelector(".comment-box");
  _openBtn = document.querySelector(".add-comments");
  _closeBtn = document.querySelector(".close-btn");

  constructor() {
    super();
    this._addHandlerOpen();
    this._addHandlerClose();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._commentBox.classList.toggle("hidden");
  }

  //Addhandler for open btn
  _addHandlerOpen() {
    this._openBtn.addEventListener("click", this.toggleWindow.bind(this));
  }

  //Addhandler for the close btn
  _addHandlerClose() {
    this._closeBtn.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  //Handler to get the values from the form
  addHandlerFormValues(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      //Get the data and store it in an array
      //FormData constructor takes in a form. Therfore, we use the this keyword which is the parentElement uplaodForm
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new CommentBoxView();
