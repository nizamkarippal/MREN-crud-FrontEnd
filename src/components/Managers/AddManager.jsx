import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { ValidateEmail } from "../../services/authService";
import { AddNewManager } from "../../services/managerService";
import { useState } from "react";
import { UpdateManager } from "../../services/managerService";
import { useSelector } from "react-redux";

const AddManager = ({handleClose,title, getFetchedData,data=null}) => {
    let initialState;
    title === "Add"? initialState = {
        name: "",
        email: "",
       
       
      } :initialState = {
        id: data?._id,
        name: data?.name,
        email: data?.email,
       
      };
    const [formData,setFormData] = useState(initialState);
    const {id,name,email}=formData

    const token =
    useSelector((state) => state?.auth?.token) ||
    JSON.parse(localStorage.getItem("loginDetails")).token;

    //handaling the inputs change
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    //new manager
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!name || !email){
            return toast.error("All fields are required");
        };

        if(!ValidateEmail(email)){
            return toast.error("Invalid email");
        };

        if(title==="Add"){
            const managerData = {
                name,
                email,
            };
            //calling the add manager service
            const data = await AddNewManager(managerData,token);
            if(data.success){
                handleClose(false);
                getFetchedData();
            }else{
                handleClose(false);
            }
        }else{
            const updatedData = {
                id,name,email
            };

            const data = await UpdateManager(updatedData, token);
      if (data.success) {
        handleClose(false);
        
        getFetchedData();
      } else {
        handleClose(false);
        
      }

        };
    }

  return (
    <form
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[5] shadow-lg transition-all ease-in"
    onSubmit={handleSubmit}
  >
    <div className="max-w-[450px] sm:w-[450px] bg-gray-900 p-8 rounded-lg">
      <AiOutlineCloseCircle
        className="ml-auto text-2xl text-white"
        onClick={() => handleClose(false)}
      />
      <h2 className="text-2xl dark:text-white font-bold text-center">
        {`${title} Manager Form`}
      </h2>
      <div className="flex flex-col text-gray-400 py-2">
        <label htmlFor="email">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter name"
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
        />
      </div>
      <div className="flex flex-col text-gray-400 py-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-y-blue-500 focus:bg-gray-800 focus:outline-none"
        />
      </div>
    
      <button
        type="submit"
        className="w-full my-5 py-2 bg-indigo-500 shadow-lg hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
      >
        {`${title}`}
      </button>
    </div>
  </form>
);
  
}
export default AddManager