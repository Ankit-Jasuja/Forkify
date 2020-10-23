import { doms } from "./base";

export const RenderShoppingItem = (item) =>{
    const markup = `<li class="shopping__item">
    <div class="shopping__count" data-itemid=${item.id}>
        <input type="number" value=${item.count} step=${item.count}>
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>`;
doms.shoppingSection.insertAdjacentHTML("beforeend",markup);
}

export const DeleteShoppingItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};