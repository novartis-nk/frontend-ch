import React, { useRef, useEffect, useState } from "react";

export function TikTokScroll({ posts = [], initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef(null);

  const getPost = (i) => posts[i] || null;

  useEffect(() => {
    // Scroll to the middle (current post)
    const container = containerRef.current;
    if (container) {
      container.scrollTo(0, window.innerHeight);
    }
  }, [index]);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const screenHeight = window.innerHeight;

    if (scrollTop < screenHeight * 0.5 && index > 0) {
      setIndex((prev) => prev - 1);
    } else if (scrollTop > screenHeight * 1.5 && index < posts.length - 1) {
      setIndex((prev) => prev + 1);
    }

    // Reset scroll to center for next transition
    setTimeout(() => {
      containerRef.current.scrollTo(0, screenHeight);
    }, 200);
  };

  return (
    <div
      ref={containerRef}
      onScroll={() => {
        clearTimeout(containerRef.current._scrollTimeout);
        containerRef.current._scrollTimeout = setTimeout(handleScroll, 100);
      }}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {[getPost(index - 1), getPost(index), getPost(index + 1)].map((post, i) => (
        <div
          key={i}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            flexDirection: "column",
          }}
        >
          {post ? (
            <>
              <img
                src={post.image_link}
                alt={post.description}
                style={{ maxHeight: "70vh", objectFit: "contain" }}
              />
              <h2>{post.description}</h2>
              <p>Desire: {post.desire}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ))}
    </div>
  );
}
