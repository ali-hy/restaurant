/**
 * @typedef {{
 * image?: string;
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
 * @type {NodeListOf<HTMLDivElement>}
 */
const categoryCardContainers = document.querySelectorAll('.category-card-container');
/**
 * @type {NodeListOf<HTMLDivElement>}
 */
const menuSections = document.querySelectorAll('.menu-section');
menuSections.forEach(section => {
  section.style.display = "none";
});

/**
 * @param {HTMLDivElement} section 
 */
function hideCategorySection(){
  menuSections.forEach(section => {
    if(section.style.display==="block"){
      section.style.display = "none";
      section.classList.remove("show");
    }
  });
}

/**
 * @param {HTMLDivElement} section 
 */
function startSectionTranstion(section){
  setTimeout(() => section.classList.add("show"), 0);
}

/**
 * @param {HTMLDivElement} section 
 */
function showCategorySection(section){
  section.style.display = "block";
  startSectionTranstion(section);
}

/**
 * @param {MouseEvent} e 
 */
function handleCardClick(e){
  const card = e.currentTarget;
  const target = document.querySelector(card.dataset.targetSection);

  hideCategorySection();
  showCategorySection(target);
}

categoryCardContainers.forEach(card => {
  card.addEventListener('click', handleCardClick);
})

/**
 * @param {MenuItem} item
 * @returns {HTMLTableRowElement}
 */
function menuItemToListItem(item){
  const row = document.createElement("li");
  row.classList.add("menu-item")

    if(item.image !== undefined){
      const image = document.createElement("img");
      image.src = `/assets/images/menu-items/${item.image}`;
      image.className = "rounded-circle"
      row.appendChild(image);
    }

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

  for(let table of tables){
    const key = table.dataset.tableSource;
    if(key !== undefined){
      const rows = food[key].map(menuItemToListItem);
      rows.forEach(row =>{
        table.appendChild(row);
      });
    }
  }
}

loadFood();