

const init = {
  fetchSubjectListLoading: false,
  fetchSubjectContentListLoading:false,
  fetchSubjectDataTrendMapLoading:false,
  fetchSourcesStatisticsMapLoading:false,
  // 专题监测menu
  subjectListData:[],
  // 专题监测列表
  subjectContentListData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[]
  },
  // 专题监测-数据量趋势图
  subjectTrendMapData:[],
  // 专题监测-来源统计图
  sourcesStatisticsMapData:[],
  subjectProListFlag: false,
  subjectResetButtonFlag: false,
  subjectWeiboTypeFlag: false,
  subjectRepeatFlag:false,
  subjectSearchQuery: [],
  subjectThemeSearch:"",
  subjectThemeSearchFlag: false,
  subjectSearchValue:""
};
const hotReducer = (state = init, action) => {
  switch (action.type) {
    // 专题监测menu
    case "FETCHING_GET_SUBJECT_LIST":
      return {
        ...state,
        fetchSubjectListLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_LIST":
      return {
        ...state,
        subjectListData: action.payload,
      };
    // 专题内容页列表接口
    case "FETCHING_GET_SUBJECT_CONTENT_LIST":
      return {
        ...state,
        fetchSubjectContentListLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_CONTENT_LIST":
      return {
        ...state,
        subjectContentListData: action.payload,
      };
      // 专题监测-数据量趋势图
    case "FETCHING_GET_SUBJECT_DATA_TREND_MAP":
      return {
        ...state,
        fetchSubjectDataTrendMapLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_DATA_TREND_MAP":
      return {
        ...state,
        subjectTrendMapData: action.payload,
      };
      // 专题监测-数据量趋势图
    case "FETCHING_GET_SUBJECT_SOURCES_MAP":
      return {
        ...state,
        fetchSourcesStatisticsMapLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_SOURCES_MAP":
      return {
        ...state,
        sourcesStatisticsMapData: action.payload,
      };
    case "SAVE_SUBJECT_PRO_LIST_FLAG":
      return {
        ...state,
        subjectProListFlag: action.payload,
      };
    case "SAVE_SUBJECT_RESET_BUTTON_FLAG":
      return {
        ...state,
        subjectResetButtonFlag: action.payload,
      };
    case "SAVE_SUBJECT_RESET_WEI_BO_FLAG":
      return {
        ...state,
        subjectWeiboTypeFlag: action.payload,
      };
    case "SAVE_SUBJECT_REPEAT_FLAG":
      return {
        ...state,
        subjectRepeatFlag: action.payload,
      };
    case "SAVE_SUBJECT_SEARCH_QUERY":
      return {
        ...state,
        subjectSearchQuery: action.payload,
      };
    case "SAVE_GET_SUBJECT_THEME_SEARCH":
      return {
        ...state,
        subjectThemeSearch: action.payload,
      };
    case "SAVE_GET_SUBJECT_THEME_SEARCH_FLAG":
      return {
        ...state,
        subjectThemeSearchFlag: action.payload,
      };
    case "SAVE_GET_SUBJECT_SEARCH_VALUE":
      return {
        ...state,
        subjectSearchValue: action.payload,
      };
    default:
      return state;
  }
};

export default hotReducer;
