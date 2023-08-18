import { IBrand } from "../redux/types/brands";
import { ISubcategory } from "../redux/types/categories";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

export const LOGIN_ROUTE = '/login';
export const OAUTH_CALLBACK_ROUTE = '/oauth/:provider';
export const REGISTER_ROUTE = '/register';
export const CONFIRM_ROUTE = '/confirm/:verificationToken';
export const HOME_ROUTE = '/';
export const ERROR_ROUTE = '/error';
export const SEARCH_ROUTE = '/search';
export const BASKET_ROUTE = '/basket';
export const BASKET_ROUTE_SHOPPING = '/basket/shopping';
export const BASKET_ROUTE_CHECKOUT = '/basket/checkout';
export const BASKET_ROUTE_COMPLETED = '/basket/completed';
export const CATEGORY_ROUTE = '/category';
export const PRODUCT_ROUTE = '/product';
export const ADMIN_ROUTE = '/admin';
export const ADMIN_PRODUCT_ROUTE = '/admin/product';

export const BASKET_VIEWS = {
  shopping: 'Shopping Cart',
  checkout: 'Checkout',
  completed: 'Completed'
};

export const PRODUCTS_LIMIT_VARIANTS = ['3', '6', 'all']
export const PRODUCTS_SORT_VARIANTS = ['title', 'price', 'newest', 'rating'];
export const PRODUCTS_RATING_VARIANTS = [1, 2, 3, 4, 5];

export const REGISTRATION_FIELDS = [
  { id: 'username', label: 'Username', type: 'text', name: 'username', placeholder: 'Username', maxLength: 50, required: true },
  {
    id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Email', maxLength: 100, required: true,
    message: 'Email must be correct.',
    pattern: '^[-.\\w]+@([\\w-]+\\.)+[\\w-]{2,12}$'
  },
  {
    id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password', maxLength: 16, required: true,
    message: 'Password must be between 6 and 16 characters. It must contain numbers, lowercase and uppercase letters.',
    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$'
  }
];

export const LOGIN_FIELDS = [
  {
    id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Email', maxLength: 100, required: true,
    message: 'Email must be correct.',
    pattern: '^[-.\\w]+@([\\w-]+\\.)+[\\w-]{2,12}$'
  },
  {
    id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password', maxLength: 16, required: true,
    message: 'Password must be between 6 and 16 characters. It must contain numbers, lowercase and uppercase letters.',
    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$'
  }
];

export const REVIEW_FIELDS = [
  { id: 'name', label: 'Your Name', type: 'text', name: 'name', placeholder: 'Your Name', maxLength: 50, required: true },
  { id: 'title', label: 'Review Title', type: 'text', name: 'title', placeholder: 'Review Title', maxLength: 50, required: true },
  { id: 'text', label: 'Your Review', as: 'textarea', name: 'text', placeholder: 'Your Review', maxLength: 300, required: true }
];

export const CHECKOUT_FIELDS = [
  {
    id: 'phone', label: 'Phone', type: 'text', name: 'phone', placeholder: 'Phone', maxLength: 14, required: true,
    message: 'Password must be between 6 and 14 characters. It must contain only numbers or a plus at the beginning',
    pattern: '\\+?\\d{6,14}'
  },
  { id: 'address', label: 'Address', type: 'text', name: 'address', placeholder: 'Address', maxLength: 100, required: true },
  { id: 'city', label: 'City', type: 'text', name: 'city', placeholder: 'City', maxLength: 50, required: true },
  {
    id: 'country', label: 'Country', as: 'select', name: 'country', placeholder: 'Country', required: true, className: 'form-select',
    children: ['Choose yours...', 'Russia', 'Germany', 'France'].map((option, i) => <option key={option} value={i === 0 ? '' : option}>{option}</option>)
  }
];

export const PRODUCT_CREATION_FIELDS = (brands: IBrand[], categories: ISubcategory[]) => ([
  { id: 'title', label: 'Title', type: 'text', name: 'title', placeholder: 'Title', maxLength: 200, required: true },
  { id: 'description', label: 'Description', as: 'textarea', name: 'description', placeholder: 'Description', maxLength: 500, required: true },
  {
    id: 'price', label: 'Price', type: 'number', name: 'price', placeholder: 'Price', min: 1, max: 1000000, required: true,
    message: 'Price must be integer number between 1 and 1000000.'
  },
  {
    id: 'brand', label: 'Brand', as: 'select', name: 'brand', placeholder: 'Brand', required: true, className: 'form-select',
    children: [{ title: 'Choose...', id: 0 }, ...brands].map(({ title, id }, i) => <option key={id} value={i === 0 ? '' : id}>{capitalizeFirstLetter(title)}</option>)
  },
  {
    id: 'subcategoryId', label: 'Category', as: 'select', name: 'subcategoryId', placeholder: 'Category', required: true, className: 'form-select',
    children: [{ title: 'Choose...', slug: '' }, ...categories].map(({ title, slug }, i) => <option key={slug} value={i === 0 ? '' : slug}>{capitalizeFirstLetter(title)}</option>)
  },
  { id: 'saleHeader', header: 'Sale' },
  {
    id: 'discountPercent', label: 'Discount Percent', type: 'number', name: 'discountPercent', placeholder: 'Discount Percent', min: 0, max: 99,
    message: 'Price must be integer number between 0 and 99.'
  },
  { id: 'saleTitle', label: 'Title', type: 'text', name: 'saleTitle', placeholder: 'Title', maxLength: 200 },
  { id: 'saleSubtitle', label: 'Subtitle', type: 'text', name: 'saleSubtitle', placeholder: 'Subtitle', maxLength: 200 },
  { id: 'saleBgColor', label: 'Background Color', type: 'text', name: 'saleBgColor', placeholder: 'Background Color', maxLength: 20 }
]);

