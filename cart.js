
document.addEventListener("DOMContentLoaded", function () {
    const cartElem = localStorage.getItem('items');
    const allItems = JSON.parse(cartElem)
    allItems.forEach(el => {
        addElement(el)
    })
    addCartTotal(5, 0.08, 5, 5)
});

function addCartTotal(subtotals, taxrate, tax, totals) {
   
    const newDiv = document.createElement("div");
 
    const divEl = ` <div class="totals">
        <div class="totals-item">
            <label>Subtotal</label>
            <div class="totals-value" id="cart-subtotal">${subtotals}</div>
        </div>
        <div class="totals-item">
            <label>Tax (${taxrate}%)</label>
            <div class="totals-value" id="cart-tax">${tax}</div>
        </div>
    
        <div class="totals-item totals-item-total">
            <label>Grand Total</label>
            <div class="totals-value" id="cart-total">${totals}</div>
        </div>
    </div>
    <button class="checkout">Checkout</button>
    `
    const newElementToCard = createElementFromHTML(divEl);

    
    newDiv.appendChild(newElementToCard);

    
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        return div.firstChild;
    }
}
function addElement(cartElem) {
    // create a new div element
    const newDiv = document.createElement("div");
    console.log(cartElem)
    // and give it some content
    // const newContent = document.createTextNode(`ITEM IS: ${cartElem.name}, ${cartElem.price}, ${cartElem.quantity}`);
    const divEl = `<div class="product">
        <div class="product-image">
            <img src=${cartElem.image}>
        </div>
        <div class="product-details">
            <div class="product-title">${cartElem.name}</div>
        </div>
        <div class="product-price">${cartElem.price}</div>
        <div class="product-quantity">
            <input type="number" value="${cartElem.quantity}" min="1">
        </div>
        <div class="product-removal">
            <button class="remove-product">
                Remove
            </button>
        </div>
        <div class="product-line-price"></div>
    </div>`
    const newElementToCard = createElementFromHTML(divEl);

    // add the text node to the newly created div
    newDiv.appendChild(newElementToCard);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}
