var Counter = 0;
var but = document.getElementById('product_add')
var countElement = document.getElementById('cart_num');
function handle() {
    Counter++;
    updateCounter();
}

but.addEventListener('click', handle);

function updateCounter() {
    countElement.textContent = Counter;
}