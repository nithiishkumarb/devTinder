import { useState } from "react"
import axios from "axios";
import { URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogin = async ()=>{
    try {
      const response= await axios.post(`${URL}/login`,{
        username,password,expiresInMins:60
      })
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(addUser(response.data))
      return navigate("/feeds")
  } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-center'>
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body gap-12">
          <h2 className="card-title justify-center font-bold">Login</h2>
          <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Username</legend>
                <input type="mail" className="input" placeholder="Enter username" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
              </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" className="input" placeholder="Enter password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
    </div>
</div>
    </div>
  )
}

export default Login