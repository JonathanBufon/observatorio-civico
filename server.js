const NewsApi = require('newsapi');
const newsApi = new NewsApi('5086da76ae3a480f802df018cb414360');

// query de consulta de noticias:

newsApi.v2.everything({
    // sources: 'globo, brasil-paralelo',
    q: 'Lula, Haddad, Bolsonaro',
}).then(response => {
    console.log(response);
});

// newsApi.v2.topHeadlines({
//     category: 'politics',
//     languages: 'pt',
//     country: 'br'
// }).then(response => {
//     console.log(response);
// });


// query de fontes de noticas:

newsApi.v2.sources({
    language: 'pt',
    country: 'br'
}).then(response => {
    console.log(response);
})