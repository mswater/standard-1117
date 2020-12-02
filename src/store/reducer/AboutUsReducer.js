const init = {
  selectedMenuItem:""
};
const aboutUsReducer = (state = init, action) => {
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

export default aboutUsReducer;
