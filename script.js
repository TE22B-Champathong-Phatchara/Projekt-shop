function filterProducts(category) {
    var input, filter, articles, contents, i, txtValue;

    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    articles = document.getElementsByClassName("produkter");

    for (i = 0; i < articles.length; i++) {
        contents = articles[i].getElementsByClassName("contents")[0];
        txtValue = contents.textContent || contents.innerText;
        categoryAttribute = articles[i].dataset.category.toLowerCase();
       
    
        if ((category === "all" || category === categoryAttribute) && txtValue.toUpperCase().indexOf(filter) > -1) {
            articles[i].style.display = "";
        }else {
            articles[i].style.display = "none";
        }
    }
    console.log(category)
}
function addToCart(item) {
    var cartItems = document.getElementById("cart-items");
    var totalSpan = document.getElementById("totalpris");

    var itemName = item.getElementsByClassName("contents")[0].innerText;
    var itemPrice = parseFloat(item.getElementsByClassName("button_text")[0].innerText);

    var p = document.createElement("p");
    p.textContent = itemName + " - " + itemPrice + " kr";

    var removeButton = document.createElement("button");
    removeButton.textContent = "ta bort";
    removeButton.addEventListener("click", function() {
        removeFromCart(item);
    });

    p.appendChild(removeButton);

    cartItems.appendChild(p);

    var totalPrice = parseFloat(totalSpan.innerText) + itemPrice;
    totalSpan.innerText = totalPrice + " kr";
}

function removeFromCart(item) {
    var cartItems = document.getElementById("cart-items");
    var totalSpan = document.getElementById("totalpris");

    var itemName = item.getElementsByClassName("contents")[0].innerText;
    var itemPrice = parseFloat(item.getElementsByClassName("button_text")[0].innerText);

    var cartListItems = cartItems.getElementsByTagName("p");
    for (var i = 0; i < cartListItems.length; i++) {
        var cartItemText = cartListItems[i].textContent;
        if (cartItemText.includes(itemName)) {
        
            cartItems.removeChild(cartListItems[i]);
            var totalPrice = parseFloat(totalSpan.innerText) - itemPrice;
            totalSpan.innerText = totalPrice + " kr";

            break;
        }
    }
}
var buttons = document.getElementsByClassName("butt");
for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function() {
        addToCart(this.closest(".produkter"));
    });
}

document.getElementById("kundvagn-header").addEventListener("click", function () {
    var cartItems = document.getElementById("cart-items");
    if (cartItems.style.display === "none" || getComputedStyle(cartItems).display === "none") {
        cartItems.style.display = "";
    } else {
        cartItems.style.display = "none";
    }
});