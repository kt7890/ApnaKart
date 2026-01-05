// app.js
// Enhanced SPA-like behavior with UI improvements
const app = document.getElementById('app');
const templates = {};
document.querySelectorAll('template').forEach(t => templates[t.id] = t.content);

// Enhanced database with more products, categories and images
let db = {
  categories: [
    { id: 'c1', name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'c2', name: 'Shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'c3', name: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'c4', name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'c5', name: 'Dresses', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'c6', name: 'Accessories', img: 'https://images.unsplash.com/photo-1592478411213-6153e4eb2f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
  ],
  products: [
    { id: 'p1', name:'Classic Cotton Tee', price:399, img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'T-Shirts', rating: 4.2, oldPrice: 499, sizes:{S:5,M:8,L:4,XL:1} },
    { id: 'p2', name:'Denim Jacket Premium', price:1299, img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'Jackets', rating: 4.5, oldPrice: 1599, sizes:{M:3,L:1,XL:0} },
    { id: 'p3', name:'Casual Fit Shirt', price:699, img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'Shirts', rating: 4.0, oldPrice: 899, sizes:{S:0,M:5,L:2} },
    { id: 'p4', name:'Slim Fit Jeans', price:899, img:'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'Jeans', rating: 4.3, oldPrice: 1199, sizes:{28:2,30:5,32:3,34:1} },
    { id: 'p5', name:'Summer Dress', price:1299, img:'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'Dresses', rating: 4.7, oldPrice: 1599, sizes:{S:2,M:4,L:1} },
    { id: 'p6', name:'Leather Belt', price:499, img:'https://images.unsplash.com/photo-1592478411213-6153e4eb2f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', category: 'Accessories', rating: 4.1, oldPrice: 699, sizes:{'32':5,'34':3,'36':2} }
  ],
  orders: [],
  sellerProducts: []
};

let state = {
  cart: [],
  currentView: 'home',
  selectedProduct: null,
  selectedSize: null,
  orderStageIndex: 0,
  currentOrder: null
};

// Navigation setup
const navButtons = document.querySelectorAll('.navbtn');
navButtons.forEach(b => {
  b.addEventListener('click', () => {
    navButtons.forEach(btn => btn.classList.remove('active'));
    b.classList.add('active');
    showView(b.dataset.view);
  });
});

document.getElementById('cartBtn').addEventListener('click', () => {
  navButtons.forEach(btn => btn.classList.remove('active'));
  showView('cart');
});

// Toast notification system
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.className = 'toast';
  toast.classList.add(type === 'success' ? 'success' : 'error');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function showView(view){
  state.currentView = view;
  render();
}

function render(){
  app.innerHTML = '';
  
  switch(state.currentView) {
    case 'home': renderHome(); break;
    case 'product': renderProductDetail(); break;
    case 'cart': renderCart(); break;
    case 'checkout': renderCheckout(); break;
    case 'track': renderTrack(); break;
    case 'seller': renderSeller(); break;
    case 'delivery': renderDelivery(); break;
  }
  
  updateCartCount();
  updateActiveNav();
}

function updateActiveNav() {
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === state.currentView);
  });
}

/* HOME VIEW */
function renderHome(){
  const node = templates['homeTpl'].cloneNode(true);
  app.appendChild(node);
  
  // Render categories
  const catWrap = document.getElementById('categoryList');
  catWrap.innerHTML = '';
  
  db.categories.forEach(cat => {
    const catTemplate = templates['categoryTpl'] ? templates['categoryTpl'].cloneNode(true) : createCategoryElement(cat);
    const catElement = templates['categoryTpl'] ? catTemplate : catTemplate;
    
    if (templates['categoryTpl']) {
      catElement.querySelector('.category-img img').src = cat.img;
      catElement.querySelector('.category-img img').alt = cat.name;
      catElement.querySelector('.category-name').textContent = cat.name;
    }
    
    catElement.addEventListener('click', () => {
      showToast(`Browsing ${cat.name}`);
    });
    
    catWrap.appendChild(catElement);
  });
  
  // Render trending products
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  
  db.products.forEach(p => {
    const pc = templates['productTpl'].cloneNode(true);
    const productCard = pc.querySelector('.product-card');
    
    // Set product image
    const imgElement = pc.querySelector('.product-img');
    if (imgElement) {
      imgElement.src = p.img;
      imgElement.alt = p.name;
    }
    
    // Set product name
    const nameElement = pc.querySelector('.pname');
    if (nameElement) nameElement.textContent = p.name;
    
    // Set price
    const priceElement = pc.querySelector('.price');
    if (priceElement) {
      priceElement.textContent = `₹${p.price}`;
    }
    
    // Set old price and discount if exists
    const priceOldElement = pc.querySelector('.price-old');
    if (priceOldElement && p.oldPrice) {
      priceOldElement.innerHTML = `₹${p.oldPrice}`;
    }
    
    // Set rating
    const ratingElement = pc.querySelector('.rating span');
    if (ratingElement) ratingElement.textContent = p.rating.toFixed(1);
    
    // Render sizes
    const sizesEl = pc.querySelector('[data-sizes]');
    if (sizesEl) {
      sizesEl.innerHTML = '';
      Object.entries(p.sizes).forEach(([sz, qty]) => {
        const btn = document.createElement('button');
        btn.textContent = sz;
        
        // Add stock status classes
        if (qty > 4) btn.classList.add('instock');
        else if (qty > 0) btn.classList.add('limited');
        else {
          btn.classList.add('out');
          btn.disabled = true;
        }
        
        // Click handler for size selection
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sizesEl.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          showToast(`${p.name} — Size ${sz} — ${qty > 4 ? 'In Stock' : 'Limited Stock'}`, 'success');
        });
        
        sizesEl.appendChild(btn);
      });
    }
    
    // Add to cart button
    const addCartBtn = pc.querySelector('.addCart');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedSize = pc.querySelector('.sizes button.selected');
        if (!selectedSize) {
          showToast('Please select a size first', 'error');
          return;
        }
        
        const size = selectedSize.textContent;
        const qty = p.sizes[size];
        
        if (qty <= 0) {
          showToast('Selected size is out of stock', 'error');
          return;
        }
        
        // Add to cart
        const cartItem = {
          id: `${p.id}:${size}`,
          pid: p.id,
          name: p.name,
          price: p.price,
          size: size,
          img: p.img,
          qty: 1
        };
        
        state.cart.push(cartItem);
        // Reduce stock
        p.sizes[size] = Math.max(0, p.sizes[size] - 1);
        
        showToast('Added to cart!', 'success');
        updateCartCount();
      });
    }
    
    // Click entire card to view details
    productCard.addEventListener('click', (e) => {
      if (!e.target.closest('button') && !e.target.closest('.sizes')) {
        state.selectedProduct = p.id;
        showView('product');
      }
    });
    
    grid.appendChild(pc);
  });
  
  // Add view all link functionality
  const viewAllLink = document.querySelector('.view-all');
  if (viewAllLink) {
    viewAllLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('View all products clicked');
    });
  }
}

// Helper function for category element
function createCategoryElement(cat) {
  const div = document.createElement('div');
  div.className = 'category-card';
  div.innerHTML = `
    <div class="category-img">
      <img src="${cat.img}" alt="${cat.name}">
    </div>
    <h4 class="category-name">${cat.name}</h4>
  `;
  return div;
}

/* PRODUCT DETAIL VIEW */
function renderProductDetail(){
  const p = db.products.find(x => x.id === state.selectedProduct);
  if(!p) return showView('home');
  
  const node = templates['productDetailTpl'].cloneNode(true);
  app.appendChild(node);
  
  // Set product details
  document.getElementById('detailImg').src = p.img;
  document.getElementById('detailImg').alt = p.name;
  document.getElementById('detailName').textContent = p.name;
  
  // Set price with discount
  const priceElement = document.getElementById('detailPrice');
  if (priceElement) {
    priceElement.textContent = `₹${p.price}`;
  }
  
  // Set old price if exists
  const oldPriceElement = document.getElementById('oldPrice');
  if (oldPriceElement && p.oldPrice) {
    oldPriceElement.textContent = p.oldPrice;
  }
  
  // Render sizes
  const sizesContainer = document.getElementById('detailSizes');
  sizesContainer.innerHTML = '';
  
  Object.entries(p.sizes).forEach(([sz, qty]) => {
    const btn = document.createElement('button');
    btn.textContent = sz;
    
    // Add stock status classes
    if(qty > 4) btn.classList.add('instock');
    else if(qty > 0) btn.classList.add('limited');
    else {
      btn.classList.add('out');
      btn.disabled = true;
    }
    
    btn.addEventListener('click', () => {
      // Mark selection
      sizesContainer.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.selectedSize = sz;
      
      // Update stock info
      const stockInfo = document.getElementById('stockInfo');
      if(stockInfo) {
        stockInfo.innerHTML = '';
        const icon = document.createElement('i');
        icon.className = qty > 0 ? 'fas fa-check-circle' : 'fas fa-times-circle';
        icon.style.color = qty > 0 ? '#10b981' : '#ef4444';
        
        const text = document.createElement('span');
        text.textContent = qty > 4 ? 'In stock • Delivery in 30-40 min' : 
                         qty > 0 ? 'Limited stock • Delivery in 30-40 min' : 
                         'Out of stock';
        
        stockInfo.appendChild(icon);
        stockInfo.appendChild(text);
      }
    });
    
    sizesContainer.appendChild(btn);
  });
  
  // Add to cart button
  document.getElementById('addToCartDetail').addEventListener('click', () => {
    if(!state.selectedSize){
      showToast('Please select a size before adding to cart.', 'error');
      return;
    }
    
    const qty = p.sizes[state.selectedSize];
    if(!qty || qty <= 0){
      showToast('Selected size is out of stock.', 'error');
      return;
    }
    
    // Add to cart
    const item = {
      id: p.id + ':' + state.selectedSize,
      pid: p.id,
      name: p.name,
      price: p.price,
      size: state.selectedSize,
      img: p.img,
      qty: 1
    };
    
    state.cart.push(item);
    // Reduce stock
    p.sizes[state.selectedSize] = Math.max(0, p.sizes[state.selectedSize] - 1);
    
    showToast('Added to cart!', 'success');
    updateCartCount();
    showView('home');
  });
  
  // Buy now button
  const buyNowBtn = document.querySelector('.btn-buy');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if(!state.selectedSize){
        showToast('Please select a size first.', 'error');
        return;
      }
      
      const qty = p.sizes[state.selectedSize];
      if(!qty || qty <= 0){
        showToast('Selected size is out of stock.', 'error');
        return;
      }
      
      // Add to cart and go directly to checkout
      const item = {
        id: p.id + ':' + state.selectedSize,
        pid: p.id,
        name: p.name,
        price: p.price,
        size: state.selectedSize,
        img: p.img,
        qty: 1
      };
      
      state.cart = [item]; // Replace cart with just this item
      p.sizes[state.selectedSize] = Math.max(0, p.sizes[state.selectedSize] - 1);
      
      updateCartCount();
      showView('checkout');
    });
  }
}

/* CART VIEW */
function renderCart(){
  const node = templates['cartTpl'].cloneNode(true);
  app.appendChild(node);
  
  const wrapper = document.getElementById('cartItems');
  if(state.cart.length === 0){
    wrapper.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
  } else {
    // Calculate subtotal
    let subtotal = 0;
    
    state.cart.forEach((it, idx) => {
      const orderItem = templates['orderItemTpl'] ? templates['orderItemTpl'].cloneNode(true) : createCartItemElement(it, idx);
      wrapper.appendChild(orderItem);
      subtotal += it.price * it.qty;
    });
    
    // Update subtotal
    document.getElementById('subtotal').textContent = subtotal;
  }
  
  // Update total
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = total;
  
  // Clear cart button
  const clearBtn = document.querySelector('.btn-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (state.cart.length > 0) {
        if (confirm('Are you sure you want to clear your cart?')) {
          // Restore stock
          state.cart.forEach(item => {
            const product = db.products.find(p => p.id === item.pid);
            if (product && product.sizes[item.size] !== undefined) {
              product.sizes[item.size] += item.qty;
            }
          });
          
          state.cart = [];
          showToast('Cart cleared', 'success');
          render();
        }
      }
    });
  }
  
  // Checkout button
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    showView('checkout');
  });
}

// Helper function for cart item element
function createCartItemElement(item, idx) {
  const div = document.createElement('div');
  div.className = 'order-item';
  div.innerHTML = `
    <img class="order-img" src="${item.img}" alt="${item.name}">
    <div class="order-info">
      <h4 class="order-name">${item.name}</h4>
      <p class="order-price">₹${item.price}</p>
      <p class="order-size">Size: ${item.size}</p>
    </div>
    <div class="order-status">
      <span class="status-badge">In Cart</span>
      <button class="btn-action" data-remove="${idx}">Remove</button>
    </div>
  `;
  
  // Add remove event listener
  const removeBtn = div.querySelector('.btn-action');
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      const index = Number(e.target.dataset.remove);
      const removedItem = state.cart[index];
      
      // Restore stock
      const product = db.products.find(p => p.id === removedItem.pid);
      if (product && product.sizes[removedItem.size] !== undefined) {
        product.sizes[removedItem.size] += removedItem.qty;
      }
      
      state.cart.splice(index, 1);
      showToast('Item removed from cart', 'success');
      render();
    });
  }
  
  return div;
}

/* CHECKOUT VIEW */
function renderCheckout(){
  const node = templates['checkoutTpl'].cloneNode(true);
  app.appendChild(node);
  
  // Update checkout total
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('checkoutTotal').textContent = total;
  
  // Payment method change handler
  const radios = document.querySelectorAll('input[name="pay"]');
  function onPayChange(){
    const val = document.querySelector('input[name="pay"]:checked').value;
    const qr = document.getElementById('upiQR');
    if(val === 'upi'){
      qr.classList.remove('hidden');
    } else {
      qr.classList.add('hidden');
    }
  }
  
  radios.forEach(r => r.addEventListener('change', onPayChange));
  
  // Add click handlers to payment options
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
  
  // Place order button
  document.getElementById('placeOrder').addEventListener('click', () => {
    if(state.cart.length === 0){
      showToast('Cart is empty', 'error');
      return;
    }
    
    const addr = document.getElementById('addrInput').value.trim();
    if(!addr){
      showToast('Please enter delivery address', 'error');
      return;
    }
    
    // Create mock order
    const order = {
      id: 'ORD' + Math.floor(Math.random()*9000 + 1000),
      items: [...state.cart],
      address: addr,
      status: 'placed',
      paymentMethod: document.querySelector('input[name="pay"]:checked').value,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 40*60000).toISOString()
    };
    
    db.orders.push(order);
    state.currentOrder = order.id;
    state.orderStageIndex = 0;
    state.cart = [];
    
    showToast(`Order ${order.id} placed successfully!`, 'success');
    showView('track');
  });
}

/* ORDER TRACK VIEW */
const stages = ['placed','accepted','packed','out','delivered'];
function renderTrack(){
  const node = templates['orderTrackTpl'].cloneNode(true);
  app.appendChild(node);
  
  // Set order number
  const orderNumber = document.getElementById('orderNumber');
  if (orderNumber && state.currentOrder) {
    orderNumber.textContent = state.currentOrder;
  }
  
  updateTrackUI();
  
  document.getElementById('advanceTrack').addEventListener('click', () => {
    if(state.orderStageIndex < stages.length - 1){
      state.orderStageIndex++;
      updateTrackUI();
      
      if (state.orderStageIndex === stages.length - 1) {
        showToast('Order delivered!', 'success');
      } else {
        showToast(`Status updated to ${stages[state.orderStageIndex]}`, 'success');
      }
    } else {
      showToast('Order already delivered', 'info');
    }
  });
  
  // Call button
  const callBtn = document.querySelector('.btn-call');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      showToast('Calling delivery partner...', 'success');
    });
  }
  
  // Help button
  const helpBtn = document.querySelector('.btn-help');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      showToast('Opening help center...', 'success');
    });
  }
}

function updateTrackUI(){
  const steps = document.querySelectorAll('.step');
  steps.forEach((s, idx) => {
    s.classList.toggle('active', idx <= state.orderStageIndex);
  });
}

/* SELLER VIEW */
function renderSeller(){
  const node = templates['sellerTpl'].cloneNode(true);
  app.appendChild(node);
  
  const form = document.getElementById('addProductForm');
  const productList = document.getElementById('sellerProducts');
  productList.innerHTML = '';
  
  // Display existing products
  db.products.forEach(p => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <div class="imgwrap">
        <img src="${p.img}" alt="${p.name}" />
      </div>
      <div class="product-body">
        <h4 class="pname">${p.name}</h4>
        <div class="price-rating">
          <p class="price">₹${p.price}</p>
          <div class="rating">
            <i class="fas fa-star"></i>
            <span>${p.rating}</span>
          </div>
        </div>
        <div class="sizes">
          ${Object.entries(p.sizes).map(([size, qty]) => 
            `<button class="${qty > 4 ? 'instock' : qty > 0 ? 'limited' : 'out'}">${size}: ${qty}</button>`
          ).join('')}
        </div>
        <button class="addCart" onclick="editProduct('${p.id}')">Edit</button>
      </div>
    `;
    productList.appendChild(productCard);
  });
  
  // Add product form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pname').value;
    const price = Number(document.getElementById('pprice').value);
    const img = document.getElementById('pimg').value || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    const sizesStr = document.getElementById('psizes').value || 'M:5,L:3,XL:2';
    
    const sizes = {};
    sizesStr.split(',').forEach(pair => {
      const [k, v] = pair.trim().split(':');
      sizes[k.trim()] = Number(v || 0);
    });
    
    const id = 'p' + (db.products.length + 1);
    const newProduct = {
      id,
      name,
      price,
      img,
      category: 'New Arrivals',
      rating: 4.0,
      oldPrice: Math.round(price * 1.2),
      sizes
    };
    
    db.products.push(newProduct);
    showToast(`Product "${name}" added successfully!`, 'success');
    renderSeller();
  });
  
  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const products = document.querySelectorAll('.product-card');
      
      products.forEach(product => {
        const productName = product.querySelector('.pname').textContent.toLowerCase();
        product.style.display = productName.includes(searchTerm) ? 'block' : 'none';
      });
    });
  }
}

// Edit product function
function editProduct(productId) {
  const product = db.products.find(p => p.id === productId);
  if (product) {
    document.getElementById('pname').value = product.name;
    document.getElementById('pprice').value = product.price;
    document.getElementById('pimg').value = product.img;
    document.getElementById('psizes').value = Object.entries(product.sizes)
      .map(([k, v]) => `${k}:${v}`).join(',');
    
    showToast(`Editing ${product.name}`, 'success');
  }
}

/* DELIVERY VIEW */
function renderDelivery(){
  const node = templates['deliveryTpl'].cloneNode(true);
  app.appendChild(node);
  
  const assigned = document.getElementById('assignedList');
  assigned.innerHTML = '';
  
  // Get recent orders
  const recentOrders = db.orders.slice(-3).reverse();
  
  if (recentOrders.length === 0) {
    assigned.innerHTML = '<div class="no-orders"><i class="fas fa-box-open"></i><p>No orders assigned</p></div>';
  } else {
    recentOrders.forEach(o => {
      const orderItem = createDeliveryOrderElement(o);
      assigned.appendChild(orderItem);
    });
  }
  
  // Directions button
  const directionsBtn = document.querySelector('.map-controls button:nth-child(1)');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
      showToast('Opening directions...', 'success');
    });
  }
  
  // Call customer button
  const callCustomerBtn = document.querySelector('.map-controls button:nth-child(2)');
  if (callCustomerBtn) {
    callCustomerBtn.addEventListener('click', () => {
      showToast('Calling customer...', 'success');
    });
  }
}

// Helper function for delivery order element
function createDeliveryOrderElement(order) {
  const div = document.createElement('div');
  div.className = 'order-item';
  div.innerHTML = `
    <div class="order-info">
      <h4>Order #${order.id}</h4>
      <p>${order.items.length} item${order.items.length !== 1 ? 's' : ''}</p>
      <p>Status: ${order.status}</p>
      <p>Address: ${order.address.substring(0, 30)}...</p>
    </div>
    <div class="order-status">
      <span class="status-badge">${order.status === 'delivered' ? 'Delivered' : 'Active'}</span>
      <button class="btn-action" data-id="${order.id}">${order.status === 'delivered' ? 'View' : 'Mark Delivered'}</button>
    </div>
  `;
  
  const actionBtn = div.querySelector('.btn-action');
  if (actionBtn) {
    actionBtn.addEventListener('click', (e) => {
      const orderId = e.target.dataset.id;
      const order = db.orders.find(x => x.id === orderId);
      
      if (order) {
        if (order.status !== 'delivered') {
          order.status = 'delivered';
          showToast(`Order ${orderId} marked as delivered`, 'success');
          renderDelivery();
        } else {
          showToast(`Order ${orderId} already delivered`, 'info');
        }
      }
    });
  }
  
  return div;
}

/* HELPER FUNCTIONS */
function updateCartCount(){
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
  }
}

// Initialize the app
function initApp() {
  // Create toast element if it doesn't exist
  if (!document.getElementById('toast')) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span id="toastMessage">Product added to cart!</span>
    `;
    document.body.appendChild(toast);
  }
  
  // Set home as active initially
  navButtons.forEach(btn => {
    if (btn.dataset.view === 'home') {
      btn.classList.add('active');
    }
  });
  
  render();
}

// Start the app
initApp();