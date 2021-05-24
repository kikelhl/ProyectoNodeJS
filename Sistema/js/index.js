
function login(){
    var usuario= document.getElementById('lUsuario').value;
    var pass= document.getElementById('lPassword').value;
    alert("usuario> " + usuario);

}

function registrar(){
    var usuario= document.getElementById('rUsuario').value;
    var pass= document.getElementById('rPassword').value;
    var mail= document.getElementById('rEmail').value;
    
    alert("usuario> " + usuario +"\n password " + pass + "\n email " + mail);

    document.getElementById('rUsuario').value="";
    document.getElementById('rPassword').value="";
    mail= document.getElementById('rEmail').value="";
}
 