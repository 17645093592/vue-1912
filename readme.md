1.业务区分

2.入口、项目依赖、模块分层



3.项目：1.登录注册功能 2.图片上传 菜名上传 价格 3.展示上传商品




1.mrd prd 1.详细设计 => 接口设计 流程设计 



参数 

username Y string 用户名
password Y string 密码


{
    success : 0
    error : {
        errcode : 错误码 '27810'
        message : "错误信息"
    }
    
}

{
    success : 1,
    data:{
        age : 1,
        name : "123123",
        list : [{
            img : "xxx",
            name : "123",
        }]
    },
    error : null
    
}


{
    success : 1,
}
{
    success : 0,
    error : {
        errCode : "",
        message : ""
    }
}