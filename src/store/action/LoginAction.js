import { message } from "antd";
import {
  getLogin,
  getExit,
  getSendMessage,
  getVerCode,
  getResetPassword
} from "./../../service/api.js";

/**
 * 登录
 * @param {object} params
 * @param _history
 */
export const fetchGetLogin = (params, _history) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_LOGIN", payload: true });
    getLogin(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          _history.push("/");
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("realName", response.data.data.realname);
          localStorage.setItem("roleName", response.data.data.roleName);
          window.location.reload();
          dispatch({ type: "SAVE_GET_LOGIN", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_LOGIN", payload: false });
        if(response.data.status === "NG"){
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_LOGIN", payload: false });
      });
  };
};

/**
 * 静默登录
 * @param {object} params
 * @param _history
 */
export const fetchGuestLogin = () => {
  // 游客账户登录
  const guestInfo = {
    "username": "guest",
    "password": "guest",
  };
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_LOGIN", payload: true });
    getLogin(guestInfo)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          console.log("success");
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("roleName", response.data.data.roleName);
          // window.location.reload();
          dispatch({ type: "SAVE_GET_LOGIN", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_LOGIN", payload: false });
        if(response.data.status === "NG"){
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_LOGIN", payload: false });
      });
  };
};
/**
 * 退出登陆
 // * @param _history
 */
export const fetchGetExit = () => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_EXIT", payload: true });
    getExit()
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          localStorage.removeItem("token");
          localStorage.removeItem("realName");
          localStorage.removeItem("roleName");
          dispatch({ type: "SAVE_GET_EXIT", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_EXIT", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_EXIT", payload: false });
      });
  };
};

/**
 *  发送消息接口 GET：  /sendMessage/{type}/{number}
 */
export const fetchGetSendMessage = (params) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_SEND_MESSAGE", payload: true });
    getSendMessage(params)
      .then((response) => {
        if(response.data.status === "NG"){
          message.error(response.data.msg);
        }
        if (response.status === 200 && response.data.status === "OK") {
          dispatch({ type: "SAVE_GET_SEND_MESSAGE", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_SEND_MESSAGE", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_SEND_MESSAGE", payload: false });
      });
  };
};

/**
 *  验证验证码接口 GET：  external/verCode/{number}/{verCode}
 */
export const fetchGetVerCode = (params,_history) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_VER_CODE", payload: true });
    getVerCode(params)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          _history.push("/newpassword");
          dispatch({ type: "SAVE_GET_VER_CODE", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_VER_CODE", payload: false });
        if(response.data.status === "NG"){
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_VER_CODE", payload: false });
      });
  };
};




/**
 * 存储电话号码
 */
export const fetchPhoneNum= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_PHONE_NUM", payload: params});
  };
};
/**
 * 存储验证码
 */
export const fetchCodeNum= (params) => {
  return (dispatch) => {
    dispatch({type: "SAVE_CODE_NUM", payload: params});
  };
};

/**
 *  重置密码接口 POST： /userCor/resetPassword
 *  * number ,string,手机号码
 *   *newPass,string,6-12个字符，区分大小写
 */
export const fetchGetResetPassword = (params,_history) => {
  return (dispatch) => {
    dispatch({ type: "FETCHING_GET_EXIT", payload: true });
    getResetPassword(params)
      .then((response) => {
        if(response.data.status === "NG"){
          message.error(response.data.msg);
        }
        if (response.status === 200 && response.data.status === "OK") {
          _history.push("/login");
          dispatch({ type: "SAVE_GET_RESET_PASSWORD", payload: response.data.data });
        }
        dispatch({ type: "FETCHING_GET_RESET_PASSWORD", payload: false });
      })
      .catch((error) => {
        console.dir(error);
        dispatch({ type: "FETCHING_GET_RESET_PASSWORD", payload: false });
      });
  };
};

