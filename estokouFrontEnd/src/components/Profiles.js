var Profile = (function () {
  var getName = function () {
    return sessionStorage.getItem("full_name") || "";
  };

  var setName = function (name) {
    sessionStorage.setItem("full_name", name);
  };

  var getId = function () {
    return sessionStorage.getItem("user_id") || 0;
  };

  var setId = function (id) {
    sessionStorage.setItem("user_id", id);
  };

  var getStorageId = function () {
    return sessionStorage.getItem("storage_id") || null;
  };

  var setStorageId = function (id) {
    sessionStorage.setItem("storage_id", id);
  };

  var getProductId = function () {
    return sessionStorage.getItem("product_id") || 0;
  };

  var setProductId = function (id) {
    sessionStorage.setItem("product_id", id);
  };

  var getStorageName = function () {
    return sessionStorage.getItem("storage_name") || "";
  };

  var setStorageName = function (sName) {
    sessionStorage.setItem("storage_name", sName);
  };

  return {
    getName: getName,
    setName: setName,
    getId: getId,
    setId: setId,
    getStorageId: getStorageId,
    setStorageId: setStorageId,
    getStorageName: getStorageName,
    setStorageName: setStorageName,
    getProductId: getProductId,
    setProductId: setProductId,
  };
})();

export default Profile;
