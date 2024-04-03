import React from 'react';
import { searchResponse } from '@/types/search';
import WishCard from '@/components/WishCard';
import * as styles from './index.css';

interface ResultsProps {
  results: searchResponse[];
  refreshData: () => void;
}

const Results = ({ results, refreshData }: ResultsProps) => {
  const removeTags = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '');
  };

  if(results.length == 0) {
    return <div>원하는 상품을 검색해보세요!</div>
  }

  return (
    <>
      <h3>추천리스트</h3>
      <div className={styles.resultsContainer}>
        {results.map((item, productId) => (
          <WishCard
            key={productId}
            title={removeTags(item.title)}
            image={item.image}
            lprice={item.lprice}
            brand={item.brand}
            category2={item.category2}
            category4={item.category4}
            refreshData={refreshData}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
