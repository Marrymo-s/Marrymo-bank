import React from 'react';
import {searchResponse} from '@/types/search';
import WishCard from '@/components/WishCard';
import * as styles from './index.css';

interface ResultsProps {
  results: searchResponse[];
}

const Results = ({results}: ResultsProps) => {
  return (
    <>
      <h3>추천리스트</h3>
      <div className={styles.resultsContainer}>
        {results.map((item, productId) => (
          <WishCard
            key={productId}
            title={item.title}
            image={item.image}
            lprice={item.lprice}
            brand={item.brand}
            category2={item.category2}
            category4={item.category4}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
