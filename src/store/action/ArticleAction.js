import {
  getArticleDetail,
  getSameList,
  getSameCount,
  getArticleLabel,
  getSimArticle,
  getSimLiterature,
  getArticleCollect,
  getArticleCancelCollect,
  getDownload,
  getArticleLabelList,
} from "./../../service/api.js";

/**
 * 文章详情 article/articleDetail/{cid}
 */
export const fetchArticleDetail = (cid, type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ARTICLE_DETAIL", payload: true });
    getArticleDetail(cid, type)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ARTICLE_DETAIL", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_ARTICLE_DETAIL", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ARTICLE_DETAIL", payload: false });
      });
  };
};

/**
 * 文章标签接口 GET：/article/articleLabel/{cid}/{type}
 */
export const fetchArticleLabel = (cid, type) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ARTICLE_LABEL", payload: true });
    getArticleLabel(cid, type)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ARTICLE_LABEL", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_ARTICLE_LABEL", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ARTICLE_LABEL", payload: false });
      });
  };
};

/**
 * 相关文章接口 GET：//article/articleSimilarity/{cid}
 */
export const fetchSimArticle = (cid) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SIM_ARTICLE", payload: true });
    getSimArticle(cid)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SIM_ARTICLE", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_SIM_ARTICLE", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SIM_ARTICLE", payload: false });
      });
  };
};


/**
 * 相关文献接口 GET：/article/similarityLiterature/{cid}
 */
export const fetchSimLiterature = (cid) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SIM_LITERATURE", payload: true });
    getSimLiterature(cid)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SIM_LITERATURE", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_SIM_LITERATURE", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SIM_LITERATURE", payload: false });
      });
  };
};

/**
 * 相似文章列表接口 /article/articleSimilarityList/{cid}
 */
export const fetchSameList = (cid) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SAME_LIST", payload: true });
    getSameList(cid)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SAVE_GET_SAME_LIST", payload: response.data.contents});
        }
        dispatch({ type: "FETCHING_GET_SAME_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SAME_LIST", payload: false });
      });
  };
};
/**
 * 文章收藏接口 GET：/article/collect/{cid}/{type}
 */
export const fetchArticleCollect = (params, func) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ARTICLE_COLLECT", payload: true });
    getArticleCollect(params)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SAVE_GET_ARTICLE_COLLECT", payload: response.data.contents});
          func();
        }
        dispatch({ type: "FETCHING_GET_ARTICLE_COLLECT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ARTICLE_COLLECT", payload: false });
      });
  };
};
/**
 * 取消收藏接口 GET：/article/cancelCollect/{cid}/{type}
 */
export const fetchArticleCancelCollect = (params, func) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ARTICLE_CANCEL_COLLECT", payload: true });
    getArticleCancelCollect(params)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "SAVE_GET_ARTICLE_CANCEL_COLLECT", payload: response.data.contents});
          func();
        }
        dispatch({ type: "FETCHING_GET_ARTICLE_CANCEL_COLLECT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ARTICLE_CANCEL_COLLECT", payload: false });
      });
  };
};
/**
 * 重复文章数量接口 GET /article/articleSimilarityCount/{cid}
 */
export const fetchSameCount = (cid) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SAME_COUNT", payload: true });
    getSameCount(cid)
      .then((response) => {
        if (response.status === 200) {
          const { samecount } = response.data;
          const obj = {};
          obj.cid = cid;
          obj.samecount = samecount;
          dispatch({ type: "SAVE_GET_SAME_COUNT", payload: obj });
        }
        dispatch({ type: "FETCHING_GET_SAME_COUNT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SAME_COUNT", payload: false });
      });
  };
};
/**
 * 批量下载 POST：/article/batchDownload
 */
export const fetchDownload = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_DOWNLOAD", payload: true });
    getDownload(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_DOWNLOAD", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_DOWNLOAD", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_DOWNLOAD", payload: false });
      });
  };
};
/**
 * 文章标签页 POST： article/articleLabelList
 */
export const fetchArticleLabelList = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_ARTICLE_LABEL_LIST", payload: true });
    getArticleLabelList(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_ARTICLE_LABEL_LIST", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_ARTICLE_LABEL_LIST", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_ARTICLE_LABEL_LIST", payload: false });
      });
  };
};

/**
 * 标签页资讯，微博等类型name
 */
export const fetchTabsTypeName = (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_TABS_TYPE_NAME", payload: params});
  };
};
