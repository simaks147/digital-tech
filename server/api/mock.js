const sliders = [
  {
    id: '111',
    img: '/img/slider/1.png',
    bg: 'black',
    title: 'Title 1',
    subTitle: 'Sub Title 1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac suscipit lacus, eget ullamcorper nisl. Cras feugiat lorem ut placerat tempus. Maecenas nisi sapien, fringilla non viverra semper, rhoncus vitae ipsum.',
    price: '450$',
    actionPrice: '$320'
  },
  {
    id: '222',
    img: '/img/slider/2.png',
    bg: 'red',
    title: 'Title 2',
    subTitle: 'Sub Title 2',
    text: 'Vivamus maximus non augue non porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    price: '450$',
    actionPrice: '$320'
  },
  {
    id: '333',
    img: '/img/slider/3.png',
    bg: 'purple',
    title: 'Title 3',
    subTitle: 'Sub Title 3',
    text: 'Ut tempor nec metus facilisis consectetur. In erat odio, sollicitudin a neque non, tincidunt rutrum lorem. Sed in posuere lectus. Ut ac lorem arcu.',
    price: '450$',
    actionPrice: '$320'
  },
];

const categories = [
  {
    id: '111',
    img: '/img/categories/Chair-icon.svg',
    title: 'Category 1',
    slug: 'category-1',
    subcategory: [
      {
        title: 'Subcategory 111_1',
        slug: 'subcategory-111-1'
      },
      {
        title: 'Subcategory 111_2',
        slug: 'subcategory-111-2'
      },
      {
        title: 'Subcategory 111_3',
        slug: 'subcategory-111-3'
      },
    ]
  },
  {
    id: '222',
    img: '/img/categories/Dels-icon.svg',
    title: 'Category 2',
    slug: 'category-2',
    subcategory: [
      {
        title: 'Subcategory 222_1',
        slug: 'subcategory-222-1'
      },
      {
        title: 'Subcategory 222_2',
        slug: 'subcategory-222-2'
      },
      {
        title: 'Subcategory 222_3',
        slug: 'subcategory-222-3'
      },
    ]
  },
  {
    id: '333',
    img: '/img/categories/Gadget-icon.svg',
    title: 'Category 3',
    slug: 'category-3',
    subcategory: [
      {
        title: 'Subcategory 333_1',
        slug: 'subcategory-333-1'
      },
      {
        title: 'Subcategory 333_2',
        slug: 'subcategory-333-2'
      },
      {
        title: 'Subcategory 333_3',
        slug: 'subcategory-333-3'
      },
    ]
  },
  {
    id: '444',
    img: '/img/categories/Heel-icon.svg',
    title: 'Category 4',
    slug: 'category-4',
    subcategory: [
      {
        title: 'Subcategory 444_1',
        slug: 'subcategory-444-1'
      },
      {
        title: 'Subcategory 444_2',
        slug: 'subcategory-444-2'
      },
      {
        title: 'Subcategory 444_3',
        slug: 'subcategory-444-3'
      },
    ]
  },
  {
    id: '555',
    img: '/img/categories/Helmet-icon.svg',
    title: 'Category 5',
    slug: 'category-5',
    subcategory: [
      {
        title: 'Subcategory 555_1',
        slug: 'subcategory-555-1'
      },
      {
        title: 'Subcategory 555_2',
        slug: 'subcategory-555-2'
      },
      {
        title: 'Subcategory 555_3',
        slug: 'subcategory-555-3'
      },
    ]
  },
  {
    id: '666',
    img: '/img/categories/Laptop-icon.svg',
    title: 'Category 6',
    slug: 'category-6',
    subcategory: [
      {
        title: 'Subcategory 666_1',
        slug: 'subcategory-666-1'
      },
      {
        title: 'Subcategory 666_2',
        slug: 'subcategory-666-2'
      },
      {
        title: 'Subcategory 666_3',
        slug: 'subcategory-666-3'
      },
    ]
  },
  {
    id: '777',
    img: '/img/categories/Pot-icon.svg',
    title: 'Category 7',
    slug: 'category-7',
    subcategory: [
      {
        title: 'Subcategory 777_1',
        slug: 'subcategory-777-1'
      },
      {
        title: 'Subcategory 777_2',
        slug: 'subcategory-777-2'
      },
      {
        title: 'Subcategory 777_3',
        slug: 'subcategory-777-3'
      },
    ]
  },
  {
    id: '888',
    img: '/img/categories/Recorder-icon.svg',
    title: 'Category 8',
    slug: 'category-8',
    subcategory: [
      {
        title: 'Subcategory 888_1',
        slug: 'subcategory-888-1'
      },
      {
        title: 'Subcategory 888_2',
        slug: 'subcategory-888-2'
      },
      {
        title: 'Subcategory 888_3',
        slug: 'subcategory-888-3'
      },
    ]
  },
  {
    id: '999',
    img: '/img/categories/Tv-icon.svg',
    title: 'Category 9',
    slug: 'category-9',
    subcategory: [
      {
        title: 'Subcategory 999_1',
        slug: 'subcategory-999-1'
      },
      {
        title: 'Subcategory 999_2',
        slug: 'subcategory-999-2'
      },
      {
        title: 'Subcategory 999_3',
        slug: 'subcategory-999-3'
      },
    ]
  },
  {
    id: 'aaa',
    img: '/img/categories/Shoes-icon.svg',
    title: 'Category a',
    slug: 'category-a',
    subcategory: [
      {
        title: 'Subcategory aaa_1',
        slug: 'subcategory-aaa-1'
      },
      {
        title: 'Subcategory aaa_2',
        slug: 'subcategory-aaa-2'
      },
      {
        title: 'Subcategory aaa_3',
        slug: 'subcategory-aaa-3'
      },
    ]
  }
];

const products = [
  {
    id: '111_1_1',
    subcategoryId: 'subcategory-111-1',
    img: [
      '/img/products/iphone.png',
      '/img/products/iphone4.jpg',
      '/img/products/iphone3.png',
      '/img/products/iphone2.png',
    ],
    title: 'Iphone',
    slug: 'iphone',
    subTitle: 'white',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    specification: [
      {name: 'Operating System', value: 'Android 11'},
      {name: 'Memory', value: '12 GB'},
      {name: 'Processor', value: 'Qualcomm Snapdragon 888'},
    ],
    price: 420,
  },{
    id: '111_1_2',
    subcategoryId: 'subcategory-111-1',
    img: ['/img/products/nikon.png'],
    title: 'Nikon',
    slug: 'nikon',
    subTitle: 'black',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    specification: [
      {name: 'Operating System', value: 'Some'},
      {name: 'Memory', value: 'Some2'},
      {name: 'Processor', value: 'Some3'},
    ],
    price: 230,
  },{
    id: '111_1_3',
    subcategoryId: 'subcategory-333-2',
    img: [
      '/img/products/alienware.png',
      '/img/products/alienware2.jpg'
    ],
    title: 'Alienware',
    slug: 'alienware',
    subTitle: 'black',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    specification: [
      {name: 'Operating System', value: 'Any'},
      {name: 'Memory', value: 'Any2'},
      {name: 'Processor', value: 'Any3'},
    ],
    price: 230,
  }
];

const reviews = [
  {
    id: '1_1',
    userId: '1',
    productId: 'iphone',
    title: 'Perfect Size and Easy to Use',
    text: 'I love the camera and the display and it works well as a camera monitor for my A7S3. My only complaint is that I need to use a capture card for that to work, which is a pain and wasnt so clear in the marketing.',
    date: 'November, 24 2016',
    rating: 5,
    recommended: true
  },
  {
    id: '2_1',
    userId: '2',
    productId: 'iphone',
    title: 'Neither a good camera phone, nor a good phone camera',
    text: 'I wanted to love this phone. Really did. Was very excited when I heard about it. 1 sensor, SD card slot, and a 3.5 jack in 2021? That\'s really rare. The latter two features are the only reason I decided to still keep the phone. It\'s not really a great phone. One of the main issues is battery life and charging. Battery lasts only half a day when heavily used. There is no wireless charging.',
    date: 'April, 10 2019',
    rating: 2,
    recommended: false
  },
  {
    id: '3_1',
    userId: '2',
    productId: 'iphone',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: 'May, 17 2019',
    rating: 4,
    recommended: true
  }
];

const users = [
  {
    id: '1',
    name: 'Eugene Barnett',
  },
  {
    id: '2',
    name: 'Alexander Jean',
  },
];

module.exports = {
  sliders,
  categories,
  products,
  reviews,
  users
};
