import React from 'react';
import { searchResponse } from '@/types/search';

interface RegistrationProps {
  wishLists: searchResponse[];
}

const Registration = ({ wishLists }: RegistrationProps) => {
  return (
    <div>
      {wishLists.map((wishlist, index) => (
        <img
          key={index}
          style={{ width: '200px', height: '200px' }}
          src={wishlist.image}
          alt="위시리스트 아이템 이미지"
        />
      ))}
    </div>
  );
};

export default Registration;
