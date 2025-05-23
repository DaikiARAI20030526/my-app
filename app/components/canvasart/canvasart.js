"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./canvasart.module.css";

// カテゴリーを算出するヘルパー関数
const getGroupCategory = (width) => {
  if (width >= 810) return "large";       // 810px以上はlarge
  else if (width >= 540) return "medium";   // 540px以上810px未満はmedium
  else return "small";                      // 540px未満はsmall
};

const getGroupForCategory = (cat) => {
  if (cat === "large") return Math.floor(Math.random() * 3) + 1;   // 1～3
  else if (cat === "medium") return Math.floor(Math.random() * 3) + 4; // 4～6
  else return Math.floor(Math.random() * 3) + 7;                      // 7～9
};

export default function CanvasArt({ onGroupChange, onRssCount }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // dots と vectors のデータ
  const [dots, setDots] = useState([]);
  const [vectors, setVectors] = useState([]);
  // RSS リンク配列（有効なリンクのみ）
  const [linkArray, setLinkArray] = useState([]);
  // 選択されたグループ番号
  const [groupNumber, setGroupNumber] = useState(null);
  // 現在のブレイクポイントカテゴリー
  const [groupCategory, setGroupCategory] = useState(null);
  // Canvas 上に描画したドットのアンカー座標（DOM 配置用）
  const [dotAnchors, setDotAnchors] = useState([]);

  // 初回マウント時、親要素の幅からカテゴリーを決定し、データを fetch する
  useEffect(() => {
    const parentWidth = containerRef.current
      ? containerRef.current.clientWidth
      : window.innerWidth;
    const initialCategory = getGroupCategory(parentWidth);
    setGroupCategory(initialCategory);
    const newGroup = getGroupForCategory(initialCategory);
    setGroupNumber(newGroup);
    fetchGroupData(newGroup);
  }, []);

  // グループデータ（dots, vectors）の取得
  const fetchGroupData = useCallback(
    (group) => {
      const dotsFile = group === 1 ? "/dots.json" : `/dots${group}.json`;
      const vectorsFile = group === 1 ? "/vectors.json" : `/vectors${group}.json`;

      // dots の取得
      fetch(dotsFile)
        .then((res) => res.json())
        .then((data) => {
          setDots(data);
          if (onGroupChange) {
            onGroupChange(group, data.length);
          }
        })
        .catch((err) => console.error("Failed to load dots:", err));

      // vectors の取得
      fetch(vectorsFile)
        .then((res) => res.json())
        .then((data) => setVectors(data))
        .catch((err) => console.error("Failed to load vectors:", err));
    },
    [onGroupChange]
  );

  // RSS の取得（有効なリンクのみを設定）
  useEffect(() => {
    const rssURL = "/api/rss";
    fetch(rssURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`RSS fetch error: ${res.status}`);
        }
        return res.text();
      })
      .then((xmlText) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const items = xmlDoc.getElementsByTagName("item");
        const links = [];
        for (let i = 0; i < items.length; i++) {
          let linkEl = items[i].getElementsByTagName("link")[0];
          let linkText = "";
          if (linkEl && linkEl.textContent.trim() !== "") {
            linkText = linkEl.textContent.trim();
          } else {
            const guidEl = items[i].getElementsByTagName("guid")[0];
            if (guidEl) {
              linkText = guidEl.textContent.trim();
            }
          }
          if (linkText && linkText !== "#") {
            links.push(linkText);
          }
        }
        setLinkArray(links);
        if (onRssCount) {
          onRssCount(links.length);
        }
      })
      .catch((err) => {
        console.error("Failed to load RSS:", err);
        setLinkArray([]);
        if (onRssCount) {
          onRssCount(0);
        }
      });
  }, [onRssCount]);

  // 親要素の幅の変化（リサイズ）に応じてグループ切替をシームレスに行う
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const newCategory = getGroupCategory(width);
      if (newCategory !== groupCategory) {
        // カテゴリーが変わったら新たなグループ番号を生成しデータを再取得
        const newGroup = getGroupForCategory(newCategory);
        setGroupCategory(newCategory);
        setGroupNumber(newGroup);
        fetchGroupData(newGroup);
      }
      drawCanvas();
    };
    window.addEventListener("resize", handleResize);
    // 初回描画
    drawCanvas();
    return () => window.removeEventListener("resize", handleResize);
  }, [groupCategory, fetchGroupData, dots, vectors, linkArray]);

  // ----------------------------------
  // レスポンシブ描画処理
  // ----------------------------------
  const drawCanvas = () => {
    if (!canvasRef.current || !containerRef.current) return;

    // small の場合は 474x474、それ以外は従来の 1350x800 を使用
    const effectiveBaseWidth = groupCategory === "small" ? 560 : 1350;
    const effectiveBaseHeight = groupCategory === "small" ? 560 : 800;

    const parentWidth = containerRef.current.clientWidth;
    const aspectRatio = effectiveBaseWidth / effectiveBaseHeight;
    const displayWidth = parentWidth;
    const displayHeight = Math.floor(parentWidth / aspectRatio);
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";
    containerRef.current.style.height = displayHeight + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // --- バウンディングボックスの計算 ---
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    dots.forEach((p) => {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    });
    vectors.forEach((v) => {
      if (v.x < minX) minX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.x > maxX) maxX = v.x;
      if (v.y > maxY) maxY = v.y;
    });
    if (minX === Infinity) {
      minX = 0;
      minY = 0;
      maxX = effectiveBaseWidth;
      maxY = effectiveBaseHeight;
    }
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // --- スケールと中央配置 ---
    const scale = displayWidth / effectiveBaseWidth;
    const drawnWidth = contentWidth * scale;
    const drawnHeight = contentHeight * scale;
    const leftMargin = (displayWidth - drawnWidth) / 2;
    const topMargin = (displayHeight - drawnHeight) / 2;

    // --- dots の描画とアンカー用座標の保存 ---
    // リンクの数分だけ描画（有効なリンクがある場合）
    const numDots = linkArray.length > 0 ? Math.min(dots.length, linkArray.length) : 0;
    const anchorPositions = [];
    ctx.fillStyle = "#000";
    const dotRadius = 2.1;
    for (let i = 0; i < numDots; i++) {
      const p = dots[i];
      const drawX = (p.x - minX) * scale + leftMargin;
      const drawY = (p.y - minY) * scale + topMargin;
      ctx.beginPath();
      ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
      ctx.fill();
      anchorPositions.push({
        x: drawX,
        y: drawY,
        link: linkArray[i],
      });
    }

    // --- vectors の描画 ---
    vectors.forEach((v) => {
      const vectorX = (v.x - minX) * scale + leftMargin;
      const vectorY = (v.y - minY) * scale + topMargin;
      ctx.save();
      ctx.translate(vectorX, vectorY);
      ctx.scale(scale, scale);
      const vectorColor = "#000";
      ctx.fillStyle = vectorColor;
      if (v.fillGeometry && v.fillGeometry.length > 0) {
        v.fillGeometry.forEach((geom) => {
          try {
            const path = new Path2D(geom.path);
            ctx.fill(path);
          } catch (error) {
            console.error("Error drawing fillGeometry:", error, geom.path);
          }
        });
      } else if (v.stroke && v.stroke.length > 0) {
        ctx.strokeStyle = vectorColor;
        ctx.lineWidth = 1 / scale;
        ctx.strokeRect(0, 0, v.width, v.height);
      }
      ctx.restore();
    });

    setDotAnchors(anchorPositions);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      {dotAnchors.map((dot, i) => {
        if (!dot.link) return null;
        return (
          <a
            key={i}
            href={dot.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              transform: "translate(-50%, -50%)",
              width: "4px",
              height: "4px",
              background: "transparent",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 9999,
            }}
          />
        );
      })}
    </div>
  );
}
