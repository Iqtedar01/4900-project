document.addEventListener("DOMContentLoaded", function () {
    const cartElem = localStorage.getItem("items");
    const allItems = JSON.parse(cartElem);
    allItems.forEach((el) => {
        addCartRow(el);
    });
    const calcs = calculateCartTotals(allItems);
    addCartTotal(
        calcs.subTotal.toFixed(2),
        calcs.taxRate,
        calcs.taxedAmount.toFixed(2),
        calcs.total.toFixed(2)
    );
});

function calculateCartTotals(allItems) {
    let subTotal = 0;
    const taxRate = 0.08;
    allItems.forEach((item) => {
        subTotal += item.quantity * item.price;
    });
    const taxedAmount = subTotal * taxRate;
    return {
        subTotal,
        taxRate,
        taxedAmount,
        total: subTotal + taxedAmount,
    };
}

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
    `;
    const newElementToCard = createElementFromHTML(divEl);

    newDiv.appendChild(newElementToCard);

    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    function createElementFromHTML(htmlString) {
        var div = document.createElement("div");
        div.innerHTML = htmlString.trim();

        return div.firstChild;
    }
}

function updateTotals(subtotal, taxed, total) {
    document.getElementById("cart-subtotal").innerText = subtotal;
    document.getElementById("cart-tax").innerText = taxed;
    document.getElementById("cart-total").innerText = total;
}

function removeElement(ev) {
    const parentRowEl = ev?.srcElement?.parentElement?.parentElement;
    const itemName = parentRowEl.children[1]?.innerText;
    if (itemName) {
        let items = [];
        if (localStorage.getItem("items")) {
            items = JSON.parse(localStorage.getItem("items"));
        }
        const index = items.findIndex((value) => {
            return value.name === itemName;
        });
        if (index > -1) {
            items.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(items));
            parentRowEl?.remove();
            const calcs = calculateCartTotals(items);

            updateTotals(
                calcs.subTotal.toFixed(2),
                calcs.taxedAmount.toFixed(2),
                calcs.total.toFixed(2)
            );
        }
    }
}
function addCartRow(cartElem) {
    const newDiv = document.createElement("div");
    const divEl = `<div class="product">
        <div class="product-image">
            <img src=${cartElem.image}>
        </div>
        <div class="product-details">
            <div class="product-title">${cartElem.name}</div>
        </div>
        <div class="product-price">${cartElem.price}</div>
        <div class="product-quantity">
            ${cartElem.quantity}
        </div>
        <div class="product-removal">
            <button  onclick="removeElement(event)" class="remove-product">
                Remove
            </button>
        </div>
        <div class="product-line-price">${cartElem.quantity * cartElem.price
        }</div>
    </div>`;
    const newElementToCard = createElementFromHTML(divEl);

    newDiv.appendChild(newElementToCard);

    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);

    function createElementFromHTML(htmlString) {
        var div = document.createElement("div");
        div.innerHTML = htmlString.trim();


        return div.firstChild;
    }
}