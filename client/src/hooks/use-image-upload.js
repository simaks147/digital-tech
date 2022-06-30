import {useReducer} from "react";

export default function useImageUpload () {
  const [images, setImages] = useReducer((state, action) => {
    const {type, name} = action;

    switch (type) {
      case 'success':
        return [...state, name];
      default:
        return state;
    }
  }, []);

  return {
    images,
    setImages: (name, type = 'success') => setImages({type, name})
  };
}
