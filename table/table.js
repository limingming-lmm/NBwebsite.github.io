/*
function addMessageBox
params: obj
{
    type: 'info','error','warn','success' (default: info)
    content: str
    center: true(1, text center) or false(0)
    time: ms(0: not close)
}
*/
function addMessageBox(obj){
    let msgbox = document.createElement('div');
    msgbox.classList.add('top-messagebox');
    msgbox.classList.add(obj.type?obj.type:'info');
    if (obj.center===1) msgbox.classList.add('is-center');
    msgbox.style.top = '-50px';
    msgbox.style.opacity = '0';
    let txt = document.createElement('div');
    txt.classList.add('msg-content');
    txt.innerHTML = obj.content;
    msgbox.appendChild(txt);
    document.body.appendChild(msgbox);
    messages.push(msgbox);
    setTimeout(() => {
        setMessagesPos();
        msgbox.style.opacity = '1';
    }, 10);
    if (obj.time===0) return;
    setTimeout(() => {
        msgbox.style.top = '-50px';
        msgbox.style.opacity = '0';
        setTimeout(() => {
            const index = messages.indexOf(msgbox);
            if (index !== -1) {
                messages.splice(index, 1);
                document.body.removeChild(msgbox);
                setMessagesPos();
            }
        }, 300);
    }, obj.time);
};
function setMessagesPos() {
    messages.forEach((msg, index) => {
        msg.style.top=(20+index*55)+'px';
    });
}
window.addEventListener('DOMContentLoaded', () => {
    const w = window.screen.width;
    const h = window.screen.height;
    const ew = document.documentElement.clientWidth;
    const eh = document.documentElement.clientHeight;
    if (w > 1000 && w > h && ew-w>500){
        addMessageBox({
            type: 'warn',
            content: '开dev tools可能不方便观看~',
            time: 3000
        });
    }
    if (w<500){
        addMessageBox({
            type: 'warn',
            content: '手机请旋转~',
            time: 3000
        });
    }
    //---------------------------------------------//
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
    const setperiod = () => {
        document.querySelectorAll('.table > .period').forEach((it)=>{it.remove();});
        const scale = parseFloat(getComputedStyle(table).getPropertyValue('--table-scale')) || 1;
        for (let i=0;i<7;i++){
            let el = document.createElement('div');
            el.classList.add('period');
            el.innerHTML = (i+1).toString();
            el.style.top = ((125+i*80)*scale).toString() + 'px';
            table.append(el);
        }
    };
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
    setperiod();
    window.addEventListener('resize', setperiod);
});
