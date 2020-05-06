const o = {
  fromC: function(n) {
    return n * 1.8 + 32;
  },
  fromK: function(n) {
    return n * 1.8 - 459.67;
  },
  fromR: function(n) {
    return n - 459.67;
  },
  fromF: function(n) {
    return n;
  },
  toC: function(n) {
    return (n - 32) / 1.8;
  },
  toK: function(n) {
    return (n + 459.67) / 1.8;
  },
  toR: function(n) {
    return +459.67;
  },
  toF: function(n) {
    return n;
  },
  tbl2Liter: function(n) {
    return n / 67.628;
  },
  liter2tbl: function(n) {
    return n * 67.628;
  },
  cubicInch2Liter: function(n) {
    return n / 61.024;
  },
  liter2cubicInch: function(n) {
    return n * 61.024;
  },
  cup2Liter: function(n) {
    return n / 4.167;
  },
  liter2Cup: function(n) {
    return n * 4.167;
  },
  cubicFoot2Liter: function(n) {
    return n / 28.317;
  },
  liter2CubicFoot: function(n) {
    return n * 28.317;
  },
  gallon2Liter: function(n) {
    return n / 3.785;
  },
  liter2Gallon: function(n) {
    return n * 3.785;
  }
};

const convert = (n, from, to) => {
  console.log(o[from](n));
  console.log(o[to](o[from](n)));
  //  return o[to](o[from](n));
  return o[to](o[from](n));
};

export const isCorrect = (n, from, to, response) => {
  console.log([n, from, to, response]);
  //Math.round(num * 10) / 10
  console.log(parseFloat(response).toFixed(1));
  console.log(parseFloat(convert(n, from, to)).toFixed(1));
  const r = parseFloat(response).toFixed(1);
  const v = parseFloat(convert(n, from, to)).toFixed(1);
  return r === v ? "correct" : "incorrect";
};

const measureName = {
  fromC: "Celsius",
  fromK: "Kelvin",
  fromF: "Fahrenheit",
  toC: "Celsius",
  toK: "Kelvin",
  toF: "Fahrenheit",
  tbl2Liter: "Tablespoon",
  liter2tbl: "Tablespoon",
  cubicInch2Liter: "Cubic Inch",
  liter2cubicInch: "Cubic Inch",
  cup2Liter: "Cup",
  liter2Cup: "Cup",
  cubicFoot2Liter: "Cubic Foot",
  liter2CubicFoot: "Cubic Foot",
  liter2Gallon: "Gallon",
  gallon2Liter: "Gallon"
};
export const getMeasureName = s => measureName[s];
