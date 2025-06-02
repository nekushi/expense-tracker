import { useState, useEffect } from "react";

// The hook accepts a media query string as a parameter
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a MediaQueryList object with the query string
    const mediaQueryList = window.matchMedia(query);

    // Set the initial state based on whether the query matches
    setMatches(mediaQueryList.matches);

    // Define the listener function to update state on query change
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener to the media query list
    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup: Remove listener when the component unmounts or query changes
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]); // Only re-run effect if the query changes

  return matches;
};

export default useMediaQuery;
