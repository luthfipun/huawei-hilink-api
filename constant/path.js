const { baseURL } = require("./config");

const PATH_TOKEN = `${baseURL}api/webserver/SesTokInfo`
const PATH_BASIC_INFO = `${baseURL}api/monitoring/status`

module.exports = {
    PATH_TOKEN, PATH_BASIC_INFO
}