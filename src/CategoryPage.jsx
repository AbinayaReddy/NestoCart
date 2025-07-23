import React from 'react';
import { useParams } from 'react-router-dom';
import Vegetables from './Vegetables';
import FrozenFood from './FrozenFood';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';

function CategoryPage() {
  const { categoryName } = useParams();

  switch (categoryName.toLowerCase()) {
    case 'vegetables':
      return <Vegetables />;
    case 'frozenfood':
      return <FrozenFood />;
    case 'nonveg':
      return <NonVeg />;
    case 'milk':
      return <Milk />;
    case 'chocolate':
      return <Chocolate />;
    default:
      return <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Category "{categoryName}" not found.</h2>
      </div>;
  }
}

export default CategoryPage;
