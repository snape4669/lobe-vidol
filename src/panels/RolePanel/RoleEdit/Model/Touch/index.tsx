import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useState } from 'react';

import { TouchAreaEnum } from '@/types/touch';

import ActionList from './ActionList';
import SideBar from './SideBar';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    min-height: 740px;
  `,
}));

interface TouchProps {
  className?: string;
  style?: React.CSSProperties;
}

const Touch = (props: TouchProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [currentTouchArea, setCurrentTouchArea] = useState<TouchAreaEnum>(TouchAreaEnum.Head);

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <SideBar currentTouchArea={currentTouchArea} setCurrentTouchArea={setCurrentTouchArea} />
      <ActionList currentTouchArea={currentTouchArea} style={{ marginLeft: 12 }} />
    </div>
  );
};

export default memo(Touch);
