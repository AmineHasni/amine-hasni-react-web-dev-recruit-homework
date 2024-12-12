import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch  } from "../redux/store";
import { Product } from "../types/product";

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Use appropriate type for params
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch
  const navigate = useNavigate();

  // Get products and categories from the Redux state
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => [
    ...new Set(state.products.products.map((product) => product.category)),
  ]);

  // Find the product to edit based on the id
  const productToEdit = products.find((product) => product.id === id);

  // States for the product to edit and a potential new category
  const [product, setProduct] = useState<Product | null>(productToEdit || null);
  const [newCategory, setNewCategory] = useState<string>("");

  // Update the local state when `productToEdit` changes
  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  // Handle changes in the product form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle category selection
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    setProduct({ ...product, category: e.target.value });
  };

  // Handle changes to the new category input
  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    // Use the new category if provided; otherwise, keep the current one
    const categoryToUse = newCategory.trim() || product.category;

    await dispatch(updateProduct({ ...product, category: categoryToUse }));
    navigate("/"); // Redirect to the main page after updating a product
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product?.name || ""}
        onChange={handleChange}
        required
      />
      <div>
        <label>Select Category:</label>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={product?.category === category}
              onChange={handleCategoryChange}
            />
            <label>{category}</label>
          </div>
        ))}
        <div>
          <label>Or add a new category:</label>
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
        </div>
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
