import React, { FC } from 'react';

interface AssetItemProps {
  ticker: string;
  title: string;
}

export const AssetItem: FC<AssetItemProps> = ({ ticker, title }) => {
  return (
    <div>
      <div className="title is-5">{ticker}</div>
      <div className="subtitle is-6">{title}</div>
    </div>
  );
};
