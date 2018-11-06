import http from './request';


export const GetAllQuestions = type => {
   let url = type === 'published' ? 'FAQ' : 'FAQ/NonPublished';
    return http('get', url);
};

export const RemoveQuestion = id => {
    return http('delete',`FAQ/${id}`);
};

export const UpdateQuestion = item => {
    return http('put',`FAQ`, item);
};
