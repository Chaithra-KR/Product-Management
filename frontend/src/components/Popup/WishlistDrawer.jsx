import React, { useState } from "react";
import Icons from "../../../utils/Icons";
import { Drawer } from "antd";

const WishlistDrawer = ({ open, onClose }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "HP AMD Ryzen 3",
      price: 529.99,
      image: "https://dummyimage.com/600x400/000/fff",
      rating: 0,
    },
    {
      id: 2,
      name: "HP AMD Ryzen 3",
      price: 529.99,
      image: "https://dummyimage.com/600x400/000/fff",
      rating: 0,
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Drawer
      // placement="right"
      onClose={onClose}
      open={open}
      width={420}
      closable={false}
      bodyStyle={{ padding: 0 }}
      maskStyle={false}
    >
      <div className="bg-primary h-24 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center">
            <Icons path="heart" className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-medium">Items</span>
        </div>
        <button onClick={onClose}>
          <Icons path="right" className="w-8 h-8" />
        </button>
      </div>

      {/* Items List */}
      <div className="divide-y overflow-auto h-[calc(100vh-64px)]">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-4">
            <div className="w-24 h-20 bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-primary font-medium mb-1">{item.name}</h3>
              <div className="font-bold">${item.price}</div>
              <div className="flex gap-1 mt-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Icons path="round-close" className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default WishlistDrawer;
