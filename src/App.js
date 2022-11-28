import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import { StockOverview } from "./pages/StockOverviewPage";
import { StockDetail } from "./pages/StockDetailPage";
import { Container } from "@mui/system";

//context
import { WatchListContextProvider } from "./context/watchListContext";

function App() {
  return (
    <main>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
