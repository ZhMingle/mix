'use client'
import { useRef, useState, useEffect } from 'react';
import './BalanceBoard.css';

const BalanceBoard = () => {
  const boardRef = useRef(null);
  const requestRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    const board = boardRef.current;
    const rect = board.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 增大旋转角度的幅度
    const rotateX = ((y / rect.height) - 0.5) * 30; // 控制上下倾斜
    const rotateY = ((x / rect.width) - 0.5) * -30; // 控制左右倾斜

    // 如果正在悬停，清除之前的 requestAnimationFrame 以防止多次触发
    if (isHovering) {
      cancelAnimationFrame(requestRef.current);

      // 使用 requestAnimationFrame 优化动画性能
      requestRef.current = requestAnimationFrame(() => {
        board.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    }
  };

  const handleMouseLeave = () => {
    const board = boardRef.current;
    setIsHovering(false);

    // 清除动画帧
    cancelAnimationFrame(requestRef.current);

    // 鼠标移开时复位
    board.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // 确保组件卸载时清除动画帧
  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className='bg-main-gradient'>

    
    <div
      ref={boardRef}
      className="balance-board"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      Hover over me!
    </div>
    </div>
  );
};

export default BalanceBoard;
