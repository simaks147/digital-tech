export const LOGIN_ROUTE = '/login';
export const OAUTH_CALLBACK_ROUTE = '/oauth/:provider';
export const REGISTER_ROUTE = '/register';
export const CONFIRM_ROUTE = '/confirm/:verificationToken';
export const HOME_ROUTE = '/';
export const BASKET_ROUTE = '/basket';
export const BASKET_ROUTE_SHOPPING = '/basket/shopping';
export const BASKET_ROUTE_CHECKOUT = '/basket/checkout';
export const BASKET_ROUTE_COMPLETED = '/basket/completed';
export const CATEGORY_ROUTE = '/category';
export const PRODUCT_ROUTE = '/product';

export const BASKET_VIEWS = {
  shopping: 'Shopping Cart',
  checkout: 'Checkout',
  completed: 'Completed'
};

export const REGISTRATION_FIELDS = [
  {id: 'username', label: 'Username', type: 'text', name: 'username', placeholder: 'Username', required: true},
  {
    id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Email', required: true,
    message: 'Email must be correct.',
    pattern: '^[-.\\w]+@([\\w-]+\\.)+[\\w-]{2,12}$'
  },
  {
    id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password', required: true,
    message: 'Password must be between 6 and 16 characters. It must contain numbers, lowercase and uppercase letters.',
    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$'
  }
];

export const LOGIN_FIELDS = [
  {
    id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Email', required: true,
    message: 'Email must be correct.',
    pattern: '^[-.\\w]+@([\\w-]+\\.)+[\\w-]{2,12}$'
  },
  {
    id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password', required: true,
    message: 'Password must be between 6 and 16 characters. It must contain numbers, lowercase and uppercase letters.',
    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$'
  }
];

export const REVIEW_FIELDS = [
  {id: 'name', label: 'Your Name', type: 'text', name: 'name', placeholder: 'Your Name', required: true},
  {id: 'title', label: 'Review Title', type: 'text', name: 'title', placeholder: 'Review Title', required: true},
  {id: 'text', label: 'Your Review', as: 'textarea', name: 'text', placeholder: 'Your Review', required: true}
];

