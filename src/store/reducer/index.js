import { combineReducers } from "redux";
import homeReducer from "./HomeReducer.js";
import loginReducer from "./LoginReducer.js";
import hotReducer from "./HotReducer.js";
import subjectReducer from "./SubjectReducer.js";
import articleReducer from "./ArticleReducer.js";
import literatureReducer from "./LiteratureReducer.js";
import statReducer from "./StatReducer.js";
import meetingReducer from "./MeetingReducer.js";
import searchReducer from "./SearchReducer.js";
import analyseReducer from "./AnalyseReducer.js";

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  hot: hotReducer,
  subject: subjectReducer,
  article:articleReducer,
  literature:literatureReducer,
  stat:statReducer,
  meeting:meetingReducer,
  search:searchReducer,
  analyse:analyseReducer,
});

export default rootReducer;
