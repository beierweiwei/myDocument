# 命令行操作

## 关联查询

1、简单手工关联
 首先将结果查询出来放到一个变量里面，然后再查询

```
 u = db.user.findOne({author:"wangwenlong"});
 for(var p = db.postings.find({author:u.author});p.hasNext;){
 printjson(p.next().title);
 }
```

2、DBRef方式关联
 例子：
步骤1 取得当前用户信息

    db.user.insert({name:"wangwenlong"})
    u1 = db.user.find({name:"wangwenlong"})[0]

 
步骤2 发帖子并做关联

    db.postings.insert({"title":"Hello MongoDB!"},users:[new DBRef('users',u1._id)])
    db.postings.insert({"title":"Hello China!"},users:[new DBRef('users',u1._id)])
     
步骤3 通过帖子找用户

    db.postings.find({title:"Hello China!"})[0].users[0].fetch()