import React from "react";
import numeral from "numeral";
import { Card, CardContent, Typography } from "@mui/material";

const InfoBox = ({ title, cases, total, color, ...props }) => {
  const formatNumber = (cases) => {
    return cases ? `+${numeral(cases).format("0,0a")}` : "No cases";
  };
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title} Today
        </Typography>

        <h2 className="infoBox__cases" style={{ color: `${color}` }}>
          {formatNumber(cases)}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {numeral(total).format("0,0")} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
