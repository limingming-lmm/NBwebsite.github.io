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
});
