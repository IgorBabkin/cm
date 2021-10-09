import React, { FC } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  );
};
