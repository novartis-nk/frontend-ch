import React, { useRef, useEffect, useState } from "react";

type Post = {
  image_link: string;
  description: string;
  desire: string;
  user_id?: number;
};

export function TikTokScroll({
  posts = [],
  initialIndex = 0,
}: {
  posts: Post[];
  initialIndex?: number;
}) {
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPost = (i: number): Post | null => posts[i] || null;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo(0, window.innerHeight);
    }
  }, [index]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const screenHeight = window.innerHeight;

    if (scrollTop < screenHeight * 0.5 && index > 0) {
      setIndex((prev) => prev - 1);
    } else if (scrollTop > screenHeight * 1.5 && index < posts.length - 1) {
      setIndex((prev) => prev + 1);
    }

    setTimeout(() => {
      container.scrollTo(0, screenHeight);
    }, 200);
  };

  return (
    <div
      ref={containerRef}
      onScroll={() => {
        clearTimeout((containerRef.current as any)?._scrollTimeout);
        (containerRef.current as any)._scrollTimeout = setTimeout(
          handleScroll,
          100
        );
      }}
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {[getPost(index - 1), getPost(index), getPost(index + 1)].map(
        (post, i) => (
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
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            {post ? (
              <>
                <img
                  src={post.image_link}
                  alt={post.description}
                  style={{
                    maxHeight: "60vh",
                    objectFit: "contain",
                    marginBottom: "1rem",
                  }}
                />
                <h2>{post.description}</h2>
                <p>Desire: {post.desire}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )
      )}
    </div>
  );
}
