import React from 'react';
import { searchResponse } from '@/types/search';

interface ResultsProps {
  results: searchResponse[];
  addToWishlist: (item: searchResponse) => void;
}

const Results = ({ results, addToWishlist }: ResultsProps) => {
  return (
    <div>
      {results.map((item, index) => (
        <div key={index} onClick={() => addToWishlist(item)}>
          <div>{item.title}</div>
          <img
            style={{ width: '200px', height: '200px' }}
            src={item.image}
            alt="가전이미지"
          />
          <div>{item.lprice}원</div>
          <div>{item.brand}</div>
          <div>{item.category2}-{item.category4}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Results;
