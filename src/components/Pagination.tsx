import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage } from "../redux/productsSlice";
import { selectTotalPages } from "../redux/productsSlice";
//import "../styles/Pagination.css";


// Define the RootState type to specify the shape of your Redux state
import { RootState } from "../redux/store";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  
  // Type the selectors with the RootState type
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector((state: RootState) => state.products.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.products.itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  // Type the event as a ChangeEvent for the select element
  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(1)); // Reset to the first page when items per page changes
  };

  return (
    <div className="relative flex flex-col justify-between items-center">
      <select 
        className="appearance-none -webkit-appearance-none px-3 py-2 border-4 border-[#8d84f4] rounded-md bg-[#f9f9f9] text-[#333] text-base cursor-pointer transition-all duration-300 ease-in-out outline-none relative pr-7 my-6 hover:bg-[#e6f0ff] focus:border-[#6b00b3] focus:ring-2 focus:ring-[#6100bb]" 
        onChange={handleItemsPerPageChange} 
        value={itemsPerPage}
      >
        <option className="px-2 bg-white" value={4}>4 products per page</option>
        <option className="px-2 bg-white" value={8}>8 products per page</option>
        <option className="px-2 bg-white" value={12}>12 products per page</option>
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#c878df] text-sm pointer-events-none">v</span>
      </select>
      <div>
        <button 
            className="rounded-lg w-30 border-4 border-[#8D84F4] px-4 py-2 bg-[#f0f0f0] text-base font-medium cursor-pointer transition-all duration-1000 mx-4 hover:border-[#36317C]"
            onClick={handlePrevPage} disabled={currentPage === 1}>
          Last Page
        </button>
        <span>
          {" "}Page {currentPage} / {totalPages}{" "}
        </span>
        <button 
            className="rounded-lg w-30 border-4 border-[#8D84F4] px-4 py-2 bg-[#f0f0f0] text-base font-medium cursor-pointer transition-all duration-1000 mx-4 hover:border-[#36317C]"
            onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
