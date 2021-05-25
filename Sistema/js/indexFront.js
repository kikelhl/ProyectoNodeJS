var url= "http://localhost:3000"
var headers={}

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
        if(res.data.code===200){
            if (res.data.message == "Usuario Y/O contraseña incorrectos")
            {
                document.getElementById('lUsuario').value = "";
                document.getElementById('lPassword').value = "";
                alert("Usuario Y/O contraseña incorrectos");
            }
            else 
            {
                localStorage.setItem("token", res.data.message);
                window.location.href="usuarios.html"
            }
        }
        else{
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
        alert("FATAL ERROR! x_X \n Contacte a su proveedor de servicio...");
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
        alert("Registro exitoso");
    }).catch(function(err){
        console.log(err);
        alert("Error en el registro");
    })

    document.getElementById('rUsuario').value="";
    document.getElementById('rPassword').value="";
    mail= document.getElementById('rEmail').value="";
}

function obtenerDatos(){
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
        contenido.innerHTML += `
        <table id=usuarios>   
            <tr class="clickableRow">
                <td > ${valor.id}</td>
                <td> ${valor.name} </td>
                <td> ${valor.last_name} </td>
                <td>${valor.number} </td>
                <td> ${valor.email} </td>
                <td> ${valor.address} </td>
                <td> <button  class="btn-incredible" style="background:Orange" onclick='editar(${valor.id},"${valor.name}","${valor.last_name}", ${valor.number}, "${valor.email}", "${valor.address}")'> Editar</button>
                </td> 
                <td><button type="button" class="btn-incredible" onclick='eliminar(${valor.id})' style="background:red"> Eliminar </button> </td>
                
            </tr>
        </table>
        `
    }
    contenido.innerHTML += `
    <tr>
        <td scope="col"></td>
        <td scope="col"colspan="2"> <input type="text" id="nombreBuscar"  placeholder="Buscar..." > </th>
        <td scope="col"> <button class="btn-incredible"  style="background:blue; margin-top:1px;" id="busqueda" onclick='buscar()'> Buscar</button></th>
        <td scope="col"> </th>
        <td scope="col">  </th>
        <td scope="col"> </th>
        <td scope="col"  > </th>   
    </tr>
        `
}

function buscar(){
    nombre= document.getElementById("nombreBuscar").value;
	if (nombre == "")
	{
		window.location = "usuarios.html"
	}
	else
	{
	    axios.get(url+ "/usuarios/"+nombre, headers)
	    .then(function(res){
		console.log(res);
        	displayUsuarios(res.data.message);
		document.getElementById("busqueda").innerHTML = 'Regresar';
		document.getElementById("busqueda").innerHTML = 'Regresar';
		document.getElementById("busqueda").onClick = function(){window.location.href = "usuarios.html";};


	    }).catch(function(err){
		    alert("No econtrado");
		console.log(err);
    		})

	}
}


function eliminar(id){
    console.log(headers);

    axios.delete(url+ "/usuarios/" + id, headers)
    .then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
    location.reload();
}
function agregar(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var direccion = document.getElementById("direccion").value;
    var data ={name: nombre, last_name: apellido, number: telefono, email:email, address:direccion};
    axios.post(url+ "/usuarios/", data, headers)
    .then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
    location.reload();
}
function editar(id, nombre, apellido, telefono, email, direccion){
    console.log(nombre);
    contenido.innerHTML='';
    telefono= telefono.toString();
    document.getElementById("nombre").value= nombre;
    document.getElementById("apellido").value=apellido;
    document.getElementById("telefono").value = telefono;
    document.getElementById("email").value = email;
    document.getElementById("direccion").value = direccion;

    document.getElementById("cambios").innerHTML='Actualizar';
    document.getElementById("cambios").onclick=function(){
        nombre = document.getElementById("nombre").value;
        apellido = document.getElementById("apellido").value;
        telefono = document.getElementById("telefono").value;
        email = document.getElementById("email").value;
        direccion = document.getElementById("direccion").value;

    console.log(nombre);
        var data ={name: nombre, last_name:apellido, number: telefono, email:email, address:direccion};
        axios.put(url+ "/usuarios/"+id, data, headers)
        .then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
        location.reload();
    };
}
