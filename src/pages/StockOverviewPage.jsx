import { Search } from "../components/Search";
import { Watchlist } from "../components/Watchlist";

import ButtonAppBar from "../components/NavBar";
import { MainIcon } from "../components/MainLogo";

export const StockOverview = () => {
  return (
    <>
      <ButtonAppBar />
      <MainIcon />
      <Search />
      <Watchlist />
    </>
  );
};
