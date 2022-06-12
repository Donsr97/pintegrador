import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {getCuad, newCuad, hist, updateHist} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
function NewStory() {
    const navigate = useNavigate();



    var lst = {};
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    var olawas = 1234567;

    const funcionx = (index) => {
      var vars = [];
      var arr = {}
      console.log(vars)
      for (var i = 0; i < serviceList.length; i++) {
        arr[serviceList[i]["service"]] = 0;
        arr["~"+serviceList[i]["service"]] = 0;

      }
      console.log(arr)
      var items = {
        "titulo" : title,
        "userid" :  "itwjeirojt45345t354kt345kl45jtkl453lkt345",
        "descripcion" :  desc,
        "valvar" :  arr,
        "nombrevar" :  "serviceList",
        "firstnode" :  "d123123sfñdasflñsdafg123lñsdfglñsdfg"
      };
      console.log(items);
      lst = arr;



      const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: '¿Estás seguro que quieres crear esta historia?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: '¡Vamos a escribir!',
  cancelButtonText: 'No, quiero cambiar algo',
  reverseButtons: true
}).then((result) => {


  if (result.isConfirmed) {
    console.log("asdlfkmasdklfmakldfmaskldfm")
    console.log(title.length)
    if (title.length == 0) {

      Swal.fire({
        icon: 'warning',
        title: 'Necesitas un título para tu historia!',
        showConfirmButton: false,
        timer: 1000
      })


    }else{
    console.log(title.length)
    Swal.fire({
      icon: 'success',
      title: '¡A escribir!',
      showConfirmButton: false,
      timer: 1000
    })
    hist(items).then(response => {
      localStorage.setItem("histid",response.result.id)
      console.log(response)
      var item = {
        histid: response.result.id,
        fathernode: "-",
        titulo: "",
        text:"",
        KeyVals:arr,
        DecisionVals:[]
      }
      console.log(item)
      newCuad(item).then(data =>{
        console.log(data.result)
        items["firstnode"] = data.result
        items["_id"] = response.result.id
        console.log(items)
        updateHist(items)
        localStorage.setItem("histid",response.result.id)
        localStorage.setItem("firstnode",data.result)
        localStorage.setItem("fathernode","-")
        localStorage.setItem("titulo",title)
        localStorage.setItem("capId","")
        navigate('/new',{state:lst});
      })

      })


  }
  } else if (result.dismiss === Swal.DismissReason.cancel) {

  }
})



    };

    const handleServiceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...serviceList];
      list[index][name] = value;
      setServiceList(list);
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

    const [title, setTitle] = useState("")
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
        }
    })
    function handleChange(event) {
        setTitle(event.target.value)

    }

    function lol(){
      const Toast = Swal.mixin({
        title: "Guía rápida para el usuario",
        toast:true,
        text: "¡Crea tu propia historia! Escribe el título, una descripción y agrega las variables con las que quieras avanzar en la historia.",
        showConfirmButton: true,
      })

      Toast.fire({
      })
      }

    const [desc, setDesc] = useState("")
    function handleChangeD(event) {
      console.log(desc)
        setDesc(event.target.value)

    }

    return (
        <><><>

          <div style={{paddingRight: 200,paddingLeft: 195,paddingTop: 20}}>
            <h1>Crea tu Historia</h1>
            <input  type="text" style={{PaddingRight: 500}} placeholder="Titulo" id="value" value={title} onChange={handleChange} className="form-control" /> <br />
            <form  style={{margin: "auto", paddingRight:600}} name="myForm" id="myForm" onSubmit="return validateForm()">
                <br />

            </form>
            <h3>Descripción</h3>
            <textarea onChange={handleChangeD} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>



        </><form className="App" autoComplete="off" >
                <div className="form-field " style={{marginTop: 10, paddingLeft: 195, paddingRight:700, display:"", }}>
                     <h3>Variables</h3>
                    {serviceList.map((singleService, index) => (
                        <div key={index} className="input-group-append">
                            <div className="first-division">
                                <input
                                    name="service"
                                    type="text"
                                    id="service"
                                    style={{marginRight: 149, marginTop:20}}
                                    placeholder="Variable"
                                    value={singleService.service}
                                    className="form-control"
                                    onChange={(e) => handleServiceChange(e, index)}
                                    required />
                                {serviceList.length - 1 === index && serviceList.length < 10 && (
                                    <button
                                        type="button"
                                        style={{marginTop:21}}
                                        onClick={handleServiceAdd}
                                        className="btn btn-dark "
                                    >
                                        <span>+</span>
                                    </button>
                                )}
                            </div>
                            <div className="second-division">
                                {serviceList.length !== 1 && (
                                    <button
                                        type="button"
                                        style={{marginTop:21}}
                                        onClick={() => handleServiceRemove(index)}
                                        className="btn btn-danger "
                                    >
                                        <span>X</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </form></>

            <a style={{margin: 96 ,paddingBottom: 300, display:"inline"}}></a>

            <button name="BotonContinuar" className="btn btn-warning" style={{marginTop: 70}} onClick={() => {funcionx();}}> Continuar </button>
            <button type="button" onClick={lol} style={{marginTop: 70, marginLeft: 15}}  class="btn btn-info">Info</button>
            </>

    );

  }

export default NewStory
