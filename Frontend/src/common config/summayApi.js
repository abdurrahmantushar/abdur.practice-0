export const BaseUrl= 'https://abdur-practice-0-pg90.onrender.com'

export const SummaryApi={
    register : {
        url  :'api/user/register',
        method: 'post'
    },
    login :{
        url : "api/user/login",
        method : 'post'
    },
    forgot_password: {
        url : "/api/user/forgot-password",
        method : "put"
    },
    verify_forgot_otp:{
        url : "api/user/verify-forgot-otp",
        method : "put"
    },
    reset_password:{
        url :"api/user/reset-password",
        method: "put"
    },
    refreshToken :{
        url : "api/user/refresh-token",
        method : "post"
    },
    userDetails:{
        url :"api/user/user-details",
        method : "get"
    },
    logout:{
        url : "api/user/logout",
        method : "get"
    },
    update_userDetails:{
        url:'api/user/update-user',
        method:'put'
    },
    upload_avatar :{
        url: 'api/user/upload-avatar',
        method:'put'
    },
    addCategory : {
        url: '/api/category/add-category',
        method : 'post'
    },
    uploadImage :{
        url : '/api/file/upload',
        method: 'post'
    },
    getCategory:{
        url : '/api/category/get',
        method: 'get'
    },
    updateCategory: {
        url : '/api/category/update',
        method : 'put'
    },
    deleteCategory: {
        url : '/api/category/delete',
        method : 'delete'
    },
    addProduct: {
        url: '/api/item/add-product',
        method: 'post'
    },
    getProduct: {
        url: '/api/item/get',
        method: 'get'
    },
    updateProduct: {
        url: '/api/item/update',
        method: 'put'
    },
    deleteProduct: {
        url: '/api/item/delete',
        method: 'delete'
    }
}
