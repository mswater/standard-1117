
const init = {
  fetchMeetingListLoading:false,
  //  会议列表页
  meetingData:{
    page:{
      resultList:[],
      rowCount:0
    },
    webList:[],
    proList:[]
  },
  meetingProListFlag: false,
  meetingResetButtonFlag: false,
  meetingSearchQuery: "",
  meetingDate: ["", ""],
  meetingDateQuery: [],
  meetingThemeSearch:"",
  meetingThemeSearchFlag:false,
  meetingCollect:"",
  meetingSearchValue: "",
  meetingLanguageListFlag:false,
  meetingWebListFlag:false,
};
const meetingReducer = (state = init, action) => {
  switch (action.type) {
    // 文章详情
    case "FETCHING_GET_MEETING_LIST":
      return {
        ...state,
        fetchMeetingListLoading: action.payload,
      };
    case "SAVE_GET_MEETING_LIST":
      return {
        ...state,
        meetingData: action.payload,
      };
    case "SAVE_MEETING_PRO_LIST_FLAG":
      return {
        ...state,
        meetingProListFlag: action.payload,
      };
    case "SAVE_MEETING_LANGUAGE_LIST_FLAG":
      return {
        ...state,
        meetingLanguageListFlag: action.payload,
      };
    case "SAVE_MEETING_WEB_LIST_FLAG":
      return {
        ...state,
        meetingWebListFlag: action.payload,
      };
    case "SAVE_MEETING_RESET_BUTTON_FLAG":
      return {
        ...state,
        meetingResetButtonFlag: action.payload,
      };
    case "SAVE_MEETING_DATE_QUERY":
      return {
        ...state,
        meetingDateQuery: action.payload,
      };
    case "SAVE_MEETING_DATE":
      return {
        ...state,
        meetingDate: action.payload,
      };
    case "SAVE_GET_MEETING_THEME_SEARCH":
      return {
        ...state,
        meetingThemeSearch: action.payload,
      };
    case "SAVE_MEETING_QUERY":
      return {
        ...state,
        meetingSearchQuery: action.payload,
      };
    case "SAVE_GET_MEETING_THEME_SEARCH_FLAG":
      return {
        ...state,
        meetingThemeSearchFlag: action.payload,
      };
    case "SAVE_MEETING_COLLECT":
      return {
        ...state,
        meetingCollect: action.payload,
      };
    case "SAVE_GET_MEETING_SEARCH_VALUE":
      return {
        ...state,
        meetingSearchValue: action.payload,
      };
    default:
      return state;
  }
};

export default meetingReducer;
