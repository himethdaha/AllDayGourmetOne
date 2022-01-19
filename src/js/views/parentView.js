export default class parentView {
  _data;
  render(data) {
    //Check if any data is received and if not return the renderError method
    if (!data || data.length === 0) {
      return this.renderError();
    }
    //storing the data rendered by the controller in this property
    this._data = data;
    const markup = this._generateMarkup();
    //Clear parent element
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Method to clear the parent container of the markup
  _clear() {
    this._parentElement.innerHTML = "";
  }
  //Markup for error message
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error-message">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256" class="error-icon"><rect width="256" height="256" fill="none"></rect><polyline points="128 240 154.3 200 104 200 130.3 160" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><path d="M88,92a68,68,0,1,1,68,68H76a44,44,0,0,1,0-88,42.5,42.5,0,0,1,14.3,2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>                
      </div>
      <span class="error-message-text">${message}</span>
    </div>
            `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
