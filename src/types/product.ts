export interface Product {
  id?: string;
    name: string;
    category: string;
    likes: number;
    dislikes: number;
    isLiked?: boolean;
    isDisliked?: boolean;
  }
  
  export interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    selectedCategories: string[];
    currentPage: number;
    itemsPerPage: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    categories: string[]; // Add categories to the state
  }
  
  export interface ToggleLikeDislikePayload {
    id: string;
    type: "like" | "dislike";
  }
  