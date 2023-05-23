
//FUNCION PARA VALIDAR LA DATA QUE LLEGA DEL FORMULARIO
function formData(){
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let price = document.getElementById("price").value;
    let cate = document.getElementById("cate").value;

    if(name == ""){
        alert("Nombre requerido");
        return false;
    }

    if(date == ""){
        alert("Fecha de vencimiento requerida");
        return false;
    }
    else if(price ==""){
        alert("Precio requerido");
        return false;
    }
    else if(cate==""){
        alert("Categoria requerida");
        return false;
    }

    return true;
}

//FUNCION PARA LAS ALERTAS
function alertM(msg,cssClass){
    const div=document.createElement("div");
    div.className="alert alert-" + cssClass
    div.appendChild(document.createTextNode(msg));
    //Show
    const container=document.querySelector('.container');
    const app=document.querySelectorAll("#App")
    container.insertBefore(div,app)
}
//FUNCION PARA VER LOS DATOS EN LA TABLA
function viewData(){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    let html = "";

    peopleList.forEach(function(element,index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.date + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.cate + "</td>";
        html += '<td><button onclick="deletData('+ index +')" class="btn btn-danger">Eliminar</button><button onclick="updateData('+ index +')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = viewData();