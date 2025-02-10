import { Address } from "viem";

interface SaleItem {
  tokenId: string;
}

export interface UnpackedSaleConfigurationProps {
  networkName: string;
  nftTokenAddress: Address;
  salesContractAddress: Address;
  chainId: number;
  itemsForSale: SaleItem[];
}

export const saleConfiguration = {
  networkName: "Arbitrum Sepolia",
  nftTokenAddress: "0x36631c1e690714192614364ae9629850b546d194",
  salesContractAddress: "0x5ee0490faa7e61f482028140566a39352521e7fb",
  chainId: 421614,
  itemsForSale: [
    {
      tokenId: "4",
    },
    {
      tokenId: "7",
    },
  ],
} as UnpackedSaleConfigurationProps;

export const formatPriceWithDecimals = (
  price: bigint,
  tokenDecimals: number,
): string => {
  const divisor = BigInt(10 ** tokenDecimals);

  const integerPart = price / divisor;
  const decimalPart = price % divisor;

  let formattedDecimal = decimalPart.toString().padStart(tokenDecimals, "0");

  formattedDecimal = formattedDecimal.replace(/0+$/, "");

  return formattedDecimal
    ? `${integerPart.toString()}.${formattedDecimal}`
    : integerPart.toString();
};