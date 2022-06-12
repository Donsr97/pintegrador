import { useQuill } from "react-quilljs"
import { useState } from "react"
import React from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {getCuad, newCuad, hist,login} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'

function NewStory() {
    const navigate = useNavigate();



    var lst = {};

    var olawas = 1234567;
    const funcionx = (index) => {
      var vars = [];
      var arr = []
      console.log(vars)
      for (var i = 0; i < serviceList.length; i++) {
        vars.push(serviceList[i]["service"]);
        console.log(vars[i])
        arr[vars[i]] = 0
      }
      var items = {
        "titulo" : title,
        "userid" :  "itwjeirojt45345t354kt345kl45jtkl453lkt345",
        "descripcion" :  "dummy[4]",
        "valvar" :  arr,
        "nombrevar" :  "serviceList",
        "firstnode" :  "d123123sfñdasflñsdafg123lñsdfglñsdfg"
      };
      console.log(items);
      lst = arr;
      navigate('/new',{state:lst});
      hist(items)
    };


    const handleServiceRemove = (index) => {
      const list = [...serviceList];
      list.splice(index, 1);
      setServiceList(list);
      console.log(serviceList)
    };

    const handleServiceAdd = () => {
      setServiceList([...serviceList, { service: "" }]);
    };
    const [serviceList, setServiceList] = useState("");
    const [title, setTitle] = useState("")
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
        }
    })
    function handleChange(event) {
        setTitle(event.target.value)
    }

    function handleChangeS(event) {
        setServiceList(event.target.value)
        console.log(event.target.value)
    }
    function hablame(){
      console.log(title,serviceList)
    }
    const [ updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function subm(e)
      {
        localStorage.setItem("reloader",true)
        e.preventDefault()
          const user = {
              usuario: title,
              password: serviceList,
          }

          login(user).then(res => {
             if (res != 0) {
               var items = {
                 state:res,
                 rel:1
               }
                  navigate('/view',items);
                  window.location.reload()
              }
              else {
                console.log("Usuario o contraseña invalidos")
             }
          })
      }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                      <form noValidate onSubmit={subm}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario</label>
                            <input type="usuario"
                                className="form-control"
                                name="usuario"
                                placeholder="Enter usuario"
                                onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña </label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                onChange={handleChangeS} />
                        </div>

                        <button onClick={forceUpdate} type="submit" className="btn btn-lg btn-primary btn-block">
                            Sign in
                        </button>
                        </form>

                </div>
            </div>
        </div>
    );

  }

export default NewStory
