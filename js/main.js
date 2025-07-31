// FAB house - Main JavaScript File
// ================================

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let filteredProducts = [];
let currentProduct = null;

// Product Data with Real Stock Photos
const productDatabase = [
    {
        id: 1,
        name: "Premium Silk Elegance",
        category: "silk",
        price: 89.99,
        originalPrice: 119.99,
        description: "Luxurious 100% pure silk fabric with a beautiful sheen and smooth texture. Perfect for elegant dresses, blouses, and formal wear.",
        images: [
            "https://pixabay.com/get/g2cf7f50a3ee08214c4affdc68a66516291c80f03585b37af91aa773734f853c337a5cb41bd4a53db2cc7681fb0fc924576f2841c0f59495ffd78cc9e64535bab_1280.jpg",
            "https://pixabay.com/get/g16efb350c868ae1b847961243ecf7849da1c7f132f08c17d5de58515400eb202ca51b379448a40d17b793d6aa6013b6661cb250a526dd7c4d4a21aedc0ce439f_1280.jpg",
            "https://pixabay.com/get/g1ac107c280e5e1c17ebe54eeb3f1542fb3b4b9d18958a749299d1dc310846208c01807bd1b5492011995bd0e7083e32dde7c0e0f961fead1373a644e959a8e04_1280.jpg",
            "https://pixabay.com/get/ga2780babd0969b20a993fe2104497174b1ac95f4583bb3e8df2a4f0299cddd53b42e2c25e88a3fb8ac122d2478d416e942d58af383766823a8edc2b9015effce_1280.jpg"
        ],
        colors: ["red", "blue", "green", "black"],
        widths: ["45", "60", "72"],
        rating: 4.8,
        reviews: 24,
        inStock: true,
        isNew: true,
        tags: ["luxury", "formal", "elegant"]
    },
    {
        id: 2,
        name: "Cotton Comfort Essential",
        category: "cotton",
        price: 45.99,
        originalPrice: 65.99,
        description: "Premium organic cotton fabric perfect for everyday wear. Soft, breathable, and durable for all your crafting needs.",
        images: [
            "https://pixabay.com/get/g06c93505e1e48a8631777ce3523895609f739e4e3dcbff4f9bc51fdf9aa5bd6d202e4a360970ab784115d0c6774f6e1c16b7324fcabf818388c2bd63a6335213_1280.jpg",
            "https://pixabay.com/get/g5d91329b9eb3048078be40d32c38f5db284d7934518c042f1703cc8d9e29e055e4f938c4075c41f44b249e9ef6c49fe26caae6fccc4bbefd4611b4d636e084f6_1280.jpg",
            "https://pixabay.com/get/g45e3d134d46431e2595c6f943bf33f836ef49c9572f1e717c00b293d3ba38af7364b545cd628729c7535b927e02f8c2baa7cc3ff55478c389ad14c1befc9f3be_1280.jpg"
        ],
        colors: ["white", "blue", "green", "gray"],
        widths: ["45", "60"],
        rating: 4.6,
        reviews: 18,
        inStock: true,
        isNew: false,
        tags: ["organic", "comfortable", "everyday"]
    },
    {
        id: 3,
        name: "Wool Luxe Heritage",
        category: "wool",
        price: 125.99,
        originalPrice: 165.99,
        description: "Fine merino wool fabric perfect for sophisticated tailoring. Excellent drape and temperature regulation.",
        images: [
            "https://pixabay.com/get/g9d979eba0a7b5234e7e44bfacb7f221b58cb655ae3b76707cab9eeaafc89cd311bbd96103aad83ad6e880af50ea49be2284e0050453ddfa8420c0a4692448e58_1280.jpg",
            "https://pixabay.com/get/gb54a37ff7f5cc709611e3d72e40f2ead6b99767290e4a7e1290474d257f875bb28c3135877fac259b083bb456b875c2f42acd322a5cff2156c8fbd8588716578_1280.jpg"
        ],
        colors: ["black", "gray", "blue", "red"],
        widths: ["60", "72"],
        rating: 4.9,
        reviews: 31,
        inStock: true,
        isNew: false,
        tags: ["luxury", "tailoring", "professional"]
    },
    {
        id: 4,
        name: "Linen Breeze Natural",
        category: "linen",
        price: 67.99,
        originalPrice: 89.99,
        description: "Natural linen fabric with excellent breathability. Perfect for summer clothing and home décor projects.",
        images: [
            "https://pixabay.com/get/g31a999e6fc49b1ad2a669786a0de6bf39fa44599435747c37149e4f5b6495332968d19ffd5cdedf0431a9ec7f3f718c7_1280.jpg",
            "https://pixabay.com/get/gb154f4bdffc9336d4e20d505aba7d817998300ad209a246a73bc4765418629f0e25b3e54ff25bf782ed221d7fa7b2dde5b5bf944a31151f361c4ca6ab65e72b0_1280.jpg"
        ],
        colors: ["white", "yellow", "blue", "green"],
        widths: ["45", "60"],
        rating: 4.7,
        reviews: 15,
        inStock: true,
        isNew: true,
        tags: ["natural", "breathable", "summer"]
    },
    {
        id: 5,
        name: "Silk Brocade Royal",
        category: "silk",
        price: 149.99,
        originalPrice: 199.99,
        description: "Exquisite silk brocade with intricate patterns. Ideal for special occasion wear and luxury home furnishings.",
        images: [
            "https://pixabay.com/get/ga6f093a1ea3e8c80b9480185f7924c02d6a6819ab01b8374cb2381edbd532e47f7f3e18ec8fd2efc4074bf9e0c2601441d01b50feef34bb56427d64346221ac5_1280.jpg",
            "https://pixabay.com/get/gaf055212d7cd4d639db5a96d9d97903458a61d241e5ce8bb0a11403a845474e4f5fa0c7aa79bdcff05a1df4de1ea68f273e9e0309a3aa839cbcdb7723365411e_1280.jpg"
        ],
        colors: ["red", "purple", "black", "blue"],
        widths: ["45", "60"],
        rating: 5.0,
        reviews: 8,
        inStock: true,
        isNew: true,
        tags: ["luxury", "formal", "patterns"]
    },
    {
        id: 6,
        name: "Cotton Denim Classic",
        category: "cotton",
        price: 52.99,
        originalPrice: 72.99,
        description: "High-quality denim fabric perfect for jeans, jackets, and casual wear. Durable and comfortable.",
        images: [
            "https://pixabay.com/get/gb72896e54d5bffd9b7a3b5bb50a4127412bf0030adb98da2c484404bc082bf88a30c328db6f90d4eac3750cea08362fc3a268b15fb8c0be5a0156a8cea8c345c_1280.jpg",
            "https://pixabay.com/get/gb9ed521cc9491db83baa08899742b90d8e7dbba8bad1a1869452497775e18948ef022bc7cc87d86471f842c04cdd713a8853d7a093198fe7346d481ee0c9cfb7_1280.jpg"
        ],
        colors: ["blue", "black", "gray", "white"],
        widths: ["60", "72"],
        rating: 4.5,
        reviews: 22,
        inStock: true,
        isNew: false,
        tags: ["casual", "durable", "classic"]
    },
    {
        id: 7,
        name: "Wool Tweed Heritage",
        category: "wool",
        price: 98.99,
        originalPrice: 128.99,
        description: "Traditional tweed wool fabric with distinctive texture. Perfect for vintage-inspired clothing and accessories.",
        images: [
            "https://pixabay.com/get/g8d1ad26be1fcaef1c67d17d60c5a78070e1fe7b994160d06c4f43270ff11f498cec1a7566282317fffc56536917f182cbbcfc67e716821dde37b734d4d47bda9_1280.jpg",
            "https://pixabay.com/get/gd0bdf599b2970c5d33a260ceaccf664055ca32dadb5ca7df947b8586cd2cde1a98de9d7f1cfcd3626089bda312cbbf99825140fd25c539912e471bbcaf1b7235_1280.jpg"
        ],
        colors: ["gray", "brown", "green", "black"],
        widths: ["60", "72"],
        rating: 4.8,
        reviews: 19,
        inStock: true,
        isNew: false,
        tags: ["traditional", "textured", "vintage"]
    },
    {
        id: 8,
        name: "Linen Canvas Pure",
        category: "linen",
        price: 73.99,
        originalPrice: 95.99,
        description: "Heavy-weight linen canvas perfect for upholstery, bags, and home décor. Natural and sustainable.",
        images: [
            "https://pixabay.com/get/g2ab69eb2b2cab0681bfdcdd7e6e4cc28f504f39a2f784eee71d4b6362db0b9be6a4ee4a2bc5babb1a746b87a21a468a7c95095e9ce5800abfa2179bca07e85f4_1280.jpg",
            "https://pixabay.com/get/g47be0e7a6ae34b1f6526d4aee747058bf1e2fd8057c9aed0fdf284b9a74cbf38685cbafe3d5c555f1bc049228cd622cb6667d74562ca08a0c085c85f4908d4bd_1280.jpg"
        ],
        colors: ["white", "gray", "brown", "green"],
        widths: ["45", "60"],
        rating: 4.6,
        reviews: 12,
        inStock: true,
        isNew: false,
        tags: ["sustainable", "heavy-weight", "versatile"]
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Set products
    products = [...productDatabase];
    filteredProducts = [...products];

    // Initialize components based on current page
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'shop':
            initializeShopPage();
            break;
        case 'product':
            initializeProductPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
        case 'checkout':
            initializeCheckoutPage();
            break;
    }

    // Initialize common components
    initializeNavigation();
    initializeMobileMenu();
    updateCartCount();
    initializeAssetMapping();
}

// Asset Mapping
function initializeAssetMapping() {
    // Map assets to actual stock photos
    const assetMap = {
        'assets/hero-fabric.jpg': 'https://pixabay.com/get/gd5f0c6dd61396abfefcd578c787998200b532a50c8a51edffdc9662407ef2df65121cbdefbd330e4e6545bdd4a374f659c0e47ef0259bc6e65e2faa959f85dbd_1280.jpg',
        'assets/fabric-1.jpg': 'https://pixabay.com/get/g2cf7f50a3ee08214c4affdc68a66516291c80f03585b37af91aa773734f853c337a5cb41bd4a53db2cc7681fb0fc924576f2841c0f59495ffd78cc9e64535bab_1280.jpg',
        'assets/fabric-2.jpg': 'https://pixabay.com/get/g06c93505e1e48a8631777ce3523895609f739e4e3dcbff4f9bc51fdf9aa5bd6d202e4a360970ab784115d0c6774f6e1c16b7324fcabf818388c2bd63a6335213_1280.jpg',
        'assets/fabric-3.jpg': 'https://pixabay.com/get/g9d979eba0a7b5234e7e44bfacb7f221b58cb655ae3b76707cab9eeaafc89cd311bbd96103aad83ad6e880af50ea49be2284e0050453ddfa8420c0a4692448e58_1280.jpg',
        'assets/fabric-4.jpg': 'https://pixabay.com/get/gd0bdf599b2970c5d33a260ceaccf664055ca32dadb5ca7df947b8586cd2cde1a98de9d7f1cfcd3626089bda312cbbf99825140fd25c539912e471bbcaf1b7235_1280.jpg'
    };

    // Replace all asset references with actual images
    Object.keys(assetMap).forEach(asset => {
        const images = document.querySelectorAll(`img[src="${asset}"]`);
        images.forEach(img => {
            img.src = assetMap[asset];
        });
    });
}

// Navigation
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page || 'index';
}

function initializeNavigation() {
    // Add click handlers for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearch);
    }
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function toggleSearch() {
    // Simple search toggle - could be expanded
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.focus();
    } else {
        // Redirect to shop page with search focus
        window.location.href = 'shop.html';
    }
}

// Home Page
function initializeHomePage() {
    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#featured') {
                e.preventDefault();
                document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('.category-link');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
    });
}

// Shop Page
function initializeShopPage() {
    setupFilters();
    setupSearch();
    setupSorting();
    loadProducts();
    setupLoadMore();
    
    // Check for category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && category !== 'all') {
        const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
        if (categoryCheckbox) {
            // Uncheck "all"
            document.querySelector('input[value="all"]').checked = false;
            categoryCheckbox.checked = true;
            applyFilters();
        }
    }
}

function setupFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Color filters
    const colorFilters = document.querySelectorAll('.color-filter');
    colorFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });

    // Price range
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
            applyFilters();
        });
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

function setupSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applySorting);
    }
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    updateProductCount();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.setAttribute('data-aos', 'fade-up');
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            <div class="product-badges">
                ${product.isNew ? '<span class="badge new">New</span>' : ''}
                ${discount > 0 ? '<span class="badge sale">-' + discount + '%</span>' : ''}
            </div>
            <div class="product-actions">
                <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-count">(${product.reviews} reviews)</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `;

    // Add click handler to navigate to product page
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.action-btn') && !e.target.closest('.add-to-cart')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });

    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function applyFilters() {
    let filtered = [...products];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
    
    if (!selectedCategories.includes('all')) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Color filter
    const selectedColors = Array.from(document.querySelectorAll('.color-filter.active'))
        .map(cf => cf.getAttribute('data-color'));
    
    if (selectedColors.length > 0) {
        filtered = filtered.filter(product => 
            product.colors.some(color => selectedColors.includes(color))
        );
    }
    
    // Price filter
    const maxPrice = document.getElementById('price-range')?.value || 200;
    filtered = filtered.filter(product => product.price <= maxPrice);
    
    // Search filter
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    filteredProducts = filtered;
    loadProducts();
}

function applySorting() {
    const sortValue = document.getElementById('sort-select')?.value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts = [...products];
            applyFilters();
            return;
    }
    
    loadProducts();
}

function updateProductCount() {
    const countElement = document.getElementById('products-count');
    if (countElement) {
        const count = filteredProducts.length;
        countElement.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}

function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // For demo purposes, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Product Detail Page
function initializeProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    currentProduct = products.find(p => p.id === productId) || products[0];
    
    loadProductDetails();
    setupProductImageGallery();
    setupProductOptions();
    setupProductTabs();
    loadRelatedProducts();
}

function loadProductDetails() {
    if (!currentProduct) return;
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
        breadcrumb.textContent = currentProduct.name;
    }
    
    // Update product title
    const title = document.getElementById('product-title');
    if (title) {
        title.textContent = currentProduct.name;
    }
    
    // Update price
    const price = document.getElementById('product-price');
    if (price) {
        price.textContent = `$${currentProduct.price}`;
    }
    
    // Update description
    const description = document.getElementById('product-description');
    if (description) {
        description.textContent = currentProduct.description;
    }
    
    // Update images
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = currentProduct.images[0];
        mainImage.alt = currentProduct.name;
    }
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (currentProduct.images[index]) {
            thumb.src = currentProduct.images[index];
            thumb.alt = `${currentProduct.name} - View ${index + 1}`;
        }
    });
    
    // Update color options
    setupColorOptions();
}

function setupProductImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            if (mainImage) {
                mainImage.src = this.src;
            }
        });
    });
    
    // Image zoom functionality
    const imageZoom = document.querySelector('.image-zoom');
    if (imageZoom) {
        imageZoom.addEventListener('click', function() {
            // Simple zoom implementation - could be enhanced with a modal
            const img = document.getElementById('main-product-image');
            if (img) {
                window.open(img.src, '_blank');
            }
        });
    }
}

function setupColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupProductOptions() {
    // Quantity controls
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('quantity');
    
    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
        
        qtyPlus.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
        });
    }
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            if (currentProduct) {
                const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
                const selectedColor = document.querySelector('.color-option.active')?.getAttribute('data-color') || currentProduct.colors[0];
                const selectedWidth = document.getElementById('width-select')?.value || currentProduct.widths[0];
                
                addToCart(currentProduct.id, quantity, { color: selectedColor, width: selectedWidth });
                
                // Add animation
                this.classList.add('scale-in');
                setTimeout(() => this.classList.remove('scale-in'), 300);
            }
        });
    }
}

function setupProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function loadRelatedProducts() {
    const relatedGrid = document.getElementById('related-products-grid');
    if (!relatedGrid || !currentProduct) return;
    
    // Get related products (same category, different products)
    const related = products
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .slice(0, 3);
    
    relatedGrid.innerHTML = '';
    related.forEach(product => {
        const productCard = createProductCard(product);
        relatedGrid.appendChild(productCard);
    });
}

// Cart Functionality
function addToCart(productId, quantity = 1, options = {}) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        options: options
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && 
        JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }
    
    saveCart();
    updateCartCount();
    showCartNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId, options = {}) {
    cart = cart.filter(item => 
        !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options))
    );
    saveCart();
    updateCartCount();
    
    // Reload cart page if we're on it
    if (getCurrentPage() === 'cart') {
        loadCartItems();
    }
}

function updateCartQuantity(productId, quantity, options = {}) {
    const itemIndex = cart.findIndex(item => 
        item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
        saveCart();
        updateCartCount();
        
        // Update cart page if we're on it
        if (getCurrentPage() === 'cart') {
            loadCartItems();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showCartNotification(message) {
    // Simple notification - could be enhanced with a proper toast system
    const notification = document.createElement('div');
    notification.className = 'success';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cart Page
function initializeCartPage() {
    loadCartItems();
    setupCartActions();
}

function loadCartItems() {
    const cartList = document.getElementById('cart-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartItemsCount = document.getElementById('cart-items-count');
    
    if (!cartList || !cartEmpty) return;
    
    if (cart.length === 0) {
        cartList.style.display = 'none';
        cartEmpty.style.display = 'block';
        if (cartItemsCount) {
            cartItemsCount.textContent = 'Your cart is empty';
        }
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartList.style.display = 'block';
    
    if (cartItemsCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsCount.textContent = `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`;
    }
    
    cartList.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartList.appendChild(cartItemElement);
    });
    
    updateCartSummary();
}

function createCartItemElement(item) {
    const element = document.createElement('div');
    element.className = 'cart-item fade-in';
    
    const optionsText = Object.entries(item.options || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    
    element.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${optionsText}</p>
        </div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-quantity">
            <button class="qty-btn minus" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1}, ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">-</button>
            <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value), ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
            <button class="qty-btn plus" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1}, ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id}, ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    return element;
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Update summary elements
    const elements = {
        'cart-subtotal': subtotal,
        'cart-shipping': shipping,
        'cart-tax': tax,
        'cart-total': total
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = `$${value.toFixed(2)}`;
        }
    });
    
    // Update checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.style.pointerEvents = 'none';
            checkoutBtn.style.opacity = '0.5';
        } else {
            checkoutBtn.style.pointerEvents = 'auto';
            checkoutBtn.style.opacity = '1';
        }
    }
}

function setupCartActions() {
    // Promo code
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.getElementById('promo-input');
            const promoCode = promoInput?.value.trim().toLowerCase();
            
            if (promoCode === 'fab10') {
                showCartNotification('Promo code applied! 10% discount');
                // Apply discount logic here
            } else if (promoCode) {
                showCartNotification('Invalid promo code');
            }
        });
    }
    
    // Load recommended products
    loadRecommendedProducts();
}

function loadRecommendedProducts() {
    const recommendedGrid = document.getElementById('recommended-products-grid');
    if (!recommendedGrid) return;
    
    // Show random products not in cart
    const cartProductIds = cart.map(item => item.id);
    const recommended = products
        .filter(p => !cartProductIds.includes(p.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
    recommendedGrid.innerHTML = '';
    recommended.forEach(product => {
        const productCard = createProductCard(product);
        recommendedGrid.appendChild(productCard);
    });
}

// Checkout Page
function initializeCheckoutPage() {
    loadCheckoutItems();
    setupCheckoutForm();
    setupShippingOptions();
    setupPaymentMethods();
}

function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const element = document.createElement('div');
        element.className = 'checkout-item';
        
        const optionsText = Object.entries(item.options || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        
        element.innerHTML = `
            <div class="checkout-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-info">
                <h5>${item.name}</h5>
                <p>Qty: ${item.quantity} ${optionsText ? '• ' + optionsText : ''}</p>
            </div>
            <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        
        checkoutItems.appendChild(element);
    });
    
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = getShippingCost();
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const elements = {
        'checkout-subtotal': subtotal,
        'checkout-shipping': shipping,
        'checkout-tax': tax,
        'checkout-total': total
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = `$${value.toFixed(2)}`;
        }
    });
}

function getShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    if (!selectedShipping) return 0;
    
    switch(selectedShipping.value) {
        case 'express': return 15;
        case 'overnight': return 35;
        default: return 0;
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '#e2e8f0';
            }
        });
        
        if (!isValid) {
            showCartNotification('Please fill in all required fields');
            return;
        }
        
        // Process order
        processOrder();
    });
}

function setupShippingOptions() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateCheckoutSummary);
    });
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (cardDetails) {
                if (this.value === 'card') {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            }
        });
    });
}

function processOrder() {
    const orderModal = document.getElementById('order-modal');
    const orderNumber = document.getElementById('order-number');
    const orderTotal = document.getElementById('order-total');
    
    // Generate order number
    const orderNum = 'FAB' + Date.now().toString().slice(-6);
    
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = getShippingCost();
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    if (orderNumber) orderNumber.textContent = orderNum;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Show modal
    if (orderModal) {
        orderModal.classList.add('show');
    }
}

function closeOrderModal() {
    const orderModal = document.getElementById('order-modal');
    if (orderModal) {
        orderModal.classList.remove('show');
    }
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function addToWishlist(productId) {
    // Simple wishlist notification
    const product = products.find(p => p.id === productId);
    if (product) {
        showCartNotification(`${product.name} added to wishlist!`);
    }
}

function quickView(productId) {
    // Navigate to product page
    window.location.href = `product.html?id=${productId}`;
}

// Global functions for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.addToWishlist = addToWishlist;
window.quickView = quickView;
window.closeOrderModal = closeOrderModal;

// Handle page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading states for async operations
function addLoadingState(element) {
    element.classList.add('loading');
}

function removeLoadingState(element) {
    element.classList.remove('loading');
}

// Image lazy loading fallback
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

console.log('FAB house - E-commerce platform initialized successfully!');
