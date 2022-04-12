// Create two Node.js applications, Alice.js and Bob.js that share the same logic, to avoid repetition 
// we create a shell of a JavaScript file 

// In here we create a provider, which acts like a bridge that makes JavaScript function cals compatible with zkSync 

// Lesson 17 Chapter 2
// Create an async function with zksync: points to zksync module, networkName: specififes network connected to 
async function getZkSyncProvider(zksync, networkName) {
    // declare provider variable
    let zkSyncProvider

    // create a new provider and prevent it from craching 
    try {
        // set provider to default 
        zkSyncProvider = await zksync.getDefaultProvider(networkName)

    } catch (error) {
        // log error
        console.log('Unable to connect to zkSync.')
        console.log(error)
    }
    // return provider
    return zkSyncProvider
}