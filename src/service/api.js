import axios from "axios";
import { message } from "antd";
import HOST from "./../host/index.js";

axios.defaults.baseURL = HOST;

axios.interceptors.request.use(
  (config) => {

    /* eslint-disable no-param-reassign */
    config.headers.token = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 登录
 * @param {object} params
 */

export const getLogin = async (params) => {
  return axios.post("/userCor/login", params);
};

axios.interceptors.response.use(
  (response) => {
    if (response.data.code &&
      (response.data.code === 2 || response.data.code === 21 || response.data.code === 22)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("realName");
      localStorage.removeItem("roleName");
      // 游客账户登录
      const guestInfo = {
        "username": "guest",
        "password": "guest",
      };
      getLogin(guestInfo)
        .then((response) => {
          if (response.status === 200 && response.data.status === "OK") {
            localStorage.setItem("token", response.headers.token);
            localStorage.setItem("realName", response.data.data.realname);
            localStorage.setItem("roleName", response.data.data.roleName);
          }
          if(response.data.status === "NG"){
            message.error(response.data.msg);
          }
          return window.location = "/";
        })
        .catch((error) => {
          console.dir(error);
        });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);


/**
 * 首页
 */
/**
 * 英文热门关键词
 * @param {number} pageSize 一页显示多少条
 */
export const getHotEnglishWords = async (pageSize = 6) => {
  return axios.get(`/hot/hotEnglishWords/${pageSize}`);
};
/**
 * 中文热门关键词
 * @param {number} pageNum 页数
 * @param {number} pageSize 一页显示多少条
 */
export const getHotWords = async (pageNum = 1, pageSize = 6) => {
  return axios.get(`/hot/hotWords/${pageNum}/${pageSize}`);
};
/**
 * 热门资讯
 * @param {number} pageNum 页数
 * @param {number} pageSize 一页显示多少条
 */
export const getHotInformation = async (pageNum = 1, pageSize = 5) => {
  return axios.get(`/hot/hotInformation/${pageNum}/${pageSize}`);
};
/**
 * 热点监测
 * @param {number} pageSize 一页显示多少条
 */
export const getHotTopic = async (type = 1, pageSize = 5) => {
  return axios.get(`/hot/hotTopic/${pageSize}/${type}`);
};

/**
 * 首页简报
 * @param {number} pageNum 页数
 * @param {number} pageSize 一页显示多少条
 */
export const getBriefReport = async (pageNum = 1,pageSize = 5) => {
  return axios.get(`/brief/report/${pageNum}/${pageSize}`);
};

/**
 * 活跃作者GET
 * @param {number} pageSize 一页显示多少条
 */
export const getActiveAuthor = async (pageSize = 6) => {
  return axios.get(`/literature/activeAuthor/${pageSize}`);
};
/**
 * GET 最新文献/literature/newestLiterature/{type}/{pageSize}
 *  @param {number} type 一页显示多少条
 * @param {number} pageSize 一页显示多少条
 */
export const getNewestLiterature = async (type = 1, pageSize = 6) => {
  return axios.get(`/literature/newestLiterature/${type}/${pageSize}`);
};

/**
 * GET 推荐文献 literature/recommendLiterature/{type}/{pageSize}
 *  @param {number} type 一页显示多少条
 * @param {number} pageSize 一页显示多少条
 */
export const getRecommendtLiterature = async (type = 1, pageSize = 6) => {
  return axios.get(`/literature/recommendLiterature/${type}/${pageSize}`);
};
/**
 * 专题监测/subject/subject/{pageNum}/{pageSize}
 * @param {number} pageSize 一页显示多少条
 */
export const getSubject = async (pageSize = 100) => {
  return axios.get(`/subject/subject/${pageSize}`);
};
/**
 * 首页对比数据接口GET： /analyse/dataCompar/{type}/{pid}
 * 首页对比数据接口GET： /hot/comparisonData/{type}
 * /hot/comparisonData/{1}
 * @param {number} type 时间类型： 1一月 2三月 3一年
 */
export const getStat = async (type = 1) => {
  return axios.get(`/hot/comparisonData/${type}`);
};
/**
 * 首页会议 GET：  /meeting/meeting/{pageSize}
 * @param {number} pageSize 一页显示多少条
 */
export const getMeeting = async (type = 1,pageSize = 3) => {
  return axios.get(`/meeting/meeting/${pageSize}/${type}`);
};

/**
 * 首页热门主题图 GET： /literature/hotSubject/{pageSize}
 * @param {number} pageSize 一页显示多少条
 */
export const getHotSubject = async (pageSize = 6) => {
  return axios.get(`/literature/hotSubject/${pageSize}`);
};

// 热点监测页面
/**
 * 热点监测menu /hot/hostList
 * type = 1 行业动态
 * type = 2 学科专题
 */
export const getHotList = async (type = 1) => {
  return axios.get(`/hot/hostList/${type}`);
};
/**
 * 热点监测推荐阅读 hot/sugreading/{hId}/{pageSize}
 */
export const getSugReading = async (hId = 9,pageSize=5) => {
  return axios.get(`/hot/sugreading/${hId}/${pageSize}`);
};

/**
 * 热点内容页列表接口 POST /hot/hotContentList
 */
export const getHotContentList = async (params) => {
  return axios.post("/hot/hotContentList", params);
};

/**
 * 热点监测-站点活跃度统计图 /hot/siteActivityMap
 * kid ,Integer,热点id
 deadline,Integer,时间截止标识，1，一周，2，一月 3，三月
 */
export const getSiteActivityMap = async (params) => {
  return axios.post("/hot/siteActivityMap", params);
};

/**
 * 热点监测-数据量趋势图 POST：/hot/getDataTrendMap
 * kid ,Integer,热点id
 deadline,Integer,时间截止标识，1，一周，2，一月 3，三月
 */
export const getDataTrendMap = async (params) => {
  return axios.post("/hot/getDataTrendMap", params);
};
/**
 * 热点监测-来源统计图 POST：/hot/sourceStatisticsMap
 * kid ,Integer,热点id
 deadline,Integer,时间截止标识，1，一周，2，一月 3，三月
 */
export const getSourcesStatisticsMap = async (params) => {
  return axios.post("/hot/sourceStatisticsMap", params);
};
/**
 *热点监测-地域热力图 POST：/hot/getSiteMap
 * kid ,Integer,热点id
 deadline,Integer,时间截止标识，1，一周，2，一月 3，三月
 */
export const getSiteMap = async (params) => {
  return axios.post("/hot/getSiteMap", params);
};

/**
 *专题列表接口 subject/subjectList
 * kid ,Integer,热点id
 deadline,Integer,时间截止标识，1，一周，2，一月 3，三月
 */
export const getSubjectList = async () => {
  return axios.get("subject/subjectList");
};

/**
 * 专题内容页列表接口 POST /subject/subjectContentList
 */
export const getSubjectContentList = async (params) => {
  return axios.post("/subject/subjectContentList", params);
};

/**
 * 专题数据量趋势图 POST /subject/getDataTrendMap
 */
export const getSubjectDataTrendMap = async (params) => {
  return axios.post("/subject/getDataTrendMap", params);
};

/**
 * 专题来源统计 post  /subject/sourcesStatisticsMap

 */
export const getSubSourcesStatisticsMap = async (params) => {
  return axios.post("/subject/sourcesStatisticsMap", params);
};

/**
 * 文章详情 article/articleDetail/{cid}
 * @param {number} cid 文章id
 * type  1资讯  2内部文件  3国内文献  4海外文献
 */
export const getArticleDetail = async (cid, type = 1) => {
  return axios.get(`article/articleDetail/${type}/${cid}`);
};

/**
 * 相似文章列表接口 /article/articleSimilarityList/{cid}
* @param {number} cid 文章id
*/
export const getSameList = async (cid) => {
  return axios.get(`/article/articleSimilarityList/${cid}`);
};

/**
 * 相似文章数量接口 GET /article/articleSimilarityCount/{cid}
 * @param {number} cid 文章id
 */
export const getSameCount = async (cid) => {
  return axios.get(`/article/articleSimilarityCount/${cid}`);
};
/**
 *文章标签接口 GET：/article/articleLabel/{cid}
 * @param {number} cid 文章id
 */
export const getArticleLabel = async (cid) => {
  return axios.get(`/article/articleLabel/${cid}`);
};

/**
 * 相关文章接口 /article/articleSimilarity/{cid}
 * @param {number} cid 文章id
 */
export const getSimArticle = async (cid) => {
  return axios.get(`/article/articleSimilarity/${cid}`);
};
/**
 * 相关文献接口 GET：/article/similarityLiterature/{cid}
 * @param {number} cid 文章id
 */
export const getSimLiterature = async (cid) => {
  return axios.get(`/article/similarityLiterature/${cid}`);
};


/**
 * 文章标签页 POST： article/articleLabelList

 */
export const getArticleLabelList = async (params) => {
  return axios.post("article/articleLabelList", params);
};

/**
 * 文章收藏接口 GET：/article/collect/{cid}/{type}
 * @param {number} params.cid 收藏文章ID（知网文献为文件名）
 * @param {Integer} params.type 收藏类型（1.资讯 2.微博3.微信4.国外文献 5.国内文献）
 */
export const getArticleCollect = async (params) => {
  return axios.get(`/article/collect/${params.cid}/${params.type}`);
};

/**
 * 取消收藏接口 GET：/article/cancelCollect/{cid}/{type}
 * @param {number} params.cid 收藏文章ID（知网文献为文件名）
 * @param {Integer} params.type 收藏类型（1.资讯 2.微博3.微信4.国外文献 5.国内文献）
 */
export const getArticleCancelCollect = async (params) => {
  return axios.get(`/article/cancelCollect/${params.cid}/${params.type}`);
};

/**
 * 文献中心-文献分类列表 GET： /literature/docClassList
 */
export const getLiteratureList = async () => {
  return axios.get("/literature/docClassList");
};

/**
 * 文献中心-文献内容页 POST： /literature/docContentList
 */
export const getLiteratureContentList = async (params) => {
  return axios.post("/literature/docContentList", params);
};


/**
 * 数据统计-来源采集接口 POST： /statistics/collectionSource
 */
export const getStatCollectionSource = async () => {
  return axios.get("/statistics/collectionSource");
};


/**
 * 数据统计-关键词来源接口 POST： /statistics/keywordsSource
 */
export const getKeySource = async () => {
  return axios.get("/statistics/keywordsSource");
};

/**
 * 检索词列表页 POST： /search/searchKey
 */
export const getSearch = async (params) => {
  return axios.post("/search/searchKey", params);
};

/**
 * 行业分析分级列表接口 GET： /analyse/analyseList
 */
export const getAnalyse = async () => {
  return axios.get("/analyse/analyseList");
};

/**
 * 行业分析文章列表接口 POST：  /analyse/analyseArticleList
 */
export const getAnalyseContentList = async (params) => {
  return axios.post("/analyse/analyseArticleList", params);
};
/**
 * 行业分析文章列表接口 GET：  /analyse/dataCompar/{type}/{pid}
 */
export const getAnalyseDataCompar = async (params) => {
  return axios.get(`/analyse/dataCompar/${params.type}/${params.pid}`);
};
/**
 *  行业分析 趋势对比接口 POST： analyse/tendencyCompar
 */
export const getAnalyseTendencyCompar = async (params) => {
  return axios.post("analyse/tendencyCompar",params);
};
/**
 *  会议列表页接口 POST： meeting/meetingList
 */
export const getMeetingList = async (params) => {
  return axios.post("meeting/meetingList",params);
};
/**
 *  批量下载 POST：/article/batchDownload
 */
export const getDownload = async (params) => {
  return axios.post("/article/batchDownload", params);
};

/**
 *  退出登录接口 POST： /userCor/exit
 */
export const getExit = async () => {
  return axios.post("/userCor/exit");
};

/**
 * 发送消息接口 GET：  /external/sendMessage/{type}/{number}
 */
export const getSendMessage = async (params) => {
  return axios.get(`/external/sendMessage/${params.type}/${params.number}`);
};
/**
 * 验证验证码接口 GET：  external/verCode/{number}/{verCode}
 */
export const getVerCode = async (params) => {
  return axios.get(`/external/verCode/${params.number}/${params.verCode}`);
};


/**
 *  重置密码接口 POST： /userCor/resetPassword
 *  * number ,string,手机号码
 *   *newPass,string,6-12个字符，区分大小写
 */
export const getResetPassword = async (params) => {
  return axios.post("/userCor/resetPassword",params);
};


/**
 *  获取学科快讯数据 POST： /brief/briefList
 *  searchCont String 检索词
 *  pageNum Integer 页码 （默认1）
 *  pageSize Integer 显示数量（默认10）
 */
export const getReportList = async (params) => {
  return axios.post("/brief/briefList",params);
};

/**
 *  获取资料共享页面左侧menu数据  GET：/sharing/getSharingList
 *  token
 */
export const getSharingMenuData = async () => {
  return axios.get("/sharing/getSharingList");
};

/**
 * 资料共享列表页 POST： /sharing/getSharingListBySid
 */
export const getSharingContentList = async (params) => {
  return axios.post("/sharing/getSharingListBySid", params);
};
