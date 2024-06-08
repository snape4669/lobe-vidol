import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 100%;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    margin-left: ${token.marginXS}px;
  `,
  controller: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  info: css`
    display: flex;
    align-items: center;
  `,
  name: css`
    justify-content: flex-start;
    width: 108px;
    font-size: ${token.fontSizeSM}px;
  `,
  player: css`
    display: flex;
    align-items: center;
  `,
  right: css`
    display: flex;
    gap: ${token.marginXS}px;
    align-items: center;
  `,
  spin: css`
    @keyframes rotate-animation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    animation: rotate-animation 20s linear infinite;
  `,
  progress: css`
    position: absolute;
    top: 0;
    left: 0;

    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 100%;
  `,
}));

export { useStyles };
