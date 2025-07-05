// src/components/TradePostCard.tsx
import React from "react";
import { Card, Button, Tag } from "antd";

export interface TradePost {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  city: string;
}

interface Props {
  post: TradePost;
  onSendOffer: (post: TradePost) => void;
}

export default function TradePostCard({ post, onSendOffer }: Props) {
  return (
    <Card
      cover={<img src={post.image} alt={post.title} />}
      style={{ width: "100%" }}
      actions={[
        <Button type="primary" onClick={() => onSendOffer(post)}>
          Send Offer
        </Button>,
      ]}
    >
      <Card.Meta
        title={post.title}
        description={
          <>
            <p>{post.description}</p>
            <Tag>{post.category}</Tag> <small>{post.city}</small>
          </>
        }
      />
    </Card>
  );
}
