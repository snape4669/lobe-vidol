import { ActionIcon } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
import { Loader2, PlayIcon } from 'lucide-react';
import { memo, useState } from 'react';

import { speakCharacter } from '@/features/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAction } from '@/types/touch';

interface Props {
  touchAction: TouchAction;
}

export default memo((props: Props) => {
  const { touchAction } = props;
  const [loading, setLoading] = useState(false);
  const viewer = useGlobalStore((s) => s.viewer);

  const currentAgentTTS = useAgentStore((s) => agentSelectors.currentAgentTTS(s), isEqual);

  if (!touchAction) {
    return null;
  }

  return (
    <ActionIcon
      icon={loading ? Loader2 : PlayIcon}
      spin={loading}
      disable={loading}
      title="播放"
      key="play"
      onClick={() => {
        setLoading(true);
        speakCharacter(
          {
            emotion: touchAction.emotion,
            tts: {
              ...currentAgentTTS,
              message: touchAction.text,
            },
          },
          viewer,
          () => {},
          () => {
            setLoading(false);
          },
        );
      }}
    />
  );
});
