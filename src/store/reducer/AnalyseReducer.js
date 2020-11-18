const init = {
  fetchAnalyseListLoading: false,
  fetchAnalyseContentListLoading:false,
  fetchAnalyseDataComparLoading:false,
  fetchAnalyseTendencyComparLoading:false,
  analyseListData:[{
    child: [],
    typs: [],
    name: "",
    id: ""
  }],
  analyseContentListData:{
    resultList:[],
    rowCount:0
  },
  comparData:[{
    childTotalArray:[],
    type:""
  }],
  trendComparData:{
    childList:[],
    childNameList:[],
    dateList:[]
  },
  analyseResetButtonFlag: false,
  analyseMenuAndTypeData: {
    child:[],
    typs:[],
    name: "机构分析",
    id: 1
  },
  analyseTypeName:"资讯",
  analyseMenuKey: 4,
  // 一月 三月 一年点击事件
  analyseDate: 1
};
const hotReducer = (state = init, action) => {
  switch (action.type) {
    // 行业分析menu
    case "FETCHING_GET_ANALYSE_LIST":
      return {
        ...state,
        fetchAnalyseListLoading: action.payload,
      };
    case "SAVE_GET_ANALYSE_LIST":
      return {
        ...state,
        analyseListData: action.payload,
      };
    // 行业分析内容页列表接口
    case "FETCHING_GET_ANALYSE_CONTENT_LIST":
      return {
        ...state,
        fetchAnalyseContentListLoading: action.payload,
      };
    case "SAVE_GET_ANALYSE_CONTENT_LIST":
      return {
        ...state,
        analyseContentListData: action.payload,
      };
      // 行业分析数据对比接口
    case "FETCHING_GET_ANALYSE_DATA_COMPAR":
      return {
        ...state,
        fetchAnalyseDataComparLoading: action.payload,
      };
    case "SAVE_GET_ANALYSE_DATA_COMPAR":
      return {
        ...state,
        comparData: action.payload,
      };
      // 行业分析-趋势对比接口
    case "FETCHING_GET_ANALYSE_TREND_COMPAR":
      return {
        ...state,
        fetchAnalyseTendencyComparLoading: action.payload,
      };
    case "SAVE_GET_ANALYSE_TREND_COMPAR":
      return {
        ...state,
        trendComparData: action.payload,
      };
    case "SAVE_ANALYSE_RESET_BUTTON_FLAG":
      return {
        ...state,
        analyseResetButtonFlag: action.payload,
      };
    case "SAVE_ANALYSE_MENU_AND_TYPE":
      return {
        ...state,
        analyseMenuAndTypeData: action.payload,
      };
    case "SAVE_ANALYSE_TYPE_NAME":
      return {
        ...state,
        analyseTypeName: action.payload,
      };
    case "SAVE_ANALYSE_MENU_KEY":
      return {
        ...state,
        analyseMenuKey: action.payload,
      };
    case "SAVE_ANALYSE_DATE":
      return {
        ...state,
        analyseDate: action.payload,
      };
    default:
      return state;
  }
};

export default hotReducer;
