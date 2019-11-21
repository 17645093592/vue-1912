const MongoClient = require("mongodb").MongoClient;

class Db {
    //单例模式
    static getMongoDb() {
        if (!Db.install) {
            Db.install = new Db()
        }
        return Db.install
    }

    constructor() {
            this.db = ""
            this.connect()
        }
        //链接
    connect() {
            let that = this;
            //关联本地mongo
            return new Promise((reslove, reject) => {
                if (!that.db) {
                    MongoClient.connect(
                        "mongodb://127.0.0.1:27017", { useNewUrlParser: true },
                        (err, client) => {
                            if (err) {
                                reject(err)
                                throw new TypeError(err)
                            }
                            //创建或使用数据库
                            that.db = client.db("cady20");
                            reslove(that.db)
                        }
                    )
                } else {
                    reslove(that.db)
                }

            })
        }
        // 多条查询
    find(cName) {
            const that = this;
            return new Promise((reslove, reject) => {
                that.connect().then(db => {
                    // page 为页数， limit为多少条数据
                    const result = db.collection(cName).find()
                    result.toArray((err, doc) => {
                        if (err) {
                            reject(err)
                            throw new TypeError("find : " + err)
                        }
                        reslove(doc)
                    })
                })

            })
        }
    // find(cName, obj, index, size) {
    //     const that = this;
    //     return new Promise((reslove, reject) => {
    //         that.connect().then(db => {
    //             //我们想要实现分页功能 需要在find的时候使用limit来返回具体筛选的数据，
    //             //但是实现分页功能需要在下次传递参数的时候返回新的10条数据,那么我们就需要通过skip去做跳过处理
    //             //需要注意的是一开始不能够让他跳过具体的条目数
               
    //             const result = db.collection(cName).find(obj).limit(size).skip((index - 1) * size)
    //             result.toArray((err, doc) => {
    //                 if (err) {
    //                     reject(err)
    //                     throw new TypeError("find : " + err)
    //                 }
    //                 reslove(doc)
    //             })
    //         })

    //     })
    // }
        //增加
    insert(cName, obj) {
            const that = this;
            return new Promise((reslove, reject) => {
                that.connect().then(db => {
                    const result = db.collection(cName).insertOne(obj, (err, result) => {
                        if (err) {
                            reject(err)
                            throw new TypeError(err)
                        }
                        reslove(result)
                    })

                })

            })
        }
        //修改
    update() {
          
        }
        //删除
    remove() {
    
    }
}


module.exports = Db.getMongoDb()