async function getZkSyncProvider (zksync, networkName) {
    let zkSyncProvider
    try {
      zkSyncProvider = await zksync.getDefaultProvider(networkName)
    } catch (error) {
      console.log('Unable to connect to zkSync.')
      console.log(error)
    }
    return zkSyncProvider
  }
  
  async function getEthereumProvider (ethers, networkName) {
    let ethersProvider
    try {
      // eslint-disable-next-line new-cap
      ethersProvider = new ethers.getDefaultProvider(networkName)
    } catch (error) {
      console.log('Could not connect to Rinkeby')
      console.log(error)
    }
    return ethersProvider
  }
  
  async function initAccount (rinkebyWallet, zkSyncProvider, zksync) {
    const zkSyncWallet = await zksync.Wallet.fromEthSigner(rinkebyWallet, zkSyncProvider)
    return zkSyncWallet
  }
  
  async function registerAccount (wallet) {
    console.log(`Registering the ${wallet.address()} account on zkSync`)
    if (!await wallet.isSigningKeySet()) {
      if (await wallet.getAccountId() === undefined) {
        throw new Error('Unknown account')
      }
      const changePubkey = await wallet.setSigningKey()
      await changePubkey.awaitReceipt()
    }
    console.log(`Account ${wallet.address()} registered`)
  }
  
  //1. On the next line, replace the last parameter (`ethers`) with `tokenSet`
  async function depositToZkSync (zkSyncWallet, token, amountToDeposit, tokenSet ) {
    const deposit = await zkSyncWallet.depositToSyncFromEthereum({
      depositTo: zkSyncWallet.address(),
      token: token,
      amount: tokenSet.parseToken(token, amountToDeposit) //2. Call the `tokenSet.parseToken` function
    })
    try {
      await deposit.awaitReceipt()
    } catch (error) {
      console.log('Error while awaiting confirmation from the zkSync operators.')
      console.log(error)
    }
  }
  
  async function transfer (from, toAddress, amountToTransfer, transferFee, token, zksync, ethers) {
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(
      ethers.utils.parseEther(amountToTransfer))
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(
      ethers.utils.parseEther(transferFee))
  
    const transfer = await from.syncTransfer({
      to: toAddress,
      token: token,
      amount: closestPackableAmount,
      fee: closestPackableFee
    })
    const transferReceipt = await transfer.awaitReceipt()
    console.log('Got transfer receipt.')
    console.log(transferReceipt)
  }
  
  async function getFee(transactionType, address, token, zkSyncProvider, ethers) {
    const feeInWei = await zkSyncProvider.getTransactionFee(transactionType, address, token)
    return ethers.utils.formatEther(feeInWei.totalFee.toString())
  }
  
  async function withdrawToEthereum (wallet, amountToWithdraw, withdrawalFee, token, zksync, ethers) {
    const closestPackableAmount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(amountToWithdraw))
    const closestPackableFee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(withdrawalFee))
    const withdraw = await wallet.withdrawFromSyncToEthereum({
      ethAddress: wallet.address(),
      token: token,
      amount: closestPackableAmount,
      fee: closestPackableFee
    })
    await withdraw.awaitVerifyReceipt()
    console.log('ZKP verification is complete')
  }
  
  // udapte the display function depending on token
  async function displayZkSyncBalance (wallet, ethers) {
    const state = await wallet.getAccountState()
    
  }
  
  module.exports = {
    getZkSyncProvider,
    getEthereumProvider,
    depositToZkSync,
    registerAccount,
    displayZkSyncBalance,
    transfer,
    withdrawToEthereum,
    getFee,
    initAccount
  }
  