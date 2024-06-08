'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { HEADER_HEIGHT } from '@/constants/token';
import AgentViewer from '@/features/AgentViewer';
import Alert from '@/features/Alert';
import ChatDialog from '@/features/ChatDialog';
import MessageInput from '@/features/ChatInput/MessageInput';
import { useGlobalStore } from '@/store/global';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

export default memo(() => {
  const [showChatDialog, setChatDialog] = useGlobalStore((s) => [
    s.showChatDialog,
    s.setChatDialog,
  ]);
  const { styles } = useStyles();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  return (
    <Flexbox flex={1} style={{ position: 'relative' }}>
      {currentAgent ? (
        <div className={styles.viewer}>
          <AgentViewer height={`calc(100vh - ${HEADER_HEIGHT}px)`} agent={currentAgent} />
        </div>
      ) : null}
      {showChatDialog ? (
        <ChatDialog className={classNames(styles.dialog, styles.content)} setOpen={setChatDialog} />
      ) : null}
      <Flexbox flex={1} className={styles.mask} />
      <Flexbox align={'center'} className={styles.docker}>
        <div className={classNames(styles.input, styles.content)}>
          <MessageInput />
          <Alert style={{ marginTop: 8 }} />
        </div>
      </Flexbox>
    </Flexbox>
  );
});
