import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../redux/productsSlice";
import { RootState } from "../redux/store"; // Adjust path based on your project structure
import {Category} from "../types/category"
const Filter: React.FC<Category> = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  
  // Dynamically obtain unique categories from the products list
  const categories: string[] = [...new Set(products.map((product) => product.category))];

  const selectedCategories = useSelector(
    (state: RootState) => state.products.selectedCategories
  );

  const handleCategoryChange = (category: string): void => {
    let updatedCategories: string[];
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      updatedCategories = selectedCategories.filter((cat) => cat !== category);
    } else {
      // Add category to selection
      updatedCategories = [...selectedCategories, category];
    }
    dispatch(filterByCategory(updatedCategories));
  };

  return (
    <div>
      {categories.map((category) => (
        <label key={category} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default Filter;
