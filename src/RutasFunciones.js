import axios from 'axios'

export const register = newUser => {
    return axios
        .post("http://127.0.0.1:5000/users/register", {
            usuario: newUser.usuario,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post("http://127.0.0.1:5000/users/login", {
            usuario: user.usuario,
            password: user.password
        })
        .then(response => {
            if(response.data.result) {return response.data.result}
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
          console.log("aaaaaaaaaaaaaaaaaaaa")
          console.log(err)
        })
}

export const hist = newHist => {
    return axios
        .post("http://127.0.0.1:5000/hist", {
            userid: newHist.userid,
            titulo: newHist.titulo,
            descripcion: newHist.descripcion,
            valvar: newHist.valvar,
            nombrevar: newHist.nombrevar,
            firstnode: newHist.firstnode
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateHist = (newHist) => {
    return axios
        .put(`http://127.0.0.1:5000/hist`, {
            userid: newHist.userid,
            "_id": newHist["_id"],
            titulo: newHist.titulo,
            descripcion: newHist.descripcion,
            valvar: newHist.valvar,
            nombrevar: newHist.nombrevar,
            firstnode: newHist.firstnode
        })
        .then(response => {
            console.log("historia updateada")
        })
        .catch(err => {
            console.log(err)
        })
}



export const newCuad = newCuadro => {
    return axios
        .post("http://127.0.0.1:5000/cuadro", {
            histid: newCuadro.histid,
            titulo: newCuadro.titulo,
            fathernode: newCuadro.fathernode,
            text: newCuadro.text,
            KeyVals: newCuadro.KeyVals,
            DecisionVals: newCuadro.DecisionVals,
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateCuad = (newCuadro) => {
    return axios
        .put(`http://127.0.0.1:5000/cuadro`, {
            "_id": newCuadro["_id"],
            histid: newCuadro.histid,
            titulo: newCuadro.titulo,
            fathernode: newCuadro.fathernode,
            text: newCuadro.text,
            KeyVals: newCuadro.KeyVals,
            DecisionVals: newCuadro.DecisionVals,
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}




export const getCuad = getCuadro => {
    return axios
        .get(`http://127.0.0.1:5000/cuadro`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({"id":val._id, "histid":val.histid, "titulo":val.titulo, "fathernode":val.fathernode, "text":val.text, "KeyVals":val.KeyVals, "DecisionVals":val.DecisionVals})
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCuadsID = (id) => {
    return axios
        .get(`http://127.0.0.1:5000/cuadro/${id}`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({"id":val._id, "histid":val.histid, "titulo":val.titulo, "fathernode":val.fathernode, "text":val.text, "KeyVals":val.KeyVals, "DecisionVals":val.DecisionVals})
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCuadID = (id) => {
    return axios
        .get(`http://127.0.0.1:5000/cuadro/x/${id}`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({"id":val._id, "histid":val.histid, "titulo":val.titulo, "fathernode":val.fathernode, "text":val.text, "KeyVals":val.KeyVals, "DecisionVals":val.DecisionVals})
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}


export const getHist = () => {
    return axios
        .get(`http://127.0.0.1:5000/hist`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({"id":val._id, "titulo":val.titulo, "descripcion":val.descripcion, "valvar": val.valvar, "nombrevar":val.nombrevar, "firstnode": val.firstnode})
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getHistbyID = (id) => {
    return axios
        .get(`http://127.0.0.1:5000/hist/${id}`, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({"id":val._id, "titulo":val.titulo, "descripcion":val.descripcion, "valvar": val.valvar, "nombrevar":val.nombrevar, "firstnode": val.firstnode})
            })

            return data
        })
        .catch(err => {
            console.log(err)
        })
}
