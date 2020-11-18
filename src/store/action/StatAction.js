import {
  getStatCollectionSource,
  getKeySource,
} from "./../../service/api.js";

/**
 * 数据统计-来源采集接口 POST： /statistics/collectionSource
 */
export const fetchStatCollectionSource = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_STAT_COLLECT_SOURCE", payload: true });
    getStatCollectionSource()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_STAT_COLLECT_SOURCE", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_STAT_COLLECT_SOURCE", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_STAT_COLLECT_SOURCE", payload: false });
      });
  };
};

/**
 * 数据统计-关键词来源接口 POST： /statistics/keywordsSource
 */
export const fetchKeySource = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_KEY_SOURCE", payload: true });
    getKeySource()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_KEY_SOURCE", payload: response.data.data});
        }
        dispatch({ type: "FETCHING_GET_KEY_SOURCE", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_KEY_SOURCE", payload: false });
      });
  };
};

