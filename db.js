var employeeDB = ( function() {
  var eDB = {};
  var datastore = null;

  // TODO: Add methods for interacting with the database here.
  /**
 * Open a connection to the datastore.
 */
  eDB.open = function(callback) {
    // Database version.
    var version = 1;

    // Open a connection to the datastore.
    var request = indexedDB.open('employees', version);

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;

      e.target.transaction.onerror = eDB.onerror;

      // Delete the old datastore.
      if (db.objectStoreNames.contains('employee')) {
        db.deleteObjectStore('employee');
      }

      // Create a new datastore.
      var store = db.createObjectStore('employee', {
        keyPath: 'timestamp'
      });
    };

    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      datastore = e.target.result;

      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    request.onerror = eDB.onerror;
  };

  /**
 * Fetch all of the employees in the datastore.
 */
eDB.fetchEmployees = function(callback) {
  var db = datastore;
  var transaction = db.transaction(['employee'], 'readwrite');
  var objStore = transaction.objectStore('employee');

  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor(keyRange);

  var employees = [];

  transaction.oncomplete = function(e) {
    // Execute the callback function.
    callback(employees);
  };

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;

    if (!!result == false) {
      return;
    }

    employees.push(result.value);

    result.continue();
  };

  cursorRequest.onerror = eDB.onerror;
};

/**
* Create a new employee.
*/
eDB.createEmployee = function(employee, callback) {
  console.log("In createEmployee...");
  // Get a reference to the db.
  var db = datastore;

  // Initiate a new transaction.
  var transaction = db.transaction(['employee'], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore('employee');

// Create a timestamp for the todo item.
  let timestamp = new Date().getTime();

  // Create an object for the todo item.
  var newEmployee = {
    'name': employee.name,
    'supervisor': employee.supervisor,
    'position': employee.position,
    'timestamp': timestamp
  };

  // Create the datastore request.
  var request = objStore.put(newEmployee);

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    callback(newEmployee);
  };

  // Handle errors.
  request.onerror = eDB.onerror;
};

/**
* Delete an employee. "You're Fired!"
*/
eDB.deleteEmployee = function(id, callback) {
  var db = datastore;
  var transaction = db.transaction(['employee'], 'readwrite');
  var objStore = transaction.objectStore('employee');

  var request = objStore.delete(id);

  request.onsuccess = function(e) {
    callback();
  }

  request.onerror = function(e) {
    console.log(e);
  }
};

/**
* Update Employee.
*/
eDB.updateEmployee = (id, employee, callback) => {
  console.log("Updating Employee");
  let db = datastore;
  let transaction = db.transaction(['employee'], 'readwrite');
  let objStore = transaction.objectStore('employee');

  objStore.openCursor().onsuccess = (event) => {
    var cursor = event.target.result;
    if(cursor){
      if(cursor.value.timestamp === id){
        var request = cursor.update(employee);
        request.onsuccess = () => {
          console.log('Update Successful');
          callback();
        };
        request.onerror = (e) => {
          console.log(e);
        };
      }
      cursor.continue();
    }
  }
};

  // Export the eDB object.
  return eDB;
}());
