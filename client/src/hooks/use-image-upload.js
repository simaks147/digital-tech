import {useReducer} from "react";

export default function useImageUpload(initImages) {
  const [images, setImages] = useReducer((state, action) => {
    const {type, name, num} = action;

    switch (type) {
      case 'add':
        return [...state, name];
      case 'delete':
        return state.filter((img, i) => i !== num);
      default:
        return state;
    }
  }, initImages);

  return {
    images,
    addImg: (name) => setImages({type: 'add', name}),
    deleteImg: (num) => setImages({type: 'delete', num}),
  };
};
