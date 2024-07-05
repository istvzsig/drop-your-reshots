const DB_NAME = "images-gallery";
const DB_VERSION = 1;
const STORE_NAME = "images";

let db;

export function initDb() {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject(`Database error: ${event.target.errorCode}`);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
}

export function addImage(imageData) {
  return new Promise((resolve, reject) => {
    initDb().then((db) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add({ data: imageData });

      request.onsuccess = () => {
        console.log(request)
        resolve();
      };

      request.onerror = (event) => {
        reject(`Add image error: ${event.target.errorCode}`);
      };
    });
  });
}

export function getImages() {
  return new Promise((resolve, reject) => {
    initDb().then((db) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(`Get images error: ${event.target.errorCode}`);
      };
    });
  });
}

export function clearImages() {
  return new Promise((resolve, reject) => {
    initDb().then((db) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(`Clear images error: ${event.target.errorCode}`);
      };
    });
  });
}