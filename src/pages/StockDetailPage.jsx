// react hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//api
import api from "../apis/api";

//components
import Container from "@mui/material/Container";
import { StockChart } from "../components/StockChart";
import { CompanyNews } from "../components/CompanyNews";
import { CompanyInfo } from "../components/CompanyInfo";
import ButtonAppBar from "../components/NavBar";

export const StockDetail = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState(null);

  const formatData = (data) => {
    return data.t.map((point, idx) => {
      return {
        x: point * 1000,
        y: +data.c[idx].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //current UNIX time
        const date = new Date();
        const currentSecond = Math.floor(date.getTime() / 1000);
        // 24h (Weekends will fetch from previous Friday)
        const oneDay =
          date.getDay() === 6
            ? 2 * 86400
            : date.getDay() === 0
            ? 3 * 86400
            : 86400;
        // 1Week
        const oneWeek = 7 * 86400;
        // 1Year
        // const oneYear = 365 * 86400;

        const res = await Promise.all([
          api.get("/stock/candle", {
            params: {
              symbol: symbol,
              resolution: 60,
              from: currentSecond - oneDay, // 24H ago
              to: currentSecond,
            },
          }),
          api.get("/stock/candle", {
            params: {
              symbol: symbol,
              resolution: "D",
              from: currentSecond - oneWeek,
              to: currentSecond,
            },
          }),
        ]);

        // console.log(res, "res");

        setChartData({
          day: formatData(res[0].data),
          week: formatData(res[1].data),
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <>
      <ButtonAppBar />
      <Container>
        {chartData && (
          <CompanyInfo symbol={symbol} currentPrice={chartData.day.at(-1).y} />
        )}
        {chartData && <StockChart chartData={chartData} symbol={symbol} />}
        <CompanyNews symbol={symbol} />
      </Container>
    </>
  );
};
