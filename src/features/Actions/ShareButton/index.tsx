'use client';

import { ActionIcon } from '@lobehub/ui';
import { Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { memo, useState } from 'react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

const ShareModal = dynamic(() => import('./ShareModal'));
interface ShareButtonProps {
  className?: string;
  // open?: boolean;
  // setOpen?: (open: boolean) => void;
  style?: React.CSSProperties;
}

const ShareButton = memo<ShareButtonProps>(({ className, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLoading] = useSessionStore((s) => [s.shareLoading]);

  return (
    <>
      <ActionIcon
        className={className}
        style={style}
        icon={Share2}
        loading={shareLoading}
        onClick={() => setIsModalOpen(true)}
        size={DESKTOP_HEADER_ICON_SIZE}
        title={'分享'}
      />
      <ShareModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default ShareButton;
