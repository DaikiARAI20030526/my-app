"use client";
import React from "react";
import ProjectCard from "../projectcard/projectcard";
import styles from "./projectcardlist.module.css";

export default function ProjectCardList({ data }) {
  const displaydata = data.slice(0, 2);

  return (
    <div className={styles.projectcardlist}>
      {displaydata.map((item, index) => {
        let imageUrl;
        if (item["media:thumbnail"]) {
          imageUrl =
            typeof item["media:thumbnail"] === "object"
              ? item["media:thumbnail"].url
              : item["media:thumbnail"];
        } else if (item["media$thumbnail"]) {
          imageUrl =
            typeof item["media$thumbnail"] === "object"
              ? item["media$thumbnail"].url
              : item["media$thumbnail"];
        } else if (item.thumbnail) {
          imageUrl = item.thumbnail;
        } else {
          imageUrl = "";
        }

        return (
          <ProjectCard
            key={index}
            date={item.date}
            title={item.title}
            imageUrl={imageUrl}
            link={item.link}
          />
        );
      })}
    </div>
  );
}
