import {
  getHotEnglishWords,
  getHotInformation,
  getHotTopic,
  getHotWords,
  getBriefReport,
  getActiveAuthor,
  getNewestLiterature,
  getSubject,
  getStat,
  getRecommendtLiterature,
  getHotSubject,
  getMeeting
} from "./../../service/api.js";


/**
 * 首页面英文热门关键词get请求
 */
export const fetchHotEnglishWords = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ENGLISH", payload: true });
    getHotEnglishWords()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ENGLISH", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ENGLISH", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ENGLISH", payload: false });
      });
  };
};
/**
 * 首页面中文热门关键词get请求
 */
export const fetchHotWords = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_WORD", payload: true });
    getHotWords()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_WORD", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_WORD", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_WORD", payload: false });
      });
  };
};
/**
 * 首页面热门资讯get请求
 */
export const fetchHotInformation = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_INFORMATION", payload: true });
    getHotInformation()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_INFORMATION", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_INFORMATION", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_INFORMATION", payload: false });
      });
  };
};
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
 * 首页活跃作者get请求
 */
export const fetchActiveAuthor= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_AUTHOR", payload: true });
    getActiveAuthor()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_AUTHOR", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_AUTHOR", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_AUTHOR", payload: false });
      });
  };
};

/**
 * 首页最新文献get请求
 */
export const fetchNewestLiterature= (type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_NEW", payload: true });
    getNewestLiterature(type)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_NEW", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_NEW", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_NEW", payload: false });
      });
  };
};
/**
 * 首页推荐文献get请求
 */
export const fetchRecommendLiterature= (type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_RECOMMEND", payload: true });
    getRecommendtLiterature(type)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_RECOMMEND", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_RECOMMEND", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_RECOMMEND", payload: false });
      });
  };
};

/**
 * 首页专题监测get请求
 */
export const fetchSubject= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT", payload: true });
    getSubject()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUBJECT", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT", payload: false });
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
 * 首页热门主题图 GET： /literature/hotSubject/{pageSize}
 */
export const fetchHotSubject= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_HOT_SUBJECT", payload: true });
    getHotSubject()
      .then((response) => {
        if (response.status === 200  && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_HOT_SUBJECT", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_HOT_SUBJECT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_HOT_SUBJECT", payload: false });
      });
  };
};
/**
 * 首页会议 GET： /meeting/meeting/{pageSize}
 */
export const fetchMeeting= () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_MEETING", payload: true });
    getMeeting()
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
 * header搜索
 */
export const fetchHeaderSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HEADER_SEARCH", payload: str});
  };
};

