const init = {
  pageNum:1,
  pageSize:10,
  fetchReportListLoading:false,
  reportData:{
    page:{
      resultList:[],
      pageNow:1,
      rowCount:0,
    },
  },
  searchReportValue:"",
};
const reportReducer = (state = init, action) => {
  switch (action.type) {
    case "BEGIN_FETCH_REPORT_DATA":
      return {
        ...state,
        fetchReportListLoading: action.payload,
      };
    case "END_FETCH_REPORT_DATA":
      return {
        ...state,
        fetchReportListLoading: action.payload,
      };
    case "SUCCESS_FETCH_REPORT_DATA":
      return {
        ...state,
        reportData: action.payload,
      };
    case "SET_REPORT_SEARCH_VALUE":
      return {
        ...state,
        searchReportValue: action.payload,
      };
    default:
      return state;
  }
};

export default reportReducer;
