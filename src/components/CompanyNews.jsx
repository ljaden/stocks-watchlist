import { useState, useEffect } from "react";
import moment from "moment";

import api from "../apis/api";

// mui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export const CompanyNews = ({ symbol }) => {
  const theme = useTheme();
  const [news, setNews] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = news ? news.length : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = moment().format("YYYY-MM-DD");
        const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");

        const { data } = await api.get("company-news", {
          params: {
            symbol: symbol,
            from: startDate,
            to: today,
          },
        });

        // setNews(data.slice(0, 5));
        setNews(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [symbol]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (news === null) return <h1>Null</h1>;
  return (
    <>
      <Typography
        variant="h3"
        sx={{ my: 4, borderBottom: "1px solid grey", p: 2 }}
      >
        Recent News
      </Typography>
      {news.length !== 0 ? (
        <Box sx={{ maxWidth: 800, flexGrow: 1, mx: "auto" }}>
          <Typography variant="h5">{news[activeStep]?.headline}</Typography>
          <Box
            component="img"
            sx={{
              height: 355,
              display: "block",
              maxWidth: 800,
              width: "100%",
            }}
            src={news[activeStep]?.image}
            alt={news[activeStep]?.headline}
          ></Box>
          <Box sx={{ maxWidth: 800, width: "100%", p: 2 }}>
            {news[activeStep]?.summary}
          </Box>
          <Box sx={{ maxWidth: 800, width: "100%", p: 2 }}>
            Source:
            <a href={news[activeStep]?.source} target="_blank" rel="noreferrer">
              {news[activeStep]?.source}
            </a>
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      ) : (
        <h1>NO NEWS</h1>
      )}
    </>
  );
};
