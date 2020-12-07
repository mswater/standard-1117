const init = {
  pageNum:"1",
  pageCount:"10"
};
const reportReducer = (state = init, action) => {
  switch (action.type) {
    case "CHANGE_MENU_ITEM":
      return {
        ...state,
        selectedMenuItem: action.payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
