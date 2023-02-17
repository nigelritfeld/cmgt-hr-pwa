// todo: check if index db is supported
export const isSupported = ()=> (self.indexedDB)

//todo: Open a database.
export const open = (database: string, version: number) => {
    return new Promise((resolve, reject) => {
        try {
            if (!isSupported()) return Error('Index DB is not supported in this browser.')
            const request = self.indexedDB.open(database, version)
            request.onsuccess = function(event) {
                console.log('[onsuccess]', request.result);
                resolve(event.target?.result)
            };
            request.onupgradeneeded = function(event) {
                const db = event.target.result;
                const store = db.createObjectStore(database, {keyPath: 'id'});
                resolve(store)
            };
            request.onerror = function(event) {
                reject(request.error)
            };
        }catch (e) {
            reject(e)
        }
    })

}
// todo: Create an object store in the database.
export const createStore = () => {}
// todo: Start a transaction and make a request to do some database operation, like adding or retrieving data.
export const transaction = () => {}
// todo: Wait for the operation to complete by listening for the right kind of DOM event.
// todo: Do something with the results (which can be found on the request object).

