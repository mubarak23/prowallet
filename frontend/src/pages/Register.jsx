import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import { toast } from 'react-toastify'

function Register() {
  const [registerData, setRegister ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const {name, password, email, password2} = registerData
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isSuccess, isError, message} = useSelector(state => state.auth)

     useEffect(() => {
    if(isError){
      toast.error(message)
    }
    //Redirect if Login
    if(isSuccess && user ){
      toast.success('User Registration was successful')
      navigate('/')
    }
    dispatch(reset())
   },[isSuccess, isError, message, user, dispatch, navigate])

    const onChange = (e) => {
     setRegister((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }

   const onSubmitHandler = (e) =>{
      e.preventDefault()
      const userRegisterData  = {
        name,
        email,
        password
      }
     dispatch(register(userRegisterData))
   }

  return (
        <div className="text-center">
      <h6 className="h3 mb-3 font-weight-normal">
        <FaSignInAlt /> Register
      </h6>
      <form onSubmit={onSubmitHandler} className="form-signin">
        <div className="form-group">
             <label htmlFor="name" className="sr-only">Name</label>
            <input type="text" id='name' className="form-control"
            value={name} name='name' onChange={onChange} 
            placeholder='Enter Your Name' required />
          </div>
           <div className="form-group">
             <label htmlFor="email" className="sr-only">Email Address</label>
            <input type="text" id='email' className="form-control"
            value={email} name='email' onChange={onChange} 
            placeholder='Enter Your email' required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id='password' className="form-control"
            value={password} onChange={onChange} name='password'
             placeholder='Enter Your Password' required />
          </div>
          <div className="form-group">
            <label htmlFor="password2" className="sr-only">Confirm Password</label>
            <input type="password" id='password2' className="form-control"
            value={password2} onChange={onChange} name='password2'
             placeholder='Confirm Password' required />
          </div>
          <div className="form-group">
            <button className="btn btn-success">Register</button>
          </div>
      </form>
    </div>
  )
}

export default Register