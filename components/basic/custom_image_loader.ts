import { ImageLoader } from "next/image"


//! process the image before give it to the image component
const customLoader: ImageLoader = ({ src, width, quality }) => {
	// You can add custom logic here to modify the URL if needed
	return `${src}?w=${width}&q=${quality || 75}`
}


export default customLoader