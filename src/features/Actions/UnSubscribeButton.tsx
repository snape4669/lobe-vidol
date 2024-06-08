import { Button, Popconfirm } from 'antd';
import React from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

export default () => {
  const currentAgent = useAgentStore((s) => agentSelectors.currentAgentItem(s));
  const removeLocalAgent = useAgentStore((s) => s.removeLocalAgent);
  const removeSession = useSessionStore((s) => s.removeSession);

  return (
    <Popconfirm
      cancelText="取消"
      description={`确定删除角色 ${currentAgent?.meta.name} 以及相关联的会话消息吗？删除后无法恢复, 请谨慎操作！`}
      key="delete"
      okText="确定"
      onConfirm={() => {
        if (!currentAgent) return;
        removeLocalAgent(currentAgent.agentId);
        removeSession(currentAgent.agentId);
      }}
      title="取消订阅？"
    >
      <Button danger>删除角色</Button>
    </Popconfirm>
  );
};
