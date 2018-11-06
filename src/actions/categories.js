import http from './request';


export const GetAllCategories = () => {
    return http('get', 'PhraseCategories');
};

export const ChangeCategoryAvatar = (img, id) => {
    return http('post', `PhraseCategories/SetImage/${id}`, img, 'application/x-www-form-urlencoded');
};

export const ChangeCategoryName = data => {
    return http('put', `PhraseCategories`, data);
};
