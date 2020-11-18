
const init = {
  fetchArticleDetailLoading:false,
  fetchArticleLabelLoading:false,
  fetchSameListLoading: false,
  fetchSameCountLoading: false,
  fetchSimArticleLoading: false,
  fetchSimLiteratureLoading: false,
  fetchArticleCollectLoading:false,
  fetchArticleCancelCollectLoading:false,
  fetchArticleLabelListLoading:false,
  // 文章详情
  articleDetailData:{},
  // 文章标签接口
  articleLabelData:[],
  // 相似文章列表接口
  sameListData:[],
  // 相似文章数量接口
  sameCountData:{},
  // 相关文章接口
  simArticleData:[],
  // 相关文献接口
  simLiteratureData:[],
  // 文章收藏
  articleCollectData:[],
  // 文章取消收藏
  articleCancelCollectData:[],
  // 批量下载
  downloadData:{},
  // 标签页
  labelListData:{
    page:{
      resultList:[]
    },
    typeList:[{
      count:"",
      type:"资讯"
    }],
    total:"",
    label:""
  },
  tabsTypeName:"资讯",
};
const articleReducer = (state = init, action) => {
  switch (action.type) {
    case "FETCHING_GET_ARTICLE_DETAIL":
      return {
        ...state,
        fetchArticleDetailLoading: action.payload,
      };
    case "SAVE_GET_ARTICLE_DETAIL":
      return {
        ...state,
        articleDetailData: action.payload,
      };
    // 文章标签接口
    case "FETCHING_GET_ARTICLE_LABEL":
      return {
        ...state,
        fetchArticleLabelLoading: action.payload,
      };
    case "SAVE_GET_ARTICLE_LABEL":
      return {
        ...state,
        articleLabelData: action.payload,
      };
    // 相似文章列表接口
    case "FETCHING_GET_SAME_LIST":
      return {
        ...state,
        fetchSameListLoading: action.payload,
      };
    case "SAVE_GET_SAME_LIST":
      return {
        ...state,
        sameListData: action.payload,
      };
      // 相关文章接口
    case "FETCHING_GET_SIM_ARTICLE":
      return {
        ...state,
        fetchSimArticleLoading: action.payload,
      };
    case "SAVE_GET_SIM_ARTICLE":
      return {
        ...state,
        simArticleData: action.payload,
      };
      // 相关文献接口
    case "FETCHING_GET_SIM_LITERATURE":
      return {
        ...state,
        fetchSimLiteratureLoading: action.payload,
      };
    case "SAVE_GET_SIM_LITERATURE":
      return {
        ...state,
        simLiteratureData: action.payload,
      };
      // 文章收藏接口
    case "FETCHING_GET_ARTICLE_COLLECT":
      return {
        ...state,
        fetchArticleCollectLoading: action.payload,
      };
    case "SAVE_GET_ARTICLE_COLLECT":
      return {
        ...state,
        articleCollectData: action.payload,
      };
    // 文章取消收藏接口
    case "FETCHING_GET_ARTICLE_CANCEL_COLLECT":
      return {
        ...state,
        fetchArticleCancelCollectLoading: action.payload,
      };
    case "SAVE_GET_ARTICLE_CANCEL_COLLECT":
      return {
        ...state,
        articleCancelCollectData: action.payload,
      };
    // 相似文章数量接口
    case "FETCHING_GET_SAME_COUNT":
      return {
        ...state,
        fetchSameCountLoading: action.payload,
      };
    case "SAVE_GET_SAME_COUNT":
      return {
        ...state,
        sameCountData: action.payload,
      };
    // 批量下载
    case "SAVE_GET_DOWNLOAD":
      return {
        ...state,
        downloadData: action.payload,
      };
    // 文章标签页
    case "FETCHING_GET_ARTICLE_LABEL_LIST":
      return {
        ...state,
        fetchArticleLabelListLoading: action.payload,
      };
    case "SAVE_GET_ARTICLE_LABEL_LIST":
      return {
        ...state,
        labelListData: action.payload,
      };
    case "SAVE_TABS_TYPE_NAME":
      return {
        ...state,
        tabsTypeName: action.payload,
      };
    default:
      return state;
  }
};

export default articleReducer;
