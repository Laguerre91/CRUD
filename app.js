const btnAdd = document.querySelector(".btn-add");
const btnEmpty = document.querySelector(".btn-empty");
const list = document.querySelector(".u-list");
const input = document.querySelector(".input-list");

// CONSTANTS
const CHECK_BUTTON_LABEL = "Check ;)";
const DELETE_BUTTON_LABEL = "Borrar";

const CHECK_BUTTON_CLASS = "btnCheck";
const DELETE_BUTTON_CLASS = "btnDelete";
const LI_DIV_CLASS = "liDiv";

const CHECKED_ITEM_COLOR = "green";
const CHECKED_ITEM_TEXT_DECORATION = "line-through";

let items = [];

const eraseList = () => {
  list.innerHTML = "";
};

const createCheckableListItem = (item, deleteCallback, checkCallback) => {
  // Create parent list item
  const listItem = document.createElement("li");

  // Create div wrapper for styling
  const listItemDiv = document.createElement("div");
  listItemDiv.classList.add("liDiv");

  listItem.appendChild(listItemDiv);

  // Create label
  const label = document.createElement("p");
  label.innerHTML = item.label;

  if (item.isChecked) {
    label.style.color = CHECKED_ITEM_COLOR;
    label.style.textDecoration = CHECKED_ITEM_TEXT_DECORATION;
  }

  listItemDiv.appendChild(label)  ;

  // Create check button
  const btnCheck = document.createElement("button");
  btnCheck.innerHTML = CHECK_BUTTON_LABEL;
  btnCheck.classList.add(CHECK_BUTTON_CLASS);
  listItemDiv.appendChild(btnCheck);

  // Add check button callback
  btnCheck.addEventListener("click", checkCallback);

  // Create delete button
  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = DELETE_BUTTON_LABEL;
  btnDelete.classList.add(DELETE_BUTTON_CLASS);
  listItemDiv.appendChild(btnDelete);

  // Add delete button callback
  btnDelete.addEventListener("click", deleteCallback);
  return listItem;
};

const renderList = () => {
  eraseList();
  items.forEach((item) => {
    const listItem = createCheckableListItem(
      item,
      () => {
        // Delete callback
        const i = items
          .map((containedItem) => containedItem.label)
          .indexOf(item.label);
        items.splice(i, 1);
        renderList();
      },
      () => {
        // Check callback
        item.isChecked = true;
        renderList();
      }
    );
    list.appendChild(listItem);
  });
};

// Register event listeners
const onBtnAddClick = () => {
  items.push({ label: input.value, isChecked: false });

  input.value = "";
  input.focus();
  renderList();
};

const onBtnEmptyClick = () => {
  items = [];
  renderList();
};

btnAdd.addEventListener("click", onBtnAddClick);

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onBtnAddClick();
  }
});

btnEmpty.addEventListener("click", onBtnEmptyClick);
