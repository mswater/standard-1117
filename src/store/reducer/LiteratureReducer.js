const init = {
  fetchLiteratureListLoading: false,
  fetchLiteratureContentListLoading:false,
  // 文献中心-文献分类 menu
  literatureListData:[],
  //  文献中心-文献内容页
  literatureContentListData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[]
  },
  literatureSelectQuery:"1",
  literatureSearchQuery: "",
  literatureThemeSearchFlag: false,
  literatureDateQuery: [],
  literatureDate: ["", ""],
  literatureWebsite:[],
  literatureResetButtonFlag:false,
  literatureCollect:"",
  literatureSearchValueClear: "",
};
const hotReducer = (state = init, action) => {
  switch (action.type) {
    // 热点监测menu
    case "FETCHING_GET_LITERATURE_LIST":
      return {
        ...state,
        fetchLiteratureListLoading: action.payload,
      };
    case "SAVE_GET_LITERATURE_LIST":
      return {
        ...state,
        literatureListData: action.payload,
      };
    // 文献中心-文献内容页
    case "FETCHING_GET_LITERATURE_CONTENT_LIST":
      return {
        ...state,
        fetchLiteratureContentListLoading: action.payload,
      };
    case "SAVE_GET_LITERATURE_CONTENT_LIST":
      return {
        ...state,
        literatureContentListData: action.payload,
      };
    case "SAVE_LITERATURE_SELECT_QUERY":
      return {
        ...state,
        literatureSelectQuery: action.payload,
      };
    case "SAVE_LITERATURE_SEARCH_QUERY":
      return {
        ...state,
        literatureSearchQuery: action.payload,
      };
    case "SAVE_GET_LITERATURE_THEME_SEARCH_FLAG":
      return {
        ...state,
        literatureThemeSearchFlag: action.payload,
      };
    case "SAVE_LITERATURE_DATE_QUERY":
      return {
        ...state,
        literatureDateQuery: action.payload,
      };
    case "SAVE_LITERATURE_DATE":
      return {
        ...state,
        literatureDate: action.payload,
      };
    case "SAVE_LITERATURE_WEBSITE":
      return {
        ...state,
        literatureWebsite: action.payload,
      };
    case "SAVE_LITERATURE_RESET_BUTTON_FLAG":
      return {
        ...state,
        literatureResetButtonFlag: action.payload,
      };
    case "SAVE_LITERATURE_COLLECT":
      return {
        ...state,
        literatureCollect: action.payload,
      };
    case "SAVE_GET_LITERATURE_SEARCH_VALUE":
      return {
        ...state,
        literatureSearchValueClear: action.payload,
      };
    default:
      return state;
  }
};

export default hotReducer;
