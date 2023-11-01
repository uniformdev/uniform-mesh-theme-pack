import { FC, MouseEventHandler } from 'react';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
};

const DeleteButton: FC<Props> = ({ onClick, title }) => (
  <button title={title} onClick={onClick} className="delete-button">
    {title}
  </button>
);

export default DeleteButton;
