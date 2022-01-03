# B23 Token (ERC20)

This project demonstrates how ERC20 tokens work. B23 is an ERC20 contract which is deployed to rinkeby. A react app is used to give an interface to the deployed contract.



To run it on the rinkeby testnet:

```shell
yarn
yarn start
```

Be sure to get some test eth from a testnet.


To run the Dapp locally:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js

yarn
yarn start
```

Be sure to replace TokenContractAddress variable in Fungit.js before intreracting with the contract.