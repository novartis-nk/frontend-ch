// File: /src/components/VerticalScroller.tsx

import React, { useState, useEffect, useRef, Children, cloneElement, isValidElement } from 'react';
// Make sure to create and import the corresponding CSS file
import './VerticalScroller.css';

interface VerticalScrollerProps {
  /**
   * The 'slides' prop will be a slot in Plasmic, accepting multiple child components.
   * Each child will be treated as a full-page slide.
   */
  slides?: React.ReactNode;
  /**
   * The className prop is automatically passed by Plasmic to apply styles from the studio.
   */
  className?: string;
}

export const VerticalScroller: React.FC<VerticalScrollerProps> = ({
  slides,
  className,
}) => {
  // State to keep track of the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // State to prevent rapid scrolling while an animation is in progress
  const [isScrolling, setIsScrolling] = useState(false);
  // Ref to store the initial touch position
  const touchStartY = useRef(0);

  const childrenArray = Children.toArray(slides);
  const totalSlides = childrenArray.length;

  /**
   * Handles changing the slide in a given direction ('up' or 'down').
   * Includes debouncing to prevent multiple scrolls during animation.
   */
  const changeSlide = (direction: 'up' | 'down') => {
    if (isScrolling) return;

    let nextIndex = currentIndex;
    if (direction === 'down' && currentIndex < totalSlides - 1) {
      nextIndex = currentIndex + 1;
    } else if (direction === 'up' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      setIsScrolling(true);
      setCurrentIndex(nextIndex);
      // Debounce to prevent rapid scrolling and allow animation to finish
      // This duration should be slightly more than the CSS transition duration.
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  // --- Event Handlers ---

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault(); // Prevent default browser scroll to avoid jitter
    changeSlide(e.deltaY > 0 ? 'down' : 'up');
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;

    if (Math.abs(swipeDistance) > 50) { // Threshold for a valid swipe
      changeSlide(swipeDistance > 0 ? 'down' : 'up');
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      changeSlide('down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      changeSlide('up');
    }
  }

  // Effect to add and clean up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      // Add keydown listener to the window for global access
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isScrolling, totalSlides]); // Rerun effect if these dependencies change

  return (
    // The main container. It's made focusable for keyboard events.
    <div
      ref={containerRef}
      className={`vertical-scroller-container ${className}`}
      tabIndex={0} 
    >
      <div className="vertical-scroller-wrapper">
        {Children.map(childrenArray, (child, index) => {
          // Ensure the child is a valid React element before cloning
          if (!isValidElement(child)) {
            return null;
          }
          // Clone the child component passed from Plasmic to inject our styles
          return cloneElement(child as React.ReactElement, {
            ...child.props,
            style: {
              ...child.props.style,
              transform: `translateY(${(index - currentIndex) * 100}vh)`,
              position: 'absolute',
              width: '100%',
              height: '100%',
              transition: 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
            },
          });
        })}
      </div>
    </div>
  );
};
