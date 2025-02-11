import React from 'react';

interface CardProps {
  name: string;
  value: number;
  type: string;
}

const CardComponent: React.FC<CardProps> = ({ name, value, type }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Value: {value}</p>
      <p>Type: {type}</p>
    </div>
  );
};

export default CardComponent;
