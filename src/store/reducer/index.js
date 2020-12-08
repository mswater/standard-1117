import { combineReducers } from "redux";
import homeReducer from "./HomeReducer.js";
import loginReducer from "./LoginReducer.js";
import hotReducer from "./HotReducer.js";
import articleReducer from "./ArticleReducer.js";
import literatureReducer from "./LiteratureReducer.js";
import meetingReducer from "./MeetingReducer.js";
import searchReducer from "./SearchReducer.js";
import aboutUsReducer from "./AboutUsReducer.js";
import reportReducer from "./ReportReducer.js";

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  hot: hotReducer,
  article:articleReducer,
  literature:literatureReducer,
  meeting:meetingReducer,
  search:searchReducer,
  aboutus:aboutUsReducer,
  report:reportReducer,
});

export default rootReducer;
