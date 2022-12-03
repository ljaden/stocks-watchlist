import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

//components
import { StockOverview } from "./pages/StockOverviewPage";
import { StockDetail } from "./pages/StockDetailPage";

//context
import { WatchListContextProvider } from "./context/watchListContext";

function App() {
  return (
    <main>
      <WatchListContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </HashRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
