export const reducer = (state, action) => {
  console.log("action " + action.type);
  switch (action.type) {
    case "add": {
      //const lngth = state.rows.length + 1;
      const obj = { ...action.payload };
      return {
        ...state,
        rows: [obj, ...state.rows]
      };
    }

    default:
      return state;
  }
};
