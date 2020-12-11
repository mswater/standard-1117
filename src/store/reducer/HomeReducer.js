const init = {
  fetchHotEnglishWordsLoading: false,
  fetchHotWordsLoading: false,
  fetchHotInformationLoading:false,
  fetchHotTopicLoading:false,
  fetchBriefReportLoading:false,
  fetchActiveAuthorLoading:false,
  fetchNewestLiteratureLoading:false,
  fetchSubjectTopicLoading:false,
  fetchHotSubjectLoading:false,
  fetchMeetingLoading:false,
  // 英文关键词
  englishData:[],
  // 中文关键词
  chineseData:[],
  // 热门资讯
  infoData:[],
  // 热点监测
  hotData:[{
    name: "",
    contentList: []
  }],
  // 简报
  reportData:[],
  // 活跃作者
  authorData:[],
  // 学科专题
  subjectData:[{
    name: "",
  }],
  // 最新文献
  newestLiteratureData: {
    literatureDetailDtos: [],
    type: 1
  },
  // 首页热门主题图
  hotSubjectData:{},
  // 首页国内会议
  meetingHomeData:[],
  // 首页国外会议
  meetingAboardData:[],
  headerSearchContent: "",
  // 会议tab 默认国内
  conferenceTab:"home",
};
const homeReducer = (state = init, action) => {
  switch (action.type) {
    // 英文关键词
    case "FETCHING_GET_ENGLISH":
      return {
        ...state,
        fetchHotEnglishWordsLoading: action.payload,
      };
    case "SAVE_GET_ENGLISH":
      return {
        ...state,
        englishData: action.payload,
      };
    // 中文热门关键词
    case "FETCHING_GET_WORD":
      return {
        ...state,
        fetchHotWordsLoading: action.payload,
      };
    case "SAVE_GET_WORD":
      return {
        ...state,
        chineseData: action.payload,
      };
      // 热门资讯
    case "FETCHING_GET_INFORMATION":
      return {
        ...state,
        fetchHotInformationLoading: action.payload,
      };
    case "SAVE_GET_INFORMATION":
      return {
        ...state,
        infoData: action.payload,
      };
      // 热点监测
    case "FETCHING_GET_TOPIC":
      return {
        ...state,
        fetchHotTopicLoading: action.payload,
      };
    case "SAVE_GET_TOPIC":
      return {
        ...state,
        hotData: action.payload,
      };
    // 学科专题
    case "FETCHING_SUBJECT_TOPIC":
      return {
        ...state,
        fetchSubjectTopicLoading: action.payload,
      };
    case "SAVE_SUBJECT_TOPIC":
      return {
        ...state,
        subjectData: action.payload,
      };
    // 简报
    case "FETCHING_GET_REPORT":
      return {
        ...state,
        fetchBriefReportLoading: action.payload,
      };
    case "SAVE_GET_REPORT":
      return {
        ...state,
        reportData: action.payload,
      };
    // 活跃作者
    case "FETCHING_GET_AUTHOR":
      return {
        ...state,
        fetchActiveAuthorLoading: action.payload,
      };
    case "SAVE_GET_AUTHOR":
      return {
        ...state,
        authorData: action.payload,
      };
    // 最新文献
    case "FETCHING_GET_NEW":
      return {
        ...state,
        fetchNewestLiteratureLoading: action.payload,
      };
    case "SAVE_GET_NEW":
      return {
        ...state,
        newestLiteratureData: action.payload,
      };
      // 首页热门主题图
    case "FETCHING_GET_HOT_SUBJECT":
      return {
        ...state,
        fetchHotSubjectLoading: action.payload,
      };
    case "SAVE_GET_HOT_SUBJECT":
      return {
        ...state,
        hotSubjectData: action.payload,
      };
      // 首页会议
    case "FETCHING_GET_MEETING":
      return {
        ...state,
        fetchMeetingLoading: action.payload,
      };
    case "SAVE_GET_MEETING":
      return {
        ...state,
        meetingHomeData: action.payload,
      };
    case "SAVE_ABOARD_MEETING":
      return {
        ...state,
        meetingAboardData: action.payload,
      };
    case "SAVE_GET_HEADER_SEARCH":
      return {
        ...state,
        headerSearchContent: action.payload,
      };
    case "CHANGE_CONFERENCE_TAB":
      return {
        ...state,
        conferenceTab: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
