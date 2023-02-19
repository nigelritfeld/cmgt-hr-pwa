// todo: check if index db is supported
export const isSupported = () => (self.indexedDB)

//todo: Open a database.
export const open = (database: string, version: number, objectStoresName: string): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        try {
            if (!isSupported()) return Error('Index DB is not supported in this browser.')
            const request = self.indexedDB.open(database, version)
            request.onsuccess = function (event: Event) {
                // @ts-ignore
                resolve(event.target?.result)
            };
            request.onupgradeneeded = function (event:IDBVersionChangeEvent) {
                // @ts-ignore
                const db = event.target?.result;
                const store = db.createObjectStore(objectStoresName, {keyPath: 'id'});
                resolve(store)
            };
            request.onerror = function (event) {
                reject(request.error)
            };
        } catch (e) {
            reject(e)
        }
    })

}
// todo: Create an object store in the database.
export const createStore = () => {
}
// todo: Start a transaction and make a request to do some database operation, like adding or retrieving data.
export const transaction = async (databaseName: string, databaseVersion: number, storeNames: string, objectStoreName: string, mode: IDBTransactionMode): Promise<IDBObjectStore> => {
    return new Promise(async (resolve, reject) => {
        try {
            const database = await open(databaseName, databaseVersion, storeNames)
            const transaction = database.transaction(storeNames, mode)
            transaction.oncomplete = function () {
            }
            transaction.onerror = function (event) {
                reject(event)
            }
            // returns IDBObjectStore instance
            const store = transaction.objectStore(storeNames);
            resolve(store)

        } catch (e: any) {
            resolve(e)
        }
    })
}
export const getAllFromStore = (store: IDBObjectStore):Promise<any> => {
    // const store = await transaction('cmgt', 1, 'projects', 'project','readwrite')
    return new Promise((resolve, reject) => {
        try {
            const storeRequest = store.getAll()
            storeRequest.onsuccess = function (ev) {
                resolve(storeRequest.result)
            }
            storeRequest.onerror = function (ev) {
                throw storeRequest.error
            }
        } catch (e) {
            reject(e)
        }
    })

}
// todo: Wait for the operation to complete by listening for the right kind of DOM event.
// todo: Do something with the results (which can be found on the request object).

