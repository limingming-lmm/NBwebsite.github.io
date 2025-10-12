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
async function getBilibiliLatestVideo(uid) {
    try {
        const url = `https://api.bilibili.com/x/space/arc/search?mid=${uid}&ps=1&pn=1&order=pubdate`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': `https://space.bilibili.com/${uid}/video`
            }
        });
        const data = await response.json();
        if (data.code !== 0 || !data.data || !data.data.list || !data.data.list.vlist || data.data.list.vlist.length === 0) {
            throw new Error('无法获取视频信息');
        }
        const latestVideo = data.data.list.vlist[0];
        return {
            title: latestVideo.title,
            url: `https://www.bilibili.com/video/${latestVideo.bvid}`,
            cover: latestVideo.pic,
            // pubDate: new Date(latestVideo.created * 1000).toLocaleString()
        };
    } catch (error) {
        console.error('获取视频信息失败:', error.message);
        return null;
    }
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
    const lastvideo = getBilibiliLatestVideo(660396077);
    let v = document.createElement('div');
    let t = document.createElement('div');
    t.innerHTML = '最新视频';
    let img = document.createElement('img');
    img.src = lastvideo.cover;
    let title = document.createElement('div');
    title.innerHTML = lastvideo.title;
    v.appendChild(t);
    v.appendChild(img);
    v.appendChild(title);
    if (lastvideo.title === undefined) document.getElementById('other').appendChild(v);
    img.addEventListener('click', ()=>{window.open(lastvideo.url, '_blank')})
    document.getElementById('suggestion-ok').addEventListener('click', ()=>{
        addMessageBox({
            type: 'error',
            time: 3000,
            content: '此功能还在编写中!'
        });
    });
});
