fetch("http://localhost:3000/api/search/stocks?q=rel&limit=6").then(r => r.json()).then(console.log).catch(console.error)
