import { useEffect, useState } from 'react'

import { ethers } from 'ethers'



import logo from './logo.svg';
import './App.css';


import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'


const ContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
function GreeterPage() {
  const [greeting, setGreetingValue] = useState()

  const [currentAddress, setCurrentAddress] = useState()




  const selectAnAddress = async ()=> {
    const ret = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("ret ", ret)
    if( ret ) {
      setCurrentAddress(ret[0])
    }
  }

  // request metamask for active address
  const requestActiveAddress = async ()=> {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  
  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(ContractAddress, Greeter.abi, provider)

      try {
        const data = await contract.greet()
        console.log('data: ', data)
        setGreetingValue(data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestActiveAddress()

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      console.log("signer ", signer)

      const contract = new ethers.Contract(ContractAddress, Greeter.abi, signer)
      
      const transaction = await contract.setGreeting(greeting)
      const transactionReturn = await transaction.wait()
      console.log("transaction ", transaction)
      console.log("transactionReturn ", transactionReturn)
      
      fetchGreeting()
    }
  }




  useEffect(() => {
    console.log("Greeter ", Greeter.abi)
  }, [])

  return (
    <div className="">

        <h4> Greeting is {greeting} </h4>
     

        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />

    </div>
  );
}

export default GreeterPage;
