import React, { FC } from 'react';

interface MetricItemProps {
  name: string;
  description: string;
}

export const MetricItem: FC<MetricItemProps> = ({ name, description }) => {
  return (
    <div>
      <div className="title is-5">{name}</div>
      <div className="subtitle is-6">{description}</div>
    </div>
  );
};
