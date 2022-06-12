import { useQuill } from "react-quilljs"
import { useState } from "react"
import React from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {register} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'

function Register(){

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [user, setUser] = useState("")


  function handleChangeP(event) {
      setPassword(event.target.value)
      console.log(event.target.value)
  }

  function handleChangeE(event) {
      setEmail(event.target.value)
      console.log(event.target.value)
  }

  function handleChangeU(event) {
      setUser(event.target.value)
      console.log(event.target.value)
  }
  const navigate = useNavigate();
    function onSubmit (e) {
        e.preventDefault()

        const newUser = {
            usuario: user,
            email: email,
            password: password
        }

        register(newUser).then(res => {
            navigate('/login');

        })
    }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Registro de cuenta</h1>
                            <div className="form-group">
                                <label htmlFor="first_name">Usuario</label>
                                <input type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Introduce tu usuario"
                                    onChange={handleChangeU} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Dirección de email</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Introduce tu email"
                                    onChange={handleChangeE} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Introduce tu contraseña"
                                    onChange={handleChangeP} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Registrate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )

}

export default Register
