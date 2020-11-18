import moment from "moment";

import {
  getSubjectList,
  getSubjectContentList,
  getSubjectDataTrendMap,
  getSubSourcesStatisticsMap
} from "./../../service/api.js";

import {
  fetchSameCount
} from "./ArticleAction.js";

/**
 * 专题监测页面menu get请求
 */
export const fetchSubjectList = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_LIST", payload: true });
    getSubjectList()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          const deadLine = localStorage.getItem("deadLine");
          const topicClassType = localStorage.getItem("topicClassType");
          const topicContact = localStorage.getItem("topicContact");
          const topicLocalId = localStorage.getItem("id");
          const menuId = response.data.data && response.data.data[0]
          && response.data.data[0].childrenKeyWords
          && response.data.data[0].childrenKeyWords[0]
          && response.data.data[0].childrenKeyWords[0].id;
          /* eslint-disable no-use-before-define */
          const params = {
            kid: topicLocalId ? Number(topicLocalId) : menuId,
            deadline: !deadLine ? 1 : Number(deadLine)
          };
          const obj = {
            searchKey: "",
            hId: params.kid,
            sourceType: !topicContact ? 1 : Number(topicContact),
            webList: [],
            proList: [],
            order: "desc",
            orderType:1,
            pageNum: 1,
            pageSize: 10,
          };
          if (!topicLocalId) {
            localStorage.setItem("id", menuId);
          }
          if (!topicClassType || topicClassType === "1") {
            dispatch(fetchSubjectContentList(obj));
          }
          if(topicClassType === "2"){
            // 专题监测-数据量趋势图
            dispatch(fetchSubjectDataTrendMap(params));
            // 专题监测-来源统计图
            dispatch(fetchSubSourcesStatisticsMap(params));
          }
          dispatch({ type: "SAVE_GET_SUBJECT_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_LIST", payload: false });
      });
  };
};



/**
 * 专题内容页列表接口 POST /subject/subjectContentList
 */
let proList = null;
let webList = null;
export const fetchSubjectContentList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_CONTENT_LIST", payload: true });
    getSubjectContentList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          const resultList = response.data.data
            && response.data.data.page
            && response.data.data.page.resultList;
          resultList.forEach((cur) => {
            if(cur.id){
              dispatch(fetchSameCount(cur.id));
            }
          });
          if(!proList) {
            proList = response.data.data && response.data.data.proList;
          }
          if(!webList) {
            webList = response.data.data && response.data.data.webList;
          }
          dispatch({
            type: "SAVE_GET_SUBJECT_CONTENT_LIST",
            payload:{
              ...response.data.data,
              timeCompare: moment().unix(),
              subjectProList: proList,
              subjectWebList: webList
            }
          });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_CONTENT_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_CONTENT_LIST", payload: false });
      });
  };
};

/**
 * 专题数据量趋势图 POST /subject/getDataTrendMap
 */
export const fetchSubjectDataTrendMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_DATA_TREND_MAP", payload: true });
    getSubjectDataTrendMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUBJECT_DATA_TREND_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_DATA_TREND_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_DATA_TREND_MAP", payload: false });
      });
  };
};
/**
 * 专题来源统计 post  /subject/sourcesStatisticsMap
 */
export const fetchSubSourcesStatisticsMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_SOURCES_MAP", payload: true });
    getSubSourcesStatisticsMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUBJECT_SOURCES_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_SOURCES_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_SOURCES_MAP", payload: false });
      });
  };
};


/**
 * 专题监测 控制分组浏览地区分布的显示
 */

export const fetchSubjectProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_PRO_LIST_FLAG", payload: params});
  };
};

/**
 * 专题监测 判断按钮
 */

export const fetchSubjectResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_RESET_BUTTON_FLAG", payload: params});
  };
};


/**
 * 判断是否是微博类型
 */

export const fetchSubjectResetWeibo = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_RESET_WEI_BO_FLAG", payload: params});
  };
};

/**
 * 判断重复文章是否要展开
 */

export const fetchSubjectRepeat = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_REPEAT_FLAG", payload: params});
  };
};

/**
 * 模糊搜索重新渲染
 */

export const fetchSubjectResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_CONTENT_LIST", payload: params});
  };
};


/**
 * 专题监测 存储直接点击地区，来源等
 */

export const fetchSubjectSearchQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_SEARCH_QUERY", payload: params});
  };
};

/**
 * 专题监测 主题内检索
 */
export const fetchSubjectThemeSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_THEME_SEARCH", payload: str});
  };
};

/**
 * 专题监测 主题内检索和排序之间的flag true时主题内搜索， false 排序
 */
export const fetchSubjectThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_THEME_SEARCH_FLAG", payload: params});
  };
};

/**
 * 专题监测 search搜索框的value
 */
export const fetchSubjectSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_SEARCH_VALUE", payload: params});
  };
};






