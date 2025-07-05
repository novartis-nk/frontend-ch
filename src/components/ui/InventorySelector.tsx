// src/components/InventorySelector.tsx
import React, { useState } from "react";
import { List, Checkbox, Button, Upload, message } from "antd";
import { TradePost } from "./TradePostCard";
import { UploadOutlined } from "@ant-design/icons";

interface InventoryItem {
  id: number;
  name: string;
  image: string;
}

interface Props {
  post: TradePost | null;
  onClose: () => void;
}

export default function InventorySelector({ post, onClose }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const dummyInventory: InventoryItem[] = [
    { id: 1, name: "Headphones", image: "/images/headphones.jpg" },
    { id: 2, name: "Sketchbook", image: "/images/sketchbook.jpg" },
  ];

  const onCheck = (checked: boolean, id: number) => {
    setSelectedIds((ids) =>
      checked ? [...ids, id] : ids.filter((x) => x !== id)
    );
  };

  return (
    <>
      <h3>Offer items for {post?.title}</h3>
      <List
        dataSource={dummyInventory}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<img src={item.image} width={40} />}
              title={item.name}
            />
            <Checkbox onChange={(e) => onCheck(e.target.checked, item.id)} />
          </List.Item>
        )}
      />

      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          message.success(`Added ${file.name}`);
          return false;
        }}
      >
        <Button icon={<UploadOutlined />}>Add New Item</Button>
      </Upload>

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            message.success("Offer sent!");
            onClose();
          }}
        >
          Send Offer
        </Button>
      </div>
    </>
  );
}
