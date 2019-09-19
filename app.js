const express = require('express');
const { feedback } = require('./mock');
const app = express();
// 引入中间件
const bodyParse = require('body-parser');

// 配置获取 post 请求体的中间件
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }))
// 开放静态资源
app.use('/public', express.static('./public'));
// 配置模板引擎
app.engine('html', require('express-art-template'));
// 路由
app.get('/', (req, res) => {
    res.render('index.html', {
        feedback
    })
}).get('/post', (req, res) => {
    res.render('post.html');
}).post('/postInfo', (req, res) => {
    const feedbackObj = req.body;
    feedbackObj.time = new Date().toLocaleDateString();
    feedback.unshift(feedbackObj);

    res.send('ok');
})

app.listen(8099, () => {
    console.log('server is running');
})