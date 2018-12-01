/* indexedDB setup for user information
  userInfoDBName
  userInfoDSName
  userInfoVersion
  userInfoProp
*/

userInfoDBName = "UserInformation";
userInfoDSName = "UserInfo";
userInfoVersion = 1;
userInfoProp = ["name", "primaryEmail", "secondaryEmail", "decimalPrecision"];

function openUserInfoDBset() {
  itemDB.open(userInfoDBName, userInfoVersion, userInfoDSName, "", userInfoProp, true, () => {
    console.log(userInfoDBName + " database opened...");

    // prepopulate inputs if info exists.
    itemDB.fetchAll(userInfoDSName, (results) => {
      if (results[0] != null) {
        document.getElementById("name").value = results[0].name;
        document.getElementById("email_primary").value = results[0].primaryEmail;
        document.getElementById("email_secondary").value = results[0].secondaryEmail;
        document.getElementById(results[0].decimalPrecision).checked = "checked";
        Materialize.updateTextFields();
      }
    })
  });
}

function openUserInfoDB(callback) {
  itemDB.open(userInfoDBName, userInfoVersion, userInfoDSName, "", userInfoProp, true, () => {
    console.log(userInfoDBName + " database opened...");
    if (callback) {
      callback();
    }
  });
}

function createOrUpdate() {
  itemDB.fetchAll(userInfoDSName, (results) => {
    if (results[0] != null) {
      updateUserInfo(results[0].id);
    } else {
      createUserInfo();
    }
  });
};

function createUserInfo() {
  let name = document.getElementById("name").value;
  let pEmail = document.getElementById("email_primary").value;
  let sEmail = document.getElementById("email_secondary").value;
  let precision = document.querySelector('input[name=group1]:checked').value;

  let info = {
    "name": name,
    "primaryEmail": pEmail,
    "secondaryEmail": sEmail,
    "decimalPrecision": precision
  };

  itemDB.createItem(userInfoDSName, info, () => {
    console.log("User Info Saved Successfully...");
  });
}

function getUserInfo(callback) {
  itemDB.fetchAll(userInfoDSName, (results) => {
    if (results[0] != null) {
      callback(results[0]);
    } else {
      console.log("User info not found...");
      callback(results[0]);
    }
  });
}

// function getPrecision() {
//   itemDB.fetchAll(userInfoDSName, (results) => {
//     return results[0].decimalPrecision;
//   });
// }
//
// function getPrimaryEmail() {
//   itemDB.fetchAll(userInfoDSName, (results) => {
//     return results[0].primaryEmail;
//   });
// }
//
// function getSecondaryEmail() {
//   itemDB.fetchAll(userInfoDSName, (results) => {
//     return results[0].secondaryEmail;
//   });
// }

function updateUserInfo(id) {
  let name = document.getElementById("name").value;
  let pEmail = document.getElementById("email_primary").value;
  let sEmail = document.getElementById("email_secondary").value;
  let precision = document.querySelector('input[name=group1]:checked').value;

  let updatedInfo = {
    "name": name,
    "primaryEmail": pEmail,
    "secondaryEmail": sEmail,
    "decimalPrecision": precision
  };

  itemDB.updateItemById(userInfoDSName, id, updatedInfo, () => {
    console.log("Updated user Information");
    setPrecision();
  });
}

function deleteUserInfo() {
  itemDB.fetchAll(userInfoDSName, (results) => {
    itemDB.deleteItem(userInfoDSName, results[0].id, () => {
      console.log("User Info Deleted...");
    })
  });
}
