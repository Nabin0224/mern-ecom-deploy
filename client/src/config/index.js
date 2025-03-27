
import bag from '../assets/category/bag.jpg'
import dress from '../assets/category/dress.PNG'
import accessories from '../assets/category/accessories.PNG'
import foot from '../assets/category/foot.PNG'

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "dress", label: "Dress" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "no brand", label: "No Brand" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Colors",
    name: "colors",
    componentType: "color-quantity",
     options : [
      { id: "red", label: "Red", code: "#FF0000" },
      { id: "blue", label: "Blue", code: "#0000FF" },
      { id: "green", label: "Green", code: "#008000" },
      { id: "black", label: "Black", code: "#000000" },
      { id: "white", label: "White", code: "#FFFFFF" },
      { id: "pink", label: "Pink", code: "#FFC0CB" },
      { id: "brown", label: "Brown", code: "#8B4513" },
      { id: "light-brown", label: "Light Brown", code: "#D2B48C" },
    ],
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/'

  },

  {
    id: "products",
    label: "All Products",
    path: '/listing'
  },

  {
    id: 'dress',
    label: 'Dress',
    path: '/listing'

  },

  {
    id: 'bags',
    label: 'Bags',
    path: '/listing'

  },

  {
    id: 'footwear',
    label: 'Footwear',
    path: '/listing'

  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/listing'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search'
  }
];

export const categoryOptionsMap = {
  dress: "Dress",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "dress", label: "Dress" },
    { id: "bags", label: "Bags" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "no brand", label: "No Brand" },
   
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Full Name",
    name: "fullName",
    componentType: "input",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Nearest Landmark",
    name: "nearest_landmark",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter any additional notes",
  },
];

 export const categoriesWithImage = [
    { id: "dress", label: "Dress", image  : dress},
      { id: "bag", label: "Bag" , image : bag},
      { id: "footwear", label: "Footwear", image : foot },
      { id: "accessories", label: "Accessories", image : accessories },
  
]

