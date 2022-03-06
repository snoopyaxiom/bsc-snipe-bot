import dotenv from "dotenv";
import ethers from "ethers";
dotenv.config();
const data = {
  BNB: process.env.BNB_CONTRACT, //bnb

  to_PURCHASE: process.env.TO_PURCHASE, // token that you will purchase = BUSD for test '0xe9e7cea3dedca5984780bafc599bd69add087d56'
  router: process.env.ROUTER, //PancakeSwap V2 router
};
const wss = process.env.HTTP_NODE;
const mnemonic = process.env.YOUR_MNEMONIC; //your memonic;
const provider = new ethers.providers.JsonRpcProvider(wss);
const wallet = new ethers.Wallet(mnemonic);
const account = wallet.connect(provider);
const tokenOut = data.to_PURCHASE;

const routerContract = new ethers.Contract(
  data.router,
  [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns(uint[] memory amounts)",
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  ],
  account
);

const tokenOutContract = new ethers.Contract(
  tokenOut,
  ["function approve(address spender, uint256 amount) external returns (bool)"],
  account
);

const approveTx = await tokenOutContract.approve(routerContract);
let reciept = await approveTx.wait();
console.log(reciept);
