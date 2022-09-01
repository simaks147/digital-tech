const Category = require('../models/Category');
const {mapCategory} = require('../utils/mappers');

module.exports = async (ctx) => {
  const categories = await Category
    .find()
    .collation({locale: 'en', strength: 2})
    .sort({'title': 'asc'});

  ctx.body = {categories: categories.map(mapCategory)};
};

// module.exports.randomSubcategories = async (ctx) => {
//   const randomSubcategories = await Category.aggregate([
//     {$match: {}},
//     {
//       $project: {
//         subcategory: {
//           $map: {
//             input: '$subcategory',
//             in: {
//               title: '$$this.title',
//               slug: '$$this.slug',
//               parentTitle: '$title'
//             }
//           }
//         },
//       }
//     },
//     {$unwind: '$subcategory'},
//     {$replaceRoot: {newRoot: '$subcategory'}},
//     {$sample: {size: 5}},
//   ]);
//
//   ctx.body = {randomSubcategories: randomSubcategories.map(mapSubcategory)};
// };
