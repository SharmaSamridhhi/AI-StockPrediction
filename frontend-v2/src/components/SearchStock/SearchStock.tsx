import React from "react";
import { Search } from "lucide-react";
import { CompanyLogo } from "../CompanyLogo";
type StockResult = {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  logo: string;
};
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const SearchStock: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<StockResult[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/search_stock?query=${query}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleStockSelect = (stock: StockResult) => {
    console.log("Selected stock:", stock);

    // optional: auto-fill input
    setQuery(stock.symbol);

    // optional: clear results
    setSearchResults([]);
  };
  return (
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
          <Button onClick={handleSearch}>
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
  );
};

export default SearchStock;
