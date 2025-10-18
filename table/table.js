window.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('table');
    const t = (n) => { return (n*10+(n-1)*70).toString() + 'px'; }; // top
    const l = (n) => { return (n*20+(n-1)*70).toString() + 'px'; }; // left
    const zh = [
        'nonmetal',   // 活泼非金属 0
        'metalloid',  // 类金属     1
        'alkali',     // 碱金属     2
        'alkaline',   // 碱土金属   3
        'noble',      // 惰性气体   4
        'poor',       // 贫金属     5
        'transition', // 过渡金属   6
        'lanthanoid', // 镧系元素   7
        'actinoid',   // 锕系元素   8
    ]
    const items = [
        ['1', 'H', '氢', 'Hydrogen', '1.00786', l(1), t(1), zh[0]],
        ['2', 'He', '氦', 'Helium', '4.002602', l(18), t(1), zh[4]],
        ['3', 'Li', '锂', 'Lithium', '6.94', l(1), t(2), zh[2]],
        ['4', 'Be', '铍', 'Beryllium', '9.0121831', l(2), t(2), zh[3]],
    ];
    for (let i=0;i<7;i++){
        let el = document.createElement('div');
        el.classList.add('period');
        el.innerHTML = (i+1).toString();
        el.style.top = (125+i*80).toString() + 'px';
        table.append(el);
    }
    items.forEach((it) => {
        let el = document.createElement('div');
        el.classList.add('item');
        el.classList.add(it[7]);
        el.setAttribute('alt', it[2]);
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
