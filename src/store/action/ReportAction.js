import {
  getReportList,
} from "../../service/api.js";

/**
 * 学科快讯页面   获取数据
 */
export const fetchReportList = (params) => {
  return (dispatch) => {
    dispatch({ type: "BEGIN_FETCH_REPORT_DATA", payload: true });
    getReportList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SUCCESS_FETCH_REPORT_DATA", payload: response.data.data });
        }
        dispatch({ type: "END_FETCH_REPORT_DATA", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "END_FETCH_REPORT_DATA", payload: false });
      });
  };
};
export const fetchSearchReport = () => {
  return (dispatch) => {
    dispatch({type: "BEGIN_FETCH_REPORT_DATA", payload: true});
  };
};
export const setSearchReportValue = (params) => {
  return (dispatch) => {
    dispatch({type: "SET_REPORT_SEARCH_VALUE", payload:params});
  };
};

