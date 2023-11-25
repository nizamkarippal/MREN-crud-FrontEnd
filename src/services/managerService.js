import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const BACKEND_URL =  "http://localhost:5000";

//================fetch all managers============
export const FetchManagers = async (token) =>{
    try{
        Swal.fire({
            text: "Fetching Data Please wait...",
            imageUrl: "https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif",
            showConfirmButton: false,
            allowOutsideClick: false,
            width: "250px",
          });
          const response = await axios.get(`${BACKEND_URL}/managers`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
              Swal.close();
              return response.data;
          
    }catch (error) {
    console.log("Error in Fetch Managers Service : " + error);
  }
};


/* ============ Add new Managers ================= */
export const AddNewManager = async (managerData, token) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/managers/add-manager`,
      managerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    if (!response?.data?.success) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
    }
    return response.data;
  }catch (error) {
    console.log("Error in Add New Manager Service :" + error);
  }
};
/* ============ Update Manager ================= */
export const UpdateManager = async (updatedData, token) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/managers/edit-manager`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data || !response.data.success) {
      // Handle error cases
      const errorMessage = response.data?.message || "Unknown error";
      console.error(errorMessage);

      // Display a more informative error message using toast.error
      toast.error(`Failed to update manager: ${errorMessage}`);
    } else {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("Error in Update Manager Service: ", error);

    // Display a more informative error message using toast.error
    toast.error("An error occurred while updating the manager. Please try again.");

    // Rethrow the error to propagate it further if needed
    throw error;
  }
};

//===========================Delete Manager==========
export const DeleteManager = async (id,token)=>{
  try{
    const response = await axios.delete(
      `${BACKEND_URL}/managers/delete/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      
    );
    console.log(response);
    return response.data;
  }catch (error) {
    console.log("Error in Delete Manager Service : " + error);
  }
}