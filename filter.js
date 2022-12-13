const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    category: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    category: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    category: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    category: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    category: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    category: "Casual",
  },
];


const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categories = document.querySelector(".categories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue"); 

// 1. Створити функцію, яка виводитиме товари на сторінці.
// Функція повинна приймати один параметр – масив елементів та вставити підсумковий рядок у контентер для продуктів.
// Підказки: за допомогою функції map модифікувати кожний елемент у рядок.

const showProducts = (arrayOfProducts) => {
  const goods = arrayOfProducts.map(item => `          
  <div class="product">
    <img src="${item["img"]}" alt="" />
    <span class="name">${item["name"]}</span>
    <span class="priceText">$ ${item["price"]}</span>
  </div>
  `).join("");
  productsContainer.innerHTML = goods;  
}

showProducts(data);

// 2. Повісити оброблювач подій keyup на елемент input.
// При введенні значення фільтрувати масив даних, які відображаються на сторінці.
// Врахувати те, що користувач може вводити значення різним регістром
// Підказка: необхідно зробити фільтрацію за допомогою способу includes().



searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    const filteredArr = data.filter(item => item.name.toLowerCase().includes(value));
    showProducts(filteredArr);
  } else {
    showProducts(data);
  }

})

// 3. Зробити функцію, яка виводитиме всі категорії на сторінці.
// І так само повісити обробник подій, за допомогою делегування подій, на клік кожної категорії.
// При натисканні на певну категорію повинні показувати продукти, які належать до цієї категорії.

const setCategories = () => {
  const allCategories = data.map(product => product.category)
  const filteredCategories = allCategories.filter((item, index) => allCategories.indexOf(item) === index);
  // const filteredCategories = [... new Set(allCategories)]

  categories.innerHTML = filteredCategories.map(category => `
  <span class="category">${category}</span>`).join("");

  categories.addEventListener("click", (e) => {
    const selectedCategory = e.target.textContent;
    if(selectedCategory) {
      const sortedProductsByCategory = data.filter(product => product.category === selectedCategory)
      showProducts(sortedProductsByCategory)

    } else {
      showProducts(data)
    }
  })
} 

setCategories();

// 4. Зробити функцію setPrices, яка буде:
//   4.1. Вичіслювати мінімальну та максимальну ціну
//   4.2. Проставити ці значення для <input type="range"/>
//   4.3. Повісити на <input type="range"/> обробник подій типу input. І на зміни значення range потрібно фільтрувати товари на сторінці

const setPrices = () => {
  const priceList = data.map(product => product.price);

  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);


  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceRange.step = 10;

  priceValue.textContent = `$ ${maxPrice}`;

  priceRange.addEventListener("input", (e) => {
  
    const value = e.target.value; 
    priceValue.textContent = `$ ${value}`;

    const filteredArray = data.filter(product => product.price <= value);
    showProducts(filteredArray);
  })
}

setPrices();