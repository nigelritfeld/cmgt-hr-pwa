export const InstallServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(res=>
            {
                const item = res[0]
                if (!item){
                    navigator.serviceWorker.register("/sw.js")
                        .then(result=> {
                            console.log(result)
                        })
                        .catch()
                }
            }
        )

    }
}
