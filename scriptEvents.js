
let userInfo = {};

class ChatController{
    constructor(){
        this.isUsersInStorage = JSON.parse(localStorage.getItem('users'));
        if(!localStorage.getItem('users') || this.isUsersInStorage.length === 0){
            this.passwords =  passwords;
            this.users = users._users;
        }
        else {
            this.passwords = JSON.parse(localStorage.getItem('passwords'));
            this.users = this.isUsersInStorage;
        }

        this.messageList;
        this.messages;

        this.headerView = new HeaderView("username-header", "username-aside");
        this.messagesView = new MessagesView('messages-list');
        this.activeUsersView = new ActiveUsersView('active-users');
        this.allUsersView = new AllUsersView('all-users');
        this.specialUserView = new SpecialUserView('all-users');
        ///*..............................Log In*/
        this.logIn = document.querySelector('.log_in');
        this.logInCreateAcc = this.logIn.querySelector('.log_create');
        this.logGuest = this.logIn.querySelector('.log_guest');
        this.logEnter = this.logIn.querySelector('.log_enter');
        this.logError = this.logIn.querySelector('.log_error');
        this.logLogin = document.getElementById('logIn_login');
        this.logPsw = document.getElementById('logIn_password');
        this.showPassword = document.querySelectorAll('.log_show');
        /*..............................Sign Up*/
        this.signUp = document.querySelector('.sign_up');
        this.SignUpHaveAcc = this.signUp.querySelector('.sign_haveAcc');
        this.signGuest = this.signUp.querySelector('.sign_guest');

        this.signLogin = document.getElementById('sign_login');
        this.signPsw = document.getElementById('password');
        this.signPsw2 = document.getElementById('password_2');
        this.signButton = document.getElementById('sign_reg');
        this.signError = this.signUp.querySelector('.sign_error');
        this.signError2 = this.signUp.querySelector('.sign_error2');
        /*..............................Header*/
        this.header = document.getElementById('header');
        this.exit = document.querySelectorAll('.exit');

        this.headerBurger = document.querySelector('.header_burger');
        this.headerSearch = document.querySelector('.header_search');
        /*..............................Aside*/
        this.aside = document.getElementById('aside');
        this.asideChat = document.querySelectorAll('.aside_svg');
        /*..............................Section*/
        this.section = document.getElementById('section');

        this.chat = document.querySelector('.chat');
        this.findPerson = document.getElementById('find-person');
        this.chatSearch = document.getElementById('chat-search');

        this.search = document.querySelector('.search');
        this.conversation = document.querySelector('.conversation');
        this.conversationFilter = this.conversation.querySelectorAll('.conversation_option');
        this.conversationReturn = this.conversation.querySelector('.conversation_return');

        this.sendstringForm = document.querySelector('.sendstring_form');
        this.sendstringGuest = document.querySelector('.sendstring_guest');

        this.sendField = document.querySelector('.sendingstring_field');
        this.sendButton = document.querySelector('.sendingstring_button');

        this.optionsButton = document.querySelector('.conversation_button');
        this.options = document.querySelector('.options');

        this.findUser = document.getElementById('find-person');
        this.buttonFindUser = document.getElementById('chat-search');

        this.filterButton = document.getElementById('filterSearch');
        this.dateFrom = document.getElementById('search_date_from');
        this.dateTo = document.getElementById('search_date_to');
        this.authFilter= document.getElementById('search_author');
        this.msgFilter = document.getElementById('search_message');

        /*..............................Scroll*/
        this.isScrollAvailable = true;
        this.b = 0;
        this.msgList = document.getElementById('messages-list');

        /*..............................Error*/
        this.eror404= document.getElementById('error-404');
        this.errorButton = document.querySelector('.button_404');
    }

////////////////////////
    setCurrentUser(user) {
        let isItemsInLocalStorage = JSON.parse(localStorage.getItem('messages'), function(key, value){
                if(key === 'createdAt') return new Date(value);
                return value;
        });
        if( !localStorage.getItem('messages') || isItemsInLocalStorage.length === 0 ){
            messages = messages;
        }
        else {
            messages = isItemsInLocalStorage;
        }


        this.messageList = new MessageList(user, messages);
        this.messages = this.messageList._messages;
        this.b = this.messages.length;
        if(this.b <= 10) {
            this.b = 10;
        }

        this.headerView.display(this.messageList._user);
        this.messagesView.display(this.messageList.getPage(), this.messageList._user);
    }


     showActiveUsers() {
        this.activeUsersView.display(users.activeUsers);
    }

    showAllUsers() {
        users.activeUsers.push(userInfo.name);
        this.allUsersView.display(this.users, users.activeUsers);
    }

    addMessage(msg) {
        if (this.messageList.add(msg)) {
            localStorage.setItem('messages', JSON.stringify(this.messages));
            this.messages = this.messageList._messages;
            this.b = this.messages.length;
            if(this.b <= 10 || this.b > this.messages.length) {
                this.b = 10;
            }

            this.messagesView.display(this.messageList.getPage(this.b - 10, 10), this.messageList._user);
            this.msgList.scrollTop = (this.msgList.scrollHeight - this.msgList.offsetHeight);
        }
    }

    editMessage(id, msg) {
      if (this.messageList.edit(id, msg)) {
        this.messagesView.display(this.messageList.getPage(this.b - 10, 10), this.messageList._user);

        localStorage.setItem('messages', JSON.stringify(this.messages));
      }
    }

    removeMessage(id) {
        if (this.messageList.remove(id)) {
            this.messages = this.messageList._messages;
            --this.b;
            if(this.b <= 10 || this.b > this.messages.length) {
                this.b = 10;
            }
            localStorage.setItem('messages', JSON.stringify(this.messages));

            this.messagesView.display(this.messageList.getPage(this.b - 10, 10), this.messageList._user);

        }
    }


    showMessages(skip = 0, top = 10, filterConfig = {}) {
        this.messagesView.display(this.messageList.getPage(skip, top, filterConfig), this.messageList._user);
        this.msgList.scrollTop = (this.msgList.scrollHeight - this.msgList.offsetHeight);
    }


///////////////
    saveToLocal() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        localStorage.setItem('passwords', JSON.stringify(this.passwords));
     }


    /*..............................Log In*/
    goToSignUp(){
        this.logInCreateAcc.addEventListener('click', () => {
            this.logIn.classList.remove('active');
            this.signUp.classList.add('active');
        });
    }




    enter(isGuest = false){
            this.signUp.classList.remove('active');
            this.logIn.classList.remove('active');

            if(isGuest === true) {
                this.sendstringGuest.classList.add('active');
                this.sendstringForm.classList.remove('active');
            }
            else {
                this.sendstringGuest.classList.remove('active');
                this.sendstringForm.classList.add('active');
            }

            if(window.screen.width <= 900){
                this.section.classList.add('mobile');
            }
            else{
                this.section.classList.add('active');
            }
            this.aside.classList.add('active');
            this.header.classList.add('active');
            this.showAllUsers();
            this.showActiveUsers();
            this.showMessages(this.b - 10, 10);
    }


/*..............................Sign Up*/
     goToLogIn(){
        this.SignUpHaveAcc.addEventListener('click', () => {
            this.signUp.classList.remove('active');
            this.logIn.classList.add('active');
        });

    }

    enterFromLog(){
        this.logEnter.addEventListener('click', () => {
            let answer = this.users.indexOf(this.logLogin.value);
            if(answer === -1){
                this.logError.classList.add('active');
                return false;
            }
            else{
                this.logError.classList.remove('active');
                if(this.logPsw.value != this.passwords[answer]){
                    this.logError.classList.add('active');
                    return false;
                }
            }

            this.logError.classList.remove('active');
            this.setCurrentUser(`${this.logLogin.value}`);
            userInfo = {name: this.logLogin.value, psw: this.logPsw.value};

            this.logLogin.value = '';
            this.logPsw.value = '';

            window.removeEventListener('keydown', enterAction.bind(this));

            this.enter();
        });

        /*Вход при нажатии на enter*/
        function enterAction(evt){
            if (evt.keyCode === 13) {
                let answer = this.users.indexOf(this.logLogin.value);
                if(answer === -1){
                    this.logError.classList.add('active');
                    return false;
                }
                else{
                    this.logError.classList.remove('active');
                    if(this.logPsw.value != this.passwords[answer]){
                        this.logError.classList.add('active');
                        return false;
                    }
                }

                this.logError.classList.remove('active');
                this.setCurrentUser(`${this.logLogin.value}`);
                userInfo = {name: this.logLogin.value, psw: this.logPsw.value};

                this.logLogin.value = '';
                this.logPsw.value = '';

                this.enter();

                window.removeEventListener('keydown', enterAction.bind(this));
            }
        }
        window.addEventListener('keydown', enterAction.bind(this));


        /*Кнопка, которая позволяет показать пароль*/
        this.showPassword[0].addEventListener('click', () => {
            if(this.logPsw.matches('[type$="text"]')){
                this.logPsw.setAttribute('type', 'password');
            }
            else{
                this.logPsw.setAttribute('type', 'text');
            }
            this.showPassword[0].classList.toggle('log_show--forbidden');
        });
    }


    /*Создание нового аккаунта*/
    createAcc(){
        this.signButton.addEventListener('click', () => {

            /*Проверка*/
            for(let names of this.users){
                if(this.signLogin.value === names){
                    this.signError2.classList.add('active');
                    return false;
                }
            }

            if(this.signPsw.value !== this.signPsw2.value || this.signLogin.value === ''
            || this.signPsw.value === '' || this.signPsw2.value === '') {
                this.signError2.classList.remove('active');
                this.signError.classList.add('active');
                return false;
            }
            /*Если всё в порядке*/
            else {
                this.signError.classList.remove('active');
                this.signError2.classList.remove('active');

                userInfo = {name: this.signLogin.value, psw: this.signPsw.value};
                this.users.push(`${this.signLogin.value}`);
                this.passwords.push(`${this.signPsw.value}`);

                this.saveToLocal();
                this.setCurrentUser(`${this.signLogin.value}`);

                this.signLogin.value = '';
                this.signPsw.value = '';
                this.signPsw2.value = '';

                window.removeEventListener('keydown', enterAction.bind(this));

                this.enter();
            }
        });

        /*Регистрация при нажатии на enter*/
        function enterAction(evt){
            if (evt.keyCode === 13) {
                for(let names of this.users){
                    if(this.signLogin.value === names){
                        this.signError2.classList.add('active');
                        return false;
                    }
                }

                if(this.signPsw.value !== this.signPsw2.value || this.signLogin.value === ''
                || this.signPsw.value === '' || this.signPsw2.value === '') {
                    this.signError2.classList.remove('active');
                    this.signError.classList.add('active');
                    return false;
                }
                else {
                    this.signError.classList.remove('active');
                    this.signError2.classList.remove('active');

                    userInfo = {name: this.signLogin.value, psw: this.signPsw.value};
                    this.users.push(`${this.signLogin.value}`);
                    this.passwords.push(`${this.signPsw.value}`);

                    this.saveToLocal();
                    this.setCurrentUser(`${this.signLogin.value}`);

                    this.signLogin.value = '';
                    this.signPsw.value = '';
                    this.signPsw2.value = '';

                    this.enter();
                }
                window.removeEventListener('keydown', enterAction.bind(this));
            }
        }
        window.addEventListener('keydown', enterAction.bind(this));


        /*Кнопки, которая позволяет показать пароль*/
        this.showPassword[1].addEventListener('click', () => {
            if(this.signPsw.matches('[type$="text"]')){
                this.signPsw.setAttribute('type', 'password');
            }
            else{
                this.signPsw.setAttribute('type', 'text');
            }
            this.showPassword[1].classList.toggle('log_show--forbidden');
        });

        this.showPassword[2].addEventListener('click', () => {
            if(this.signPsw2.matches('[type$="text"]')){
                this.signPsw2.setAttribute('type', 'password');
            }
            else{
                this.signPsw2.setAttribute('type', 'text');
            }
            this.showPassword[2].classList.toggle('log_show--forbidden');
        });
    }



    /*..............................Guest*/
    /*Вход в качестве гостя*/
     enterGuestFromSign(){
        this.logGuest.addEventListener('click', () => {
            this.setCurrentUser('');
            this.enter(true);
        });
    }


    enterGuestFromLog(){
        this.signGuest.addEventListener('click', () => {
            this.setCurrentUser('');
            this.enter(true);
        });

    }

    /*..............................Header*/

    /*Выходим из аккаунта*/
    exitAcc(){
        this.exit[0].addEventListener('click', () => {
            this.logError.classList.remove('active');
            this.signError.classList.remove('active');
            this.signError2.classList.remove('active');

            this.logIn.classList.add('active');
            this.header.classList.remove('active');
            this.aside.classList.remove('active');
            this.section.classList.remove('active');
            this.sendstringGuest.classList.remove('active');
            this.sendstringForm.classList.remove('active');
        });
        this.exit[1].addEventListener('click', () => {
            this.logError.classList.remove('active');
            this.signError.classList.remove('active');
            this.signError2.classList.remove('active');

            this.logIn.classList.add('active');
            this.header.classList.remove('active');
            this.headerBurger.classList.remove('active');
            this.aside.classList.remove('active');
            this.aside.classList.remove('mobile');
            this.section.classList.remove('active');
            this.section.classList.remove('mobile');
            this.sendstringGuest.classList.remove('active');
            this.sendstringForm.classList.remove('active');
        });
    }
    transformBurger(){
        this.headerBurger.addEventListener('click', () => {
            this.headerBurger.classList.toggle('active');
            this.section.classList.toggle('mobile');
            this.aside.classList.toggle('mobile');
        });
    }

    /*В мобилках переходим к поиску*/
    goToSearch(){
        this.headerSearch.addEventListener('click', () => {
            this.aside.classList.remove('mobile');
            this.section.classList.add('mobile');
            this.chat.classList.remove('mobile');
            this.search.classList.add('mobile');
            this.conversation.classList.add('mobile');
            this.headerBurger.classList.remove('active');
        });


    }


    /*..............................Aside*/
    /*В мобилках переходим к сообщениям*/
    goToMsg(){
        this.asideChat[0].addEventListener('click', () => {
            if(window.screen.width > 900){
                this.section.style.gridTemplateColumns = `3fr`;
                this.chat.classList.remove('active');
                this.search.classList.remove('active');
            }
            else{
                this.aside.classList.toggle('mobile');
                this.section.classList.toggle('mobile');
                this.headerBurger.classList.toggle('active');
                this.chat.classList.remove('mobile');
                this.search.classList.remove('mobile');
                this.conversation.classList.add('mobile');
            }

            this.asideChat[0].classList.add('active');
            this.asideChat[1].classList.remove('active');
        });

    }
    /*В мобилках переходим к контактам*/
    goToContacts(){
        this.asideChat[1].addEventListener('click', () => {
            if(window.screen.width > 900){
                if(window.screen.width <= 1100){
                    this.section.style.gridTemplateColumns = `1.5fr 3fr`;
                }
                this.section.style.gridTemplateColumns = `1.1fr 3fr`;
                this.chat.classList.add('active');
                this.search.classList.remove('active');
            }
            else{
                this.headerBurger.classList.toggle('active');
                this.aside.classList.toggle('mobile');
                this.section.classList.toggle('mobile');
                this.chat.classList.add('mobile');
                this.search.classList.remove('mobile');
                this.conversation.classList.remove('mobile');
            }
            this.asideChat[0].classList.remove('active');
            this.asideChat[1].classList.add('active');
        });
    }



    /*..............................Section*/

    /*Добавление нового сообщения по клику на стрелочку*/
    addMsg(){
        this.addMessage({text: this.sendField.value, isPersonal: false});
        this.sendField.value = '';
    }
    /*Добавление нового сообщения при клике на enter*/
    addMsgOnEnterClick(){
        function enterAction(evt){
            if (evt.keyCode === 13) {
                ctrl.addMsg();
                evt.preventDefault();
                window.removeEventListener('keydown', enterAction.bind(this));
            }
        }
        window.addEventListener('keydown', enterAction.bind(this));
    }

    /*Включаем возможность перейти к редактированию сообщений*/
    turnOnOptions(){
        this.optionsButton.addEventListener('click', (evt) => {
            this.options.classList.toggle('active');
                function isOptionsOpen(evt){
                    if(evt.target.closest('.conversation_button')){
                        return;
                    }
                    else{
                        this.options.classList.remove('active');
                        document.removeEventListener('click', isOptionsOpen);
                    }
                }
                document.addEventListener('click', isOptionsOpen.bind(this));
        });


    }

    /*Включаем фильтр сообщений*/
    turnOnSearch(){
        this.conversationFilter[0].addEventListener('click', () => {
            this.asideChat[0].classList.remove('active');
            this.asideChat[1].classList.add('active');
            if(window.screen.width <= 1100){
                this.section.style.gridTemplateColumns = `1.5fr 3fr`;
            }
            this.section.style.gridTemplateColumns = `1.1fr 3fr`;
            this.chat.classList.remove('active');
            this.search.classList.add('active');
            if(window.screen.width <= 900){
                this.search.classList.add('mobile');
            }
        });
        this.conversationFilter[1].addEventListener('click', () => {
            this.asideChat[0].classList.remove('active');
            this.asideChat[1].classList.add('active');
            if(window.screen.width <= 1100){
                this.section.style.gridTemplateColumns = `1.5fr 3fr`;
            }
            this.section.style.gridTemplateColumns = `1.1fr 3fr`;
            this.chat.classList.remove('active');
            this.search.classList.add('active');
            if(window.screen.width <= 900){
                this.search.classList.add('mobile');
            }
        });
        this.conversationFilter[2].addEventListener('click', () => {
            this.asideChat[0].classList.remove('active');
            this.asideChat[1].classList.add('active');
            if(window.screen.width <= 1100){
                this.section.style.gridTemplateColumns = `1.5fr 3fr`;
            }
            this.section.style.gridTemplateColumns = `1.1fr 3fr`;
            this.chat.classList.remove('active');
            this.search.classList.add('active');
            if(window.screen.width <= 900){
                this.search.classList.add('mobile');
            }
        });


    }

    givePerson(){
        this.chatSearch.addEventListener('click', () => {
            this.specialUserView.display(users.users, users.activeUsers, this.findPerson.value);
            this.findPerson.value = '';
        })

    }

    returnAllPerson(){
        this.chatSearch.addEventListener('blur', () => {
            this.showAllUsers();
        });
    }

    /*..............................ContextMenu*/
    /*Включаем редактирование сообщений*/
    giveOptions(){
        event.preventDefault();
        const firstLevel = event.target.parentElement.parentElement;
        const op = firstLevel.querySelector('.message_options');
        op.classList.add('active');

        function isOptions(evt){
            if(evt.target.closest('.messages_block')){
                return;
            }
            else{
                op.classList.remove('active');
                document.removeEventListener('click', isOptions);
            }
        }
        document.addEventListener('click', isOptions);
    }

    editMsg(){
        const firstLevel = event.target.parentElement.parentElement;
        const firstLevelId = firstLevel.id;
        const form = firstLevel.querySelector('.messages_item_form');
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        const textCont = this.messageList.get(firstLevelId).text;

        form.classList.add('active');
        input.value = textCont;
        button.addEventListener('click', () => {
            if(input.value === undefined){
                input.value = textCont;
            }
            this.editMessage(`${firstLevelId}`, { text: `${input.value}`, isPersonal: false });
        });
    }

    removeMsg(){
        const firstLevel = event.target.parentElement.parentElement;
        const firstLevelId = firstLevel.id;
        this.removeMessage(`${firstLevelId}`);
    }

    /*..............................SearchMsg*/
    filterMsgs(){
        let filterConfig = {};
        this.filterButton.addEventListener('click', () => {
            this.msgList.removeEventListener ('scroll', ChatController.scrollMove.bind(this) );
            this.conversationReturn.classList.add('active');

            if(this.dateFrom.value === ''){
                filterConfig.dateFrom = '';
            }
            else {
                filterConfig.dateFrom = new Date(this.dateFrom.value);
            }
            if(this.dateTo.value === ''){
                filterConfig.dateTo = '';
            }
            else {
                filterConfig.dateTo = new Date(this.dateTo.value);
            }
            filterConfig.author = this.authFilter.value;
            filterConfig.text = this.msgFilter.value;

            this.isScrollAvailable = false;
            this.showMessages(0, Infinity, filterConfig);

            /*Выход по нажатию кнопки, если все поля пустые*/
            if(filterConfig.author === '' && filterConfig.text === '' && filterConfig.dateFrom === '' && filterConfig.dateTo === ''){
                this.search.classList.remove('active');
                this.conversationReturn.classList.remove('active');
                this.chat.classList.add('active');
                this.isScrollAvailable = true;
                this.showMessages(this.b - 10, 10);
            }

            this.authFilter.value = '';
            this.msgFilter.value = '';
            this.dateFrom.value = '';
            this.dateTo.value = '';

            /*Выход по нажатию кнопки "Вернуть сообщения"*/
            this.conversationReturn.addEventListener('click', () => {
                this.search.classList.remove('active');
                this.conversationReturn.classList.remove('active');
                this.chat.classList.add('active');
                this.isScrollAvailable = true;
                this.showMessages(this.b - 10, 10);
            });
        });

    }

    /*..............................Scroll*/

    scrollAction(){
        this.msgList.addEventListener('scroll', ChatController.scrollMove.bind(this) );
    }

    static scrollMove(){
            if(this.isScrollAvailable){
                let offsetHeight = this.msgList.offsetHeight;
                let position = this.msgList.scrollTop;
                let scrollHeight = this.msgList.scrollHeight;
                let scrollTop = scrollHeight - offsetHeight;


                /*Скролл вверх*/
                if(position < scrollTop / 5){
                    if(this.b <= 10){
                        return;
                    }

                    if(this.b - 10 < 2) {
                        this.b -= 1;
                        this.showMessages(this.b - 10, 10);
                        this.msgList.scrollTop = scrollTop / 2;
                        return ;
                    }
                    else {
                        this.b -= 2;
                        this.showMessages(this.b - 10, 10);
                        this.msgList.scrollTop = scrollTop / 2;
                    }
                }

                /*Скролл вниз*/
                if(position > scrollTop / 1.2){
                    if(this.b >= this.messages.length){
                        return;
                    }

                    if(this.b + 2 > this.messages.length){
                        this.b += 1;
                        this.showMessages(this.b - 10, 10);
                        this.msgList.scrollTop = scrollTop / 2;
                        return ;
                    }
                    else{
                        this.b += 2;
                        this.showMessages(this.b - 10, 10);
                        this.msgList.scrollTop = scrollTop / 2;
                    }
                }
            }
            else{
                return;
            }
    }

    /*..............................Error*/
    returnToMain(){
        this.errorButton.addEventListener('click', () => {
            this.eror404.classList.remove('active');
            this.section.classList.add('active');
        });

    }

}

const ctrl = new ChatController();
ctrl.createAcc();
ctrl.enterFromLog();

ctrl.goToSignUp();
ctrl.goToLogIn();

ctrl.enterGuestFromSign();
ctrl.enterGuestFromLog();

ctrl.exitAcc();

ctrl.transformBurger();

ctrl.goToSearch();
ctrl.goToMsg();
ctrl.goToContacts();

ctrl.turnOnOptions();
ctrl.turnOnSearch();

ctrl.givePerson();
ctrl.returnAllPerson();

ctrl.filterMsgs();

ctrl.scrollAction();

ctrl.returnToMain();

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
        evt.preventDefault();
    }
});




