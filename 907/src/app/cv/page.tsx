'use client'
import React, { useRef } from 'react';
import './BalanceBoard.css';

const BalanceBoard = () => {
  const boardRef = useRef(null);
  const requestRef = useRef(null);

  const handleMouseMove = (event) => {
    const board = boardRef.current;
    const rect = board.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 增大旋转角度的幅度
    const rotateX = ((y / rect.height) - 0.5) * 30; // 控制上下倾斜
    const rotateY = ((x / rect.width) - 0.5) * -30; // 控制左右倾斜

    // 使用 requestAnimationFrame 优化动画性能
    requestRef.current = requestAnimationFrame(() => {
      board.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    const board = boardRef.current;

    // 清除动画帧
    cancelAnimationFrame(requestRef.current);

    // 鼠标移开时复位
    board.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={boardRef}
      className="balance-board"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Hover over me!
    </div>
  );
};

export default BalanceBoard;
