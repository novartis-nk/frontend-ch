// File: /src/components/ui/VerticalScroller.tsx

import React, { useState, useEffect, useRef, Children, cloneElement, isValidElement } from 'react';
// 1. IMPORT THE CSS MODULE
// We now import a 'styles' object from the .module.css file.
import styles from '@/styles/VerticalScroller.module.css';

interface VerticalScrollerProps {
  slides?: React.ReactNode;
  className?: string;
}

export const VerticalScroller: React.FC<VerticalScrollerProps> = ({
  slides,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);

  const childrenArray = Children.toArray(slides);
  const totalSlides = childrenArray.length;

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
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    changeSlide(e.deltaY > 0 ? 'down' : 'up');
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY;
    if (Math.abs(swipeDistance) > 50) {
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
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isScrolling, totalSlides]);

  return (
    // 2. USE THE STYLES OBJECT FOR CLASS NAMES
    // We combine the class from the module with any class passed by Plasmic.
    <div
      ref={containerRef}
      className={`${styles.verticalScrollerContainer} ${className}`}
      tabIndex={0}
    >
      <div className={styles.verticalScrollerWrapper}>
        {Children.map(childrenArray, (child, index) => {
          if (!isValidElement(child)) return null;
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
