export const api_url = process.env.REACT_APP_API_URL as string

export const images: Readonly<IImages> = {
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT as string,
  authEndpoint: process.env.REACT_APP_IMAGEKIT_AUTH_ENDPOINT as string,
  publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY as string,
  defaultImage: 'default-image.png'
};

export const windowWidth: Readonly<Record<WindowSizes, number>> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

interface IImages {
  urlEndpoint: string,
  authEndpoint: string,
  publicKey: string,
  defaultImage: string
}

type WindowSizes = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
