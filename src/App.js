import React, { useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { isCorrect, getMeasureName } from "./utils.js";
import { reducer } from "./reducer";

/*
const useStyles = makeStyles(theme => ({
  root: {
    padding: "120px"
  }
}));
*/
const useStyles = makeStyles(theme => ({
  container: {
    padding: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 600
  }
}));
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export default function App() {
  function createData(input, inputMeasure, targetMeasure, response, output) {
    return { input, inputMeasure, targetMeasure, response, output };
  }

  const rowsInit = [
    createData(33, "Celsius", "Fahrenheit", 55, "correct"),
    createData(32, "Celsius", "Fahrenheit", 55, "incorrect"),
    createData(31, "Celsius", "Fahrenheit", 55, "correct"),
    createData(30, "Celsius", "Fahrenheit", 55, "correct")
  ];
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [inputMeasure, setInputMeasure] = useState("");
  const [targetMeasure, setTargetMeasure] = useState("");
  const [convertType, setConvertType] = useState("temperature");
  const [response, setResponse] = useState("");

  //const [rows, setRows] = useState(rowsInit);
  const [state, dispatch] = useReducer(reducer, { rows: rowsInit });

  const handleSubmit = () => {
    //submit the form
    console.log("input " + input);
    console.log("inputMeasure " + inputMeasure);
    console.log("targetMeasure " + targetMeasure);
    console.log("response " + response);
    console.log(isCorrect(input, inputMeasure, targetMeasure, response));
    const g = {
      input: input,
      inputMeasure: inputMeasure,
      targetMeasure: targetMeasure,
      response: response,
      output: isCorrect(input, inputMeasure, targetMeasure, response)
    };
    console.log(JSON.stringify(g));
    dispatch({ type: "add", payload: g });
  };
  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Unit conversion
      </Typography>
      <form noValidate autoComplete="off" className={classes.container}>
        <div className={classes.row}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type of unit</FormLabel>
            <RadioGroup
              aria-label="type"
              name="type"
              value={convertType}
              onChange={e => setConvertType(e.target.value)}
            >
              <FormControlLabel
                value="temperature"
                control={<Radio />}
                label="Temperature"
              />
              <FormControlLabel
                value="volume"
                control={<Radio />}
                label="Volume"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            label="Input numerical value"
            margin="normal"
            variant="outlined"
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
          />
          {convertType === "temperature" ? (
            <React.Fragment>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Input unit of measure (temperature)
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputMeasure}
                  onChange={e => setInputMeasure(e.target.value)}
                >
                  <MenuItem value={"fromK"}>Kelvin</MenuItem>
                  <MenuItem value={"fromC"}>Celsius</MenuItem>
                  <MenuItem value={"fromF"}>Fahrenheit</MenuItem>
                  <MenuItem value={"fromR"}>Rankine</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Target unit of measure (temperature)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetMeasure}
                  onChange={e => setTargetMeasure(e.target.value)}
                >
                  <MenuItem value={"toK"}>Kelvin</MenuItem>
                  <MenuItem value={"toC"}>Celsius</MenuItem>
                  <MenuItem value={"toF"}>Fahrenheit</MenuItem>
                  <MenuItem value={"toR"}>Rankine</MenuItem>
                </Select>
              </FormControl>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Input unit of measure (volume)
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputMeasure}
                  onChange={e => setInputMeasure(e.target.value)}
                >
                  <MenuItem value={"tbl2Liter"}>Tablespoon</MenuItem>
                  <MenuItem value={"cubicInch2Liter"}>Cubic Inch</MenuItem>
                  <MenuItem value={"cup2Liter"}>Cup</MenuItem>
                  <MenuItem value={"cubicFoot2Liter"}>Cubic Foot</MenuItem>
                  <MenuItem value={"gallon2Liter"}>Gallon</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Target unit of measure (volume)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={targetMeasure}
                  onChange={e => setTargetMeasure(e.target.value)}
                >
                  <MenuItem value={"liter2tbl"}>Liter</MenuItem>
                  <MenuItem value={"liter2tbl"}>Tablespoon</MenuItem>
                  <MenuItem value={"liter2CubicInch"}>Cubic Inch</MenuItem>
                  <MenuItem value={"liter2Cup"}>Cup</MenuItem>
                  <MenuItem value={"liter2CubicFoot"}>Cubic Foot</MenuItem>
                  <MenuItem value={"liter2Gallon"}>Gallon</MenuItem>
                </Select>
              </FormControl>
            </React.Fragment>
          )}
          <br />
          <TextField
            label="Student response"
            margin="normal"
            variant="outlined"
            value={response}
            onChange={e => setResponse(e.target.value)}
          />
        </div>

        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Input</StyledTableCell>
              <StyledTableCell>Input measure</StyledTableCell>
              <StyledTableCell>Output measure</StyledTableCell>
              <StyledTableCell>Student response</StyledTableCell>
              <StyledTableCell>Output</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map(row => (
              <StyledTableRow key={row.input}>
                <StyledTableCell>{row.input}</StyledTableCell>
                <StyledTableCell>
                  {getMeasureName(row.inputMeasure)}
                </StyledTableCell>
                <StyledTableCell>
                  {getMeasureName(row.targetMeasure)}
                </StyledTableCell>
                <StyledTableCell>{row.response}</StyledTableCell>
                <StyledTableCell>{row.output}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
