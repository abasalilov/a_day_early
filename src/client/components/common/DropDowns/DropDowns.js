import React from "react";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

export const InterestRateDropDown = props => (
  <mobiscroll.Dropdown
    {...props}
    label={props.label}
    name="interestRate"
    inputStyle="box"
    labelStyle="floating"
  >
    <option>%</option>
    <option value={"2.000"}>2.000%</option>
    <option value={"2.125"}>2.125%</option>
    <option value={"2.250"}>2.250%</option>
    <option value={"2.375"}>2.375%</option>
    <option value={"2.500"}>2.500%</option>
    <option value={"2.625"}>2.625%</option>
    <option value={"2.750"}>2.750%</option>
    <option value={"2.875"}>2.875%</option>
    <option value={"3.000"}>3.000%</option>
    <option value={"3.125"}>3.125%</option>
    <option value={"3.250"}>3.250%</option>
    <option value={"3.375"}>3.375%</option>
    <option value={"3.500"}>3.500%</option>
    <option value={"3.625"}>3.625%</option>
    <option value={"3.750"}>3.750%</option>
    <option value={"3.875"}>3.875%</option>
    <option value={"4.000"}>4.000%</option>
    <option value={"4.125"}>4.125%</option>
    <option value={"4.250"}>4.250%</option>
    <option value={"4.375"}>4.375%</option>
    <option value={"4.500"}>4.500%</option>
    <option value={"4.625"}>4.625%</option>
    <option value={"4.750"}>4.750%</option>
    <option value={"4.875"}>4.875%</option>
    <option value={"5.000"}>5.000%</option>
    <option value={"5.125"}>5.125%</option>
    <option value={"5.250"}>5.250%</option>
    <option value={"5.375"}>5.375%</option>
    <option value={"5.500"}>5.500%</option>
    <option value={"5.625"}>5.625%</option>
    <option value={"5.750"}>5.750%</option>
    <option value={"5.875"}>5.875%</option>
    <option value={"6.000"}>6.000%</option>
    <option value={"6.125"}>6.125%</option>
    <option value={"6.250"}>6.250%</option>
    <option value={"6.375"}>6.375%</option>
    <option value={"6.500"}>6.500%</option>
    <option value={"6.625"}>6.625%</option>
    <option value={"6.750"}>6.750%</option>
    <option value={"6.875"}>6.875%</option>
    <option value={"7.000"}>7.000%</option>
    <option value={"7.125"}>7.125%</option>
    <option value={"7.250"}>7.250%</option>
    <option value={"7.375"}>7.375%</option>
    <option value={"7.500"}>7.500%</option>
    <option value={"7.625"}>7.625%</option>
    <option value={"7.750"}>7.750%</option>
    <option value={"7.875"}>7.875%</option>
    <option value={"8.000"}>8.000%</option>
    <option value={"8.125"}>8.125%</option>
    <option value={"8.250"}>8.250%</option>
    <option value={"8.375"}>8.375%</option>
    <option value={"8.500"}>8.500%</option>
    <option value={"8.625"}>8.625%</option>
    <option value={"8.750"}>8.750%</option>
    <option value={"8.875"}>8.875%</option>
    <option value={"9.000"}>9.000%</option>
    <option value={"9.125"}>9.125%</option>
    <option value={"9.250"}>9.250%</option>
    <option value={"9.375"}>9.375%</option>
    <option value={"9.500"}>9.500%</option>
    <option value={"9.625"}>9.625%</option>
    <option value={"9.750"}>9.750%</option>
    <option value={"9.875"}>9.875%</option>
    <option value={"10.000"}>10.000%</option>
    <option value={"10.125"}>10.125%</option>
    <option value={"10.250"}>10.250%</option>
    <option value={"10.375"}>10.375%</option>
    <option value={"10.500"}>10.500%</option>
    <option value={"10.625"}>10.625%</option>
    <option value={"10.750"}>10.750%</option>
    <option value={"10.875"}>10.875%</option>
    <option value={"11.000"}>11.000%</option>
    <option value={"11.125"}>11.125%</option>
    <option value={"11.250"}>11.250%</option>
    <option value={"11.375"}>11.375%</option>
    <option value={"11.500"}>11.500%</option>
    <option value={"11.625"}>11.625%</option>
    <option value={"11.750"}>11.750%</option>
    <option value={"11.875"}>11.875%</option>
    <option value={"12.000"}>12.000%</option>
    <option value={"12.125"}>12.125%</option>
    <option value={"12.250"}>12.250%</option>
    <option value={"12.375"}>12.375%</option>
    <option value={"12.500"}>12.500%</option>
    <option value={"12.625"}>12.625%</option>
    <option value={"12.750"}>12.750%</option>
    <option value={"12.875"}>12.875%</option>
  </mobiscroll.Dropdown>
);

export const TermDropDown = props => (
  <mobiscroll.Dropdown
    {...props}
    label={props.label}
    name="term"
    onChange={props.handleChange}
    inputStyle="box"
    labelStyle="floating"
  >
    <option></option>
    <option value={15}>15</option>
    <option value={20}>20</option>
    <option value={25}>25</option>
    <option value={30}>30</option>
  </mobiscroll.Dropdown>
);
