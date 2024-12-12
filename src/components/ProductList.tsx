import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../redux/productsSlice";
import Filter from "./Filter";
import Pagination from "./Pagination";
import { selectPaginatedProducts } from "../redux/productsSlice";
import { RootState } from "../redux/store";
import { Product } from "../types/product";
import { Link } from "react-router-dom";
import { AppDispatch } from "../redux/store"; // Import AppDispatch type

const ProductList: React.FC = () => {
  // Get the paginated products from the Redux store
  const paginatedProducts = useSelector<RootState, Product[]>((state) =>
    selectPaginatedProducts(state)
  );

  // Get the categories from the Redux store
  const categories = useSelector((state: RootState) => state.products.categories);

  // Dispatch function to fetch products
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="relative flex flex-col flex-1 justify-between items-center p-0">
      <Link to="/add-product">
        <button className="text-[#2c974b] rounded-md w-40 border-4 border-[#4caf50] px-4 py-2 bg-[#e8f5e9] text-base font-medium cursor-pointer transition-colors duration-1000 mx-4 mb-1 hover:border-[#2c974b]">
          Add Product
        </button>
      </Link>
      <Filter categories={categories} />
      <div className="relative flex justify-center flex-wrap p-5 m-2">
        {paginatedProducts?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductList;
