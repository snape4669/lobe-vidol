import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Item from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';

const ChatList = memo(() => {
  const ids = useSessionStore((s) => sessionSelectors.currentChatIDsWithGreetingMessage(s));

  return (
    <Flexbox height={'100%'} style={{ paddingTop: 24, position: 'relative' }}>
      {ids.map((id, index) => (
        <Item id={id} index={index} key={id} />
      ))}
    </Flexbox>
  );
});

export default ChatList;
