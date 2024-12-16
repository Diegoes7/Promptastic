import { Post } from '@app/create_prompt/page'
import { useState, useEffect, useCallback } from 'react'

// type PostType = {
//   id: string;
//   creator: { username: string };
//   tag: string;
//   prompt: string;
// };

const useSearch = (searchText: string, posts: Post[]) => {
  const [searchedResults, setSearchedResults] = useState<Post[]>([])
  if (!posts) {
    return
  }

  // Memoize the filter function to avoid recreating it on every render
  const filterPrompts = useCallback(
    (text: string) => {
      const regex = new RegExp(text, 'i')
      return posts.filter(
        (p) =>
          regex.test(p.creator!.username) ||
          regex.test(p.tag) ||
          regex.test(p.prompt)
      )
    },
    [posts] // Dependency on `posts`
  )

  useEffect(() => {
    if (searchText) {
      // Add a debounce to avoid frequent updates
      const timeoutId = setTimeout(() => {
        const results = filterPrompts(searchText)
        setSearchedResults(results)
      }, 500)

      // Cleanup timeout on component unmount or re-render
      return () => clearTimeout(timeoutId)
    } else {
      // If search text is empty, reset results
      setSearchedResults(posts)
    }
  }, [searchText, posts, filterPrompts]) // Use proper dependencies

  return searchedResults
}

export default useSearch
