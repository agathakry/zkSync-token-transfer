// Bob is the shopkeeper and Alice the customer 

// add an immediately invoked function where we import modules
// use this because Node.js only allows you to place await operator inside an async function 
(async () => {
    const ethers = require('ethers')
    const zksync = require('zksync')
    const utils = require('./utils')
    const SLEEP_INTERVAL = process.env.SLEEP_INTERVAL || 5000
  
    // Start here
    // to connect to zkSync, must create a zkSync provider by calling utils.getZKSyncProvider function 
    // process.env 
    const zkSyncProvider = await utils.getZkSyncProvider(zksync, process.env.NETWORK_NAME)

    // create a Rinkeby provider 
    const ethersProvider = await utils.getEthereumProvider(ethers, process.env.NETWORK_NAME)

    // create a new Rinkeby Wallet for Bob 
    const bobRinkebyWallet = new ethers.Wallet(process.env.BOB_PRIVATE_KEY, ethersProvider)

    // show Bob's address on Rinkeby and his initial balance 
    console.log(`Bob's Rinkeby address is: ${bobRinkebyWallet.address}`)
    console.log(`Bob's initial balance on Rinkeby is: ${ethers.utils.formatEther(await bobRinkebyWallet.getBalance())}`)

    // create zksync wallet for bob 
    const bobZkSyncWallet = await utils.initAccount(bobRinkebyWallet, zkSyncProvider, zksync)

    // updaate bobs balance and shut down application 
    process.on('SIGINT', () => {
        console.log('Disconnecting')
        // Disconnect
        process.exit()
      })
      setInterval(async () => {
        // Call the `utils.displayZkSyncBalance` function
        await utils.displayZkSyncBalance(bobZkSyncWallet, ethers)
        console.log('---')
      }, SLEEP_INTERVAL)
    

  })()