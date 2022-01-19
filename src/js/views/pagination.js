import parentView from "./parentView.js";

class Pagination extends parentView {
  //Private Property
  //parent element
  _parentElement = document.querySelector(".pagination-btn-section");

  //Method to handle button click
  addhandlerPagination(handler) {
    //Adding the event listner to the parent because there are two buttons
    this._parentElement.addEventListener("click", function (e) {
      //Setting the target to the clicked parts parent element
      const clicked = e.target.closest(".btn-pagination");
      const goTo = Number(clicked.dataset.goto);
      //If button isn't clicked
      if (!clicked) return;
      console.log(clicked);
      console.log(goTo);
      handler(goTo);
    });
  }
  //Generate the markup for buttons
  _generateMarkup() {
    const currentPage = this._data.page;

    //Get the number of pages that should be displayed
    const noOfPages = Math.round(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(noOfPages);
    //When on the 1st page and there are more results
    if (currentPage === 1 && noOfPages > 1) {
      return `
            <button class="btn-pagination pagination-after" data-goto="${
              currentPage + 1
            }">
                <span class="btn-pagination-text">Page ${currentPage + 1}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="144 56 216 128 144 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
            </button>
                `;
    }

    //When on the last page
    if (currentPage === noOfPages && noOfPages > 1) {
      return `
            <button class="btn-pagination pagination-before" data-goto="${
              currentPage - 1
            }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="128" x2="40" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="112 56 40 128 112 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>               
                <span class="btn-pagination-text">Page ${currentPage - 1}</span>
            </button>
                `;
    }
    //When on a page other than 1st or last
    if (currentPage > 1) {
      return `
        <button class="btn-pagination pagination-before" data-goto="${
          currentPage - 1
        }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="128" x2="40" y2="128" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="112 56 40 128 112 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>               
            <span class="btn-pagination-text">Page ${currentPage - 1}</span>
        </button>
        <button class="btn-pagination pagination-after" data-goto="${
          currentPage + 1
        }">
            <span class="btn-pagination-text">Page ${currentPage + 1}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="pagination-icon"><rect width="256" height="256" fill="none"></rect><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><polyline points="144 56 216 128 144 200" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
        </button>
        
            `;
    }
    //When on the 1st page and there are no more results
    if (currentPage === 1 && noOfPages === 1) {
      return "";
    } else {
      return "";
    }
  }
}

export default new Pagination();
