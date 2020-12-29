const init = {
  fetchGetLoginLoading: false,
  // 登陆
  loginData: {},
  // 退出登陆
  exitData:"",
  // 发送消息接口
  sendMessageData:{},
  // 存储电话号码
  phoneNum:"",
  // 存储验证码
  codeNum:"",
  // 验证验证码接口
  verCodeData:{},
  // 重置密码
  resetPasswordData:""
};
const loginReducer = (state = init, action) => {
  switch (action.type) {
    // 登陆
    case "FETCHING_GET_LOGIN":
      return {
        ...state,
        fetchGetLoginLoading: action.payload,
      };
    case "SAVE_GET_LOGIN":
      return {
        ...state,
        loginData: action.payload,
      };
      // 退出登陆
    case "SAVE_GET_EXIT":
      return {
        ...state,
        exitData: action.payload,
      };
    // 发送消息接口
    case "SAVE_GET_SEND_MESSAGE":
      return {
        ...state,
        sendMessageData: action.payload,
      };
    // 验证验证码接口
    case "SAVE_GET_VER_CODE":
      return {
        ...state,
        verCodeData: action.payload,
      };
    // 重置密码
    case "SAVE_GET_RESET_PASSWORD":
      return {
        ...state,
        resetPasswordData: action.payload,
      };
    // 存储电话号码
    case "SAVE_PHONE_NUM":
      return {
        ...state,
        phoneNum: action.payload,
      };
    // 存储验证码
    case "SAVE_CODE_NUM":
      return {
        ...state,
        codeNum: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
