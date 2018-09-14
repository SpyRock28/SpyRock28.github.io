window.onload = () => {
  // TODO: App code goes here.
  employeeDB.open(refreshEmployees);
};

let newEmployeeForm = document.getElementById('new-employee-form');
let newName = document.getElementById('newName');
let newSupervisor = document.getElementById('newSupervisor');
let newPosition = document.getElementById('newPosition');

let editEmployeeForm = document.getElementById('edit-employee-form');
let editName = document.getElementById('editName');
let editSupervisor = document.getElementById('editSupervisor');
let editPosition = document.getElementById('editPosition');
let editId = "";

newEmployeeForm.onsubmit = () => {
  console.log("In new employee onSubmit...");
  if (newName.value.replace(/ /g, '') != ''){
    let newEmployee = {
      'name': newName.value,
      'supervisor': newSupervisor.value,
      'position': newPosition.value,
    };

    employeeDB.createEmployee(newEmployee, (employee) => {
      refreshEmployees();
    });
  }

  //reset input fields
  newName.value = '';
  newSupervisor.value = '';
  newPosition.value = '';

  //don't send the Form
  return false;
}

function updateForm(employee) {
  editName.value = employee.name;
  editSupervisor.value = employee.supervisor;
  editPosition.value = employee.position;

  newEmployeeForm.style.display = "none";
  editEmployeeForm.style.display = "block";
}

editEmployeeForm.onsubmit = () => {
  console.log("In edit employee onSubmit...");
  if (editName.value.replace(/ /g, '') != ''){
    let editEmployee = {
      'name': editName.value,
      'supervisor': editSupervisor.value,
      'position': editPosition.value,
      'timestamp' : editId
    };

    employeeDB.updateEmployee(editId, editEmployee, () => {
      refreshEmployees();
      newEmployeeForm.style.display = "block";
      editEmployeeForm.style.display = "none";
    });
  }

  //reset input fields
  newName.value = '';
  newSupervisor.value = '';
  newPosition.value = '';

  //don't send the Form
  return false;
}

function refreshEmployees() {
  console.log('In refreshEmployees...');
  employeeDB.fetchEmployees( (employees) => {
    let employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    for (let i = 0; i < employees.length; i++) {
      // read employees in alphabetical
      let employee = employees[i];

      let li = document.createElement('li');
      li.id = 'employee-' + employee.timestamp;

      let deleteButton = document.createElement('input');
      deleteButton.type = "button";
      deleteButton.className = "employee-checkbox";
      deleteButton.value = "Delete";
      deleteButton.setAttribute("data-id", employee.timestamp);

      let updateButton = document.createElement('input');
      updateButton.type = "button";
      updateButton.className = "employee-checkbox";
      updateButton.value = "Edit";
      updateButton.setAttribute("data-id", employee.timestamp);

      let span = document.createElement('span');
      span.innerHTML = "Name: " + employee.name + "</br>Supervisor: " + employee.supervisor
      + "</br>Position: " + employee.position + "</br>";

      li.appendChild(span);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);

      employeeList.appendChild(li);

      //setup event listener for the checkboxes
      deleteButton.addEventListener('click', (e) => {
        let id = parseInt(e.target.getAttribute('data-id'));

        employeeDB.deleteEmployee(id, refreshEmployees);
      });
      updateButton.addEventListener('click', (e) => {
        editId = parseInt(e.target.getAttribute('data-id'));
        updateForm(employee);
      });
    }

  });
}
