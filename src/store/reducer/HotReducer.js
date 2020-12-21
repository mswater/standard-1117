const init = {
  fetchHotListLoading: false,
  fetchSubjectListLoading: false,
  fetchSugReadingLoading:false,
  fetchHotContentListLoading:false,
  fetchSubjectContentListLoading:false,
  fetchSiteActivityMapLoading:false,
  fetchSubjectSiteActivityMapLoading:false,
  fetchDataTrendMapLoading:false,
  fetchSubjectDataTrendMapLoading:false,
  fetchSourcesStatisticsMapLoading:false,
  fetchSubjectSourcesStatisticsMapLoading:false,
  fetchSiteMapLoading:false,
  fetchSubjectSiteMapLoading:false,
  // 热点监测menu
  hotListData:[{
    id: ""
  }],
  // 学科专题menu
  subjectListData:[{
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
    proList:[],
    languageList:[]
  },
  // 学科专题列表
  subjectContentListData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[],
    languageList:[]
  },
  // 热点监测图表----站点活跃度统计图
  siteActivityMapData:[],
  // 学科专题图表----站点活跃度统计图
  subjectSiteActivityMapData:[],
  // 热点监测-数据量趋势图
  trendMapData:[],
  // 学科专题-数据量趋势图
  subjectTrendMapData:[],
  // 热点监测-来源统计图
  sourcesStatisticsMapData:[],
  // 学科专题-来源统计图
  subjectSourcesStatisticsMapData:[],
  // 热点监测-地域热力图
  siteMapData:[],
  // 学科专题-地域热力图
  subjectSiteMapData:[],
  hotProListFlag: false,
  subjectProListFlag: false,
  hotResetButtonFlag: false,
  subjectResetButtonFlag:false,
  hotWeiboTypeFlag: false,
  subjectWeiboTypeFlag:false,
  hotLanguageTypeFlag: false,
  subjectLanguageTypeFlag: false,
  hotSearchQuery: [],
  subjectSearchQuery:[],
  hotThemeSearch:"",
  subjectThemeSearch: "",
  hotCheckedNum:{},
  hotThemeSearchFlag: false,
  subjectThemeSearchFlag: false,
  hotSearchValue: "",
  subjectSearchValue:"",
  // 学科专题大背景图  默认作物科学栏目
  subjectBigBg:"zuowukexue",
  // 学科专题 日期搜索range
  subjectStartDate:"",
  subjectEndDate:"",
  // 行业动态  日期搜索range
  hotStartDate:"",
  hotEndDate:"",
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
    // 学科专题menu
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
    // 学科专题内容页列表接口
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
    // 学科专题图表----站点活跃度统计图
    case "FETCHING_GET_SUBJECT_SITE_ACTIVITY_MAP":
      return {
        ...state,
        fetchSubjectSiteActivityMapLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_SITE_ACTIVITY_MAP":
      return {
        ...state,
        subjectSiteActivityMapData: action.payload,
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
    // 学科专题-数据量趋势图
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
    // 学科专题-来源统计图siteMap
    case "FETCHING_GET_SUBJECT_SOURCES_MAP":
      return {
        ...state,
        fetchSubjectSourcesStatisticsMapLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_SOURCES_MAP":
      return {
        ...state,
        subjectSourcesStatisticsMapData: action.payload,
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
    //  学科专题-地域热力图
    case "FETCHING_GET_SUBJECT_SITE_MAP":
      return {
        ...state,
        fetchSubjectSiteMapLoading: action.payload,
      };
    case "SAVE_GET_SUBJECT_SITE_MAP":
      return {
        ...state,
        subjectSiteMapData: action.payload,
      };
      // 热点  分组浏览地区分布
    case "SAVE_HOT_PRO_LIST_FLAG":
      return {
        ...state,
        hotProListFlag: action.payload,
      };
      // 学科专题  分组浏览地区分布
    case "SAVE_SUBJECT_PRO_LIST_FLAG":
      return {
        ...state,
        subjectProListFlag: action.payload,
      };
    case "SAVE_HOT_RESET_BUTTON_FLAG":
      return {
        ...state,
        hotResetButtonFlag: action.payload,
      };
    case "SAVE_SUBJECT_RESET_BUTTON_FLAG":
      return {
        ...state,
        subjectResetButtonFlag: action.payload,
      };
      // 热点  微博
    case "SAVE_HOT_RESET_WEI_BO_FLAG":
      return {
        ...state,
        hotWeiboTypeFlag: action.payload,
      };
      // 学科专题  微博
    case "SAVE_SUBJECT_RESET_WEI_BO_FLAG":
      return {
        ...state,
        subjectWeiboTypeFlag: action.payload,
      };
      // 热点  语种分类
    case "SAVE_HOT_RESET_LANGUAGE_FLAG":
      return {
        ...state,
        hotLanguageTypeFlag: action.payload,
      };
      // 学科专题  语种分类
    case "SAVE_SUBJECT_RESET_LANGUAGE_FLAG":
      return {
        ...state,
        subjectLanguageTypeFlag: action.payload,
      };
      // 热点
    case "SAVE_HOT_SEARCH_QUERY":
      return {
        ...state,
        hotSearchQuery: action.payload,
      };
      // 学科专题
    case "SAVE_SUBJECT_SEARCH_QUERY":
      return {
        ...state,
        subjectSearchQuery: action.payload,
      };
      // 热点   主题内搜索
    case "SAVE_GET_HOT_THEME_SEARCH":
      return {
        ...state,
        hotThemeSearch: action.payload.searchKey,
        hotStartDate: action.payload.hotStartDate,
        hotEndDate: action.payload.hotEndDate,
      };
      // 学科专题   主题内搜索
    case "SAVE_GET_SUBJECT_THEME_SEARCH":
      return {
        ...state,
        subjectThemeSearch: action.payload.searchKey,
        subjectStartDate: action.payload.subjectStartDate,
        subjectEndDate: action.payload.subjectEndDate,
      };
      // 热点
    case "SAVE_GET_HOT_THEME_SEARCH_FLAG":
      return {
        ...state,
        hotThemeSearchFlag: action.payload,
      };
    // 学科专题
    case "SAVE_GET_SUBJECT_THEME_SEARCH_FLAG":
      return {
        ...state,
        subjectThemeSearchFlag: action.payload,
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
    case "SAVE_GET_SUBJECT_SEARCH_VALUE":
      return {
        ...state,
        subjectSearchValue: action.payload,
      };
    case "CHANGE_SUBJECT_BACKGROUND":
      return {
        ...state,
        subjectBigBg: action.payload,
      };
    default:
      return state;
  }
};

export default hotReducer;
