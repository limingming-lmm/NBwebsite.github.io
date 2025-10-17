let messages=[];
console.log("NB实验室为虚拟实验室, 现实中不要轻易模仿!");
const delVis = () => {localStorage.setItem('NBvis', 'no')};
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
if (localStorage.getItem('NBvis')!=='yes'){
    document.body.style.overflowY = 'hidden';
    let msgbox = document.createElement('div');
    msgbox.className = "messagebox";
    let msgovl = document.createElement('div');
    msgovl.className = "messagebox-ovl";
    let msgbtn = document.createElement('div');
    msgbtn.className = "msgbtn";
    msgbtn.innerHTML = "知道了";
    let msgbtn2 = document.createElement('div');
    msgbtn2.className = "msgbtnw";
    msgbtn2.innerHTML = "不再提醒";
    let msgcen = document.createElement('div');
    msgcen.className = "content";
    msgcen.innerHTML = "NB实验室为虚拟实验室, 现实中不要轻易模仿!";
    msgcen.style.margin = "20px";
    let isc = 0;
    function f1c() {
        if (isc) return;
        isc=1;
        document.body.style.overflowY = 'scroll';
        document.body.removeChild(msgbox);
        msgovl.classList.add('xs');
        setTimeout(() => {
            document.body.removeChild(msgovl);
        }, 300);
    }
    msgbtn.addEventListener('click', f1c);
    msgbtn2.addEventListener('click', () => {
        localStorage.setItem('NBvis', 'yes');
        console.log("如果想再次弹窗, 请在此页面输入 delVis() 并回车");
        f1c();
    });
    msgovl.addEventListener('click', f1c);
    document.body.appendChild(msgovl);
    document.body.appendChild(msgbox);
    msgbox.appendChild(msgcen);
    msgbox.appendChild(msgbtn);
    msgbox.appendChild(msgbtn2);
}
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
    const allImg = document.querySelectorAll('img');
    let isBig = 0;
    allImg.forEach((img) => {
        img.addEventListener('click', () => {
            if (isBig==1) return;
            isBig=1;
            document.body.style.overflowY = 'hidden';
            let ovl = document.createElement('div');
            ovl.className = "messagebox-ovl";
            let msg = document.createElement('div');
            msg.className = "messagebox";
            msg.style.width   = '600px';
            msg.style.height  = '600px';
            msg.style.borderRadius = '15px';
            let nimg = document.createElement('img');
            nimg.style.width  = '500px';
            nimg.style.height = '500px';
            nimg.src = img.src;
            let sm = document.createElement('p');
            sm.style.marginLeft = '450px';
            sm.innerHTML = '点击空白处关闭';
            document.body.appendChild(ovl);
            document.body.appendChild(msg);
            msg.appendChild(nimg);
            msg.appendChild(sm);
            ovl.addEventListener('click', () => {
                isBig=0;
                document.body.removeChild(msg);
                ovl.classList.add('xs');
                setTimeout(() => {
                    document.body.removeChild(ovl);
                }, 300);
                document.body.style.overflowY = 'scroll';
            });
        });
    });
    const allVid = document.querySelectorAll('.mp4');
    allVid.forEach((mp4) => {
        mp4.addEventListener('click', () => {
            if (isBig==1) return;
            isBig=1;
            document.body.style.overflowY = 'hidden';
            let ovl = document.createElement('div');
            ovl.className = "messagebox-ovl";
            let msg = document.createElement('div');
            msg.className = "messagebox";
            msg.style.width   = '800px';
            msg.style.height  = '560px';
            msg.style.borderRadius = '15px';
            let nmp4 = document.createElement('video');
            nmp4.style.width  = '700px';
            nmp4.setAttribute('controls', '1');
            nmp4.src = mp4.getAttribute('data');
            let sm = document.createElement('p');
            sm.style.marginLeft = '650px';
            sm.innerHTML = '点击空白处关闭';
            document.body.appendChild(ovl);
            document.body.appendChild(msg);
            msg.appendChild(nmp4);
            msg.appendChild(sm);
            ovl.addEventListener('click', () => {
                isBig=0;
                document.body.removeChild(msg);
                ovl.classList.add('xs');
                setTimeout(() => {
                    document.body.removeChild(ovl);
                }, 300);
                document.body.style.overflowY = 'scroll';
            });
        });
    });
    const backtotop = document.getElementById('backtotop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300){
            backtotop.style.opacity = 1;
            backtotop.style.pointerEvents = 'auto';
        } else {
            backtotop.style.opacity = 0;
            backtotop.style.pointerEvents = 'none';
        }
        
    });
    document.getElementById('backtotop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });
    loadPage(window.location.pathname);
    // document.getElementById('suggestion-ok').addEventListener('click', ()=>{
    //     addMessageBox({
    //         type: 'error',
    //         time: 3000,
    //         content: '此功能还在编写中!'
    //     });
    // });
});
