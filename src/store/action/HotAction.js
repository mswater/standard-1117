import moment from "moment";

import {
  getHotList,
  getSugReading,
  getHotContentList,
  getSiteActivityMap,
  getDataTrendMap,
  getSourcesStatisticsMap,
  getSiteMap,
} from "./../../service/api.js";

import {
  fetchSameCount
} from "./ArticleAction.js";

/**
 * 热点监测页面menu get请求
 */
export const fetchHotList = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_HOST_LIST", payload: true });
    getHotList()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          // 从localStorage取值
          const deadLine = localStorage.getItem("deadLine");
          const hotClassType = localStorage.getItem("hotClassType");
          const hotContact = localStorage.getItem("hotContact");
          const readLocalId = localStorage.getItem("readingId");
          const readingId = response.data.data
          && response.data.data[0] && response.data.data[0].id;
          // 参数
          const params = {
            kid: readLocalId ? Number(readLocalId) : readingId,
            deadline: !deadLine ? 1 : Number(deadLine),
          };
          const obj = {
            searchKey: "",
            hId: params.kid,
            sourceType: !hotContact ? 1 : Number(hotContact),
            webList: [],
            proList: [],
            order:"desc",
            orderType:1,
            pageNum: 1,
            pageSize: 5,
          };
          if (!readLocalId) {
            localStorage.setItem("readingId", readingId);
          }
          /* eslint-disable no-use-before-define */
          dispatch(fetchSugReading(params.kid));
          if (!hotClassType || hotClassType === "1") {
            dispatch(fetchHotContentList(obj));
          }
          if (hotClassType === "2") {
            // 热点监测-站点活跃度统计图
            dispatch(fetchSiteActivityMap(params));
            // 热点监测-数据量趋势图
            dispatch(fetchDataTrendMap(params));
            // 热点监测-来源统计图
            dispatch(fetchSourcesStatisticsMap(params));
            // 热点监测-地域热力图
            dispatch(fetchSiteMap(params));
          }
          dispatch({ type: "SAVE_GET_HOST_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_HOST_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_HOST_LIST", payload: false });
      });
  };
};

/**
 * 学科专题页面menu get请求
 */
export const fetchSubjectList = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_LIST", payload: true });
    getHotList()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          // 从localStorage取值
          const deadLine = localStorage.getItem("deadLine");
          const hotClassType = localStorage.getItem("hotClassType");
          const hotContact = localStorage.getItem("hotContact");
          const readLocalId = localStorage.getItem("readingId");
          const readingId = response.data.data
            && response.data.data[0] && response.data.data[0].id;
          // 参数
          const params = {
            kid: readLocalId ? Number(readLocalId) : readingId,
            deadline: !deadLine ? 1 : Number(deadLine),
          };
          const obj = {
            searchKey: "",
            hId: params.kid,
            sourceType: !hotContact ? 1 : Number(hotContact),
            webList: [],
            proList: [],
            order:"desc",
            orderType:1,
            pageNum: 1,
            pageSize: 5,
          };
          if (!readLocalId) {
            localStorage.setItem("readingId", readingId);
          }
          /* eslint-disable no-use-before-define */
          dispatch(fetchSugReading(params.kid));
          if (!hotClassType || hotClassType === "1") {
            dispatch(fetchHotContentList(obj));
          }
          if (hotClassType === "2") {
            // 热点监测-站点活跃度统计图
            dispatch(fetchSiteActivityMap(params));
            // 热点监测-数据量趋势图
            dispatch(fetchDataTrendMap(params));
            // 热点监测-来源统计图
            dispatch(fetchSourcesStatisticsMap(params));
            // 热点监测-地域热力图
            dispatch(fetchSiteMap(params));
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
 * 热点监测页面 推荐阅读 请求GET /hot/sugreading/{hId}
 */
export const fetchSugReading = (id) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUG_READING", payload: true });
    getSugReading(id)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUG_READING", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUG_READING", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUG_READING", payload: false });
      });
  };
};
/**
 * 热点内容页列表接口 POST /hot/hotContentList
 */

let proList = null;
let webList = null;
export const fetchHotContentList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_HOT_CONTENT_LIST", payload: true });
    getHotContentList(params)
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
            type: "SAVE_GET_HOT_CONTENT_LIST",
            payload: {
              ...response.data.data,
              timeCompare: moment().unix(),
              hotProList: proList,
              hotWebList: webList
            }
          });
        }
        dispatch({ type: "FETCHING_GET_HOT_CONTENT_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_HOT_CONTENT_LIST", payload: false });
      });
  };
};
/**
 * 学科专题内容页列表接口 POST /hot/hotContentList
 *  共用同一接口，不同参数
 */

let proList = null;
let webList = null;
export const fetchSubjectContentList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_CONTENT_LIST", payload: true });
    getHotContentList(params)
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
            payload: {
              ...response.data.data,
              timeCompare: moment().unix(),
              hotProList: proList,
              hotWebList: webList
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
 * 热点监测-站点活跃度统计图 /hot/siteActivityMap
 */
export const fetchSiteActivityMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SITE_ACTIVITY_MAP", payload: true });
    getSiteActivityMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SITE_ACTIVITY_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SITE_ACTIVITY_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SITE_ACTIVITY_MAP", payload: false });
      });
  };
};

/**
 * 学科专题-站点活跃度统计图 /hot/siteActivityMap
 * 共用一套接口，不同数据
 */
export const fetchSubjectSiteActivityMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_SITE_ACTIVITY_MAP", payload: true });
    getSiteActivityMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUBJECT_SITE_ACTIVITY_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_SITE_ACTIVITY_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_SITE_ACTIVITY_MAP", payload: false });
      });
  };
};
/**
 * 热点监测-数据量趋势图 POST：/hot/getDataTrendMap
 */
export const fetchDataTrendMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_DATA_TREND_MAP", payload: true });
    getDataTrendMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_DATA_TREND_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_DATA_TREND_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_DATA_TREND_MAP", payload: false });
      });
  };
};
/**
 * 学科专题-数据量趋势图 POST：/hot/getDataTrendMap
 * 共用一套接口，不同数据
 */
export const fetchSubjectDataTrendMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_DATA_TREND_MAP", payload: true });
    getDataTrendMap(params)
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
 * 热点监测-来源统计图 POST：/hot/sourcesStatisticsMap
 */
export const fetchSourcesStatisticsMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SOURCES_MAP", payload: true });
    getSourcesStatisticsMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SOURCES_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SOURCES_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SOURCES_MAP", payload: false });
      });
  };
};

/**
 * 学科专题-来源统计图 POST：/hot/sourcesStatisticsMap
 * 共用一套接口，不同数据
 */
export const fetchSubjectSourcesStatisticsMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_SOURCES_MAP", payload: true });
    getSourcesStatisticsMap(params)
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
 * 热点监测-地域热力图 POST：/hot/getSiteMap
 */
export const fetchSiteMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SITE_MAP", payload: true });
    getSiteMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SITE_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SITE_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SITE_MAP", payload: false });
      });
  };
};

/**
 * 学科专题-地域热力图 POST：/hot/getSiteMap
 * 共用一套接口，不同数据
 */
export const fetchSubjectSiteMap = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SUBJECT_SITE_MAP", payload: true });
    getSiteMap(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SUBJECT_SITE_MAP", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SUBJECT_SITE_MAP", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SUBJECT_SITE_MAP", payload: false });
      });
  };
};

/**
 * 热点 控制分组浏览地区分布的显示
 */

export const fetchHotProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_PRO_LIST_FLAG", payload: params});
  };
};

/**
 * 学科专题 控制分组浏览地区分布的显示
 */

export const fetchSubjectProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_PRO_LIST_FLAG", payload: params});
  };
};

/**
 * 热点 判断按钮是否重新渲染回到默认第一个
 */

export const fetchHotResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_RESET_BUTTON_FLAG", payload: params});
  };
};

/**
 * 学科专题 判断按钮是否重新渲染回到默认第一个
 */

export const fetchSubjectResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_RESET_BUTTON_FLAG", payload: params});
  };
};

/**
 * 热点 判断是否是微博类型
 */

export const fetchHotResetWeibo = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_RESET_WEI_BO_FLAG", payload: params});
  };
};

/**
 * 学科专题 判断是否是微博类型
 */

export const fetchSubjectResetWeibo = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_RESET_WEI_BO_FLAG", payload: params});
  };
};

/**
 * 热点 判断是否是语种分类
 */

export const fetchHotResetLanguage = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_RESET_LANGUAGE_FLAG", payload: params});
  };
};

/**
 * 学科专题 判断是否是语种分类
 */

export const fetchSubjectResetLanguage = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_RESET_LANGUAGE_FLAG", payload: params});
  };
};

/**
 * 热点 模糊搜索重新渲染
 */

export const fetchHotResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_CONTENT_LIST", payload: params});
  };
};

/**
 * 学科专题 模糊搜索重新渲染
 */

export const fetchSubjectResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_CONTENT_LIST", payload: params});
  };
};

/**
 * 热点 存储直接点击地区，来源等
 */

export const fetchHotSearchQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_SEARCH_QUERY", payload: params});
  };
};

/**
 * 学科专题 存储直接点击地区，来源等
 */

export const fetchSubjectSearchQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SUBJECT_SEARCH_QUERY", payload: params});
  };
};

/**
 * 热点 主题内检索
 */
export const fetchHotThemeSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_THEME_SEARCH", payload: str});
  };
};

/**
 * 学科专题 主题内检索
 */
export const fetchSubjectThemeSearch= (str = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_THEME_SEARCH", payload: str});
  };
};

/**
 * 热点 主题内检索和排序之间的flag true时主题内搜索， false 排序
 */
export const fetchHotThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_THEME_SEARCH_FLAG", payload: params});
  };
};

/**
 * 学科专题 主题内检索和排序之间的flag true时主题内搜索， false 排序
 */
export const fetchSubjectThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_THEME_SEARCH_FLAG", payload: params});
  };
};

/**
 * 热点 记录选中的数据
 */
export const fetchHotCheckedNum= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_CHECKED_NUM", payload: params});
  };
};

/**
 * 热点 search搜索框的value
 */
export const fetchHotSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_SEARCH_VALUE", payload: params});
  };
};

/**
 * 学科专题 search搜索框的value
 */
export const fetchSubjectSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SUBJECT_SEARCH_VALUE", payload: params});
  };
};

/**
 * 切换subject，更换其对应的背景图
 */
export const changeSubjectBg = (params) => {
  let subjectShortName;
  switch (params) {
    case "123":
      subjectShortName = "nongyekexue";
      break;
    default:
      subjectShortName = "";
  }
  return (dispatch) => {
    dispatch({type:"CHANGE_SUBJECT_BACKGROUND", payload:subjectShortName});
  };
};






