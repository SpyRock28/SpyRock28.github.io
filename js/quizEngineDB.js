var quizEngineDB = ( function() {
  var iDB = {};
  let database;
  var datastores = [];
  // let quizColumns = ["Subject", "Topic", "Question", "Answers", "CorrectAnswers", "Justifications"];
  let isOpen = false;

  iDB.openDB = function(databaseName, version, questionDatastores, columns, cb) {
    let request = indexedDB.open(databaseName, version);

    request.onupgradeneeded = (e) => {
      console.log("in onupgradeneeded");

      var db = e.target.result;

      e.target.transaction.onerror = iDB.onerror;
      //save local data for repopulation.

      questionDatastores.forEach( (name) => {
        maintainDatastore(name, db, columns, true);
      })
    }

    request.onsuccess = (e) => {
      database = e.target.result;
      isOpen = true;
      cb(request.result);
    };

    request.onerror = (e) => {
      console.log("ERROR: " + iDB.onerror);
    };
  };

  function maintainDatastore(name, db, columns, useAutoIncrement) {

     // Delete the old datastore.
     if (db.objectStoreNames.contains(name)) {
      db.deleteObjectStore(name);
    }
    datastores[name] = name;

    // Create a new datastore.
    if(useAutoIncrement){
      var store = db.createObjectStore(name, {
        keyPath: "id",
        autoIncrement: true
      });
    }
    else{
      var store = db.createObjectStore(name, {
        keyPath: key_path
      });
    }

    console.log("In onupgradeneeded...");
    columns.forEach( (prop) => {
      store.createIndex(prop, prop, { unique: false});
    });
  }



 /**
 * Open a connection to the datastore.
 * Parameters:
 * databaseName - string name of the database.
 * datastoreName - string name of the datastore in the database.
 * key_path - the property of the object which uniquely identifies the entry.
 * indices - a string array of properties the datastore will contain.
 * callback - function to call once the database has been opened.
 */
  iDB.open = function(databaseName, version, datastoreName, key_path, indices, useAutoIncrement,callback) {
    // Open a connection to the datastore.
    //console.log("version: " + version);
    var request = indexedDB.open(databaseName, version);

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;

      e.target.transaction.onerror = iDB.onerror;
      //save local data for repopulation.
      //

      // Delete the old datastore.
      if (db.objectStoreNames.contains(datastoreName)) {
        db.deleteObjectStore(datastoreName);
      }

      // Create a new datastore.
      if(useAutoIncrement){
        var store = db.createObjectStore(datastoreName, {
          keyPath: "id",
          autoIncrement: true
        });
      }
      else{
        var store = db.createObjectStore(datastoreName, {
          keyPath: key_path
        });
      }

      console.log("In onupgradeneeded...");
      indices.forEach( (prop) => {
        store.createIndex(prop, prop, { unique: false});
      });

      //repopulate
    };

    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      let db = e.target.result;

      datastores[datastoreName] = db;
      console.log(e.target.result);

      databases[databaseName] = request.result;

      checkUsageAndEstimate();
      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    request.onerror = iDB.onerror;
  };

  iDB.close = (databaseName, callback) => {
    databases[databaseName].close();

    callback('Database closed');
  };

  iDB.delete = (databaseName, callback) => {
    indexedDB.deleteDatabase(databaseName);

    callback();
  };

  /**
  * Opens a simple instance of the database with just the name and version
  */
   iDB.simpleOpen = function(databaseName, version, datastoreName, callback){
     // Open a connection to the datastore.
     console.log("version: " + version);
     var request = indexedDB.open(databaseName, version);

     // Handle successful datastore access.
     request.onsuccess = function(e) {
       // Get a reference to the DB.
       let db = e.target.result;

       datastores[datastoreName] = db;
       console.log(e.target.result);

       databases[databaseName] = request.result;

       checkUsageAndEstimate();
       callback();
     };

     // Handle errors when opening the datastore.
     request.onerror = iDB.onerror;
   };

   /**
   * Checks if a datastore exists in the database
   */
   iDB.databaseExists = function(databaseName, version, datastoreName, callback){
     var dbStoreExists = true;
     var request = indexedDB.open(databaseName, version);

     request.onupgradeneeded = function(e) {
       var db = e.target.result;

       // Delete the old datastore.
       if (!db.objectStoreNames.contains(datastoreName)) {
         dbStoreExists = false;
         db.close();
         indexedDB.deleteDatabase(databaseName);
       }
       else{
         e.target.transaction.abort();
       }
     };
    callback(dbStoreExists);
  };

  /**
  * Returns all database objects with the specific properties that match the
  * particular values.
  * Parameters:
  * datastoreName - string name of the datastore in the database.
  * property - the property of the object which we wish to search for.
  * value - the value of the object we wish to match.
  * callback - function to call once the database has been opened.
  */
  iDB.fetchAllByQuery = (datastoreName, property, value, callback) => {
      let db = database;
      let transaction = db.transaction([datastoreName], 'readwrite');
      let objStore = transaction.objectStore(datastoreName);

      let request = objStore.index(property).getAll(value);

      transaction.oncomplete = function(e) {
      callback(request.result);
    };
    transaction.onsuccess = function(e) {
      //console.log('Request successful...');
    };
    request.onerror = iDB.onerror;
  };

  /**
  * Finds the first record that matches the query
  * Parameters:
  * datastoreName - string name of the datastore in the database.
  * property - the property of the object which we wish to search for.
  * value - the value of the object we wish to match.
  * callback - function to call once the database has been opened.
  */
 iDB.fetchOneByIndex = function(datastoreName, property, value, callback) {
   let db = datastores[datastoreName];
   let transaction = db.transaction([datastoreName], 'readwrite');
   let objStore = transaction.objectStore(datastoreName);

   let request = objStore.index(property).get(value);

   transaction.oncomplete = function(e) {
     callback(request.result);
   };

   transaction.onsuccess = function(e) {
     //console.log('Request successful...');
   };

   request.onerror = iDB.onerror;
 };

  /**
 * Finds the first record that matches the query
 * Parameters:
 * datastoreName - string name of the datastore in the database.
 * key - the key of the object we wish to match to keyPath.
 * callback - function to call once the database has been opened.
 */
iDB.fetchOneByKey = function(datastoreName, key, callback) {
  let db = database;
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  let request = objStore.get(key);

  transaction.oncomplete = function(e) {
    callback(request.result);
  };

  transaction.onsuccess = function(e) {
    //console.log('Request successful...');
  };

  request.onerror = iDB.onerror;
};

/**
* Returns all records of a particular datastore
* Parameters:
* datastoreName - string name of the datastore in the database.
* callback - function to call once the database has been opened.
*/
iDB.fetchAll = (datastoreName, index, callback) => {
  let db = database;
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor();

  let items = [];
  cursorRequest.onsuccess = (event) => { // STILL NOT WORKING
    let cursor = event.target.result;

    if (!!cursor == false) {
      return;
    }

    items.push(cursor.value);
    //console.log("added to 'items' " + JSON.stringify(cursor.value));
    cursor.continue();
  };

  transaction.oncomplete = function(e) {
    // Execute the callback function.
    callback(items, index);
  };

  transaction.onerror = (e) => {
    console.log(e);
  }

  cursorRequest.onerror = iDB.onerror;
};

/**
* Create a new item.
* Parameters:
* datastoreName: string name of the datastore in the database.
* item - the JSON object to store.
* callback - function to call once the database has been opened.
*/
iDB.createItem = function(datastoreName, item, callback) {
  //console.log("In createItem of " + datastoreName + "...");
  // Get a reference to the db.
  var db = database;

  // Initiate a new transaction.
  var transaction = db.transaction([datastoreName], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore(datastoreName);

  // Create an object for the item and deep copy.
  var newItem = iterationCopy(item);

  // Create the datastore request.
  var request = objStore.put(newItem);

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    //console.log("creation successful...");
    callback("Create Item");
  };

  // Handle errors.
  request.onerror = iDB.onerror;
};

/**
* Delete an item.
* Parameters:
* datastoreName: string name of the datastore in the database.
* key - the key to identify the item to delete.
* callback - function to call once the database has been opened.
*/
iDB.deleteItem = function(datastoreName, key, callback) {
  var db = datastores[datastoreName];
  var transaction = db.transaction([datastoreName], 'readwrite');
  var objStore = transaction.objectStore(datastoreName);

  var request = objStore.delete(key);

  request.onsuccess = function(e) {
    callback("delete");
  }

  request.onerror = function(e) {
    console.log(e);
  }
};

iDB.deleteWithoutKey = function (databaseName, datastoreName, property, value, callback) {
  var db = datastores[datastoreName];
  var transaction = db.transaction([datastoreName], "readwrite");
  var store       = transaction.objectStore(datastoreName);
  var index       = store.index(property);
  var request     = index.openCursor(IDBKeyRange.only(value));

  request.onsuccess = function() {
    var cursor = request.result;

    if (cursor) {
        cursor.delete();
        cursor.continue();
    }
  };
  callback();
}

iDB.updateItemById = (datastoreName, id, item, callback) => {
  //console.log("updating item by ID");
  let db = datastores[datastoreName];
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  item.id = id;

  let request = objStore.put(item);

  request.onsuccess = () => {
    callback();
  };

  request.onerror = (e) => {
    console.log(e);
  };
};

/**
* Update Item.
* Parameters:
* datastoreName - The name of the datastore.
* key_path - the property representing the key.
* key - the key to identify the item to delete.
* item - The updated object to change in the database.
* callback - function to call once the database has been opened.
*/
iDB.updateItem = (datastoreName, key_path, key, item, callback) => {
  console.log("Updating item in '" + datastoreName + "'...");
  let db = datastores[datastoreName];
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  objStore.openCursor().onsuccess = (event) => {
    var cursor = event.target.result;
    if(cursor){
      if(cursor.value[key_path] === key){
        var request = cursor.update(item);
        request.onsuccess = () => {
          console.log('Update Successful');
          callback("Update");
        };
        request.onerror = (e) => {
          console.log(e);
        };
      }
      cursor.continue();
    }
  }
};


  // Export the iDB object.
  return iDB;
}());

/*
* Check Usage and Estimate - this function can determine how much free storage
* is left in the device and if there may be enough for the application to run.
*/
function checkUsageAndEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(({usage, quota}) => {
      //alert(`Using ${usage} out of ${quota} bytes.`);
      if (usage >= quota) {
        alert("Error! Not enough storage space to run application. Please free up some space and try again.");
      } else if (usage > (quota * .95)) {
        alert("Warning! May need to free up storage space for application!");
      }
    });
  }
}

/**
* Iteration Copy to ensure a deep copy of the JSON Object is created.
*/
function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}