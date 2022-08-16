import state, { Stock } from "@state";
import { formatValue } from "@utilities/index.ts";
import React, { useState } from "react";
//import SearchModal from "./header/SearchModal";

interface WatchlistRowProps {
  stock: Stock;
  color?: string;
  onDelete: (symbol: string) => any;
  onClick: (stock: Stock) => any;
}

function WatchlistRow({
  stock,
  color = "",
  onDelete,
  onClick,
}: WatchlistRowProps) {
  const stockInfo = state.hooks.useStockInfo({
    key: stock.symbol,
  });
  return;
}
