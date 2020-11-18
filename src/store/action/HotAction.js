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
            pageSize: 10,
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
 * 热点 控制分组浏览地区分布的显示
 */

export const fetchHotProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_PRO_LIST_FLAG", payload: params});
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
 * 热点 判断是否是微博类型
 */

export const fetchHotResetWeibo = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_RESET_WEI_BO_FLAG", payload: params});
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
 * 热点 存储直接点击地区，来源等
 */

export const fetchHotSearchQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_HOT_SEARCH_QUERY", payload: params});
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
 * 热点 主题内检索和排序之间的flag true时主题内搜索， false 排序
 */
export const fetchHotThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_HOT_THEME_SEARCH_FLAG", payload: params});
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






