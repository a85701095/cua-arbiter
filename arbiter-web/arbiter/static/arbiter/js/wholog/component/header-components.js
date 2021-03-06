//所有用到的组件
let Event = new Vue();
//****以下为所有用到的组件：
//用户图标和其下拉菜单组件
const userAvatar = {
    template: '#userAvatar',
    store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            userMenuTrigger: null,
            userMenuOpen: false,
        }
    },
    mounted() {
        this.userMenuTrigger = this.$refs.UserAvatar.$el;
    },
    methods: {
        ...Vuex.mapMutations(['setUserName', 'refreshJwtToken',]),
        userMenuToggle() {
            this.userMenuOpen = !this.userMenuOpen
        },
        userMenuHandleClose(e) {
            this.userMenuOpen = false
        }, logout() {
            deleteAllCookies();
            let storage = window.localStorage;
            storage.clear();
            this.setUserName(null);
            this.refreshJwtToken();
        },
    }
};
//菜单图标和其下拉菜单组件
const menuIconButton = {
    template: '#menuIconButton', store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            appMenuTrigger: null,
            appMenuOpen: false,
            dialog: false,
            gitUrlPrefix: '',
            gitCloneStatus: 'finish',
        }
    },
    mounted() {
        this.appMenuTrigger = this.$refs.appIcon.$el;
    },
    methods: {
        ...Vuex.mapMutations(['setUserName', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        appMenuToggle() {
            this.appMenuOpen = !this.appMenuOpen
        },
        appMenuHandleClose(e) {
            this.appMenuOpen = false
        },
        closeImportDialog() {
            this.dialog = false
        },
        cloneCaseObj() {
            this.gitCloneStatus = 'running';

            getRes("./cloneCaseObj", {url: this.gitUrlPrefix}, this.jwtHeader()).then(
                json => {
                    this.gitCloneStatus = 'finish';
                    window.location.href = window.location.href;
                }).catch((err) => {
                this.gitCloneStatus = 'fail';
                console.log("请求错误:" + err);
            });
        },
    }
};
//顶部组件
const ArbiterHeader = {
    template: '#arbiterHeader',
    store,
    computed: {
        usernameAbbreviation() {
            if (!!this.username()) {
                return this.username().substr(0, 2)
            }
            else
                return null;
        }
    },
    data: function () {
        return {
            message: {
                href: 'login',
            },
            sliderIsOpen: true,
            loginDialog: {
                switch: false,
                username: "",
                password: "",

            },
        }
    },
    mounted() {
        this.refreshJwtToken();

        getRes("./getUserDetail", null, this.jwtHeader()).then(
            json => {
                let storage = window.localStorage;
                storage["username"] = json["username"];
                storage["role"] = json["role"];
                // this.$store.commit('setUserName', json["username"]);
                this.setUserName(json["username"]);
            }
        ).catch((err) => {
            console.log("请求错误:" + err);
        });
    },
    methods: {
        ...Vuex.mapMutations(['setUserName', 'refreshJwtToken','setSlideOpen']),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        toggleSlide() {
             this.sliderIsOpen = !this.sliderIsOpen;
        this.setSlideOpen();
        },
        /*点击登录*/
        toLogin() {
            this.openLoginDialog();
        },
        submit() {

        },
        /*打开和关闭登录对话框*/
        openLoginDialog() {
            this.loginDialog.switch = true;
        },
        closeLoginDialog() {
            this.loginDialog.switch = false;
        },
    },
    components: {        //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
        'userAvatar': userAvatar,
        'menuIconButton': menuIconButton,
    }

};