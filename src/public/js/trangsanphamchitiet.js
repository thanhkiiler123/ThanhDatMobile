let quantity = Number(document.querySelector(".quantity").value);

function giam_quantity() {
    quantity -= 1;
    if (quantity < 0) {
        quantity = 0;
    }
    document.querySelector(".quantity").value = quantity.toString();
}

function tang_quantity() {
    quantity += 1;
    document.querySelector(".quantity").value = quantity.toString();
}
