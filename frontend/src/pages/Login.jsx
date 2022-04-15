import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const {email, password } = loginData

  const onChange = (e) => {
     setLoginData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value
     }))
   }

   const onSubmitHandler = (e) =>{
      e.preventDefault()
      const userData  = {
        email,
        password
      }
      // dispatch(login(userData))
   }

  return (
    <div className="text-center">
      <h6 className="h3 mb-3 font-weight-normal">
        <FaSignInAlt /> Login
      </h6>
      <form onSubmit={onSubmitHandler} className="form-signin">
           <div className="form-group">
             <label htmlFor="email" class="sr-only">Email Address</label>
            <input type="text" id='email' className="form-control"
            value={email} name='email' onChange={onChange} 
            placeholder='Enter Your email' required />
          </div>
          <div className="form-group">
            <label htmlFor="password" class="sr-only">Password</label>
            <input type="password" id='password' className="form-control"
            value={password} onChange={onChange} name='password'
             placeholder='Enter Your Password' required />
          </div>
          <div className="form-group">
            <button className="btn btn-success">Login</button>
          </div>
      </form>
    </div>
  )
}

export default Login