import Navbar from "../subComponents/Navbar";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import AddProduct from "./AddProduct";
import ConfirmDialog from "../subComponents/ConfirmDialog";


import { FaMobile } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { toast } from "react-toastify";
import { DeleteProduct, FetchProducts } from "../../services/productServices";




const Products = () => {
  const token =
  useSelector((state) => state?.auth?.token) ||
  JSON.parse(localStorage.getItem("loginDetails")).token;

const [addForm, setAddForm] = useState(false);
const [editForm, setEditForm] = useState(false);
const [editFormData, setEditFormData] = useState({});
const [productList, setProductList] = useState([]);
const [showConfirm, setShowConfirm] = useState(false);
const [deleteId, setDeleteId] = useState(null);

//=======get all products==========
const getFetchedProducts = async()=>{
  const data = await FetchProducts(token);
  if (data?.success) {
    setProductList(data?.allProducts);
  }
};

  /* =================== UPDATE PRODUCT =====================*/
  const handleUpdate = async (product) => {
    setEditForm(true);
    setEditFormData(product);
  };

   /* =================== DELETE PRODUCT =====================*/
   const handleDelete = async (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const onConfirm = async () => {
    const data = await DeleteProduct(deleteId, token);
    if (data?.success) {
      setShowConfirm(false);
      getFetchedProducts();
    } else {
      toast.error(data?.message);
    }
  };

  const onCancel = () => {
    setShowConfirm(false);
  };

//fetching data in initial mounting
useEffect(() => {
  getFetchedProducts();
}, []);

  return (
    <div className="relative">
    <Navbar />
    <div className="w-full max-w-[1000px] bg-gray-600 h-[60px] mx-auto my-10 flex items-center justify-around ">
      <FaMobile className="text-5xl text-teal-500 " />
      <h1 className="text-xl text-end text-gray-100 font-bold">Products</h1>
      <button
        className=" p-1 px-3 bg-teal-600 shadow-lg hover:shadow-teal-600/40 text-white font-semibold rounded-lg cursor-pointer"
        onClick={() => setAddForm(true)}
      >
        Add Products
      </button>
    </div>
    {/* add form only display on button click */}
    {addForm && (
        <AddProduct
          handleClose={setAddForm}
          title={"Add"}
          getFetchedProducts={getFetchedProducts}
        />
      )}
      {/* Edit form pending */}
      {editForm && (
        <AddProduct
          handleClose={setEditForm}
          title={"Edit"}
          getFetchedProducts={getFetchedProducts}
          data={editFormData}
        />
      )}

      {/* Table to show all the available products */}

      <div className="h-auto overflow-x-auto mx-auto my-10  w-auto sm:w-full max-w-[1000px]">
      <table className="min-w-full  divide-y shadow-lg bg-white border-collapse sm:w-full w-[100vw]">
      <thead>
            <tr>
           
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">image</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">name</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">brand</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">price</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">stock</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">updated by</th>
           
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">
                Actions
              </th>
            </tr>
          </thead>
          {productList.length === 0 ? (
            <h1 className="font-medium text-l text-center mx-auto p-5">
              No data to show
            </h1>
          ) : (
            <tbody  className="bg-white divide-y divide-gray-200">
              {productList.map((product, index) => {
                return (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-300 focus:bg-gray-300 ${
                      index % 2 == 0 ? "bg-gray-200" : "bg-gray-50"
                    }`}
                    tabIndex="0"
                  >
                    <td className="border px-8 py-4 whitespace-nowrap">
                    <img
                        className="w-[100px] h-[100px]"
                        src={product.image}
                        alt="Product Img"
                      />
                    </td>
                    <td className="border px-8 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="border px-8 py-4 whitespace-nowrap">
                    {product.brand}
                    </td>
                    <td className="border px-8 py-4 whitespace-nowrap">
                      {product.price}
                    </td>
                    <td className="border px-8 py-4 whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="border px-8 py-4 whitespace-nowrap">
                      {product.updatedBy}
                    </td>
                   
                    <td className="border px-8 py-4 whitespace-nowrap">
                      <div className="flex justify-around">
                        <FaPencil
                          className="text-xl hover:text-green-900 text-green-700"
                          onClick={() => handleUpdate(product)}
                        />
                        <RiDeleteBin6Fill
                          className="text-xl text-red-700 hover:text-red-900"
                          onClick={() => handleDelete(product._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
      </table>

      {/* Pagination */}
      {/* <div className="mt-4">
        <nav className="flex justify-end">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={index + 1 === currentPage ? 'page-item active' : 'page-item'}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div> */}

    </div>

      {/* cofirm */}

      {showConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to delete this item?"}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  )
}
export default Products