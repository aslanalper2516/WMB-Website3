// Modern Menu System with Dynamic Categories and Subcategories

const menuKategories = [
  { 
    name: "main", 
    parent: null, 
    description: "Ana menü kategorileri",
    icon: "🏠"
  },
  { 
    name: "yiyecekler", 
    parent: "main", 
    description: "Lezzetli yemek seçenekleri",
    icon: "🍽️"
  },
  { 
    name: "içecekler", 
    parent: "main", 
    description: "Serinletici içecekler",
    icon: "🥤"
  },
  { 
    name: "tatlılar", 
    parent: "main", 
    description: "Tatlı lezzetler",
    icon: "🍰"
  },
  { 
    name: "sıcaklar", 
    parent: "içecekler", 
    description: "Sıcak içecek seçenekleri",
    icon: "☕"
  },
  { 
    name: "soğuklar", 
    parent: "içecekler", 
    description: "Soğuk içecek seçenekleri",
    icon: "🧊"
  },
];

const menuItems = [
  { 
    name: "Klasik Hamburger", 
    price: "₺120", 
    kategory: "yiyecekler", 
    image: "images/yemek.png",
    description: "Taze et, marul, domates ve özel sos ile hazırlanmış lezzetli hamburger"
  },
  { 
    name: "Margherita Pizza", 
    price: "₺150", 
    kategory: "yiyecekler", 
    image: "images/pizza.png",
    description: "Mozzarella peyniri, domates sosu ve taze fesleğen ile İtalyan tarzı pizza"
  },
  { 
    name: "Coca Cola", 
    price: "₺40", 
    kategory: "soğuklar", 
    image: "images/yemek.png",
    description: "Serinletici ve ferahlatıcı klasik kola"
  },
  { 
    name: "Türk Çayı", 
    price: "₺20", 
    kategory: "sıcaklar",
    image: "images/yemek.png",
    description: "Geleneksel Türk çayı, demli ve aromalı"
  },
  {
  name: "AHMET BABA Çayı", 
    price: "₺20", 
    kategory: "sıcaklar", 
    image: "images/yemek.png",
    description: "Geleneksel Türk çayı, demli ve aromalı"
  },
  { 
    name: "Antep Baklavası", 
    price: "₺60", 
    kategory: "tatlılar", 
    image: "images/yemek.png",
    description: "Geleneksel Antep baklavası, cevizli ve şerbetli"
  },
  { 
    name: "Doğal Su", 
    price: "₺15", 
    kategory: "soğuklar", 
    image: "images/yemek.png",
    description: "Doğal kaynak suyu, 500ml"
  },
  { 
    name: "Tavuk Döner", 
    price: "₺85", 
    kategory: "yiyecekler", 
    image: "images/doner.png", 
    description: "Taze tavuk eti, sebzeler ve özel sos ile hazırlanmış döner"
  },
  { 
    name: "Kahve", 
    price: "₺35", 
    kategory: "sıcaklar", 
    image: "images/yemek.png",
    description: "Türk kahvesi, geleneksel yöntemle hazırlanmış"
  },
  { 
    name: "Tiramisu", 
    price: "₺45", 
    kategory: "tatlılar", 
    image: "images/yemek.png",
    description: "İtalyan tatlısı, kahve aromalı ve kremsi"
  },
  { 
    name: "Ayran", 
    price: "₺25", 
    kategory: "soğuklar", 
    image: "images/yemek.png",
    description: "Taze yoğurt ve tuz ile hazırlanmış geleneksel ayran"
  }
];

// State management
let currentCategory = null;
let categoryHistory = [];

// DOM elements
const navbarDiv = document.getElementById("navbar-categories");
const menuDiv = document.getElementById("menu");
const backButton = document.getElementById("back-button");

// Initialize the application
function init() {
  renderNavbar();
  renderCategory("yiyecekler");
  setupBackButton();
}

// Render main navigation
function renderNavbar() {
  navbarDiv.innerHTML = "";
  const mainCats = menuKategories.filter(cat => cat.parent === "main");

  mainCats.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerHTML = `${cat.icon} ${cat.name.toUpperCase()}`;
    btn.onclick = () => navigateToCategory(cat.name);
    btn.className = currentCategory === cat.name ? "active" : "";
    navbarDiv.appendChild(btn);
  });
}

// Navigate to a category
function navigateToCategory(categoryName) {
  currentCategory = categoryName;
  categoryHistory = [categoryName];
  renderNavbar();
  renderCategory(categoryName);
  updateBackButton();
}

// Navigate to subcategory
function navigateToSubcategory(categoryName) {
  if (!categoryHistory.includes(categoryName)) {
    categoryHistory.push(categoryName);
  }
  currentCategory = categoryName;
  renderNavbar();
  renderCategory(categoryName);
  updateBackButton();
}


// Render category content
function renderCategory(categoryName) {
  menuDiv.innerHTML = "";
  
  const category = menuKategories.find(cat => cat.name === categoryName);
  if (!category) return;

  // Create category title based on hierarchy
  const title = createCategoryTitle(categoryName);

  // Always show category title first
  const titleSection = document.createElement("section");
  titleSection.innerHTML = `<h2>${title}</h2>`;
  menuDiv.appendChild(titleSection);

  // Render menu items for this category
  const items = menuItems.filter(item => item.kategory === category.name);
  if (items.length > 0) {
    const itemsSection = document.createElement("section");
    
    const itemsGrid = document.createElement("div");
    itemsGrid.className = "menu-items";

    items.forEach(item => {
      const card = createMenuItemCard(item);
      itemsGrid.appendChild(card);
    });

    itemsSection.appendChild(itemsGrid);
    menuDiv.appendChild(itemsSection);
  }

  // Render subcategories
  const subCats = menuKategories.filter(cat => cat.parent === category.name);
  if (subCats.length > 0) {
    const subcategorySection = document.createElement("section");
    
    const subcategoryGrid = document.createElement("div");
    subcategoryGrid.className = "subcategory-grid";

    subCats.forEach(sub => {
      const card = createSubcategoryCard(sub);
      subcategoryGrid.appendChild(card);
    });

    subcategorySection.appendChild(subcategoryGrid);
    menuDiv.appendChild(subcategorySection);
  }

  // Add smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Create category title with hierarchy
function createCategoryTitle(categoryName) {
  const category = menuKategories.find(cat => cat.name === categoryName);
  if (!category) return "";

  // If it's a main category, just show the category name
  if (category.parent === "main") {
    return `${category.icon} ${category.name.toUpperCase()}`;
  }

  // If it's a subcategory, create hierarchy
  const hierarchy = [];
  let currentCategory = category;
  
  // Build hierarchy from current to parent
  while (currentCategory && currentCategory.parent !== "main") {
    hierarchy.unshift(currentCategory);
    currentCategory = menuKategories.find(cat => cat.name === currentCategory.parent);
  }
  
  // Add main category if found
  if (currentCategory && currentCategory.parent === "main") {
    hierarchy.unshift(currentCategory);
  }

  // Create title with hierarchy
  const titleParts = hierarchy.map(cat => `${cat.icon} ${cat.name.toUpperCase()}`);
  return titleParts.join(' > ');
}

// Create menu item card
function createMenuItemCard(item) {
  const card = document.createElement("div");
  card.className = "menu-item";
  
  card.innerHTML = `
    <div class="menu-item-image">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    </div>
    <div class="menu-item-content">
      <div class="menu-item-header">
        <h3>${item.name}</h3>
        ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
      </div>
      <div class="menu-item-footer">
        <p class="menu-item-price">${item.price}</p>
      </div>
    </div>
  `;
  
  // Add click animation
  card.addEventListener('click', () => {
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  });
  
  return card;
}

// Setup back button functionality
function setupBackButton() {
  backButton.addEventListener('click', goBack);
}

// Go back to previous category
function goBack() {
  if (categoryHistory.length > 1) {
    const newHistory = categoryHistory.slice(0, -1);
    const parentCategory = newHistory[newHistory.length - 1];
    categoryHistory = newHistory;
    currentCategory = parentCategory;
    renderNavbar();
    renderCategory(parentCategory);
    updateBackButton();
  }
}

// Update back button visibility
function updateBackButton() {
  if (categoryHistory.length > 1) {
    backButton.classList.add('visible');
  } else {
    backButton.classList.remove('visible');
  }
}

// Create subcategory card
function createSubcategoryCard(category) {
  const card = document.createElement("div");
  card.className = "subcategory-card";
  card.innerHTML = `
    <h4>${category.icon} ${category.name.toUpperCase()}</h4>
    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.8); margin-top: 0.5rem;">${category.description}</p>
  `;
  
  card.onclick = () => navigateToSubcategory(category.name);
  
  return card;
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && categoryHistory.length > 1) {
    goBack();
  }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - go to next category
      const mainCats = menuKategories.filter(cat => cat.parent === "main");
      const currentIndex = mainCats.findIndex(cat => cat.name === currentCategory);
      if (currentIndex < mainCats.length - 1) {
        navigateToCategory(mainCats[currentIndex + 1].name);
      }
    } else {
      // Swipe right - go to previous category
      const mainCats = menuKategories.filter(cat => cat.parent === "main");
      const currentIndex = mainCats.findIndex(cat => cat.name === currentCategory);
      if (currentIndex > 0) {
        navigateToCategory(mainCats[currentIndex - 1].name);
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);