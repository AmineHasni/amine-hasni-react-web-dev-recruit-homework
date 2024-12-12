import React from "react";
import { useDispatch } from "react-redux";
import { toggleLikeDislike, deleteProduct } from "../redux/productsSlice";
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { AppDispatch } from "../redux/store"; // Import AppDispatch type

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch

  const handleLike = (): void => {
    
    if (product.id) {
      dispatch(toggleLikeDislike({ id: product.id, type: "like" })); // Call deleteProduct only if product.id is defined
    } else {
      console.error("Product id is undefined");
    }
  };

  const handleDislike = (): void => {
    
    if (product.id) {
      dispatch(toggleLikeDislike({ id: product.id, type: "dislike" })); // Call deleteProduct only if product.id is defined
    } else {
      console.error("Product id is undefined");
    }
  };

  const handleDelete = (): void => {
    if (product.id) {
      dispatch(deleteProduct(product.id)); // Call deleteProduct only if product.id is defined
    } else {
      console.error("Product id is undefined");
    }
  };

  return (
    <div className="h-60 w-80 border-4 border-[#8d84f4] m-1 rounded-lg flex flex-col justify-between items-center p-0">
      <h2>{product.name}</h2>
      <p>Catégorie: {product.category}</p>
      <p>
        Likes: {product.likes} Dislikes: {product.dislikes}
      </p>
      <div>
        <button
          className="rounded-lg w-30 border-4 border-[#8D84F4] px-4 py-2 bg-[#f0f0f0] text-base font-medium cursor-pointer transition-all duration-1000 mx-4 hover:border-[#36317C]"
          onClick={handleLike}
          style={{ color: product.isLiked ? "blue" : "black" }}
        >
          👍 Like
        </button>
        <button
          className="rounded-lg w-30 border-4 border-[#8D84F4] px-4 py-2 bg-[#f0f0f0] text-base font-medium cursor-pointer transition-all duration-1000 mx-4 hover:border-[#36317C]"
          onClick={handleDislike}
          style={{ color: product.isDisliked ? "red" : "black" }}
        >
          👎 Dislike
        </button>
      </div>
      <Link to={`/update-product/${product.id}`}>
        <button className="text-[#1e3a8a] rounded-md w-40 border-4 border-[#3b82f6] px-4 py-2 bg-[#e0f2fe] text-base font-medium cursor-pointer transition-colors duration-1000 mx-4 mb-1 hover:border-[#1e3a8a]">
          Update
        </button>
      </Link>
      <button
        className="text-[#af1010] rounded-md w-40 border-4 border-[#eb5d5d] px-4 py-2 bg-[#f0f0f0] text-base font-medium cursor-pointer transition-colors duration-1000 mx-4 mb-1 hover:border-[#af1010]"
        onClick={handleDelete}
      >
        Supprimer
      </button>
    </div>
  );
};

export default ProductCard;
