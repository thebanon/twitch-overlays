window.onload = ()=>{
    window.dom = {
        body: document.body,
        chat: byId('chat')
    };

    init();
}

function init() {
    const chat = byId('chat');
    
    const client = new tmi.Client({
        channels: ['banontv']
    });

    client.connect();

    client.on('message', (channel,tags,message,self)=>{
        console.log({channel,tags,message,self});
        var box = byId('template-message').content.firstElementChild.cloneNode(true);
        box.find('[placeholder="username"]').textContent = tags.username;
        box.find('[placeholder="Lorem ipsum dolor..."]').textContent = message;
        dom.chat.insertAdjacentHTML('beforeend', box.outerHTML);
        const flex = dom.chat.closest('flex');
        chat.style.transform = "translateY(-"+((chat.clientHeight - flex.clientHeight + 50 + 20))+"px)"
    }
    );
}

window.on = {}

/*VANILLA*/
Element.prototype.find = function(elem) {
    return this.querySelector(elem);
}

window.byId = s=>{
    return document.getElementById(s);
}
