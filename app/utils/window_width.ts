// import { useState, useEffect } from 'react';


// export function useWindowWidth() {
//   const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

//   useEffect(() => {
//     // Update width on window resize
//     const handleResize = () => setWidth(window.innerWidth);

//     window.addEventListener('resize', handleResize);

//     // Initial width setting in case of a client render
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return width;
// }

import { useState, useEffect } from 'react'

export function useWindowWidth() {
  // Initialize with the current window width if available
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth
    }
    return 700  // default size for server-side render
  })

  useEffect(() => {
    // Function to update width on resize
    const handleResize = () => setWidth(window.innerWidth)

    // Add event listener on mount
    window.addEventListener('resize', handleResize)

    // Set initial width when component mounts
    handleResize()

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array to run only once when component mounts

  return width
}
