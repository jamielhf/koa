/**
 * Created by linhaifeng
 * on 2017/12/18.
 */

const fs = require('fs')


let sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param  {string} fileName 文件名称
 * @param  {string} path     文件所在的路径
 * @return {string}          脚本文件内容
 */
function getSqlContent( fileName,  path ) {
    let content = fs.readFileSync( path, 'binary' )
    sqlContentMap[ fileName ] = content
}
/**
 * 封装所有sql文件脚本内容
 * @return {object}
 */
function getSqlContentMap () {
    let sqlMap = getSqlMap()
    for( let key in sqlMap ) {
        getSqlContent( key, sqlMap[key] )
    }

    return sqlContentMap
}


/**
 * 获取sql目录下的文件目录数据
 * @return {object}
 */
function getSqlMap () {
    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')

    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice( 0, pathArr.length - 1 )
    basePath = pathArr.join('/') + '/sql/'

    let fileList = walkFile( basePath, 'sql' )
    return fileList
}



module.exports = getSqlContentMap