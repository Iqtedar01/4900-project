<script>
    function addToCart(event, cartItem) {
        event.preventDefault()
    let items = []
    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'))
    }
    items = [...items, cartItem];
    localStorage.setItem('items', JSON.stringify(items))
    const count = items.length;
    document.getElementById('cart-link').innerText = `cart(${count})`
}
    document.addEventListener("DOMContentLoaded", function () {
    const items = localStorage.getItem('items')
    if (items) {
        const parsed = JSON.parse(localStorage.getItem('items'))
    if (parsed.length) {
        document.getElementById('cart-link').innerText = `cart(${parsed.length})`
    }
    }
});
</script>