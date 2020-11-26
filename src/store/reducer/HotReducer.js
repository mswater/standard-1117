const init = {
  fetchHotListLoading: false,
  fetchSugReadingLoading:false,
  fetchHotContentListLoading:false,
  fetchSiteActivityMapLoading:false,
  fetchDataTrendMapLoading:false,
  fetchSourcesStatisticsMapLoading:false,
  fetchSiteMapLoading:false,
  // 热点监测menu
  hotListData:[{
    id: ""
  }],
  // 热点监测推荐阅读
  sugReadingData:{
    dbPrefix:"",
    hownetUrl:"",
    key:{},
    readingList:[]
  },
  // 热点监测列表
  hotContentListData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[]
  },
  // 热点监测图表----站点活跃度统计图
  siteActivityMapData:[],
  // 热点监测-数据量趋势图
  trendMapData:[],
  // 热点监测-来源统计图
  sourcesStatisticsMapData:[],
  // 热点监测-地域热力图
  siteMapData:[],
  hotProListFlag: false,
  hotResetButtonFlag: false,
  hotWeiboTypeFlag: false,
  hotLanguageTypeFlag: false,
  hotSearchQuery: [],
  hotThemeSearch:"",
  hotCheckedNum:{},
  hotThemeSearchFlag: false,
  hotSearchValue: "",
};
const hotReducer = (state = init, action) => {
  switch (action.type) {
    // 热点监测menu
    case "FETCHING_GET_HOST_LIST":
      return {
        ...state,
        fetchHotListLoading: action.payload,
      };
    case "SAVE_GET_HOST_LIST":
      return {
        ...state,
        hotListData: action.payload,
      };
    // 热点监测推荐阅读
    case "FETCHING_GET_SUG_READING":
      return {
        ...state,
        fetchSugReadingLoading: action.payload,
      };
    case "SAVE_GET_SUG_READING":
      return {
        ...state,
        sugReadingData: action.payload,
      };
    // 热点内容页列表接口
    case "FETCHING_GET_HOT_CONTENT_LIST":
      return {
        ...state,
        fetchHotContentListLoading: action.payload,
      };
    case "SAVE_GET_HOT_CONTENT_LIST":
      return {
        ...state,
        hotContentListData: action.payload,
      };
    // 热点监测图表----站点活跃度统计图
    case "FETCHING_GET_SITE_ACTIVITY_MAP":
      return {
        ...state,
        fetchSiteActivityMapLoading: action.payload,
      };
    case "SAVE_GET_SITE_ACTIVITY_MAP":
      return {
        ...state,
        siteActivityMapData: action.payload,
      };
      // 热点监测-数据量趋势图
    case "FETCHING_GET_DATA_TREND_MAP":
      return {
        ...state,
        fetchDataTrendMapLoading: action.payload,
      };
    case "SAVE_GET_DATA_TREND_MAP":
      return {
        ...state,
        trendMapData: action.payload,
      };
      // 热点监测-来源统计图siteMap
    case "FETCHING_GET_SOURCES_MAP":
      return {
        ...state,
        fetchSourcesStatisticsMapLoading: action.payload,
      };
    case "SAVE_GET_SOURCES_MAP":
      return {
        ...state,
        sourcesStatisticsMapData: action.payload,
      };
      //  热点监测-地域热力图
    case "FETCHING_GET_SITE_MAP":
      return {
        ...state,
        fetchSiteMapLoading: action.payload,
      };
    case "SAVE_GET_SITE_MAP":
      return {
        ...state,
        siteMapData: action.payload,
      };
    case "SAVE_HOT_PRO_LIST_FLAG":
      return {
        ...state,
        hotProListFlag: action.payload,
      };
    case "SAVE_HOT_RESET_BUTTON_FLAG":
      return {
        ...state,
        hotResetButtonFlag: action.payload,
      };
    case "SAVE_HOT_RESET_WEI_BO_FLAG":
      return {
        ...state,
        hotWeiboTypeFlag: action.payload,
      };
    case "SAVE_HOT_RESET_LANGUAGE_FLAG":
      return {
        ...state,
        hotLanguageTypeFlag: action.payload,
      };
    case "SAVE_HOT_SEARCH_QUERY":
      return {
        ...state,
        hotSearchQuery: action.payload,
      };
    case "SAVE_GET_HOT_THEME_SEARCH":
      return {
        ...state,
        hotThemeSearch: action.payload,
      };
    case "SAVE_GET_HOT_THEME_SEARCH_FLAG":
      return {
        ...state,
        hotThemeSearchFlag: action.payload,
      };
    case "SAVE_GET_HOT_CHECKED_NUM":
      return {
        ...state,
        hotCheckedNum: action.payload,
      };
    case "SAVE_GET_HOT_SEARCH_VALUE":
      return {
        ...state,
        hotSearchValue: action.payload,
      };
    default:
      return state;
  }
};

export default hotReducer;
