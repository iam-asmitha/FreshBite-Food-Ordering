const restaurantsData = [
    { id: 1, name: "Oven Story Kitchen", cuisine: "Italian", rating: 4.8, priceTier: "Mid", time: "25–30 mins", specialty: "Wood-fired Pizzas" },
    { id: 2, name: "Grill & Crave", cuisine: "American", rating: 4.6, priceTier: "Budget", time: "20–25 mins", specialty: "Gourmet Burgers & Wraps" },
    { id: 3, name: "Wok Express", cuisine: "Asian", rating: 4.5, priceTier: "Budget", time: "25–35 mins", specialty: "Street-Style Noodles & Bowls" },
    { id: 4, name: "Cocoa & Crumb", cuisine: "Bakery", rating: 4.9, priceTier: "Mid", time: "20–30 mins", specialty: "Artisanal Brownies & Cakes" }
];

const menuItemsData = [
    {
        id: "pizza-1",
        name: "Margherita Pizza",
        category: "Pizza",
        diet: "Veg",
        price: 199,
        icon: "🍕",
        rating: 4.8,
        restaurant: "Oven Story Kitchen",
        desc: "Hand-tossed sourdough crust topped with San Marzano tomato sauce, basil leaves, and fresh mozzarella.",
        ingredients: "Whole wheat flour, tomato puree, mozzarella cheese, fresh basil, olive oil.",
        nutrition: "540 kcal | Protein: 22g | Carbs: 64g | Fat: 20g",
        reviews: "4.8/5 (120+ verified orders) — 'Crisp crust and generous cheese!'"
    },
    {
        id: "pizza-2",
        name: "BBQ Chicken Pizza",
        category: "Pizza",
        diet: "Non-Veg",
        price: 249,
        icon: "🍗",
        rating: 4.7,
        restaurant: "Oven Story Kitchen",
        desc: "Smoky grilled chicken chunks, caramelized onions, and cheddar-mozzarella blend over tangy BBQ sauce.",
        ingredients: "Grilled chicken breast, BBQ sauce, red onions, mozzarella, oregano.",
        nutrition: "620 kcal | Protein: 34g | Carbs: 62g | Fat: 24g",
        reviews: "4.7/5 (95 verified orders) — 'Rich smoky flavour and tender chicken.'"
    },
    {
        id: "burger-1",
        name: "Cheese Burger",
        category: "Burgers",
        diet: "Veg",
        price: 149,
        icon: "🍔",
        rating: 4.6,
        restaurant: "Grill & Crave",
        desc: "Golden crispy herb-potato patty layered with melted cheddar cheese, lettuce, tomato, and house mayo.",
        ingredients: "Brioche bun, spiced potato-pea patty, cheddar slice, iceberg lettuce, tomato.",
        nutrition: "480 kcal | Protein: 15g | Carbs: 56g | Fat: 21g",
        reviews: "4.6/5 (140 verified orders) — 'Super crunchy and filling!'"
    },
    {
        id: "burger-2",
        name: "Vegan Avocado Burger",
        category: "Burgers",
        diet: "Vegan",
        price: 179,
        icon: "🥑",
        rating: 4.7,
        restaurant: "Grill & Crave",
        desc: "Plant-based chickpea patty topped with smashed avocado, pickled onions, and dairy-free garlic aioli.",
        ingredients: "Multigrain bun, chickpea patty, fresh avocado, baby spinach, vegan aioli.",
        nutrition: "430 kcal | Protein: 17g | Carbs: 52g | Fat: 16g",
        reviews: "4.7/5 (64 verified orders) — 'Fresh, light, and delicious.'"
    },
    {
        id: "noodles-1",
        name: "Veg Hakka Noodles",
        category: "Noodles",
        diet: "Vegan",
        price: 129,
        icon: "🍜",
        rating: 4.5,
        restaurant: "Wok Express",
        desc: "High-flame wok-tossed noodles with julienned carrots, bell peppers, cabbage, and roasted garlic.",
        ingredients: "Noodles, bell peppers, carrots, spring onions, soy sauce, sesame oil.",
        nutrition: "410 kcal | Protein: 11g | Carbs: 68g | Fat: 10g",
        reviews: "4.5/5 (110 verified orders) — 'Authentic street-style wok aroma.'"
    },
    {
        id: "dessert-1",
        name: "Fudge Chocolate Brownie",
        category: "Desserts",
        diet: "Veg",
        price: 119,
        icon: "🍰",
        rating: 4.9,
        restaurant: "Cocoa & Crumb",
        desc: "Warm, gooey dark chocolate brownie baked with roasted walnuts and drizzled with chocolate ganache.",
        ingredients: "70% dark cocoa, butter, brown sugar, flour, roasted walnuts.",
        nutrition: "390 kcal | Protein: 6g | Carbs: 48g | Fat: 19g",
        reviews: "4.9/5 (180 verified orders) — 'Best dessert on FreshBite!'"
    }
];

let cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];
let currentUser = JSON.parse(localStorage.getItem("freshbiteUser")) || null;
let wishlist = JSON.parse(localStorage.getItem("freshbiteWishlist")) || [];
let orders = JSON.parse(localStorage.getItem("freshbiteOrders")) || [];
let savedAddresses = JSON.parse(localStorage.getItem("freshbiteAddresses")) || [
    "Hostel Block B, Anna University Campus, Chennai"
];
let appliedCoupon = null;

function toggleMobileNav() {
    document.getElementById("main-nav").classList.toggle("open");
}

function closeMobileNav() {
    document.getElementById("main-nav").classList.remove("open");
}

function renderRestaurants() {
    const container = document.getElementById("restaurant-list");
    const cuisine = document.getElementById("rest-cuisine-filter").value;
    const minRating = parseFloat(document.getElementById("rest-rating-filter").value);
    const priceTier = document.getElementById("rest-price-filter").value;

    const filtered = restaurantsData.filter(r => {
        const matchCuisine = cuisine === "All" || r.cuisine === cuisine;
        const matchRating = r.rating >= minRating;
        const matchPrice = priceTier === "All" || r.priceTier === priceTier;
        return matchCuisine && matchRating && matchPrice;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No restaurants match your selected filters.</p>";
        return;
    }

    container.innerHTML = filtered.map(r => `
        <div class="info-card">
            <h3>${r.name}</h3>
            <p><strong>${r.cuisine}</strong> • ⭐ ${r.rating} • ${r.time}</p>
            <p>${r.specialty}</p>
            <a href="#menu" class="order-btn">Browse Dishes</a>
        </div>
    `).join("");
}

function quickCategoryFilter(category) {
    document.getElementById("menu-category-filter").value = category;
    renderMenu();
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

function renderMenu() {
    const container = document.getElementById("food-list");
    const search = document.getElementById("menu-search").value.trim().toLowerCase();
    const category = document.getElementById("menu-category-filter").value;
    const diet = document.getElementById("menu-diet-filter").value;

    const filtered = menuItemsData.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search);
        const matchCategory = category === "All" || item.category === category;
        const matchDiet = diet === "All" || item.diet === diet;
        return matchSearch && matchCategory && matchDiet;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No dishes match your search or dietary filter.</p>";
        return;
    }

    container.innerHTML = filtered.map(item => {
        const isWished = wishlist.includes(item.id);
        return `
            <div class="food-card">
                <div>
                    <div class="card-top-row">
                        <span class="diet-badge diet-${item.diet}">${item.diet}</span>
                        <button class="wish-icon-btn" onclick="toggleWishlist('${item.id}')" title="Save to Wishlist">
                            ${isWished ? "❤️" : "🤍"}
                        </button>
                    </div>
                    <div class="food-thumb">${item.icon}</div>
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price} <small style="color:#2D1B12;font-size:13px;">(⭐ ${item.rating})</small></p>
                    <p>${item.desc}</p>
                </div>
                <div class="card-btns">
                    <button class="secondary-btn" onclick="openProductDetails('${item.id}')">Details</button>
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join("");
}

function updateCartCount() {
    const btn = document.getElementById("header-cart-btn");
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    btn.textContent = `🛒 Cart (${count})`;
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal === 0 ? 0 : (subtotal >= 299 ? 0 : 30);
    let discount = 0;

    if (appliedCoupon === "FRESH20" && subtotal >= 199) {
        discount = Math.round(subtotal * 0.2);
    } else if (appliedCoupon === "WELCOME50" && subtotal >= 149) {
        discount = 50;
    }

    const total = Math.max(0, subtotal + delivery - discount);
    return { subtotal, delivery, discount, total };
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const { subtotal, delivery, discount, total } = calculateTotals();

    document.getElementById("bill-subtotal").textContent = `₹${subtotal}`;
    document.getElementById("bill-delivery").textContent = delivery === 0 && subtotal > 0 ? "FREE (₹0)" : `₹${delivery}`;
    document.getElementById("bill-discount").textContent = `-₹${discount}`;
    document.getElementById("cart-total").textContent = `₹${total}`;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty. Add delicious dishes from the Food Menu!</p>";
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-row">
            <div>
                <strong>${item.name}</strong> — ₹${item.price} each
            </div>
            <div class="cart-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span><strong>${item.quantity}</strong></span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <span>Subtotal: <strong>₹${item.price * item.quantity}</strong></span>
                <button class="secondary-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        </div>
    `).join("");
}

function saveCart() {
    localStorage.setItem("freshbiteCart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    alert(`${name} added to your cart!`);
}

function changeQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function clearCart() {
    cart = [];
    appliedCoupon = null;
    document.getElementById("coupon-msg").textContent = "";
    saveCart();
}

function showCart() {
    renderCart();
    document.getElementById("cart-section").scrollIntoView({ behavior: "smooth" });
}

function copyCoupon(code) {
    document.getElementById("coupon-input").value = code;
    applyCoupon();
    showCart();
}

function applyCoupon() {
    const code = document.getElementById("coupon-input").value.trim().toUpperCase();
    const msgEl = document.getElementById("coupon-msg");
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (code === "FRESH20") {
        if (subtotal < 199) {
            msgEl.textContent = "Add items worth ₹199+ to use FRESH20.";
            return;
        }
        appliedCoupon = "FRESH20";
        msgEl.textContent = "Coupon FRESH20 applied (20% OFF)!";
    } else if (code === "WELCOME50") {
        if (subtotal < 149) {
            msgEl.textContent = "Add items worth ₹149+ to use WELCOME50.";
            return;
        }
        appliedCoupon = "WELCOME50";
        msgEl.textContent = "Coupon WELCOME50 applied (₹50 OFF)!";
    } else {
        appliedCoupon = null;
        msgEl.textContent = "Invalid code. Try FRESH20 or WELCOME50.";
    }
    renderCart();
}

function toggleCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add food items before checkout.");
        return;
    }
    const box = document.getElementById("checkout-box");
    box.classList.toggle("hidden");
    if (currentUser) {
        document.getElementById("checkout-name").value = currentUser.name;
    }
    if (savedAddresses.length > 0) {
        document.getElementById("checkout-address").value = savedAddresses[0];
    }
}

function completeCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    const name = document.getElementById("checkout-name").value.trim();
    const phone = document.getElementById("checkout-phone").value.trim();
    const address = document.getElementById("checkout-address").value.trim();
    const deliveryTime = document.getElementById("checkout-time").value;
    const paymentMethod = document.getElementById("checkout-payment").value;
    const { total } = calculateTotals();

    const newOrder = {
        id: "FB-" + Math.floor(100000 + Math.random() * 900000),
        customer: name,
        phone,
        address,
        deliveryTime,
        paymentMethod,
        items: cart.map(i => `${i.name} x${i.quantity}`).join(", "),
        total,
        statusStep: 1,
        date: new Date().toLocaleString()
    };

    orders.unshift(newOrder);
    localStorage.setItem("freshbiteOrders", JSON.stringify(orders));

    cart = [];
    appliedCoupon = null;
    saveCart();
    document.getElementById("checkout-box").classList.add("hidden");
    event.target.reset();

    const confBox = document.getElementById("order-confirmation");
    confBox.classList.remove("hidden");
    confBox.innerHTML = `
        <h3>✅ Order Confirmed! (${newOrder.id})</h3>
        <p><strong>Customer:</strong> ${newOrder.customer} (${newOrder.phone})</p>
        <p><strong>Delivery Address:</strong> ${newOrder.address}</p>
        <p><strong>Delivery Slot:</strong> ${newOrder.deliveryTime}</p>
        <p><strong>Payment Mode:</strong> ${newOrder.paymentMethod} — <strong>₹${newOrder.total}</strong></p>
        <p>Track your live order status below in the User Account section!</p>
    `;

    renderOrderHistory();
}

function openProductDetails(id) {
    const item = menuItemsData.find(m => m.id === id);
    if (!item) return;

    document.getElementById("detail-visual").textContent = item.icon;
    const dietBadge = document.getElementById("detail-diet");
    dietBadge.textContent = item.diet;
    dietBadge.className = `diet-badge diet-${item.diet}`;
    document.getElementById("detail-title").textContent = `${item.name} (${item.restaurant})`;
    document.getElementById("detail-price").textContent = `₹${item.price}`;
    document.getElementById("detail-desc").textContent = item.desc;
    document.getElementById("detail-ingredients").textContent = item.ingredients;
    document.getElementById("detail-nutrition").textContent = item.nutrition;
    document.getElementById("detail-reviews").textContent = item.reviews;

    document.getElementById("detail-add-btn").onclick = () => {
        addToCart(item.name, item.price);
        closeModal("product-modal");
    };
    document.getElementById("detail-wish-btn").onclick = () => {
        toggleWishlist(item.id);
        closeModal("product-modal");
    };

    document.getElementById("product-modal").classList.remove("hidden");
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(w => w !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem("freshbiteWishlist", JSON.stringify(wishlist));
    renderMenu();
    renderWishlist();
}

function renderWishlist() {
    const container = document.getElementById("wishlist-container");
    const wishedItems = menuItemsData.filter(m => wishlist.includes(m.id));
    if (wishedItems.length === 0) {
        container.innerHTML = "<p>No wishlist items yet. Click the heart icon on any dish!</p>";
        return;
    }
    container.innerHTML = wishedItems.map(item => `
        <div class="cart-row">
            <span>${item.icon} <strong>${item.name}</strong> (₹${item.price})</span>
            <div class="cart-controls">
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                <button class="secondary-btn" onclick="toggleWishlist('${item.id}')">Remove</button>
            </div>
        </div>
    `).join("");
}

function renderAddresses() {
    const list = document.getElementById("saved-addresses-list");
    list.innerHTML = savedAddresses.map(addr => `<li>📍 ${addr}</li>`).join("");
}

function addSavedAddress(event) {
    event.preventDefault();
    const input = document.getElementById("new-address-input");
    const val = input.value.trim();
    if (!val) return;
    savedAddresses.unshift(val);
    localStorage.setItem("freshbiteAddresses", JSON.stringify(savedAddresses));
    input.value = "";
    renderAddresses();
}

function advanceOrderTracking(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    if (order.statusStep < 4) {
        order.statusStep++;
        localStorage.setItem("freshbiteOrders", JSON.stringify(orders));
        renderOrderHistory();
    }
}

function renderOrderHistory() {
    const container = document.getElementById("order-history-list");
    if (orders.length === 0) {
        container.innerHTML = "<p>No orders placed yet. Complete a checkout to see order history and live tracking!</p>";
        return;
    }

    const stages = ["1. Order Placed", "2. Preparing Food", "3. Out for Delivery", "4. Delivered"];

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="card-top-row">
                <strong>Order ID: ${order.id}</strong>
                <span>${order.date}</span>
            </div>
            <p><strong>Items:</strong> ${order.items}</p>
            <p><strong>Total:</strong> ₹${order.total} (${order.paymentMethod}) | <strong>Slot:</strong> ${order.deliveryTime}</p>
            <div class="track-steps">
                ${stages.map((stage, idx) => `
                    <span class="track-step ${order.statusStep >= idx + 1 ? "active" : ""}">${stage}</span>
                `).join("")}
            </div>
            ${order.statusStep < 4 ? `<button style="margin-top:10px;" onclick="advanceOrderTracking('${order.id}')">Simulate Next Tracking Stage</button>` : ""}
        </div>
    `).join("");
}

function openAuthModal() {
    document.getElementById("auth-modal").classList.remove("hidden");
}

function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

function closeModalOnBackdrop(event, id) {
    if (event.target.id === id) closeModal(id);
}

function renderAccount() {
    const infoEl = document.getElementById("account-info");
    const authBtn = document.getElementById("auth-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (currentUser) {
        infoEl.textContent = `Signed in as ${currentUser.name} (${currentUser.email})`;
        authBtn.textContent = `👤 ${currentUser.name}`;
        logoutBtn.classList.remove("hidden");
    } else {
        infoEl.textContent = "Guest User — Login or register to manage your profile.";
        authBtn.textContent = "Login / Register";
        logoutBtn.classList.add("hidden");
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("auth-name").value.trim();
    const email = document.getElementById("auth-email").value.trim();
    currentUser = { name, email };
    localStorage.setItem("freshbiteUser", JSON.stringify(currentUser));
    renderAccount();
    closeModal("auth-modal");
    event.target.reset();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem("freshbiteUser");
    renderAccount();
}

function submitContact(event) {
    event.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    document.getElementById("contact-status").textContent = `Thank you, ${name}! Our support team will reply within 2 hours.`;
    event.target.reset();
}

renderRestaurants();
renderMenu();
updateCartCount();
renderCart();
renderAccount();
renderAddresses();
renderWishlist();
renderOrderHistory();