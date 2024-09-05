document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.querySelector('.filter');
    const sortSelect = document.querySelector('.sort');
    const productList = document.querySelector('.product-list');
const products = document.querySelectorAll('.product-list .card');


    // Function to filter products
    function filterProducts() {
        const selectedCategory = filterSelect.value;
        
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const category = product.getAttribute('data-category');
            
            if (selectedCategory === 'All' || category === selectedCategory) {
                product.style.display = ''; // Show product
            } else {
                product.style.display = 'none'; // Hide product
            }
        }
    }

    // Function to sort products
    function sortProducts() {
        const sortOrder = sortSelect.value;
        
        // Retriving all product cards
        const allProducts = Array.from(productList.querySelectorAll('.card'));
        
        // Sort all products array
        allProducts.sort(function(a, b){
            // Only consider visible products for sorting
            if (a.style.display === 'none' && b.style.display !== 'none') return 1;
            if (a.style.display !== 'none' && b.style.display === 'none') return -1;
            
            const priceA = parseFloat(a.querySelector('.card-text').textContent.replace('R', ''));
            const priceB = parseFloat(b.querySelector('.card-text').textContent.replace('R', ''));
    
            if (sortOrder === 'Low') {
                return priceA - priceB;
            } else if (sortOrder === 'High'){
                return priceB - priceA;
            }
        });
    
        // Remove all cards from the product list and re-attach sorted products
        while (productList.firstChild){
            productList.removeChild(productList.firstChild);
        }
    
        for (let j = 0; j < allProducts.length; j++){
            productList.appendChild(allProducts[j]);
        }
    }
    
    // Event listeners for filter and sort
    filterSelect.addEventListener('change', function(){
        filterProducts();
        sortProducts(); 
    });

    sortSelect.addEventListener('change', function(){
        sortProducts();
    });

    // Initial sort and filter application
    filterProducts();
    sortProducts();
});


//Cart Operation

const addToCartButtons = document.querySelectorAll('.btn-primary');
    
    // Attach event listeners to each button
    for (let i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action of the button
            
            
            const card = this.closest('.card'); //TO find the ancestor matching the target
            const productName = card.querySelector('.card-title').textContent;
            const productPrice = card.querySelector('.card-text').textContent;
            const productImage = card.querySelector('.card-img-top').src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Product added to cart!');
        });
    }