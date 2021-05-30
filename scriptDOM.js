class UserList {
  constructor(activeUsers = [], users = []) {
    this._activeUsers = activeUsers;
    this._users = users;
  }

  get activeUsers() {
    return this._activeUsers;
  }

  get users() {
    return this._users;
  }
}

class HeaderView {
    constructor(idHeader, idAside) { // Для хэдера и асайда
        this.headerEl = document.getElementById(idHeader);
        this.asideEl = document.getElementById(idAside);
        this.users;
    }
    display(userName = 'Гость') {
        if (userName === 'Гость' || userName === '') {
            document.querySelector('.header_user').setAttribute('class', `header_user`);
            document.querySelector('.aside_user').setAttribute('class', `aside_user guest`);

            this.headerEl.innerHTML = '<img class="header_guest" src="Images/guestHeader.png" alt="guest">';
            this.asideEl.innerHTML = '<img class="aside_guest" src="Images/guest.png" alt="guest">';
        }
        else {
            this.isUsersInStorage = JSON.parse(localStorage.getItem('users'));
            if(!localStorage.getItem('users') || this.isUsersInStorage.length === 0){
                this.users = users._users;
            }
            else {
                console.log(this.isUsersInStorage);
                this.users = this.isUsersInStorage;
            }

            let colorIndex = this.users.indexOf(userName);
            if (colorIndex > 5) {
                colorIndex %= 6;
            }
            console.log({colorIndex});
            console.log(this.users);
            document.querySelector('.header_user').setAttribute('class', `header_user ${userColors[colorIndex]}`);
            document.querySelector('.aside_user').setAttribute('class', `aside_user ${userColors[colorIndex]}`);
            this.headerEl.textContent = userName.slice(0, 1);
            this.asideEl.textContent = userName.slice(0, 1);
        }
    }
}


class MessagesView {
    constructor(containerId) {
        this.messagesList = document.getElementById(containerId);
        //    this.convUserName = document.getElementById('conversation-username');
        //    this.convName = document.getElementById('conversation-name');
        this.convDate = document.getElementById('conversation-date');
        this.users;
    }
    display(msgList, currentUser) {
        this.messagesList.innerHTML = '';
        let el;
        const userMsg = document.getElementById('msg-user');
        const myMsg = document.getElementById('msg-mine');
        const fragment = new DocumentFragment();
        for (const item of msgList) {

            /*Получаем пользователей из памяти*/
            this.isUsersInStorage = JSON.parse(localStorage.getItem('users'));
            if (!localStorage.getItem('users') || this.isUsersInStorage.length === 0) {
                this.users = users._users;
            }
            else {
                this.users = this.isUsersInStorage;
            }

            /*Определяем цвет*/
            let colorIndex = this.users.indexOf(item.author);
            if (colorIndex > 5) {
                colorIndex %= 6;
            }
            /*Отображаем сообщения пользователя*/
            if (item.author === currentUser) {
                el = myMsg.content.cloneNode(true);
                el.querySelector('.messages_user').classList.add(userColors[colorIndex]);
                el.querySelector('.messages_username').textContent = item.author.slice(0, 1);
                el.querySelector('.messages_text').textContent = item.text;
                if (window.screen.width <= 900) {
                    el.querySelector('.messages_text').setAttribute('onclick', 'ctrl.giveOptions();');
                    el.querySelector('.messages_time').setAttribute('onclick', 'ctrl.giveOptions();');
                }
                el.querySelector('.messages_time').textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
                el.querySelector('.messages_item').setAttribute('id', `${item.id}`);
            }
            /*Отображаем сообщения собеседников*/
            else {
                el = userMsg.content.cloneNode(true);
                el.querySelector('.messages_user').classList.add(userColors[colorIndex]);
                el.querySelector('.messages_username').textContent = item.author.slice(0, 1);
                el.querySelector('.messages_text').textContent = item.text;
                el.querySelector('.messages_time').textContent = item.createdAt.toLocaleTimeString().slice(0, -3);
                //        this.convUserName.textContent = item.author.slice(0,1);
                //        this.convName.textContent = item.author;
            }
            this.convDate.textContent = item.createdAt.toLocaleDateString();
            fragment.appendChild(el);
        }
        this.messagesList.appendChild(fragment);
    }
}

class ActiveUsersView {
    constructor(containerId) {
        this.activeUsersView = document.getElementById(containerId);
    }
    display(activeUsers) {
        let index = 0;
        const userTemplate = document.getElementById('active-user-template');
        const fragment = new DocumentFragment();
        for (const item of activeUsers) {
            if (index >= userColors.length) {
                index = 0;
            }
            const el = userTemplate.content.cloneNode(true);
            el.querySelector('.chat_item').classList.add(userColors[index]);
            try {
                el.querySelector('.chat_username').textContent = item.slice(0, 1);
            }
            catch(err) {
                el.querySelector('.chat_username').textContent = 'Guest';
            }

            el.querySelector('.chat_friend').textContent = item;
            fragment.appendChild(el);
            index++;
        }
        this.activeUsersView.appendChild(fragment);
    }
}

class AllUsersView {
  constructor(containerId) {
    this.allUsersView = document.getElementById(containerId);
  }

  display(users, activeUsers) {
    let index = 0;
    this.allUsersView.innerHTML = '';
    const userTemplate = document.getElementById('all-user-template');
    const fragment = new DocumentFragment();
    for (const item of users) {
      if(index >= userColors.length){
          index = 0;
      }
      const el = userTemplate.content.cloneNode(true);
      el.querySelector('.chat_item').classList.add(userColors[index]);
      el.querySelector('.chat_username').textContent = item.slice(0,1);
      el.querySelector('.chat_friend').textContent = item;
      for(let i = 0; i < activeUsers.length; i++){
          if(item === activeUsers[i]){
             el.querySelector('.chat_user').classList.add('active');
          }
      }
      fragment.appendChild(el);
      index++;
    }
    this.allUsersView.appendChild(fragment);
  }
}

class SpecialUserView {
  constructor(containerId) {
    this.specialUserView = document.getElementById(containerId);

    this.isUsersInStorage = JSON.parse(localStorage.getItem('users'));
    if(!localStorage.getItem('users') || this.isUsersInStorage.length === 0){
        this.users = users._users;
        this.activeUsers = users._activeUsers;
    }
    else {
        this.users = this.isUsersInStorage;
        this.activeUsers = users._activeUsers;
    }
  }

  display(users, activeUsers, nickname) {
    this.specialUserView.innerHTML = '';

    const userTemplate = document.getElementById('all-user-template');
    const fragment = new DocumentFragment();
    for (const item of users) {
      const el = userTemplate.content.cloneNode(true);
      if( item === nickname){

        /*Красим*/
        let colorIndex = this.users.indexOf(nickname);
        if(colorIndex > 5 ){
            colorIndex %= 6;
        }

        /*Помечаем, если онлайн*/
        if(this.activeUsers.includes(item)){
            el.querySelector('.chat_user').classList.add('active');
        }
        /*Наполняем контентом*/
        el.querySelector('.chat_item').classList.add(userColors[colorIndex]);
        el.querySelector('.chat_username').textContent = item.slice(0,1);
        el.querySelector('.chat_friend').textContent = item;
      }
      else{
          continue;
      }
      fragment.appendChild(el);
    }
    this.specialUserView.appendChild(fragment);
  }
}


const userColors = ['chat_item--first', 'chat_item--second', 'chat_item--third', 'chat_item--fourth', 'chat_item--fifth', 'chat_item--sixth' ];//Цвета аватарок

const users = new UserList(['Майк', 'Ксюша', 'Егор', 'Дима', 'Наташа', 'Андрей', 'Ян'], ['Майк','Андрей', 'Ксюша', 'Игорь', 'Катя', 'Егор', 'Дима', 'Артур', 'Паша', 'Наташа', 'Витя', 'Оля', 'Ян','Рик', 'Ник']);
let passwords = ['123','234', '345', '456', '567', '678', '789', '890', '901', '012', '555', '666', '777' , '888' ,'999'];
