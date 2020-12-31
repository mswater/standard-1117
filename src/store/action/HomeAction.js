import {
  getHotTopic,
  getBriefReport,
  getStat,
  getMeeting
} from "./../../service/api.js";


/**
 * 首页热点监测get请求
 */
export const fetchHotTopic= (type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_TOPIC", payload: true });
    getHotTopic(type)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_TOPIC", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_TOPIC", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_TOPIC", payload: false });
      });
  };
};
/**
 * 首页学科专题get请求
 */
export const fetchSubjectTopic= (type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_SUBJECT_TOPIC", payload: true });
    getHotTopic(type, 1)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_SUBJECT_TOPIC", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_SUBJECT_TOPIC", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_SUBJECT_TOPIC", payload: false });
      });
  };
};

/**
 * 首页简报get请求
 */
export const fetchBriefReport= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_REPORT", payload: true });
    getBriefReport()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_REPORT", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_REPORT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_REPORT", payload: false });
      });
  };
};
/**
 * 首页对比数据接口GET： /statistics/comparisonData/{pageSize}
 * 首页对比数据接口GET：/hot/comparisonData/{type} // 改
 */
export const fetchStat= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_STAT", payload: true });
    getStat()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_STAT", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_STAT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_STAT", payload: false });
      });
  };
};
/**
 * 首页会议 GET： /meeting/meeting/{pageSize}/{type}
 * type = 1
 */
export const fetchMeeting= (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_MEETING", payload: true });
    getMeeting(params)
      .then((response) => {
        if (response.status === 200  && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_MEETING", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_MEETING", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_MEETING", payload: false });
      });
  };
};

/**
 * 首页国外会议 GET： /meeting/meeting/{pageSize}/{type}
 * type = 2
 */
export const fetchAboardMeeting= (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_MEETING", payload: true });
    getMeeting(params)
      .then((response) => {
        if (response.status === 200  && response.data.status === "OK") {
          dispatch({ type: "SAVE_ABOARD_MEETING", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_MEETING", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_MEETING", payload: false });
      });
  };
};

/**
 * header搜索
 */
export const fetchHeaderSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HEADER_SEARCH", payload: str});
  };
};

/**
 * 切换会议tab
 */
export const changeConferenceTab = (params) => {
  return (dispatch) => {
    dispatch({type: "CHANGE_CONFERENCE_TAB", payload: params});
  };
};

