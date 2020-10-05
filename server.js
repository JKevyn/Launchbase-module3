const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    const about = {
        avatar_url: 'https://avatars0.githubusercontent.com/u/51202335?s=400&u=2cfda203288ac6a430e06ee4e2e2ce5bb18d20ce&v=4',
        name: 'Kevyn Gonçalves',
        role: 'Aluno Rocketseat',
        description: 'Programador front-end focado em aprender o melhor do ensino de programação. Estagiário na New Dev.',
        links: [
            {name: 'GitHub', url: 'https://github.com/JKevyn'},
            {name: 'Twitter', url: 'https://twitter.com/'},
            {name: 'Linkedin', url: 'https://www.linkedin.com/'}
        ]
    }

    return res.render('about', { about })
})

server.get('/classes', function(req, res) {

    return res.render('portfolio', { items: videos })
})

server.get('/video', function(req, res) {
    const id = req.query.id
    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }

    return res.render('video', { item: video })
})

server.listen(5000, function() {
    console.log('server is runing')
})

