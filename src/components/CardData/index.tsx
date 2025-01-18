import React from 'react';

interface CardDataInterface {
  title?: string;
  subTitle?: string;
  description?: string;
}

const CardData: React.FC<CardDataInterface> = ({
  title = '10',
  subTitle = 'Projects',
  description = 'Completed',
}) => {
  return (
    <div className="flex bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-4 items-center justify-between hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Bagian Kiri */}
      <div>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="text-sm font-medium opacity-90">{subTitle}</p>
      </div>

      {/* Bagian Kanan */}
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{description}</h3>
      </div>
    </div>
  );
};

export default CardData;
