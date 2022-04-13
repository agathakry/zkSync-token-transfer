(async () => {
    const ethers = require('ethers')
    const zksync = require('zksync')
    const utils = require('./utils')
    const token = 'USDT' // Update this line
    const amountToDeposit = '6.0' // Update this line
    const amountToTransfer = '2.0' // Update this line
    const amountToWithdraw = '2.0' // Update this line
  
    const zkSyncProvider = await utils.getZkSyncProvider(zksync, process.env.NETWORK_NAME)
    const ethersProvider = await utils.getEthereumProvider(ethers, process.env.NETWORK_NAME)
    console.log('Creating a new Rinkeby wallet for Alice')
    const aliceRinkebyWallet = new ethers.Wallet(process.env.ALICE_PRIVATE_KEY, ethersProvider)
    console.log(`Alice's Rinkeby address is: ${aliceRinkebyWallet.address}`)
    // delete line that retrieves Alice initial ETH balance on rinkeby
    //const aliceInitialRinkebyBalance = await aliceRinkebyWallet.getBalance()
    //console.log(`Alice's initial balance on Rinkeby is: ${ethers.utils.formatEther(aliceInitialRinkebyBalance)}`)
  
    console.log('Creating a zkSync wallet for Alice')
    const aliceZkSyncWallet = await utils.initAccount(aliceRinkebyWallet, zkSyncProvider, zksync)
  
    // obtain instance of TokenSet (multiple tokens) and store it 
    const tokenSet = zkSyncProvider.tokenSet

    // retrieve alice initial USDT balance on rikenby 
    const aliceInitialRinkebyBalance = await aliceZkSyncWallet.getEthereumBalance(token)

    // display initial USDT balance 
    console.log(`Alice's initial balance on Rinkeby is: ${tokenSet.formatToken(token, aliceInitialRinkebyBalance)}`)

    // before transfering, we need to approve ERC20 token transfer 
    await aliceZkSyncWallet.approveERC20TokenDeposits(token)

    console.log('Depositing')
    // change from ethers to tokenSet to have ERC20
    await utils.depositToZkSync(aliceZkSyncWallet, token, amountToDeposit, tokenSet)
    await utils.displayZkSyncBalance(aliceZkSyncWallet, tokenSet)
    await utils.registerAccount(aliceZkSyncWallet)
  
    console.log('Transferring')
    const transferFee = await utils.getFee('Transfer', aliceRinkebyWallet.address, token, zkSyncProvider, tokenSet)
    await utils.transfer(aliceZkSyncWallet, process.env.BOB_ADDRESS, amountToTransfer, transferFee, token, zksync, tokenSet)
  
    console.log('Withdrawing')
    const withdrawalFee = await utils.getFee('Withdraw', aliceRinkebyWallet.address, token, zkSyncProvider, tokenSet)
    await utils.withdrawToEthereum(aliceZkSyncWallet, amountToWithdraw, withdrawalFee, token, zksync, tokenSet)
  })()
  