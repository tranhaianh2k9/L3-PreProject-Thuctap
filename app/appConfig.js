const CHECK_HEALTH_ORG = true;
const CHECK_ERROR_RESULT = true;
// const APPLICATION_PATH="/eqa/react/";//deploy
const APPLICATION_PATH="/";//Đặt homepage tại package.json giống như tại đây
module.exports = Object.freeze({
    //ROOT_PATH : "/egret/",
    ROOT_PATH : APPLICATION_PATH,
    ACTIVE_LAYOUT:"layout1",
    // API_ENPOINT:"http://globits.net:8088/pi",//deveqa
    // API_ENPOINT:"http://globits.net:8090/pi",//eqa
    API_ENPOINT:"https://em-v2.oceantech.com.vn/em",
    AUTH_MODE:"Spring",//"Spring" or "Keycloak"
    LOGIN_PAGE:APPLICATION_PATH+"session/signin",//Nếu là Spring
    HOME_PAGE:APPLICATION_PATH+"homepage",//Nếu là Spring
    CHECK_HEALTH_ORG:CHECK_HEALTH_ORG,
    CHECK_ERROR_RESULT: CHECK_ERROR_RESULT
});