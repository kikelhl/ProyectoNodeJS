
window.onload=init;

var url= "http://localhost:3000"
var headers={}

function init(){
    if(localStorage.getItem("token")){
        token=localStorage.getItem("token");
        headers={
            headers:{
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        obtenerDatos();
    }
    else{
        window.location.href="index.html"
    }
}
function login(){
    var usuario= document.getElementById('lUsuario').value;
    var pass= document.getElementById('lPassword').value;
    axios({
        method: 'post',
        url: url +'/administradores/login',
        data: {
            admin_email: usuario,
            admin_password: pass 
        }
        
    }).then(function(res){
        console.log(res.data);
        alert("Sesion Iniciada" + res.data);
        if(res.data.code===200){
            localStorage.setItem("token", res.data.message);
            window.location.href="usuarios.html"
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
        alert("FATAL ERROR! x_X ");
    })
    
}

function registrar(){
    var usuario= document.getElementById('rUsuario').value;
    var pass= document.getElementById('rPassword').value;
    var email= document.getElementById('rEmail').value;
    
    axios({
        method: 'post',
        url: url+ '/administradores/signin',
        data: {
            admin_email: email,
            admin_password: pass,
            admin_name: usuario 
        }
        
    }).then(function(res){
        console.log(res);
        alert("Registrao");
    }).catch(function(err){
        console.log(err);
        alert("Aqui 2");
    })

    document.getElementById('rUsuario').value="";
    document.getElementById('rPassword').value="";
    mail= document.getElementById('rEmail').value="";
}

function obtenerDatos(){
    alert(headers);
    console.log(headers);
    axios.get(url+ "/usuarios", headers)
    .then(function(res){
        console.log(res);
        displayUsuarios(res.data.message);

    }).catch(function(err){
        console.log(err);
    })
}

function displayUsuarios(usuario){
    var body=document.querySelector("table");
    contenido.innerHTML='';
    for(let valor of usuario){
        console.log(valor.name);
        contenido.innerHTML += `
        <table id=customers>    
            <tr>
                <td> ${valor.id} </td>
                <td> ${valor.name} </td>
                <td> ${valor.last_name} </td>
                <td>${valor.number} </td>
                <td> ${valor.email} </td>
                <td> ${valor.address} </td>
                <td> <button onclick='eliminar(${valor.id})'> Eliminar</button </td> 
            </tr>
        </table>
        `
    }
}

function eliminar(id){
    alert("Eliminando usuario : " + id + "\n url: " + url );
    console.log(headers);

    axios.delete(url+ "/usuarios/" + id, headers)
    .then(function(res){
        console.log(res);

    }).catch(function(err){
        console.log(err);
    })
}