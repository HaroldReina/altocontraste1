document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado completamente');

  // Menú hamburguesa
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const userActions = document.querySelector('.user-actions');
  const header = document.querySelector('.header');

  if (hamburger && navMenu && userActions && header) {
    console.log('Elementos del menú encontrados');

    const handleUserActionsPosition = () => {
      if (window.innerWidth <= 768) {
        if (navMenu && userActions && userActions.parentElement !== navMenu) {
          navMenu.appendChild(userActions);
        }
      } else {
        if (navMenu && userActions && userActions.parentElement === navMenu) {
          header.appendChild(userActions);
        }
      }
    };

    handleUserActionsPosition();
    window.addEventListener('resize', handleUserActionsPosition);

    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      userActions.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        userActions.classList.remove('active');
      });
    });
  } else {
    console.log('Faltan elementos del menú:', { hamburger, navMenu, userActions, header });
  }

  // Botón flotante (WhatsApp)
  const floatingButton = document.getElementById('floatingButton');
  if (floatingButton) {
    console.log('Botón flotante encontrado');
  } else {
    console.log('Botón flotante no encontrado');
  }

  // Actualizar el valor del precio dinámicamente
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('price-value');
  
  if (priceRange && priceValue) {
    console.log('Elementos de precio encontrados');
    priceRange.addEventListener('input', () => {
      priceValue.textContent = `$${parseInt(priceRange.value).toLocaleString('es-CO')}`;
      applyFilters();
    });
  } else {
    console.log('Faltan elementos de precio:', { priceRange, priceValue });
  }

  // Manejar los filtros de categoría
  const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
  if (categoryCheckboxes.length > 0) {
    console.log('Checkboxes de categoría encontrados');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', applyFilters);
    });
  } else {
    console.log('No se encontraron checkboxes de categoría');
  }

  // Función para aplicar los filtros
  function applyFilters() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    const maxPrice = parseInt(priceRange.value || 100000);

    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
      const category = product.getAttribute('data-category');
      const price = parseInt(product.getAttribute('data-price') || 0);

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      const matchesPrice = price <= maxPrice;

      if (matchesCategory && matchesPrice) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }

  // Manejar el carrito lateral
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartSidebarItems = document.getElementById('cart-sidebar-items');
  const cartSidebarTotalPrice = document.getElementById('cart-sidebar-total-price');
  const checkoutSidebarButton = document.getElementById('checkout-sidebar-button');

  // Inicializar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Función para guardar el carrito en localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Función para renderizar el carrito lateral
  function renderCart() {
    cartSidebarItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-sidebar-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-sidebar-item-details">
          <p><strong>${item.title}</strong></p>
          <p>Talla: ${item.size}, Color: ${item.color}</p>
          <p>Precio: $${item.price.toLocaleString('es-CO')}</p>
        </div>
        <button class="remove-from-cart" data-index="${index}">Eliminar</button>
      `;
      cartSidebarItems.appendChild(cartItem);
      total += item.price;
    });

    cartSidebarTotalPrice.textContent = `$${total.toLocaleString('es-CO')}`;

    // Abrir el carrito siempre al renderizar (cada vez que se añade un producto)
    cartSidebar.classList.add('active');
  }

  // Manejar selección de tallas, colores y añadir al carrito
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length > 0) {
    console.log('Tarjetas de producto encontradas');
    productCards.forEach(card => {
      const sizeButtons = card.querySelectorAll('.size-btn');
      const colorButtons = card.querySelectorAll('.color-btn');
      const addToCartButton = card.querySelector('.add-to-cart');
      const productTitle = card.querySelector('.product-title a').textContent;
      const productPrice = parseInt(card.getAttribute('data-price'));
      const productImage = card.querySelector('.main-img').src;

      let selectedSize = null;
      let selectedColor = null;

      if (sizeButtons.length > 0 && colorButtons.length > 0 && addToCartButton) {
        console.log('Botones de talla, color y carrito encontrados en una tarjeta');

        sizeButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedSize = button.getAttribute('data-size');
          });
        });

        colorButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            colorButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedColor = button.getAttribute('data-color');
          });
        });

        addToCartButton.addEventListener('click', () => {
          if (!selectedSize || !selectedColor) {
            alert('Por favor selecciona una talla y un color antes de añadir al carrito.');
            return;
          }

          const product = {
            title: productTitle,
            price: productPrice,
            size: selectedSize,
            color: selectedColor,
            image: productImage
          };

          cart.push(product);
          saveCart();
          renderCart();
        });
      } else {
        console.log('Faltan botones en una tarjeta:', { sizeButtons, colorButtons, addToCartButton });
      }
    });
  } else {
    console.log('No se encontraron tarjetas de producto');
  }

  // Manejar eliminación de productos del carrito
  cartSidebarItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // Botón de checkout (simulación por ahora)
  checkoutSidebarButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert('Procediendo al pago... (Esta es una simulación)');
    cart = [];
    saveCart();
    renderCart();
  });

  // Botón para plegar/desplegar el carrito
  cartToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en el botón cierre el carrito
    cartSidebar.classList.toggle('active');
  });

  // Cerrar el carrito al hacer clic fuera de él
  document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
      cartSidebar.classList.remove('active');
    }
  });

  // Llamar a renderCart al cargar la página
  renderCart();
});
