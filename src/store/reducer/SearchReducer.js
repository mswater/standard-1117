
const init = {
  fetchSearchLoading:false,
  // 检索词列表页
  searchData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[]
  },
  searchProListFlag: false,
  searchResetButtonFlag: false,
  searchWeiboTypeFlag: false,
  searchLanguageTypeFlag: false,
  searchRepeatFlag:false,
  searchSearchQuery: [],
  searchDate: ["", ""],
  searchDateQuery: [],
  searchThemeSearchFlag: false,
  searchValue: "",
};
const searchReducer = (state = init, action) => {
  switch (action.type) {
    case "FETCHING_GET_SEARCH":
      return {
        ...state,
        fetchSearchLoading: action.payload,
      };
    case "SAVE_GET_SEARCH":
      return {
        ...state,
        searchData: action.payload,
      };
    case "SAVE_SEARCH_PRO_LIST_FLAG":
      return {
        ...state,
        searchProListFlag: action.payload,
      };
    case "SAVE_SEARCH_RESET_BUTTON_FLAG":
      return {
        ...state,
        searchResetButtonFlag: action.payload,
      };
    case "SAVE_SEARCH_RESET_WEI_BO_FLAG":
      return {
        ...state,
        searchWeiboTypeFlag: action.payload,
      };
    case "SAVE_SEARCH_LANGUAGE_FLAG":
      return {
        ...state,
        searchLanguageTypeFlag: action.payload,
      };
    case "SAVE_SEARCH_REPEAT_FLAG":
      return {
        ...state,
        searchRepeatFlag: action.payload,
      };
    case "SAVE_SEARCH_QUERY":
      return {
        ...state,
        searchSearchQuery: action.payload,
      };
    case "SAVE_SEARCH_DATE_QUERY":
      return {
        ...state,
        searchDateQuery: action.payload,
      };
    case "SAVE_SEARCH_DATE":
      return {
        ...state,
        searchDate: action.payload,
      };
    case "SAVE_GET_SEARCH_THEME_SEARCH_FLAG":
      return {
        ...state,
        searchThemeSearchFlag: action.payload,
      };
    case "SAVE_GET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
