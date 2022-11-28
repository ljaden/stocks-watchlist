import { useEffect, useState } from "react";

import api from "../apis/api";

// components
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export const CompanyInfo = ({ symbol, currentPrice }) => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    // console.log(currentPrice, "currentprice from companyInfo");
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await api.get("/stock/profile2", {
          params: {
            symbol: symbol,
          },
        });
        console.log(data, "data");
        if (isMounted) {
          setCompanyInfo(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <>
      {companyInfo && (
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              alt={`${companyInfo.name}-logo`}
              src={`https://financialmodelingprep.com/image-stock/${symbol}.jpg`}
              sx={{ width: 90, height: 90 }}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <h1>
                  {companyInfo.name} ({companyInfo.ticker})
                </h1>
                <h4>
                  <span>$ {currentPrice} </span>
                  <small>{companyInfo.currency}</small>
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {companyInfo && (
        <Box sx={{ width: "80%", mx: "auto", my: "1rem" }}>
          <Grid container spacing={4}>
            <Grid item xs="auto">
              <strong>Exchange: </strong>
              {companyInfo.exchange}
            </Grid>
            <Grid item>
              <strong>Industry: </strong>
              {companyInfo.finnhubIndustry}
            </Grid>
            <Grid item>
              <strong>IPO: </strong>
              {companyInfo.ipo}
            </Grid>
            <Grid item>
              <strong>Market Cap: </strong>
              {Math.round(+companyInfo.marketCapitalization).toLocaleString(
                "en-US"
              )}
              {" Million"}
            </Grid>
            <Grid item>
              <strong>Shares Outstanding: </strong>
              {Math.round(+companyInfo.shareOutstanding).toLocaleString(
                "en-US"
              )}
              {" Million"}
            </Grid>
            <Grid item>
              <strong>Website: </strong>
              <a href={companyInfo.weburl}>Here</a>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
