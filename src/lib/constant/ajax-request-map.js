const GET = 'GET';
const POST = 'POST';
const ajaxRequestMap = {
    api: {
        test1: {
            url: '/api/test1', type: GET
        },
        test2: {
            url: '/api/test2', type: POST
        }
    },
};

export default ajaxRequestMap;