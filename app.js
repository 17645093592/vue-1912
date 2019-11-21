const Koa = require("koa"); //koa
const Router = require("koa-router"); //koa的路由
const static = require("koa-static"); //静态资源加载
const bodyParser = require("koa-bodyparser"); //解析post请求
const views = require("koa-views"); //koa-页面模板
const db = require("./moudle/db") //引入数据库

//实例化
const app = new Koa();
const router = new Router();

//页面首页搭建
router.get("/", async ctx => {
    await ctx.render("index");

})

router.get("/xiangqing", async ctx => {
   console.log(ctx.query.product) 
   if (ctx.query.product){
     let xiangqing =  await db.find("a"+ctx.query.product,{})
     ctx.body = xiangqing
     ctx.body={
                success:0,
                data:xiangqing,
                error:null
            }
   }else{
     ctx.body={
                success:0,
                data:null,
                error:{
                    errCode:12312,
                    message:"服务器异常"
                }
            }
   }
})

// 、、、登录
router.get("/login", async ctx => {
    ctx.set("content-type", "application/json;charset=utf-8")
    // console.log(ctx.query)
    // console.log(ctx.request.body)

    const { username, password } = ctx.query
    const result = await db.find("a"+username, ctx.query);
    if (result.length == 0) {
        // ctx.set() === result.setHeader()
        ctx.body = {
            success: 0,
            error: {
                message: "用户名不存在"
            }
        }
    } else if (result.length > 0 && result[0].username === username && result[0].password === password) {
        ctx.body = {
            success: 1,
            data:username,
            error: {
                message: "登录成功"
            }
        }
    } else {
        ctx.body = {
            success: 0,
            error: {
                message: "账户或密码错误"
            }
        }
    }

})


// 注册
router.get("/rejister", async ctx => {
    // const movieList = await db.find("movie",{})
    // console.log(ctx.query)
    // console.log(ctx.request.body)

    // console.log(ctx.body)
    const { username, password } = ctx.query
    const result = await db.find("a"+username, { username });
    if (result.length) {
                ctx.body = {
                    success: 0,
                    error: {
                        message: "用户名重复"
                    }
                }
            } else {
                const insert = await db.insert("a"+username, ctx.query);
                // console.log(insert)
                ctx.body = {
                    success: 1,
                    error: {
                        message: "注册成功"
                    }
                }
            }
})

// router.get("/movieList", async ctx => {
//     console.log(ctx.query)
//     const index = Number(ctx.query.index)
//     const size = Number(ctx.query.size)

//     if(index && size){
//         const movieList = await db.find("movie",{},index,size)
//         ctx.body ={
//             success : 1,
//             data:{
//                 movieList
//             },
//             errover:null
//         }
//     }else{
//         ctx.status = 400
//         ctx.body = {
//             success: 0,
//             data: null,
//             error: {
//                 errCode: 27373,
//                 message: "参数错误"
//             }
//         }
//     }

// })


//接口
// router.post("/login", async ctx => {
//     ctx.set("content-type", "application/json;charset=utf-8")
//     const { username, password } = ctx.request.body
//     const result = await db.find("users", ctx.request.body);
//     if (result.length == 0) {
//         // ctx.set() === result.setHeader()
//         ctx.body = JSON.stringify({
//             success: 0,
//             error: {
//                 //27081 用户名不存在
//                 // errCode: 27081
//                 message: "用户名不存在"
//             }
//         })
//     } else if (result.length > 0 && result[0].username === username && result[0].password === password) {
//         ctx.body = JSON.stringify({
//             success: 1,
//             error: null
//         })
//     } else {
//         ctx.body = JSON.stringify({
//             success: 0,
//             error: {
//                 message: "账户或密码错误"
//             }
//         })
//     }

// })

// router.post("/register", async ctx => {
//     ctx.set("content-type", "application/json;charset=utf-8")
//     const { username, password } = ctx.request.body
//     const result = await db.find("users", { username });
//     if (result.length) {
//         ctx.body = JSON.stringify({
//             success: 0,
//             error: {
//                 message: "账户名重复"
//             }
//         })
//     } else {
//         const insert = await db.insert("users", ctx.request.body);
//         console.log(insert)
//         ctx.body = JSON.stringify({
//             success: 1,
//             error: null
//         })
//     }
// })



      
        // router.get("/login", async ctx => {
        //     // const movieList = await db.find("movie",{})
        //     console.log(ctx.query)
        //     console.log(ctx.request.body)
        
        //     // console.log(ctx.body)
        //     const { username, password } = ctx.query
        //     const result = await db.find("denglu", { username });
        //     if (result.length) {
        //         ctx.body = JSON.stringify({
        //             success: 0,
        //             error: {
        //                 message: "账户名重复"
        //             }
        //         })
        //     } else {
        //         const insert = await db.insert("denglu",ctx.query);
        //         console.log(insert)
        //         ctx.body = JSON.stringify({
        //             success: 1,
        //             error: {
        //                 message: "注册成功"
        //             }
        //         })
//     }
    // if (movieList.length == 0) {
    //             ctx.body = JSON.stringify({
    //                 success: 0,
    //                 error: {
    //                     message: "用户名不存在"
    //                 }
    //             })
    //         }  else {
    //             ctx.body = JSON.stringify({
    //                 success: 0,
    //                 error: {
    //                     message: "账户或密码错误"
    //                 }
    //             })
    //         }
    // ctx.body = movieList



//注入依赖模块
app.use(static(__dirname + "/public")) //静态资源
app.use(bodyParser()) //解析post请求
app.use(views("views", { extension: "ejs" })) //页面模板
app.use(router.routes()).use(router.allowedMethods()) //解析路由


//开启服务
app.listen(3000, _ => {
    console.log("server running at http://localhost:3000")
})