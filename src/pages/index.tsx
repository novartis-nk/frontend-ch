// pages/index.tsx
import React, { useState } from "react";
import { Badge, Avatar, Modal, Button } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import TradePostCard, { TradePost } from "../src/components/TradePostCard";
import InventorySelector from "../src/components/InventorySelector";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activePost, setActivePost] = useState<TradePost | null>(null);
  const [notifCount, setNotifCount] = useState(2);

  const tradePosts: TradePost[] = [
    {
      id: 1,
      image: "/images/skateboard.jpg",
      title: "Old Skateboard",
      category: "Sports",
      description: "Still rolls great. Looking for headphones.",
      city: "Berlin",
    },
    {
      id: 2,
      image: "/images/keyboard.jpg",
      title: "Mechanical Keyboard",
      category: "Electronics",
      description: "Barely used. Want trade for drawing tablet.",
      city: "Hamburg",
    },
  ];

  const openOfferModal = (post: TradePost) => {
    setActivePost(post);
    setModalVisible(true);
  };

  return (
    <div style={{ padding: 16, background: "#fafafa" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Chakosh</h2>
        <Badge count={notifCount}>
          <Avatar icon={<BellOutlined />} />
        </Badge>
      </header>

      <div style={{ marginTop: 16 }}>
        {tradePosts.map((post) => (
          <div key={post.id} style={{ marginBottom: 16 }}>
            <TradePostCard post={post} onSendOffer={openOfferModal} />
          </div>
        ))}
      </div>

      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick={() => setModalVisible(true)}
      />

      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={400}
      >
        <InventorySelector post={activePost} onClose={() => setModalVisible(false)} />
      </Modal>
    </div>
  );
}
