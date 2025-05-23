// components/newscardlist.js
"use client"; // クライアントコンポーネント指定

import React from "react";
import Newscard from "../newscard/newscard";

export default function Newscardlist({ data }) {
  const displayData = data.slice(0, 5);

  return (
    <div className="newscard-list" style={{ marginBottom: "8px" }}>
      {displayData.map((item, index) => (
        <Newscard
          key={index}
          date={item.date}
          title={item.title}
          link={item.link}
        />
      ))}
    </div>
  );
}
