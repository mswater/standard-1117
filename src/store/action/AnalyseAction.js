import {
  getAnalyse,
  getAnalyseContentList,
  getAnalyseDataCompar,
  getAnalyseTendencyCompar
} from "./../../service/api.js";


/**
 * 行业分析分级列表 页面menu get请求
 */
export const fetchAnalyseList = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ANALYSE_LIST", payload: true });
    getAnalyse()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ANALYSE_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ANALYSE_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ANALYSE_LIST", payload: false });
      });
  };
};

/**
 * 行业分析文章列表接口 POST：  /analyse/analyseArticleList
 */
export const fetchAnalyseContentList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ANALYSE_CONTENT_LIST", payload: true });
    getAnalyseContentList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ANALYSE_CONTENT_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ANALYSE_CONTENT_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ANALYSE_CONTENT_LIST", payload: false });
      });
  };
};

/**
 * 行业分析数据对比接口 POST： /analyse/dataCompar/{type}/{pid}
 */
export const fetchAnalyseDataCompar = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ANALYSE_DATA_COMPAR", payload: true });
    getAnalyseDataCompar(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ANALYSE_DATA_COMPAR", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ANALYSE_DATA_COMPAR", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ANALYSE_DATA_COMPAR", payload: false });
      });
  };
};

/**
 * 行业分析 趋势对比接口 POST： analyse/tendencyCompar
 */
export const fetchAnalyseTendencyCompar = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ANALYSE_TREND_COMPAR", payload: true });
    getAnalyseTendencyCompar(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ANALYSE_TREND_COMPAR", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ANALYSE_TREND_COMPAR", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ANALYSE_TREND_COMPAR", payload: false });
      });
  };
};



/**
 * 行业分析分级列表 判断按钮是否重新渲染回到默认第一个
 */

export const fetchAnalyseResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_ANALYSE_RESET_BUTTON_FLAG", payload: params});
  };
};

/**
 * 行业分析分级列表 联动左侧menu和资讯等type
 */

export const fetchAnalyseMenuAndType = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_ANALYSE_MENU_AND_TYPE", payload: params});
  };
};

/**
 * 行业分析分级列表 资讯，微博等类型name
 */

export const fetchAnalyseTypeName = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_ANALYSE_TYPE_NAME", payload: params});
  };
};


/**
 * 行业分析分级列表 左边menu的Key
 */

export const fetchAnalyseMenuKey = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_ANALYSE_MENU_KEY", payload: params});
  };
};


/**
 * 行业分析分级列表 一月 三月 一年点击事件
 */

export const fetchAnalyseDate = (params = 1) => {
  return (dispatch) => {
    dispatch({type: "SAVE_ANALYSE_DATE", payload: params});
  };
};





