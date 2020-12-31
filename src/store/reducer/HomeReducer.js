const init = {
  fetchHotTopicLoading:false,
  fetchBriefReportLoading:false,
  fetchSubjectTopicLoading:false,
  fetchMeetingLoading:false,
  // 热点监测
  hotData:[{
    name: "",
    contentList: []
  }],
  // 简报
  reportData:[],
  // 学科专题
  subjectData:[{
    name: "",
  }],
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
