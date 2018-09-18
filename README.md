# IndexedDB Wrapper

## About
This wrapper provides a uniform way to interact with an IndexedDB. As the user
you are required to know the specifics of your databases, and pass those pieces
of information to these methods when you need to access information.

## Usage
Each of the following methods can be accessed by inserting the appropriate
information as parameters to the function call.

### itemDB.open()
This function opens one database with one datastore.

#### Parameters:
* databaseName - Name of the database.
* version - The version of the dataStore in the database.
* datastoreName - Name of the dataStore
* key_path - The property that uniquely identifies the records.
* indices - a list of properties that allow searching through records.
* callback - where to go once it's done.

### itemDB.createItem()
This function saves a single record to a specified database.

#### Parameters:
* datastoreName - Name of the dataStore
* item - a JSON object to be saved to the database.
* callback - where to go once it's done.

### itemDB.find()
This function returns a single record that matches the query.

#### Parameters:
* datastoreName - Name of the dataStore
* property - the property the query is matching
* value - the value to be matched by the query.
* callback - where to go once it's done. Returns the record in the parameter.

### itemDB.fetchAll()
This function returns an array containing all the records in a database.

#### Parameters:
* datastoreName - Name of the dataStore
* callback - where to go once it's done. returns an array of the records in the parameter.

### itemDB.updateItem()
This function updates a single record using the key_path.

#### Parameters:
* datastoreName - Name of the dataStore
* key_path - The property to query by.
* key - the value to match the query.
* item - the JSON object to replace.
* callback - where to go once it's done.

### itemDB.deleteItem()
This function deletes a single record from a database.

#### Parameters
* datastoreName - Name of the dataStore
* key - the value to match the query.
* callback - where to go once it's done.
