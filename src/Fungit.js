import { useEffect, useState } from 'react'

import { ethers } from 'ethers'



import logo from './logo.svg';
import './App.css';


import Token from './artifacts/contracts/B23.sol/B23.json'
import { VSpacerComponent } from './components/v_spacer/VSpacer.component';

const TokenContractAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
function FungitPage() {

  const [currentAddress, setCurrentAddress] = useState()
  const [addressBalance, setAddressBalance] = useState(0)
  const [receiverAddress, setReceiverAddress] = useState()

  const [amount, setAmount] = useState(0)




  const selectAnAddress = async ()=> {
    console.log("selectAnAddress")
    const ret = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("ret ", ret)
    if( ret ) {
      setCurrentAddress(ret[0])
    }
  }

  
  // transfer eth
  async function transfer() {
    if ( !amount || amount == 0 || !receiverAddress ) return
    if (typeof window.ethereum == 'undefined') return

    await requestActiveAddress()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    console.log("signer ", signer)

    const contract = new ethers.Contract(TokenContractAddress, Token.abi, signer)
    
    const transaction = await contract.transfer(receiverAddress, amount)
    const transactionReturn = await transaction.wait()
    console.log("transaction ", transaction)
    console.log("transactionReturn ", transactionReturn)
    
    checkBalance()
  }

  const checkBalance = async ()=> {
    // if( !currentAddress ) return
    if( typeof window.ethereum == 'undefined' ) return

    selectAnAddress()

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(TokenContractAddress, Token.abi, provider)

    try {
      const bal = await contract.balanceOf(currentAddress)
      console.log("bal ", ethers.utils.formatEther(bal))
      setAddressBalance(ethers.utils.formatEther(bal))
    } catch (error) {
      
    }
  }

  // request metamask for active address
  const requestActiveAddress = async ()=> {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  



  useEffect(() => {
      checkBalance()
  }, [])


  if( currentAddress ) {
    return (
      <div className="center_page">

        <div className="no_account">
          <h4> No Address Selected </h4>
          <p>
            Select an address to start using B23 token to transact worldwide now.
          </p>
          <VSpacerComponent space={3} />
          <button onClick={selectAnAddress} className='secondary_button'> Select An Address </button>
        </div>
      
      </div>
    )
  }

  return (
    <div className="page">

      <div className="balance_container">
        <div className='balance_show'>
          <h4> Bal </h4>
          <h1> { addressBalance } B23 </h1>
        </div>
        <VSpacerComponent space={3} />
        
        <p> { currentAddress || "0x2346643345654" } </p>
        {/* <button onClick={checkBalance}> Check Balance </button> */}
      </div>
      
      <VSpacerComponent space={8} />

      <div className="transfer_container">
        <h4> Transfer </h4>
        <VSpacerComponent space={2} />
        
        <input onChange={e => setReceiverAddress(e.target.value)} placeholder="Enter Address" /> 
        <VSpacerComponent space={2} />

        <input onChange={e => setAmount(e.target.value)} placeholder="Enter Amount" /> 
        <VSpacerComponent space={2} />

        <button onClick={transfer} className='primary_button full_width_button'> Transfer </button>
        <VSpacerComponent space={2} /> 

      </div>
    
    </div>
  );
}

export default FungitPage;
