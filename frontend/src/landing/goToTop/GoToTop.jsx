import React, { useEffect, useState } from "react";
import "./GoToTop.css";
import "../../App.css";

const GoToTop = () => {
  // State to control visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  // Scrolls the window to the top smoothly when button is clicked
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  // Shows the button only when user has scrolled past a certain height
  const listenToScroll = () => {
    let heightToHidden = 100; // threshold to show the button
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);

    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      <div className="scroll">
        {isVisible && 
          <div className="top-btn" onClick={goToBtn}>
            <i className="fa-solid fa-arrow-up fa-2xs"></i>
          </div>
        }
      </div>
    </>
  );
};

export default GoToTop;
