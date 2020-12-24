import moment from "moment";
import {
  getMeetingList,
} from "./../../service/api.js";

/**
 *  会议列表页  /meeting/meetingList
 */

let proList = null;
let webList = null;
export const fetchMeetingList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_MEETING_LIST", payload: true });
    getMeetingList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          proList = response.data.data && response.data.data.proList;
          webList = response.data.data && response.data.data.webList;
          dispatch({
            type: "SAVE_GET_MEETING_LIST",
            payload:{
              ...response.data.data,
              timeCompare: moment().unix(),
              meetingProList: proList,
              meetingWebList: webList
            }
          });
        }
        dispatch({ type: "FETCHING_GET_MEETING_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_MEETING_LIST", payload: false });
      });
  };
};

/**
 *  会议 控制分组浏览地区分布的显示
 */

export const fetchMeetingProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_PRO_LIST_FLAG", payload: params});
  };
};

/**
 *  会议 控制分组浏览语种分类的显示
 */

export const fetchMeetingLanguageList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_LANGUAGE_LIST_FLAG", payload: params});
  };
};

/**
 *  会议 控制分组浏览语种分类的显示
 */

export const fetchMeetingWebList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_WEB_LIST_FLAG", payload: params});
  };
};

/**
 *  会议 判断按钮是否重新渲染回到默认第一个
 */

export const fetchMeetingResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_RESET_BUTTON_FLAG", payload: params});
  };
};

/**
 *  会议 存储直接点击地区，来源等
 */
export const fetchMeetingQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_QUERY", payload: params});
  };
};

/**
 *  会议 日期搜索
 */

export const fetchMeetingDateQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_DATE_QUERY", payload: params});
  };
};

/**
 *  会议 保存日期
 */

export const fetchMeetingDate = (params = ["", ""]) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_DATE", payload: params});
  };
};

/**
 * 会议 主题检索
 */
export const fetchMeetingThemeSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_MEETING_THEME_SEARCH", payload: str});
  };
};


/**
 * 会议 模糊搜索重新渲染
 */

export const fetchMeetingResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_MEETING_LIST", payload: params});
  };
};

/**
 * 会议 主题内检索和排序之间的flag
 */
export const fetchMeetingThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_MEETING_THEME_SEARCH_FLAG", payload: params});
  };
};

/**
 * 会议 收藏触发render
 */

export const fetchMeetingCollect = (str) => {
  return (dispatch) => {
    dispatch({type: "SAVE_MEETING_COLLECT", payload: str});
  };
};

/**
 * 热点 search搜索框的value
 */
export const fetchMeetingSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_MEETING_SEARCH_VALUE", payload: params});
  };
};


