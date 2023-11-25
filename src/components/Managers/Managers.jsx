import { Link, json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../subComponents/Navbar";
import ConfirmDialog from "../subComponents/ConfirmDialog";

import AddManager from "./AddManager";
import { FetchManagers,DeleteManager } from "../../services/managerService";

import { FcManager } from "react-icons/fc";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

// responsive data table:-

// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';




const Managers = () => {

//list of manager
 //states for displaying edit and create forms
 const [addForm, setAddForm] = useState(false);
 const [editForm, setEditForm] = useState(false);
 //state for storing the edit data
 const [editFormData, setEditFormData] = useState({});
 //confirm box while deleting
 const [showConfirm, setShowConfirm] = useState(false);
 //list of users
 const [dataList, setDataList] = useState([]);
 // id to perform delete
 const [deleteId, setDeleteId] = useState(null);

const token = useSelector((state)=>state?.auth?.token) ||
json.parse(localStorage.getItem("loginDetails")).token;



  const perPage = 20; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataList.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
//=========get all managers========
const getFetchedData = async()=>{
  const data = await FetchManagers(token);
  if(data.success){
    setDataList(data?.data);
  }
};
 /*fetching the data inside useEffect (only fetches in initial mounting)
   and whenever there is change in dataList*/
   useEffect(() => {
    getFetchedData();
  }, []);

   /* ====================================== Update Manager ======================================*/
   const handleUpdate = async (data) => {
    setEditForm(true);
    setEditFormData(data);
  };

  /* ==================================== get all managers ====================================== */
  const handleDelete = async (id) => {
    setShowConfirm(true);
    setDeleteId(id);
  };

    /* ===== on clicking confirm button delete manager ===== */
    const onConfirm = async()=>{
      const data = await DeleteManager( deleteId,token);
      if (data?.success) {
        toast.success(data?.message);
        setShowConfirm(false);
        getFetchedData();
      } else {
        toast.error(data?.message);
      }
    };

     /*======= on clicking cancel button hide the confirm box ======= */
  const onCancel = () => {
    setShowConfirm(false);
  };



  return (
    <div className="relative">
      <Navbar />

      <div className="w-full max-w-[1000px] bg-gray-600 h-[50px] mx-auto my-10 flex items-center justify-around ">
        <FcManager className="text-3xl" />
        <h1 className="text-xl text-end text-gray-100 font-bold">Managers</h1>
        <button
          className=" p-1 px-3 bg-teal-600 shadow-lg hover:shadow-teal-600/40 text-white font-semibold rounded-lg cursor-pointer"
          onClick={() => setAddForm(true)}
        >
          Add Manger
        </button>
      </div>
      {/* add form, only displays on click*/}
      {addForm && (
        <AddManager
          handleClose={setAddForm}
          title={"Add"}
          getFetchedData={getFetchedData}
        />
      )} 

      {editForm && (
        //same form is used for edit and add , props will change
        <AddManager
          handleClose={setEditForm}
          title={"Edit"}
          getFetchedData={getFetchedData}
          data={editFormData}
        />
      )}

      {/* table to show all available managers */}

      <div className="h-auto overflow-x-auto mx-auto my-10  w-auto sm:w-full max-w-[1000px]">
      <table className="min-w-full  divide-y shadow-lg bg-white border-collapse sm:w-full w-[100vw]">
      <thead>
            <tr>
           
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">Name</th>
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">Email</th>
           
              <th scope="col" className="bg-blue-100 border text-left text-xs font-medium  text-gray-500 uppercase tracking-wider px-8 py-4">
                Actions
              </th>
            </tr>
          </thead>
          {dataList.length === 0 ? (
            <h1 className="font-medium text-l text-center mx-auto p-5">
              No data to show
            </h1>
          ) : (
            <tbody  className="bg-white divide-y divide-gray-200">
              {dataList.map((data, index) => {
                return (
                  <tr
                    key={data._id}
                    className={`hover:bg-gray-300 focus:bg-gray-300 ${
                      index % 2 == 0 ? "bg-gray-200" : "bg-gray-50"
                    }`}
                    tabIndex="0"
                  >
                    <td className="border px-8 py-4 whitespace-nowrap">{data.name}</td>
                    <td className="border px-8 py-4 whitespace-nowrap">{data.email}</td>
                   
                    <td className="border px-8 py-4 whitespace-nowrap">
                      <div className="flex justify-around">
                        <FaPencil
                          className="text-xl hover:text-green-900 text-green-700"
                          onClick={() => handleUpdate(data)}
                        />
                        <RiDeleteBin6Fill
                          className="text-xl text-red-700 hover:text-red-900"
                          onClick={() => handleDelete(data._id)}
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
      <div className="mt-4">
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
      </div>
    </div>
      
      {/* confirm box when deleting */}
      {showConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to delete this item?"}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
}
export default Managers