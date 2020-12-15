import moment from "moment";

import {
  getSearch,
} from "./../../service/api.js";

import {
  fetchSameCount
} from "./ArticleAction.js";

/**
 * 检索词列表页 POST： /search/searchKey
 */

let proList = null;
let webList = null;
export const fetchSearch = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SEARCH", payload: true });
    getSearch(params)
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
            type: "SAVE_GET_SEARCH",
            payload:{
              ...response.data.data,
              timeCompare: moment().unix(),
              searchProList: proList,
              searchWebList: webList
            }
          });
        }
        dispatch({ type: "FETCHING_GET_SEARCH", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SEARCH", payload: false });
      });
  };
};

/**
 * 检索词列表页 控制分组浏览地区分布的显示
 */

export const fetchSearchProList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_PRO_LIST_FLAG", payload: params});
  };
};


/**
 * 检索词列表页 控制分组浏览语种分类的显示
 */

export const fetchSearchLanguageList = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_LANGUAGE_FLAG", payload: params});
  };
};

/**
 * 检索词列表页 判断按钮是否重新渲染回到默认第一个
 */

export const fetchSearchResetButton = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_RESET_BUTTON_FLAG", payload: params});
  };
};


/**
 * 检索词列表页 判断是否是微博类型
 */

export const fetchSearchResetWeibo = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_RESET_WEI_BO_FLAG", payload: params});
  };
};


/**
 * 检索词列表页 判断重复文章是否要展开
 */

export const fetchSearchRepeat = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_REPEAT_FLAG", payload: params});
  };
};

/**
 * 检索词列表页 模糊搜索重新渲染
 */

export const fetchSearchResetFuzzyQuery = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SEARCH", payload: params});
  };
};

/**
 * 检索词列表页 存储直接点击地区，来源等
 */
export const fetchSearchQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_QUERY", payload: params});
  };
};

/**
 * 检索词列表页 日期搜索
 */

export const fetchSearchDateQuery = (params = []) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_DATE_QUERY", payload: params});
  };
};

/**
 * 检索词列表页 保存日期
 */

export const fetchSearchDate = (params = ["", ""]) => {
  return (dispatch) => {
    dispatch({type: "SAVE_SEARCH_DATE", payload: params});
  };
};

/**
 * 检索词列表页 主题内检索和排序之间的flag
 */
export const fetchSearchThemeSearchFlag= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SEARCH_THEME_SEARCH_FLAG", payload: params});
  };
};

/**
 * 检索词列表页 search搜索框的value
 */
export const fetchSearchValue = (params = "") => {
  return (dispatch) => {
    dispatch({type: "SAVE_GET_SEARCH_VALUE", payload: params});
  };
};
