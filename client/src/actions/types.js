// account reducer types
export const USER_REGISTERED = "USER_REGISTERED";
export const USER_NOT_REGISTERED = "USER_NOT_REGISTERED";
export const USER_LOADED = "USER_LOADED";
export const CLEAR_USER = "CLEAR_USER";
export const GET_USER = "GET_USER";
export const USER_DELETED = "USER_DELETED";
export const ACCOUNT_ERROR = "ACCOUNT_ERROR";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_UNSUCCESSFUL = "LOGIN_UNSUCCESSFUL";
export const LOGOUT = "LOGOUT";
export const AUTHORISATION_ERROR = "AUTHORISATION_ERROR";

// session reducer types
export const GET_SESSION = "GET_SESSION";
export const SESSION_CREATED = "SESSION_CREATED";
export const SESSION_DELETED = "SESSION_DELETED";
export const GET_SESSIONS = "GET_SESSIONS";
export const CLEAR_SESSIONS = "CLEAR_SESSIONS";
export const CLEAR_SESSION = "CLEAR_SESSION";
export const USER_INVITED = "USER_INVITED";
export const USER_REMOVED_FROM_SESSION = "USER_REMOVED_FROM_SESSION";
export const REMOVE_SEARCH = "REMOVE_SEARCH";
export const GET_COMMENTS = "GET_COMMENTS";
export const COMMENT_ADDED = "COMMENT_ADDED";
export const COMMENT_DELETED = "COMMENT_DELETED";
export const UPDATE_LIKES = "UPDATE_LIKES";
export const GET_RESULTS = "GET_RESULTS";
export const GET_NEXTPAGE = "GET_NEXTPAGE";
export const GET_PREVIOUSPAGE = "GET_PREVIOUSPAGE";
export const CHAT_OPEN = "CHAT_OPEN";
export const CHAT_CLOSED = "CHAT_CLOSED";
export const SESSION_ERROR = "SESSION_ERROR";

// query reducer types
export const QUERY_ADDED = "QUERY_ADDED";
export const QUERY_DELETED = "QUERY_DELETED";
export const GET_QUERIES_BY_SESSION_ID = "GET_QUERIES_BY_SESSION_ID";
export const GET_QUERIES_BY_USER_ID = "GET_QUERIES_BY_USER_ID";
export const CLEAR_QUERY = "CLEAR_QUERY";
export const QUERY_ERROR = "QUERY_ERROR";

//socket reducer types
export const SOCKET_INIT = "SOCKET_INIT";
export const GET_SOCKET = "GET_SOCKET";
export const SOCKET_CLEARED = "SOCKET_CLEARED";
