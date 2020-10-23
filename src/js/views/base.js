export const doms = {
  searchButton: document.querySelector(".search"),
  searchField: document.querySelector(".search__field"),
  receipesSection: document.querySelector(".results__list"),
  receipesLoaderSection: document.querySelector(".results"),
  PaginationSection:document.querySelector(".results__pages"),
  recipeSection:document.querySelector(".recipe"),
  shoppingSection:document.querySelector(".shopping__list")
};

export const elements = {
  loader: "loader",
};

export const ShowLoader = (parent) => {
  const loader = `
    <div class = ${elements.loader}>
       <svg>
       <use href="img/icons.svg#icon-cw"></use>
       </svg>
    </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const RemoveLoader = () => {
  const loader = document.querySelector(`.${elements.loader}`); //getting loader here,as initially it is not on the main page
  loader.parentElement.removeChild(loader);
};
