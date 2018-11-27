# MongoDb聚合
> [文档](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

## 语法
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)

    SQL Terms, Functions, and Concepts  MongoDB Aggregation Operators
    WHERE                               $match
    GROUP BY                            $group
    HAVING                              $match
    SELECT                              $project
    ORDER BY                            $sort
    LIMIT                               $limit
    SUM()                               $sum
    COUNT() 
                                        $sum
                                        $sortByCount
    join                                $lookup

## 管道概念
管道的概念
管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。

MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

这里我们介绍一下聚合框架中常用的几个操作：

$project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
$match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
$limit：用来限制MongoDB聚合管道返回的文档数。
$skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
$group：将集合中的文档分组，可用于统计结果。
$sort：将输入文档排序后输出。
$geoNear：输出接近某一地理位置的有序文档。


### $group

用法：

{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }

```bash
> db.aggregates.find()
{ "_id" : ObjectId("5b8ceefa7aeb4085ccfcb7a8"), "title" : "xxxx", "url" : "http://www.baidu.com" }
{ "_id" : ObjectId("5b8cef257aeb4085ccfcb7a9"), "title" : "aaaa", "url" : "http://www.aaa.com" }
{ "_id" : ObjectId("5b8cef317aeb4085ccfcb7aa"), "title" : "ccc", "url" : "http://www.ccc.com" }
{ "_id" : ObjectId("5b8cef377aeb4085ccfcb7ab"), "title" : "ccc", "url" : "http://www.ccccccc.com" }
{ "_id" : ObjectId("5b8cef3b7aeb4085ccfcb7ac"), "title" : "ccc", "url" : "http://www.cccccccccc.com" }
# 统计相同titlt的个数
> db.aggregates.aggregate([{$group: {_id: "$title", cout: {$sum: 1}}}])
{ "_id" : "ccc", "cout" : 3 }
{ "_id" : "aaaa", "cout" : 1 }
{ "_id" : "xxxx", "cout" : 1 }

## 将相同title的文档的url字段放入一个数组
> db.aggregates.aggregate([{$group: {_id: "$title", urls: {$push: "$url"}}}])
{ "_id" : "ccc", "urls" : [ "http://www.ccc.com", "http://www.ccccccc.com", "http://www.cccccccccc.com" ] }
{ "_id" : "aaaa", "urls" : [ "http://www.aaa.com" ] }
{ "_id" : "xxxx", "urls" : [ "http://www.baidu.com" ] }

```
$group通过title字段对数据进行分组,通过$sum表达式计算title字段相同值的总和。

下面是一些聚合表达式
* $sum 计算综合
* $avg 计算平均值
* $min 获取集合中所有文档对应值最小值
* $max  获取集合中所有文档对应值得最大值。
* $push 在结果文档中插入值到一个数组中
* $addToSet 在结果文档中插入值到一个数组中，但不创建副本。
* $first 根据资源文档的排序获取第一个文档数据。
* $last 根据资源文档的排序获取最后一个文档数据
### $unwind
> [文档](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/index.html)

```bash
 db.undwinds.find()
{ "_id" : ObjectId("5b8cf2067aeb4085ccfcb7ad"), "title" : "aaa", "urls" : [ "a1", "a2", "a3" ] }
{ "_id" : ObjectId("5b8cf2137aeb4085ccfcb7ae"), "title" : "c", "urls" : [ "c1", "c2", "c3" ] }
{ "_id" : ObjectId("5b8cf21f7aeb4085ccfcb7af"), "title" : "b", "urls" : [ "b1", "b2", "b3" ] }
{ "_id" : ObjectId("5b8cf2287aeb4085ccfcb7b0"), "title" : "b", "urls" : [ "b4", "b5", "b6" ] }
 
 db.undwinds.aggregate([{$unwind: "$urls"}])

{ "_id" : ObjectId("5b8cf2067aeb4085ccfcb7ad"), "title" : "aaa", "urls" : "a1" }
{ "_id" : ObjectId("5b8cf2067aeb4085ccfcb7ad"), "title" : "aaa", "urls" : "a2" }
{ "_id" : ObjectId("5b8cf2067aeb4085ccfcb7ad"), "title" : "aaa", "urls" : "a3" }
{ "_id" : ObjectId("5b8cf2137aeb4085ccfcb7ae"), "title" : "c", "urls" : "c1" }
{ "_id" : ObjectId("5b8cf2137aeb4085ccfcb7ae"), "title" : "c", "urls" : "c2" }
{ "_id" : ObjectId("5b8cf2137aeb4085ccfcb7ae"), "title" : "c", "urls" : "c3" }
{ "_id" : ObjectId("5b8cf21f7aeb4085ccfcb7af"), "title" : "b", "urls" : "b1" }
{ "_id" : ObjectId("5b8cf21f7aeb4085ccfcb7af"), "title" : "b", "urls" : "b2" }
{ "_id" : ObjectId("5b8cf21f7aeb4085ccfcb7af"), "title" : "b", "urls" : "b3" }
{ "_id" : ObjectId("5b8cf2287aeb4085ccfcb7b0"), "title" : "b", "urls" : "b4" }
{ "_id" : ObjectId("5b8cf2287aeb4085ccfcb7b0"), "title" : "b", "urls" : "b5" }
{ "_id" : ObjectId("5b8cf2287aeb4085ccfcb7b0"), "title" : "b", "urls" : "b6" }
```

### Map-Reduce
Map-reduce is a data processing paradigm for condensing large volumes of data into useful aggregated results. For map-reduce operations, MongoDB provides the mapReduce database command.

```bash
db.aggregates.mapReduce(function() {emit(this.title, this.title.length)}, function(k, v) {return Array.sum(v)}, {query: {}, out: "order_totals"})
{
        "result" : "order_totals",
        "timeMillis" : 647,
        "counts" : {
                "input" : 5,
                "emit" : 5,
                "reduce" : 1,
                "output" : 3
        },
        "ok" : 1
}
> db.order_totals.find()
{ "_id" : "aaaa", "value" : 4 }
{ "_id" : "ccc", "value" : 9 }
{ "_id" : "xxxx", "value" : 4 }
```
> [官方示例](https://docs.mongodb.com/manual/tutorial/map-reduce-examples/)

### Perform Incremental Map-Reduce
当执行一次mapReduce后，随后数据增加，可以根据条件查询筛选出新增的文档，然后通过mapReduce生成新的文档，通过out配置，{... out: {reduct: document_name}}

>[文档](https://docs.mongodb.com/manual/tutorial/perform-incremental-map-reduce/)

```js
// The sessions collection contains documents that log users’ sessions each day, for example:
db.sessions.save( { userid: "a", ts: ISODate('2011-11-03 14:17:00'), length: 95 } );
db.sessions.save( { userid: "b", ts: ISODate('2011-11-03 14:23:00'), length: 110 } );
db.sessions.save( { userid: "c", ts: ISODate('2011-11-03 15:02:00'), length: 120 } );
db.sessions.save( { userid: "d", ts: ISODate('2011-11-03 16:45:00'), length: 45 } );

db.sessions.save( { userid: "a", ts: ISODate('2011-11-04 11:05:00'), length: 105 } );
db.sessions.save( { userid: "b", ts: ISODate('2011-11-04 13:14:00'), length: 120 } );
db.sessions.save( { userid: "c", ts: ISODate('2011-11-04 17:00:00'), length: 130 } );
db.sessions.save( { userid: "d", ts: ISODate('2011-11-04 15:37:00'), length: 65 } );

var mapFunction = function() {
                      var key = this.userid;
                      var value = {
                                    userid: this.userid,
                                    total_time: this.length,
                                    count: 1,
                                    avg_time: 0
                                   };

                      emit( key, value );
                  };

 var reduceFunction = function(key, values) {

                    var reducedObject = {
                                          userid: key,
                                          total_time: 0,
                                          count:0,
                                          avg_time:0
                                        };

                    values.forEach( function(value) {
                                          reducedObject.total_time += value.total_time;
                                          reducedObject.count += value.count;
                                    }
                                  );
                    return reducedObject;
                 };

var finalizeFunction = function (key, reducedValue) {

                          if (reducedValue.count > 0)
                              reducedValue.avg_time = reducedValue.total_time / reducedValue.count;

                          return reducedValue;
                       };

db.sessions.mapReduce( mapFunction,
                       reduceFunction,
                       {
                         out: "session_stat",
                         finalize: finalizeFunction
                       }
                     ) 

// Later, as the sessions collection grows, you can run additional map-reduce operations. For example, add new documents to the sessions collection:
db.sessions.save( { userid: "a", ts: ISODate('2011-11-05 14:17:00'), length: 100 } );
db.sessions.save( { userid: "b", ts: ISODate('2011-11-05 14:23:00'), length: 115 } );
db.sessions.save( { userid: "c", ts: ISODate('2011-11-05 15:02:00'), length: 125 } );
db.sessions.save( { userid: "d", ts: ISODate('2011-11-05 16:45:00'), length: 55 } );

db.sessions.mapReduce( mapFunction,
                       reduceFunction,
                       {
                         query: { ts: { $gt: ISODate('2011-11-05 00:00:00') } },
                         out: { reduce: "session_stat" },
                         finalize: finalizeFunction
                       }
                     );
```
### $lookup
>[$lookup](./$lookup(join).md)