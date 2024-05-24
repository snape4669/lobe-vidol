import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { Eraser, Music } from 'lucide-react';
import React, { memo } from 'react';

import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';

import Item from './Item';

const { confirm } = Modal;

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);

  const items = [
    // {
    //   icon: SquarePen,
    //   label: '新话题',
    //   key: 'new-topic',
    //   onClick: () => {},
    // },
    // {
    //   icon: History,
    //   label: '聊天历史记录',
    //   key: 'history',
    //   onClick: () => {
    //     // openPanel('role');
    //   },
    // },
    // {
    //   icon: Settings2Icon,
    //   label: '对话设定',
    //   key: 'setting',
    //   onClick: () => {
    //     Modal.info({ title: '对话设定', content: '暂未开放' });
    //   },
    // },
    {
      icon: Music,
      key: 'music',
      label: '音乐与舞蹈',
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: Eraser,
      label: '清除上下文',
      key: 'context',
      onClick: () => {
        confirm({
          title: '确定删除历史消息？',
          icon: <ExclamationCircleFilled />,
          content: '该操作不可逆，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            clearHistory();
          },
          onCancel() {},
        });
      },
    },
  ];

  return (
    <>
      {items.map(({ icon, label, onClick }) => (
        <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
      ))}
    </>
  );
});

export default Operations;
