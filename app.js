// Obtener referencia a la tabla del CRUD
const table = document.getElementById('crudTable');

// Obtener referencia a los campos de entrada de datos
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const priceInput = document.getElementById('price');
const cateInput = document.getElementById('cate');

// Cargar datos almacenados en el Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', loadStoredData);

// Función para agregar datos
function addData() {
  const name = nameInput.value;
  const date = dateInput.value;
  const price = priceInput.value;
  const category = cateInput.value;

  // Validar campos de entrada
  if (name === '' || date === '' || price === '' || category === '') {
    alertM('Por favor, complete todos los campos', "danger");
    return;
  }

  // Crear nueva fila en la tabla
  const newRow = document.createElement('tr');

  // Crear celdas para cada dato
  const nameCell = document.createElement('td');
  const dateCell = document.createElement('td');
  const priceCell = document.createElement('td');
  const cateCell = document.createElement('td');
  const actionsCell = document.createElement('td');

  // Establecer el contenido de las celdas
  nameCell.textContent = name;
  dateCell.textContent = date;
  priceCell.textContent = price;
  cateCell.textContent = category;

  // Agregar botones de acciones (eliminar y editar)
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mr-1');
  deleteButton.addEventListener('click', deleteData);

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.classList.add('btn', 'btn-primary', 'btn-sm');
  editButton.addEventListener('click', editData);

  actionsCell.appendChild(deleteButton);
  actionsCell.appendChild(editButton);

  // Agregar celdas a la fila
  newRow.appendChild(nameCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(cateCell);
  newRow.appendChild(actionsCell);

  // Agregar fila a la tabla
  table.appendChild(newRow);

  // Limpiar campos de entrada
  clearInputFields();

  // Guardar datos en el Local Storage
  saveDataToLocalStorage();
  alertM("Producto creado o actualizado correctamente", "success")
}

// Función para eliminar datos
function deleteData(event) {
  const row = event.target.parentNode.parentNode;
  table.removeChild(row);

  // Guardar datos actualizados en el Local Storage
  alertM("Producto eliminado correctamente", "danger")
  saveDataToLocalStorage();
}

// Función para editar datos
function editData(event) {
  const row = event.target.parentNode.parentNode;
  const nameCell = row.cells[0];
  const dateCell = row.cells[1];
  const priceCell = row.cells[2];
  const cateCell = row.cells[3];

  // Obtener los valores actuales
  const name = nameCell.textContent;
  const date = dateCell.textContent;
  const price = priceCell.textContent;
  const category = cateCell.textContent;

  // Establecer los valores actuales en los campos de entrada
  nameInput.value = name;
  dateInput.value = date;
  priceInput.value = price;
  cateInput.value = category;

  // Eliminar la fila actual
  table.removeChild(row);

  // Guardar datos actualizados en el Local Storage
  saveDataToLocalStorage();
}



// Función para buscar datos
function searchData() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = table.getElementsByTagName('tr');
  
    // Recorrer las filas de la tabla y mostrar u ocultar según la búsqueda
    for (let i = 1; i < rows.length; i++) {
      const nameCell = rows[i].cells[0];
      const priceCell = rows[i].cells[2];
      const cateCell = rows[i].cells[3];
      const dateCell = rows[i].cells[1];
  
      const name = nameCell.textContent.toLowerCase();
      const price = priceCell.textContent;
      const category = cateCell.textContent.toLowerCase();
      const date = dateCell.textContent;
  
      let match = false;
  
      // Búsqueda por nombre
      if (name.includes(searchValue)) {
        match = true;
      }
  
      // Búsqueda por precio (incluyendo valores iguales)
      if (price === searchValue) {
        match = true;
      }
  
      // Búsqueda por categoría
      if (category.includes(searchValue)) {
        match = true;
      }
  
      // Búsqueda por fecha de venta
      if (date === searchValue) {
        match = true;
      }
  
      if (match) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
  
// Función para limpiar los campos de entrada
function clearInputFields() {
  nameInput.value = '';
  dateInput.value = '';
  priceInput.value = '';
  cateInput.value = '';
}

// Función para guardar datos en el Local Storage
function saveDataToLocalStorage() {
  const rows = table.getElementsByTagName('tr');
  const data = [];

  // Recorrer las filas de la tabla y guardar los datos en un arreglo
  for (let i = 1; i < rows.length; i++) {
    const name = rows[i].cells[0].textContent;
    const date = rows[i].cells[1].textContent;
    const price = rows[i].cells[2].textContent;
    const category = rows[i].cells[3].textContent;

    data.push({
      name,
      date,
      price,
      category,
    });
  }

  // Convertir el arreglo a JSON y guardar en el Local Storage
  localStorage.setItem('crudData', JSON.stringify(data));
}

// Función para cargar datos almacenados en el Local Storage
function loadStoredData() {
  const storedData = localStorage.getItem('crudData');

  if (storedData) {
    const data = JSON.parse(storedData);

    // Crear filas y celdas para cada dato almacenado
    for (let i = 0; i < data.length; i++) {
      const newRow = document.createElement('tr');
      const nameCell = document.createElement('td');
      const dateCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const cateCell = document.createElement('td');
      const actionsCell = document.createElement('td');

      nameCell.textContent = data[i].name;
      dateCell.textContent = data[i].date;
      priceCell.textContent = data[i].price;
      cateCell.textContent = data[i].category;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mr-1');
      deleteButton.addEventListener('click', deleteData);

      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.classList.add('btn', 'btn-primary', 'btn-sm');
      editButton.addEventListener('click', editData);

      actionsCell.appendChild(deleteButton);
      actionsCell.appendChild(editButton);

      newRow.appendChild(nameCell);
      newRow.appendChild(dateCell);
      newRow.appendChild(priceCell);
      newRow.appendChild(cateCell);
      newRow.appendChild(actionsCell);

      table.appendChild(newRow);
    }
  }
}
//FUNCION PARA MOSTRAR ALERTAS
function alertM(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    //MOSTRAR EN EL DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    //INSERTAR EL MENSAJE
    container.insertBefore(div, app);

    //REMOVER ALERTA LUEGO DE 4 SEGUNDOS
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 4000);
} 