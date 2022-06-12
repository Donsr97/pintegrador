import { useQuill } from "react-quilljs"
import { useState } from "react"
import toolbar from "../toolbar"
import "quill/dist/quill.snow.css"
import {getCuad, newCuad, hist, getCuadsID, getHistbyID} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Reacts, {useEffect } from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import * as React from 'react';
function Main() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [capitulos, setCapitulos] = useState([]);
  const [onscreen, setOnscreen] = useState({});
  const [hist, setHist] = useState({});
  const [vars, setVars] = useState({});
  var x =1;
  var lst = []


  const handleChangeV = (key, value) => {
      setVars({...vars, [key]: value});
  }

  useEffect(() => {
    getCuadsID(localStorage.getItem("histid")).then(data=>{
      setCapitulos(data)
      console.log(capitulos)
      setOnscreen(data[1])
    })
    getHistbyID(localStorage.getItem("histid")).then(data=>{
      console.log(data[0])
      setHist(data[0])
      setVars(data[0].valvar)
    })
    setValue(0)
  }, []);


useEffect(()=>{
  //output 'sidebar'
  //output user-side-bar close
},[value]);

useEffect(()=>{
},[vars]);
function ss(){
  console.log(onscreen)
  const Toast = Swal.mixin({
    title: onscreen.DecisionVals.dec1.text,
    toast:true,
    showConfirmButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
  })
  console.log("ssssss")
}

function bb(){
  const Toast = Swal.mixin({
    title: onscreen.DecisionVals.dec2.text,
    toast:true,
    showConfirmButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
  })
  console.log("ssssss")
}

function aa(){
  const Toast = Swal.mixin({
    title: onscreen.DecisionVals.dec3.text,
    toast:true,
    showConfirmButton: true,
  })

  Toast.fire({
  })
  console.log("ssssss")
}



  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  function allAreTrue(arr) {
    return arr.every(element => element === true);
  }

  const funcionx = () => {
    console.log(value)
    var vari = vars
    if (value == 1) {
      if (onscreen.DecisionVals.dec1.karma == '-1') {
        vari["~"+onscreen.DecisionVals.dec1.var] = vari["~"+onscreen.DecisionVals.dec1.var] + 1
      } else if (onscreen.DecisionVals.dec1.karma == '1') {
        vari[onscreen.DecisionVals.dec1.var] = vari[onscreen.DecisionVals.dec1.var] + 1
      }
    } else if (value == 2) {
      if (onscreen.DecisionVals.dec2.karma == '-1') {
        vari["~"+onscreen.DecisionVals.dec2.var] = vari["~"+onscreen.DecisionVals.dec2.var] + 1
      }else if (onscreen.DecisionVals.dec2.karma == '1') {
        vari[onscreen.DecisionVals.dec2.var] = vari[onscreen.DecisionVals.dec2.var] + 1
      }
    } else if (value == 3) {
      if (onscreen.DecisionVals.dec3.karma == '-1') {
        vari["~"+onscreen.DecisionVals.dec3.var] = vari["~"+onscreen.DecisionVals.dec3.var] + 1
      }else if (onscreen.DecisionVals.dec3.karma == '1') {
        vari[onscreen.DecisionVals.dec3.var] = vari[onscreen.DecisionVals.dec3.var] + 1

      }
    } else {
      const Toast = Swal.mixin({
        title: "Selecciona una opción!",
        toast:true,
        text: "Tienes que seleccionar una decisión para continuar!",
        showConfirmButton: true,
      })

      Toast.fire({
      })
      console.log("ssssss")
      return 0;
    }

    var filtrados = capitulos.filter(cap => cap.fathernode == onscreen.id)
    setVars(vari)
    console.log(filtrados)
    console.log(vari)
    for (var j = 0; j < filtrados.length; j++){

      var boolarr = []
      var misvals = Object.entries(filtrados[j].KeyVals)
      for (var i = 0; i < misvals.length; i++) {
        if (misvals[i][1] == 0) {
          boolarr.push(true)
        }else if(misvals[i][1] >= 2 && vari[misvals[i][0]] >= 2){
          boolarr.push(true)
        }else {
          console.log("yo fallé con: ")
          console.log(misvals[i][1])
          console.log(misvals[i][0])
          boolarr.push(false)
        }


      }
      console.log(filtrados[j])
      console.log(boolarr)
      if (allAreTrue(boolarr)){
        setOnscreen(filtrados[j])
        return 0;
      }
}
    console.log("capitulo no encontrado")
  };


  const funcionxs = () => {
    x--;
    console.log(x)
    if (x<0) {
      x = 0;
    }
    console.log(lista[x].text)
    const texto = document.getElementById("text");
    const descripcion = document.getElementById("desc");
    texto.innerHTML = lista[x].text;
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

  const [lista, setlista] = useState("")
  function handleChange(p) {
      setlista(p)
  }

function miconsolelog(){
}

    return (
        <>

            <h1  className="text-center" style={{paddingTop:30}}>{localStorage.getItem("titulo")}</h1>
            <h3 id="desc" class="text-center" style={{paddingTop:10}}>
            {onscreen.titulo}
            </h3>
            <div  id="text" class="text-center" style={{paddingTop:35, marginLeft:250, marginRight:250, marginBottom:100}}>
              <div dangerouslySetInnerHTML ={{ __html: onscreen.text }}/>

            </div >

            <div  style={{position:"fixed",left:0, bottom:0,width:2090,text_align:"center"}}>
            <BottomNavigation
            showLabels
            style={{backgroundColor:"#343a40"}}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            >
            <Button  onClick={() => {
                  ss();
              } } variant="contained"></Button>
            <BottomNavigationAction style={{color:"#54a9f7"}} onClick={ss} label="Decision1" icon={<FiberManualRecordIcon />} />
            <BottomNavigationAction style={{color:"#54a9f7"}} onClick={bb}  label="Decision2" icon={<FiberManualRecordIcon />} />
            <BottomNavigationAction style={{color:"#54a9f7"}} onClick={aa}  label="Decision3" icon={<FiberManualRecordIcon />} />
             <Button   onClick={() => {
                   funcionx();
                 //  window.location.assign("/new");
               } } variant="contained">></Button>
            </BottomNavigation>
            <button type="button" class="btn btn-info">Info</button>
            </div>
        </>
    )
}

export default Main
