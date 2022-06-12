import React, { Component } from "react";
import {getCuad, newCuad, hist, getHist, getCuadsID} from  "../RutasFunciones"
import {Link, useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'

export default class StoriesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStories = this.retrieveStories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivehistoria = this.setActivehistoria.bind(this);
    this.removeAllStories = this.removeAllStories.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      SearchStories:[],
      Stories: [],
      currenthistoria: null,
      currentIndex: -1,
      searchTitle: "",
      id:"",
      usuario:"",
      reload:false
    };
  }




   refreshPage = () => {
     this.setState(
       {reload: true},
       () => this.setState({reload: false})
     )
   }
  componentDidMount() {
    this.retrieveStories();
    const token = localStorage.usertoken
    console.log(jwt_decode(token))
    const decoded = jwt_decode(token)

    this.setState({
        first_name: decoded.sub.usuario,
        email: decoded.sub.email
    })

  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    console.log(searchTitle)
    this.setState({
      searchTitle: searchTitle,
      SearchStories: this.state.Stories.filter(hist => hist.titulo.toUpperCase().includes(searchTitle.toUpperCase()))
    });
    console.log(this.state.Stories.filter(hist => hist.titulo.toUpperCase().includes(searchTitle.toUpperCase())))
  }

  retrieveStories() {
    getHist().then(response => {
        this.setState({
          Stories: response,
          SearchStories: response
        });
      })
      .catch(e => {
        console.log(e);
      });

  }

  refreshList() {
    this.retrieveStories();
    this.setState({
      currenthistoria: null,
      currentIndex: -1
    });

  }

  setActivehistoria(historia, index) {
    localStorage.setItem("histid",historia.id)
    localStorage.setItem("hist",historia)
    console.log(localStorage.getItem("histid"))
    localStorage.setItem("hist", JSON.stringify(historia));

    this.setState({
      currenthistoria: historia,
      currentIndex: index
    });
  }

  removeAllStories() {

  }

  searchTitle() {
    this.setState({
      currenthistoria: null,
      currentIndex: -1
    });


  }

lol(){
  const Toast = Swal.mixin({
    title: "Guía rápida para el usuario",
    toast:true,
    text: "Aquí podras ver tus historias escritas. Selecciona una para comenza a editarla, leerla o ver el mapa de los capítulos.",
    showConfirmButton: true,
  })

  Toast.fire({
  })
  }

  morir(event){
    var x = []
    getCuad().then(response => {

           for (var i = 0; i < response.length; i++) {
             x.push(response[i].titulo)
           }
           localStorage.setItem("editar",x)

           console.log(x)
           })
           .catch(e => {
             console.log(e);
           });

    localStorage.setItem("titulo",this.state.currenthistoria.titulo)
    localStorage.deleteItem("editar")
    console.log(localStorage.getItem("editar"))
    console.log(  localStorage.getItem("titulo"))

  }

  render() {
    const { searchTitle, SearchStories, currenthistoria, currentIndex } = this.state;

    return (

      <div className="list row" style={{margin: "auto", width: 1500, padding: 100}}>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{paddingRight: 10}}>
          <h4>Lista de historias</h4>

          <ul className="list-group">
            {SearchStories &&
              SearchStories.map((historia, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => this.setActivehistoria(historia, index)}
                  key={index}
                >
                  {historia.titulo}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currenthistoria ? (
            <div>
              <h4>Historia</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currenthistoria.titulo}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currenthistoria.descripcion}
              </div>
              <div>
              </div>

              <Link
                to={"/new"}
                onClick={this.morir.bind(this)}
                className="m-3 btn btn-sm btn-warning"
              >
                Editar
              </Link>
              <Link
                to={"/read"}
                className="m-3 btn btn-sm btn-success"
                style={{marginLeft:10}}
              >
                Leer
              </Link>
              <Link
                to={"/flow"}
                className="m-3 btn btn-sm btn-primary"
                style={{marginLeft:10}}
              >
                Ver mapa
              </Link>
            </div>
          ) : (
            <div>
              <br />
            </div>
          )}
        </div>
        <button type="button" onClick={()=>this.lol()} style={{margin:15}} class="btn btn-info">Info</button>
      </div>
    );
  }
}
