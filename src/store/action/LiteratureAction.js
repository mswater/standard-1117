import {
  getLiteratureList,
  getLiteratureContentList,
} from "./../../service/api.js";


/**
 * 文献中心-文献分类列表 GET： /literature/docClassList
 */
export const fetchLiteratureList = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_LITERATURE_LIST", payload: true });
    getLiteratureList()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_LITERATURE_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_LITERATURE_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_LITERATURE_LIST", payload: false });
      });
  };
};

/**
 * 文献中心-文献内容页 POST  /literature/docContentList
 *
 */

let webList = null;
export const fetchLiteratureContentList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_LITERATURE_CONTENT_LIST", payload: true });
    getLiteratureContentList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          if(!webList) {
            webList = response.data.data && response.data.data.webList;
          }
          dispatch({
            type: "SAVE_GET_LITERATURE_CONTENT_LIST",
            payload: {
              ...response.data.data,
              literatureWebList: webList
            }
          });
        }
        dispatch({ type: "FETCHING_GET_LITERATURE_CONTENT_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_LITERATURE_CONTENT_LIST", payload: false });
      });
  };
};



/**
 * 文献中心 模糊搜索重新渲染
 */

export const fetchLiteratureResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_LITERATURE_CONTENT_LIST", payload: params});
  };
};
/**
 * 文献中心 关键词左边边选择作者，单位等
 */

export const fetchLiteratureSelectQuery = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_SELECT_QUERY", payload: params});
  };
};
/**
 * 文献中心 关键词右边输入的 检索词搜索
 */

export const fetchLiteratureSearchQuery = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_SEARCH_QUERY", payload: params});
  };
};
/**
 * 文献中心 主题内检索和排序之间的flag
 */
export const fetchLiteratureThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_LITERATURE_THEME_SEARCH_FLAG", payload: params});
  };
};
/**
 * 文献中心 存储来源网站等
 */

export const fetchLiteratureWebsite = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_WEBSITE", payload: params});
  };
};
/**
 * 文献中心 日期搜索
 */

export const fetchLiteratureDateQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_DATE_QUERY", payload: params});
  };
};

/**
 * 文献中心 保存日期
 */

export const fetchLiteratureDate = (params = ["", ""]) => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_DATE", payload: params});
  };
};

/**
 * 文献中心 保存关键词右边输入的搜索
 */

export const fetchLiteratureSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_SEARCH_VALUE", payload: params});
  };
};

/**
 * 文献中心 判断按钮是否重新渲染回到默认第一个
 */

export const fetchLiteratureResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_RESET_BUTTON_FLAG", payload: params});
  };
};

/**
 * 文献中心 收藏触发render
 */

export const fetchLiteratureCollect = (str) => {
  return (dispatch) => {
    dispatch({type: "SAVE_LITERATURE_COLLECT", payload: str});
  };
};

/**
 * 文献中心 search搜索框的value
 */
export const fetchLiteratureSearchValueFun = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_LITERATURE_SEARCH_VALUE", payload: params});
  };
};





