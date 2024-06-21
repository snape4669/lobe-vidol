'use client';

import { Alert, Icon, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Divider, Input, Space } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { kebabCase } from 'lodash-es';
import { Dices } from 'lucide-react';
import qs from 'query-string';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import { AGENTS_INDEX_GITHUB_ISSUE } from '@/constants/url';
import { upload } from '@/services/upload';
import { agentSelectors, useAgentStore } from '@/store/agent';

const SubmitAgentModal = memo<ModalProps>(({ open, onCancel }) => {
  const [agentId, setAgentId] = useState('');
  const theme = useTheme();
  const currentAgent = useAgentStore(agentSelectors.currentAgentItem, isEqual);
  const { meta } = currentAgent;

  const isFormPass = Boolean(
    currentAgent.greeting &&
      meta.name &&
      meta.description &&
      meta.avatar &&
      meta.cover &&
      meta.gender,
  );

  const handleSubmit = async () => {
    let avatarUrl = meta.avatar;
    if (meta.avatar.includes('base64')) {
      const arr = meta.avatar.split('base64,');
      const binaryString = atob(arr[1]);
      // @ts-ignore
      const mime = arr[0].match(/:(.*?);/)[1];
      const uint8Array = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
      // base64
      const { success, url } = await upload(
        new File([uint8Array], `${agentId}-avatar.png`, { type: mime }),
      );
      if (success) {
        avatarUrl = url;
      }
    }
    const body = [
      '### systemRole',
      currentAgent.systemRole,
      '### agentId',
      kebabCase(agentId),
      '### avatar',
      avatarUrl,
      '### cover',
      meta.cover,
      '### name',
      meta.name,
      '### description',
      meta.description,
    ].join('\n\n');

    const url = qs.stringifyUrl({
      query: { body, labels: '🤖 Agent PR', title: `[Agent] ${meta.name}` },
      url: AGENTS_INDEX_GITHUB_ISSUE,
    });

    window.open(url, '_blank');
  };

  return (
    <Modal
      allowFullscreen
      footer={
        <Button
          block
          disabled={!isFormPass || !agentId}
          onClick={handleSubmit}
          size={'large'}
          type={'primary'}
        >
          提交助手
        </Button>
      }
      onCancel={onCancel}
      open={open}
      title={'分享到助手市场'}
    >
      <Flexbox gap={16}>
        {!isFormPass && (
          <Alert
            message={'请补全助手信息后提交，需要包含名称、描述、头像和封面'}
            showIcon
            type={'warning'}
          />
        )}
        <AgentCard agent={currentAgent} />
        <Divider style={{ margin: '8px 0' }} />
        <strong>
          <span style={{ color: theme.colorError, marginRight: 4 }}>*</span>
          agentId 助手标识符
        </strong>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={'请输入助手的标识符，需要是唯一的，比如 vidol-agent-klee'}
            value={agentId}
          />
          <Button
            type="primary"
            icon={<Icon icon={Dices} />}
            onClick={() => {
              const randomId = Math.random().toString(36).slice(7);
              setAgentId(`vidol-agent-${randomId}`);
            }}
          ></Button>
        </Space.Compact>
      </Flexbox>
    </Modal>
  );
});

export default SubmitAgentModal;
