let i = 1;
let dataStoreInc = "acronyms";

window.onload = () => {
  itemDB.delete("Acronyms", () => {
    itemDB.open("Acronyms", i++, dataStoreInc, "acronym", ["acronym", "definition"], imDone);
  });
  //console.log("opened acronyms");
  itemDB.delete("Departments", () => {
    itemDB.open("Departments", 1, "departments", "name", ["name", "building", "acronym"], imDone);
  });
  //console.log("opened departments");
}

//console.log("Creating acronym objects.");
let acrnm1 = {
  "acronym": "LOTR",
  "definition": "Lord of the Rings"
};
let acrnm2 = {
  "acronym": "GOT",
  "definition": "Game of Thrones"
};
let acrnm3 = {
  "acronym": "LOL",
  "definition": "Laugh Out Loud"
};

function imDone(test) {
  console.log(test + " Test Concluded.");
}

function jsonDone(test) {
  console.log(JSON.stringify(test) + " Test Concluded.");
}

let acrnmTestCreate = document.getElementById('acronymForm1');
let acrnmTestUpdate = document.getElementById('acronymForm2');
let acrnmTestFind = document.getElementById('acronymForm3');
let acrnmTestDelete = document.getElementById('acronymForm4');
let acrnmTestFindAll = document.getElementById('acronymForm5');

acrnmTestCreate.onsubmit = () => {
  //create a few acronym items.
  console.log("1st test.");
  itemDB.createItem(dataStoreInc, acrnm1, imDone);
  itemDB.createItem(dataStoreInc, acrnm2, imDone);
  itemDB.createItem(dataStoreInc, acrnm3, imDone);

  return false;
}

acrnmTestUpdate.onsubmit = () => {
  //update an acronym item.
  console.log("2nd test.");
  acrnm3.definition = "League of Legends"
  itemDB.updateItem(dataStoreInc, "acronym", acrnm3.acronym, acrnm3, imDone);

  return false;
};

acrnmTestFind.onsubmit = () => {
  console.log("3rd test.");
  itemDB.find(dataStoreInc, "definition", "Lord of the Rings", jsonDone);

  return false;
};

acrnmTestDelete.onsubmit = () => {
  console.log("4th test.");
  itemDB.deleteItem(dataStoreInc, "GOT", imDone);

  return false;
};

acrnmTestFindAll.onsubmit = () => {
  console.log("5th test.");
  itemDB.fetchAll(dataStoreInc, jsonDone);

  return false;
};

let dept1 = {
  "name": "Software Maintenance Group",
  "building": 15,
  "acronym": "SMXS"
};

let dept2 = {
  "name": "Electronics Maintenance Group",
  "building": 1010,
  "acronym": "EMXG"
};

let dept3 = {
  "name": "Aircraft Maintenance Group",
  "building": 400,
  "acronym": "AMXG"
};

let dptTestCreate = document.getElementById('dptForm1');
let dptTestFind = document.getElementById('dptForm2');
let dptTestUpdate = document.getElementById('dptForm3');
let dptTestDelete = document.getElementById('dptForm4');
let dptTestFetchAll = document.getElementById('dptForm5');

dptTestCreate.onsubmit = () => {
  console.log("Department Create Test...");
  itemDB.createItem('departments', dept1, imDone);
  itemDB.createItem('departments', dept2, imDone);
  itemDB.createItem('departments', dept3, imDone);

  return false;
};

dptTestFind.onsubmit = () => {
  console.log("Department Find Test...");
  itemDB.find('departments', 'building', 1010, jsonDone);
  itemDB.find('departments', 'acronym', 'AMXG', jsonDone);

  return false;
};

dptTestUpdate.onsubmit = () => {
  console.log("Department Update Test...");
  dept1.acronym = "SMXG";
  dept2.building = 850;
  itemDB.updateItem('departments', "name", dept1.name, dept1, imDone);
  itemDB.updateItem('departments', "name", dept2.name, dept2, imDone);

  return false;
};

dptTestDelete.onsubmit = () => {
  console.log("Department Delete Test...");
  itemDB.deleteItem('departments', "Aircraft Maintenance Group", imDone);

  return false;
};

dptTestFetchAll.onsubmit = () => {
  console.log("Department Fetch All Test...");
  itemDB.fetchAll('departments', jsonDone);

  return false;
};

let combineCreate = document.getElementById('combineForm1');
let combineFind = document.getElementById('combineForm2');
let combineUpdate = document.getElementById('combineForm3');
let combineDelete = document.getElementById('combineForm4');
let combineFetchAll = document.getElementById('combineForm5');

let acrnm4 = {
  "acronym": "TM",
  "definition": "The Matrix"
};
let dept4 = {
  "name": "Maintenance Support Group",
  "building": 700,
  "acronym": "MXSG"
};

combineCreate.onsubmit = () => {
  console.log("Concurrent Creation test...");
  itemDB.createItem(dataStoreInc, acrnm4, imDone);
  itemDB.createItem('departments', dept4, imDone);

  return false;
}

combineFind.onsubmit = () => {
  console.log("Concurrent find test...");
  itemDB.find(dataStoreInc, "definition", "The Matrix", jsonDone);
  itemDB.find('departments', 'acronym', "MXSG", jsonDone);
  return false;
}

combineUpdate.onsubmit = () => {
  console.log("Concurrent Update test...");
  dept4.building = 550;
  acrnm4.definition = "The Mummy"

  itemDB.updateItem('departments', "name", dept4.name, dept4, imDone);
  itemDB.updateItem(dataStoreInc, "acronym", acrnm4.acronym, acrnm4, imDone);

  return false;
}

combineDelete.onsubmit = () => {
  console.log("Concurrent Delete test...");
  itemDB.deleteItem('departments', "Software Maintenance Group", imDone);
  itemDB.deleteItem(dataStoreInc, "LOTR", imDone);

  return false;
}

combineFetchAll.onsubmit = () => {
  console.log("Concurrent Fetch All test...");
  itemDB.fetchAll('departments', jsonDone);
  itemDB.fetchAll(dataStoreInc, jsonDone);

  return false;
}

//TEST the version incrementation of itemDB.open();
let incrementV = document.getElementById('incVers');

incrementV.onsubmit = () => {
  console.log("Increment Database Version Test...");
  itemDB.close("Acronyms", () => {
    if (i % 2 === 0) {
      itemDB.open("Acronyms", i++, "acronyms", "acronym", ["acronym", "definition", "genre"], imDone);
    } else {
      itemDB.open("Acronyms", i++, "acronyms", "acronym", ["acronym", "definition"], imDone);
    }
    console.log("acronyms Database version: " + (i - 1));
  });

  return false;
};
