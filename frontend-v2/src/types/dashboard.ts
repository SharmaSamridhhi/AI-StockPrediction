export interface StockResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  logo: string;
}

export interface StockHistory {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
}

export interface Prediction {
  stock: string;
  last_price: number;
  predicted_price_tomorrow: number;
  trend_direction: "UP" | "DOWN";
  change_estimate: string;
  confidence: string;
  expected_hit_date: string;
}
