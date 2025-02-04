import { ImageLoader } from "next/image"


//! process the image before give it to the image component
const customLoader: ImageLoader = ({ src, width, quality }) => {
	// Check if the src is an external URL (starts with http:// or https://)
	if (src.startsWith('http://') || src.startsWith('https://')) {
		// Return the src as-is for external URLs
		return src;
	}

	// You can add custom logic here to modify the URL if needed
	return `${src}?w=${width}&q=${quality || 100}`
}


export default customLoader