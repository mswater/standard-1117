
export const changeMenuItem = (params) => {
  return (dispatch) => {
    dispatch({type: "CHANGE_MENU_ITEM", payload: params});
  };
};

export const fetchCodeNum= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_CODE_NUM", payload: params});
  };
};
