import React, { FC } from 'react';
import cn from 'classnames';

interface ButtonProps {
  fullwidth?: boolean;
  onClick: () => void;
  danger?: boolean;
}

export const Button: FC<ButtonProps> = ({ fullwidth, danger, onClick, children }) => {
  return (
    <button className={cn('button', { 'is-fullwidth': fullwidth, 'is-danger': danger })} onClick={onClick}>
      {children}
    </button>
  );
};
