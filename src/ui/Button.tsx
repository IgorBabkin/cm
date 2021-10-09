import React, { FC } from 'react';
import cn from 'classnames';

interface ButtonProps {
  fullwidth?: boolean;
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ fullwidth, onClick, children }) => {
  return (
    <button className={cn('button', { 'is-fullwidth': fullwidth })} onClick={onClick}>
      {children}
    </button>
  );
};
