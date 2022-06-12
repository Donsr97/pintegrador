import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {Link, useLocation} from 'react-router-dom'
import {getCuad, newCuad, hist, getHist, getCuadsID, updateCuad, getHistbyID, getCuadID} from  "../RutasFunciones"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Reacts, {useEffect } from 'react';
import Swal from 'sweetalert2'
import ButtonGroup from '@mui/material/ButtonGroup';


function New() {
  var buttons = [
  <Button id="uno" onClick={() => {
        swals1();
    } } key="one">Decision 1</Button>,
  <Button id="dos" onClick={() => {
        swals2();
    } } key="two">Decision 2</Button>,
  <Button id="tres" onClick={() => {
        swals3();
    } } key="three">Decision 3</Button>,
];

var botones = [
<Button id="uno" onClick={() => {
      swals1();
  } } key="one">Llave 1</Button>,
<Button id="dos" onClick={() => {
      swals2();
  } } key="two">Llave 2</Button>,
<Button id="tres" onClick={a } key="three">Llave 3</Button>,
];


    const location = useLocation();
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [vars, setVars] = useState([])
    const [keys, setKeys] = useState({})
    const [dec, setDec] = useState({dec1:{var:"", text:"...", karma:0},dec2:{var:"", text:"...", karma:0},dec3:{var:"", text:"...", karma:0}})
    const [capitulos, setCapitulos] = useState([""])
    const [capitulo, setCapitulo] = useState([""])
    const { quill, quillRef } = useQuill({
            modules: {
            toolbar: toolbar
        }
    })


const handleChangeD = (key, value) => {
    setDec({...dec, [key]: value});
    console.log(dec)
}
    function setActiveCapitulo(historia, index){
      Swal.fire({
        title: '¿Editar este capítulo??',
        text: "Tu progreso en el capítulo que estás editando se guardará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
          setCindex(index)
          console.log("-----------------")
          console.log(historia)
          guardar()
          getCuadID(historia.id).then(data =>{
            tryme(data[0].titulo )
            quill.root.innerHTML = "data[0].text"
            console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
            console.log(data[0])
            localStorage.setItem("firstnode", data[0].id)
            localStorage.setItem("fathernode", data[0].fathernode)
            console.log(data[0].text)
            quill.root.innerHTML = data[0].text
            localStorage.setItem("capId", "")
          })
        }
        })

    }

    function nuevoCap(){
      console.log("nuevo cap")
      var histid = localStorage.getItem("histid")
      console.log("yo soy el nodo padre: "+ localStorage.getItem("firstnode"))
      var item = {
        "_id" : localStorage.getItem("firstnode"),
        histid: histid,
        titulo: title,
        fathernode: localStorage.getItem("fathernode"),
        text: quill.root.innerHTML,
        KeyVals: keys,
        DecisionVals: dec
      }
      updateCuad(item).then(data=>{
        localStorage.setItem("fathernode", localStorage.getItem("firstnode"))
        var items = {
          histid: histid,
          titulo: "Nuevo Capitulo",
          fathernode: localStorage.getItem("fathernode"),
          text: "",
          KeyVals:keys,
          DecisionVals:[]
        }
        newCuad(items).then(data=>{
          console.log("ahora yo soy el nuevo nodo padre: "+ data.result)
          localStorage.setItem("firstnode", data.result)
          window.location.reload()
        })
      })
    //  window.location.reload()
    }

    function altCap(){
      console.log("nuevo cap alterno")
      var histid = localStorage.getItem("histid")
      console.log("yo soy el nodo padre: "+ localStorage.getItem("firstnode"))
      var item = {
        "_id" : localStorage.getItem("firstnode"),
        histid: histid,
        titulo: title,
        fathernode: localStorage.getItem("fathernode"),
        text: quill.root.innerHTML,
        KeyVals: keys,
        DecisionVals: dec
      }
      updateCuad(item).then(data=>{
        var items = {
          histid: histid,
          titulo: "Nuevo Capitulo",
          fathernode: localStorage.getItem("fathernode"),
          text:"",
          KeyVals:keys,
          DecisionVals:[]
        }
        newCuad(items).then(data=>{
          console.log("ahora yo soy el nuevo nodo padre: "+ data.result)
          localStorage.setItem("firstnode", data.result)
            window.location.reload()

        })
      })

    }
    const [isBusy, setBusy] = useState(true)
    const [cindex, setCindex] = useState(-1)

    useEffect( () => {
      var arr = [1,2,3,4,5,6,7,8]
      console.log("uwu")
      var aux = ""
      var auxx = ""

       getHistbyID(localStorage.getItem("histid")).then(data =>{

         console.log(data["0"])
         var s = Object.keys(data["0"]["valvar"])
         setVars(s)
         var keyvalores = {}
         vars.map((item) => (keyvalores[item] : 0 ))
         setKeys(data["0"]["valvar"])
         console.log(keyvalores)
         console.log("wwwwwwwwwwwwwwww")
         for (var i = 0; i < s.length; i++){
           if (!s[i].includes("~")) {
            aux = aux + '<option key='+s[i]+' value='+s[i]+'>'+s[i]+'</option>'
            auxx = auxx + '<h3 class="form-check-label" for="flexRadioDefault1">' + s[i] + '</h3>' + '<div>' + '</div>'
                       + ' <input class="form-check-input" name='+ "key-"+s[i]+' type="radio" name="flexRadioDefault" value="1">'
                       +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Positivo' + '</label>' + '<div>' + '</div>'
                       + ' <input class="form-check-input" name='+ "key-"+s[i]+' type="radio" name="flexRadioDefault" value="-1">'
                       +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Negativo' + '</label>'+ "<div>"+ "</div>"
                       + ' <input class="form-check-input" name='+ "key-"+s[i]+' type="radio" name="flexRadioDefault" value="0">'
                       +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Neutral' + '</label>'+ "<div>"+ "</div>"
           }
           localStorage.setItem("keyvals", auxx)
           localStorage.setItem("opciones", aux)

        }
     })


      handleChangeC(localStorage.getItem("editar"))
      getCuadsID(localStorage.getItem("histid")).then(data =>{
        setCapitulos(data)
        console.log(data)
        setBusy(false);
      })

    }, []);

    useEffect(()=>{
      console.log(title)
      if (!localStorage.getItem("capId").length == 0) {

        getCuadID(localStorage.getItem("capId")).then(data =>{


          tryme(data[0].titulo )
          quill.root.innerHTML = "data[0].text"
          console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
          console.log(data[0])
          localStorage.setItem("firstnode", data[0].id)
          localStorage.setItem("fathernode", data[0].fathernode)
          console.log(data[0].text)
          quill.root.innerHTML = data[0].text
          localStorage.setItem("capId", "")
        })
      }
    },[quill]);

    const MINUTE_MS = 360000;

    useEffect(() => {
      const interval = setInterval(() => {
        guardar()
      }, MINUTE_MS);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    function a(){
      console.log(capitulos)
    }
var lst = localStorage.getItem("editar")

    const swals1 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Desarrolla tu decisión',
        html:
          '<input id="text" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select class="form-select form-select-sm"  aria-label=".form-select-lg example" id="vars">' +
          '<option selected>Selecciona una variable</option>' +
          localStorage.getItem("opciones") +
          '</select>'+
          '<div class="form-check" >' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="1">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Positivo' + '</label>' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="-1"">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Negativo' + '</label>'
           + '</div>'
          ,
        focusConfirm: false,
        preConfirm: () => {
          return [

          ]
        }
      })

      if (formValues) {
        console.log(document.querySelector('input[name="karma"]:checked').value)
        console.log(document.getElementById("vars").value)
        console.log(document.getElementById("text").value)

        handleChangeD("dec1", {var:document.getElementById("vars").value, text:document.getElementById("text").value, karma:document.querySelector('input[name="karma"]:checked').value })
      }

      })()
    }



    const keyvars = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Desarrolla la decisión',
        html: localStorage.getItem("keyvals")
          ,
        focusConfirm: false,
        preConfirm: () => {
          return [


          ]
        }
      })

      if (formValues) {
        console.log(vars)
        var item = []
        var varsx = {}
        console.log(vars)
        vars.map((item) => (varsx[item] = 0 ) )
        for (var i = 0; i < vars.length/2; i++) {
          var xs = document.querySelector('input[name=' + "key-"+vars[i]+"]:checked").value
          if (xs == -1){
            varsx[vars[(vars.length/2)+i]] = 2;
            varsx[vars[i]] = 0;
          }else if(xs == 1){
            varsx[vars[i]] = 2;
            varsx[vars[(vars.length/2)+i]] = 0;
        }else {
            varsx[vars[(vars.length/2)+i]] = 0;
            varsx[vars[i]] = 0;
        }
      }

      setKeys(varsx)
      console.log(varsx)
    }

      })()
    }


function guardar(){
  var histid = localStorage.getItem("histid")
  var item = {
    "_id" : localStorage.getItem("firstnode"),
    histid: histid,
    titulo: title,
    fathernode: localStorage.getItem("fathernode"),
    text: quill.root.innerHTML,
    KeyVals: keys,
    DecisionVals: dec
  }
  updateCuad(item).then(data =>{
    console.log(data)
  })
}


    const swals2 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Desarrolla la decisión',
        html:
          '<input id="text" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select class="form-select form-select-sm"  aria-label=".form-select-lg example" id="vars">' +
          '<option selected>Selecciona una variable</option>' +
          localStorage.getItem("opciones") +
          '</select>'+
          '<div class="form-check" >' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="1">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Positivo' + '</label>' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="-1"">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Negativo' + '</label>'
           + '</div>'
          ,
        focusConfirm: false,
        preConfirm: () => {
          return [


          ]
        }
      })

      if (formValues) {
        console.log(document.querySelector('input[name="karma"]:checked').value)
        console.log(document.getElementById("vars").value)
        console.log(document.getElementById("text").value)
        handleChangeD("dec2", {var:document.getElementById("vars").value, text:document.getElementById("text").value, karma:document.querySelector('input[name="karma"]:checked').value })
      }

      })()
    }
    const swals3 = (t) => {
      (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Desarrolla tu decisión',
        html:
          '<input id="text" class="swal2-input">'+ "<a>"+ "</a>"+
          '<select class="form-select form-select-sm"  aria-label=".form-select-lg example" id="vars">' +
          '<option selected>Selecciona una variable</option>' +
          localStorage.getItem("opciones") +
          '</select>'+
          '<div class="form-check" >' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="1">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Positivo' + '</label>' + "<div>"+ "</div>"
           + ' <input class="form-check-input" name="karma" type="radio" name="flexRadioDefault" value="-1"">'
           +'<label class="form-check-label" for="flexRadioDefault1">' + 'Karma Negativo' + '</label>'
           + '</div>'
          ,
        focusConfirm: false,
        preConfirm: () => {
          return [

          ]
        }
      })

      if (formValues) {
        console.log(document.querySelector('input[name="karma"]:checked').value)
        console.log(document.getElementById("vars").value)
        console.log(document.getElementById("text").value)
        handleChangeD("dec3", {var:document.getElementById("vars").value, text:document.getElementById("text").value, karma:document.querySelector('input[name="karma"]:checked').value })
      }

      })()
    }

    const handleChangeDec = (event) => {
        setTitle(event.target.value)
        console.log(title)
    }
    const handleChange = (event) => {
        setTitle(event.target.value)
        console.log(title)
    }
    const handleChangeText = (event) => {
        setText(event.target.value)
        console.log(quill.innerHTML())
    }
    var ss = []
    function handleChangeC (p){
        setCapitulos(p)
        ss = p;
    }

    function tryme(x){
      setTitle(x)
    }
    function lol(){
      const Toast = Swal.mixin({
        title: "Guía rápida para el usuario",
        toast:true,
        text: "¡Hora de escribir los capítulos! Dale un título y contenido a tu capítulo. Usarás los botones de decisiones para ingresar un máximo de tres decisiones, cada decisión cuenta con un espacio para el dialogo/linea, la variable a la que afectará, y con que Karma va afectar. El botón de Valores llave te dejará escoger los valores con los que uno llega al capítulo que estás escribiendo. Usa los botones de Nuevo capítulo para crear un capitulo siguiente al que estas escribiendo, o el botón Capítulo Alterno para escribir una linea alterna con la que podrías llegar con otras variables llave. ",
        showConfirmButton: true,
      })

      Toast.fire({
      })
      }

    return (
        <>
        <div style={{marginLeft: 0, marginTop:50, marginRight:0 }} >
            <h1 >{localStorage.getItem("titulo")}</h1>
            <form >
                <label htmlFor="title" style={{ marginTop:20}} >Título del Capítulo</label>
                <div  style={{ marginRight:0, paddingRight:500, display:"block"}} >
                <input type="text" placeholder="titulo" id="value" onChange={handleChange} value={title} className="form-control" />
                </div>
                <div className="editor"  onChange={handleChangeText} style={{ marginTop:20, marginRight:100}}>
                    <div style={{ paddingBottom:0}} onChange={handleChangeText} ref={quillRef}>

                    </div>
                    <Button onClick={nuevoCap} style= {{marginLeft:0, marginTop:10}} variant="contained">Nuevo Capitulo</Button>

                    <Button onClick={altCap} style= {{marginLeft:10, marginTop:10}} variant="contained">Capitulo Alterno</Button>
                    <ButtonGroup  style= {{marginLeft:210, marginTop:10}}color="secondary" aria-label="large secondary button group">
                    {buttons}
                    </ButtonGroup>

                </div>


            </form>
            <button style={{ marginTop:20}} onClick={guardar} className="btn btn-outline-secondary">Guardar</button>
            <button onClick={keyvars} style={{ marginLeft:20, marginTop:20 }} className="btn btn-outline-secondary">Valores Llave</button>
            <div className="list row" style={{margin: "auto", width: 1500, padding: 100}}>
              <div className="col-md-8">
                <div className="input-group mb-3">
                <div className="col-md-6" style={{paddingRight: 10}}>
                  <h4>Lista de capitulos</h4>
                  { isBusy ?
                    <div> esperando </div> :
                  (<ul className="list-group">
                    {capitulos  ?   capitulos.map((capitulo,index) => (  <li onClick={() => setActiveCapitulo(capitulo, index)} key={index} className={ "list-group-item " + (index === cindex ? "active" : "")}  >{capitulo.titulo }  </li>  )) : [].map((capitulo) => (  <li  className={"list-group-item "}  >{capitulo.titulo }  </li>  ))}
                  </ul>)
                  }
                </div>
                </div>
              </div>



              </div>

              <button type="button" onClick={lol} class="btn btn-info">Info</button>
        </div>

        </>
    )
}

export default New
