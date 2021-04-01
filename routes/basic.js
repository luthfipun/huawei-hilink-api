const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
var parser = require('xml2json');
const { PATH_BASIC_INFO, PATH_TOKEN } = require('../constant/path');

router.get('/information', async function(req, res, next){

    let token = await getToken()

    let options = {
        headers: {
            Cookie: token.response.SesInfo
        }
    }

    let getInfo = await axios.get(PATH_BASIC_INFO, options)
        .then((response) => {
            let data = response.data
            let xmlOption = {
                coerce: true
            }
            return JSON.parse(parser.toJson(data, xmlOption))
        })
        .catch((e) => {
            console.log(e)
        })

    if(!getToken){
        res.json({
            error: 'error get data'
        }, 500)
        return
    }

    res.json(getInfo)
    
})

router.get('/token', async function(req, res, next){
    let token = await getToken()
    res.json(token)
})

const getToken = async () => {
    return await axios.get(PATH_TOKEN)
        .then((res) => {
            return JSON.parse(parser.toJson(res.data))
        }).catch((e) => {
            console.log(e)
            return {}
        })
}

module.exports = router