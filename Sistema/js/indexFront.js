
function login(){
    var usuario= document.getElementById('lUsuario').value;
    var pass= document.getElementById('lPassword').value;
    

    axios({
        method: 'post',
        url: 'http://localhost:3000/administradores/login',
        data: {
            admin_email: usuario,
            admin_password: pass 
        }
        
    }).then(function(res){
        console.log(res);
        alert("Sesion Iniciada");
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
        url: 'http://localhost:3000/administradores/signin',
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
 