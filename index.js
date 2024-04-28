// to store the items in list persistently we need to be able to store them as well as load them. 

// we will have the ability to remove items, we also need to show the reflection of items on the screen. 

// items must be rendered on screen and then once an item is removed we must be able re-render the items on the screen. 

let items = [];
// the id of the div is 'items'
const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = null; //removes everything inside of the div.

    for (const [idx, item] of Object.entries(items)) {

    const container = document.createElement("div")
    container.style.marginBottom = "10px"

    const text = document.createElement("p")
    text.style.display = "inline"
    text.style.marginRight = "10px"
    text.textContent = item;

    const button = document.createElement("button")
    button.textContent = "Delete"
    button.onclick = () => removeItem(idx)

    container.appendChild(text)
    container.appendChild(button)

    itemsDiv.appendChild(container)
    }   
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey)
    // .parse converts this to a JS object
    if (oldItems) items = JSON.parse(oldItems)
    renderItems()
}

function saveItems() {
    // .stringify list and converts it to a string.
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems)
}

function addItem() {
    const value = input.value;
    if (!value) {
        alert("You cannot add an empty item.")
        return
    }
    items.push(value)
    renderItems()
    input.value = ""
    saveItems()
}

function removeItem(idx) {
    // splice will remove an element at a specfifc index. "1" is to show that we wantr to delete one index.
    items.splice(idx, 1)
    renderItems()
    saveItems()
}

// once all HTML has been loaded we cal the loadItems function.
document.addEventListener("DOMContentLoaded", loadItems)