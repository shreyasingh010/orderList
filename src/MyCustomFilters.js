import React from 'react';
import CustomFilters from './components/CustomFilters';

const MyCustomFilters = () => {
  const handleSearch = (searchText, selectedCategory, selectedStatus) => {
    console.log('Search Text:', searchText);
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Status:', selectedStatus);
  };

  const handleCategoryChange = (selectedCategory) => {
    console.log('Selected Category:', selectedCategory);
  };

  const handleStatusChange = (selectedStatus) => {
    console.log('Selected Status:', selectedStatus);
  };

  return (
    <div>
      <CustomFilters
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default MyCustomFilters;
