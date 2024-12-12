import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store"; // Adjust import if your store file location differs
import { Product } from "../types/product"; // Ensure Product type exists in a `types` folder

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    id: "", // This can be excluded if the backend assigns it
    name: "",
    category: "",
    likes: 0,
    dislikes: 0,
  });

  const [newCategory, setNewCategory] = useState<string>("");
  const categories = useSelector((state: RootState) =>
    [...new Set(state.products.products.map((product) => product.category))]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setProduct({ ...product, category: e.target.value });
  };

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const categoryToUse = newCategory.trim() || product.category;
    await dispatch(addProduct({ ...product, category: categoryToUse }) as any);
    navigate("/"); // Redirect to the main page after adding a product
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    {/* Name Input */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        required
        className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Category Selection */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Select Category:</label>
      <div className="mt-2 space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={product.category === category}
              onChange={handleCategoryChange}
              id={`category-${category}`}
              className="focus:ring-blue-500"
            />
            <label htmlFor={`category-${category}`} className="text-sm text-gray-700">{category}</label>
          </div>
        ))}
      </div>

      {/* New Category Input */}
      <div className="mt-4">
        <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">Or add a new category:</label>
        <input
          id="newCategory"
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={handleNewCategoryChange}
          className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add Product
    </button>
  </form>
  );
};

export default AddProduct;
