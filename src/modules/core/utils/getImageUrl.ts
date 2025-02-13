
//base path is relative to the file that needs to load the image
const IMG_BASE_PATH = '../../../assets/imgs';

const getImageUrl = (imgUrl: string) => {
    return new URL(`${IMG_BASE_PATH}/${imgUrl}`, import.meta.url).href;
}

export default getImageUrl;