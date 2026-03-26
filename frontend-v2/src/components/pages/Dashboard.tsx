import React, { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyLogo } from "@/components/CompanyLogo";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import {
  type StockResult,
  type StockHistory,
  type Prediction,
} from "@/types/dashboard";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockResult[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockResult | null>(null);
  const [stockHistory, setStockHistory] = useState<StockHistory[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query");

  const handleSearch = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/search_stock?query=${queryText}`,
      );
      const data = await res.json();
      setSearchResults(data.results || []);

      // ✅ Auto-select first result if exists
      if (data.results && data.results.length > 0) {
        handleStockSelect(data.results[0]);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = async (stock: StockResult) => {
    setSelectedStock(stock);
    setStockHistory([]);
    setPrediction(null);
    setLoadingGraph(true);
    setLoadingPrediction(true);

    try {
      const historyRes = await fetch(
        `${API_BASE_URL}/history?symbol=${stock.symbol}&period=6mo&interval=1d`,
      );
      const historyData = await historyRes.json();
      setStockHistory(historyData.history || []);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoadingGraph(false);
    }

    try {
      const predRes = await fetch(`${API_BASE_URL}/predict/${stock.symbol}`);
      const predData = await predRes.json();
      setPrediction(predData);
    } catch (err) {
      console.error("Prediction fetch error:", err);
    } finally {
      setLoadingPrediction(false);
    }
  };

  useEffect(() => {
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      handleSearch(queryFromUrl);
    }
  }, [queryFromUrl]);

  return (
    <div className='p-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>
      {/* Section 1: Search Stocks */}
      <Card className='col-span-1'>
        <CardHeader>
          <CardTitle>Search Stocks</CardTitle>
          <CardDescription>
            Find stocks quickly by symbol or name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-2 mb-4'>
            <Input
              placeholder='Search stocks (e.g. AAPL, TCS, TSLA)'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={() => handleSearch(query)}>
              <Search className='w-4 h-4 mr-1' /> Search
            </Button>
          </div>

          {loading ? (
            <div className='space-y-2'>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='h-12 w-full rounded-md' />
              ))}
            </div>
          ) : (
            <ScrollArea className='h-80'>
              {searchResults.length > 0 ? (
                searchResults.map((stock) => (
                  <div
                    key={stock.symbol}
                    className='flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer'
                    onClick={() => handleStockSelect(stock)}
                  >
                    <CompanyLogo name={stock.name} size={40} />
                    <div>
                      <p className='font-semibold'>{stock.symbol}</p>
                      <p className='text-sm text-muted-foreground'>
                        {stock.name}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {stock.type}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-sm text-muted-foreground'>
                  No results found. Try searching something else.
                </p>
              )}
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Stock Graph */}
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle>Stock Details</CardTitle>
          <CardDescription>
            View stock performance for the past 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingGraph ? (
            <Skeleton className='h-[350px] w-full rounded-md' />
          ) : selectedStock && stockHistory.length > 0 ? (
            <ResponsiveContainer width='100%' height={350}>
              <LineChart data={stockHistory}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='Date' hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='Close'
                  stroke='#2563eb'
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className='text-sm text-muted-foreground'>
              Select a stock to view its graph.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Section 3: AI Prediction */}
      <Card className='col-span-3 lg:col-span-3'>
        <CardHeader>
          <CardTitle>AI Prediction</CardTitle>
          <CardDescription>
            AI-driven forecast for your selected stock.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingPrediction ? (
            <Skeleton className='h-32 w-full rounded-md' />
          ) : prediction ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
              <div>
                <p className='text-sm text-muted-foreground'>Stock</p>
                <p className='text-lg font-semibold'>{prediction.stock}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Predicted Price</p>
                <p className='text-lg font-semibold'>
                  ₹{prediction.predicted_price_tomorrow.toFixed(2)}
                </p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-sm text-muted-foreground'>Trend</p>
                <div className='flex items-center gap-1 font-semibold'>
                  {prediction.trend_direction === "UP" ? (
                    <>
                      <TrendingUp className='text-green-500' />{" "}
                      <span className='text-green-500'>UP</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className='text-red-500' />{" "}
                      <span className='text-red-500'>DOWN</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Confidence</p>
                <p className='font-semibold'>{prediction.confidence}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Change Estimate</p>
                <p className='font-semibold'>{prediction.change_estimate}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>
                  Expected Hit Date
                </p>
                <p className='font-semibold'>{prediction.expected_hit_date}</p>
              </div>
            </div>
          ) : (
            <p className='text-sm text-muted-foreground'>
              Select a stock to see its prediction.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
