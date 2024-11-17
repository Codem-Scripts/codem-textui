let audioPlayer = null;
const store = Vuex.createStore({
    components: {},

    state: {
        notifications: []
    },
    getters: {},
    mutations: {},
    actions: {
        notification({ state }, data) {
            let id = Date.now();
            if (state.notifications.length > 0) {
                if (state.notifications.some(notification => notification.message === data.message)) {
                    return;
                }
            }

            state.notifications.push({
                id: id,
                message: data.message,
                key: data.key,
                thema: data.thema
            });
            clicksound("notification_sound.mp3");
        }
    }
});

const app = Vue.createApp({
    components: {},
    data: () => ({}),

    watch: {},

    beforeDestroy() {},
    mounted() {
        window.addEventListener("keyup", this.keyHandler);
        window.addEventListener("message", this.eventHandler);
    },

    methods: {
        eventHandler(event) {
            switch (event.data.action) {
                case "CHECK_NUI":
                    postNUI("checkNUI");
                    break;
                case "SHOW_TEXTUI":
                    if (this.$store.state.notifications.length > 0) {
                        return;
                    }
                    if (this.$store.state.notifications.length === 0) {
                        this.$store.dispatch("notification", event.data.payload);
                    } else {
                        setTimeout(() => {
                            this.$store.dispatch("notification", event.data.payload);
                        }, 1000);
                    }

                    break;
                case "CLOSE_TEXTUI":
                    this.$store.state.notifications = [];
                    break;
                default:
                    break;
            }
        }
    },
    computed: {
        ...Vuex.mapState({
            notifications: state => state.notifications
        })
    }
});

app.use(store).mount("#app");
var resourceName = "codem-textui";

if (window.GetParentResourceName) {
    resourceName = window.GetParentResourceName();
}

window.postNUI = async (name, data) => {
    try {
        const response = await fetch(`https://${resourceName}/${name}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        return !response.ok ? null : response.json();
    } catch (error) {
        // console.log(error)
    }
};

function clicksound(val) {
    let audioPath = `./sound/${val}`;
    audioPlayer = new Howl({
        src: [audioPath]
    });
    audioPlayer.volume(0.4);
    audioPlayer.play();
}
