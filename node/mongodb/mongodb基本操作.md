mongo 删除内嵌数组元素

     {
    "_id" : ObjectId("56e2a92ccc6dd2271953e502"),
    "links": [
        {
            "name": "Google",
            "url": "http://www.google.com"
        },
        {
            "name": "Baidu",
            "url": "http://www.baidu.com"
        },
        {
            "name": "SoSo",
            "url": "http://www.SoSo.com"
        }
    ]
}

删除links中name是baidu的记录

    db.collection.update(
      { _id: ObjectId('id') },
      { $pull: { links: { name: 'Baidu' } } }
    );

根据索引删除，索引从0开始

    db.collection.update(
      { _id: ObjectId('id') },
      { $unset: { 'links.1': 1 } }
    );

原来的值会替换为 null
