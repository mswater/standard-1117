
const init = {
  fetchStatCollectionSourceLoading:false,
  fetchKeySourceLoading:false,
  // 数据统计-来源采集接口
  statCollectData:{},
  // 数据统计-关键词来源接口
  keySourceData:{}

};
const articleReducer = (state = init, action) => {
  switch (action.type) {
    // 数据统计-来源采集接口
    case "FETCHING_GET_STAT_COLLECT_SOURCE":
      return {
        ...state,
        fetchStatCollectionSourceLoading: action.payload,
      };
    case "SAVE_GET_STAT_COLLECT_SOURCE":
      return {
        ...state,
        statCollectData: action.payload,
      };
    // 数据统计-关键词来源接口
    case "FETCHING_GET_KEY_SOURCE":
      return {
        ...state,
        fetchKeySourceLoading: action.payload,
      };
    case "SAVE_GET_KEY_SOURCE":
      return {
        ...state,
        keySourceData: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
