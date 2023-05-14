/**
 * @typedef {{
 * name: string;
 * description: string;
 * price: number;
 * }} MenuItem
 */
/**
 * @type {NodeListOf<HTMLTableElement}
 */
const tables = document.querySelectorAll('ul.menu-items');


/**
 * @param {MenuItem} item
 * @returns {HTMLTableRowElement}
 */
function menuItemToTableRow(item){
  const row = document.createElement("li");
  row.classList.add("menu-item")

    const itemName = document.createElement("h6");
    itemName.classList.add("item-name");
    itemName.innerText = item.name;

    const itemBodyContainer = document.createElement("div");
    itemBodyContainer.classList.add("d-flex", "justify-content-between");
      const itemDescription = document.createElement("p");
      itemDescription.classList.add("item-description", "text-muted");
      itemDescription.innerText = item.description;

      const priceCell = document.createElement("span");
      priceCell.classList.add("item-price");
      priceCell.innerText = item.price;
    itemBodyContainer.appendChild(itemDescription);
    itemBodyContainer.appendChild(priceCell);

  row.appendChild(itemName);
  row.appendChild(itemBodyContainer);

  return row;
}

async function loadFood() {
  /**
   * @type {Record<string, MenuItem[]}
   */
  let food = await fetch("./food.json").then(response => response.json());
  console.log(food);

  for(let table of tables){
    const key = table.dataset.tableSource;
    if(key !== undefined){
      const rows = food[key].map(menuItemToTableRow);
      rows.forEach(row =>{
        table.appendChild(row);
      });
    }
  }
}

loadFood();