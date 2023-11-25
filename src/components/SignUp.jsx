
import { Link ,useNavigate } from "react-router-dom"
import { useState } from "react";
import { ToastContainer , toast} from "react-toastify"
import axios from "axios";

const SignUp = () => {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if any of the fields are empty
      if (!name || !email || !password) {
        toast.error("All fields are required", {
          position: "bottom-right",
        });
        // exit the function if fields are empty
      }
  
      const res = await axios.post(`http://localhost:5000/signUp`, {
        name,
        email,
        password,
      });
  
      // send from server in res.json
      if (res.data === "exist") {
        toast.error("User Already exists", {
          position: "bottom-right",
        });
      } else if (res.data === "not exists") {
        navigate("/home", { state: { id: email } });
      }
    } catch (error) {
      toast.error("Wrong Details", {
        position: "bottom-right",
      });
      console.log("Wrong Details: " + error);
    }
  };
  




  return (
    <>
    <div className="flex justify-center items-center min-h-screen m-7">
    <form className="w-full max-w-md p-8 rounded shadow-md bg-white">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="name"
          placeholder="enter your name"
          onChange={(e)=>setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      <Link to="/">Already have an account? <span className="text-gray-700">click here</span></Link>
    </form>
    
  </div>
  
  </>
  )
}
export default SignUp