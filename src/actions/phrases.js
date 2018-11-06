import http from './request';


export const GetAllPhrasesByCategore = id => {
    return http('get', `Phrases/OfCategory/${id}`);
};

export const CreatePrase = (phrase) => {
    return http('post', 'Phrases', phrase);
};

export const UpdatePrase = (phrase) => {
    return http('put', 'Phrases', phrase);
};

export const RemovePrase = id => {
    return http('delete', `Phrases/${id}`);
};

export const ChangePhraseAvatar = (img, id) => {
    return http('post', `Phrases/SetImage/${id}`, img, 'application/x-www-form-urlencoded');
};


//offered phrases

export const GetAllOfferedPhrases = () => {
    return http('get', `Phrases/Offered`);
};

export const RejectOfferedPhrases = (id, reason) => {
    return http('delete', `Phrases/Reject/${id}`, `"${reason}"`);
};

export const ApproveOfferedPhrases = id => {
    return http('put', `Phrases/Approve/${id}`);
};