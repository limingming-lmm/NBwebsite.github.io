const routes = {
    '/': 'index.html',
    '/table': 'table.html'
};
function navigate(path) {
    history.pushState(null, null, path);
    loadPage(path);
}
function loadPage(path) {
    const contentEl = document.getElementById('content');
    const pagePath = routes[path] || routes['/'];
    fetch(pagePath)
        .then(response => response.text())
        .then(html => {
            contentEl.innerHTML = html;
    })
    .catch(error => {
        contentEl.innerHTML = '<h1>页面不存在</h1>';
        console.error(error);
    });
}
window.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('table');
    const items = [
        ['1', 'H', '氢', 'Hydrogen', '1.00786', '10px', '10px']
    ];
    items.forEach((it) => {
        let el = document.createElement('div');
        el.classList.add('item');
        el.style.marginLeft = `${it[5]}`;
        el.style.marginTop = `${it[6]}`;
        el.innerHTML = `<div>${it[0]}</div>
                        <div>${it[1]}</div>
                        <div>${it[2]}</div>
                        <div>${it[3]}</div>
                        <div>${it[4]}</div>`;
        table.append(el);
    });
    //=========================================//
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });
    loadPage(window.location.pathname);
});
