import request from '@/utils/request'

export function getList(params) {
    return request({
        url: 'itemborrow/pagelist',
        method: 'GET',
        params, // params: {}
    })
}

export function modifyItem(data) {
    return request({
        url: 'item',
        method: 'POST',
        data,   // data: {}
    })
}

export function deleteItem(id) {
    return request({
        url: 'item/del/' + id,
        method: 'DELETE',
    })
}
  
export const CommonService = {
    getList, modifyItem, deleteItem,
}