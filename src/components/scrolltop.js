// import React, { useEffect, useState } from 'react';
// import '../css/scrolltop.css'; // Import the CSS file for styling

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const checkScrollTop = () => {
//     if (!isVisible && window.pageYOffset > 250) {
//       setIsVisible(true);
//     } else if (isVisible && window.pageYOffset <= 250) {
//       setIsVisible(false);
//     }
//   };

//   const scrollTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', checkScrollTop);
//     return () => window.removeEventListener('scroll', checkScrollTop);
//   }, [isVisible]);

//   return (
//     isVisible && (
//       <button className="scroll-to-top" onClick={scrollTop} aria-label="Scroll to Top">
//         <i className="fa fa-arrow-up"></i> {/* Font Awesome icon */}
//       </button>
//     )
//   );
// };

// export default ScrollToTop;


import React, { useEffect, useState, useCallback } from 'react';
import '../css/scrolltop.css'; // Import the CSS file for styling

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the checkScrollTop function using useCallback
  const checkScrollTop = useCallback(() => {
    if (!isVisible && window.pageYOffset > 250) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 250) {
      setIsVisible(false);
    }
  }, [isVisible]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]); // Add checkScrollTop to the dependency array

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollTop} aria-label="Scroll to Top">
        <i className="fa fa-arrow-up"></i> {/* Font Awesome icon */}
      </button>
    )
  );
};

export default ScrollToTop;
