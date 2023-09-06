import { useReducer } from "react";
import { Images } from "../components/admin/product/Product";

const ADD_IMG = 'ADD_IMG';
const DELETE_IMG = 'DELETE_IMG';

interface IAddImgAction {
  type: typeof ADD_IMG,
  name: string
}

interface IDeleteImgAction {
  type: typeof DELETE_IMG,
  num: number
}

type ImgAction = IAddImgAction | IDeleteImgAction

export default function useImageUpload(initImages: Images) {
  const [images, setImages] = useReducer((state: Images, action: ImgAction): Images => {
    switch (action.type) {
      case ADD_IMG:
        return [...state, action.name];
      case DELETE_IMG:
        return state.filter((img, i) => i !== action.num);
      default:
        return state;
    }
  }, initImages);

  return {
    images,
    addImg: (name: string) => setImages({ type: ADD_IMG, name }),
    deleteImg: (num: number) => setImages({ type: DELETE_IMG, num }),
  };
};
