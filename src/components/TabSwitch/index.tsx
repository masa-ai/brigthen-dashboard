import React, { useEffect, useState } from 'react';

import styles from './TabSwitch.module.css';
export const TabSwitch = ({
  currentActive,
  labelLeft,
  labelRight,
  leftFunction,
  rightFunction,
}: {
  currentActive: string;
  labelLeft: string;
  labelRight: string;
  leftFunction: () => void;
  rightFunction: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<string>(currentActive);

  const handleTabClick = (direction: string) => {
    setActiveTab(direction);
  };

  useEffect(() => {
    setActiveTab(currentActive);
  }, [currentActive]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles['taeb-switch']} text-center ${
          activeTab === 'left' ? styles.left : styles.right
        }`}
      >
        <div
          className={`${styles.taeb} ${
            activeTab === 'left' ? styles.active : ''
          }`}
          onClick={() => {
            handleTabClick('left');
            leftFunction();
          }}
        >
          {labelLeft}
        </div>
        <div
          className={`${styles.taeb} ${
            activeTab === 'right' ? styles.active : ''
          }`}
          onClick={() => {
            handleTabClick('right');
            rightFunction();
          }}
        >
          {labelRight}
        </div>
      </div>
    </div>
  );
};
