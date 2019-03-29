<template>
    <transition name="modal">
        <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
            <div class="modal-wrapper confirm-chat-user">
                <div class="modal-container">
                    <div class="modal-body">
                        <div class="lh-0 b-sm o-hidden">
                            <div class="flex-row" v-for="(worlds, idx) in threeColumnedWorlds" :key="idx">
                                <div
                                    class="world-label btn-maple font-hover-shadow flex-row items-center f-700 pointer-cursor lines-1"
                                    :class="{'selected': chosenWorld === world.title}"
                                    v-for="world in worlds"
                                    :key="world.title"
                                    @click="onSelectWorld(world)">
                                    <WorldIcon class="flex-wrap m-r-8" :world="world.title"/>
                                    {{ world.title | translate }}
                                </div>
                            </div>
                        </div>
                        <label class="c-red" v-show="showErrorWorldRequired">{{ 'ERROR_WORLD_REQUIRED' | translate }}</label>
                        <div class="flex-row m-t-8">
                            <input
                                :ref="'nickname'"
                                class="m-r-8 flex-fill"
                                v-model="nickname"
                                :placeholder="'NICKNAME' | translate" maxlength="12"
                                @focus="$event.target.select()"
                                @keyup.enter="onConfirmChatUser">
                            <button class="btn btn-maple flex-fill b-md" @click="onConfirmChatUser">{{ 'CONFIRM' | translate }}</button>
                        </div>
                        <label class="c-danger" v-show="showErrorNickname.REQUIRED">{{ 'ERROR_NICKNAME_REQUIRED' | translate }}</label>
                        <label class="c-danger" v-show="showErrorNickname.INVALID">{{ 'ERROR_NICKNAME_INVALID' | translate }}</label>
                        <label class="c-danger" v-show="showErrorNickname.EXCEEDED">{{ 'ERROR_NICKNAME_EXCEEDED' | translate }}</label>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import WorldIcon from '@/components/WorldIcon'

export default {
    name: 'ConfirmChatUser',
    data: () => ({
        nickname: null,
        chosenWorld: null,
        showErrorWorldRequired: false,
        showErrorNickname: {
            REQUIRED: false,
            INVALID: false,
            EXCEEDED: false,
        },
    }),
    components: {
        WorldIcon
    },
    computed: {
        threeColumnedWorlds() {
            return [
                [{ title: 'NONE' }, { title: 'SCANIA' }, { title: 'BERA' }],
                [{ title: 'ZENITH' }, { title: 'CROA' }, { title: 'RED' }],
                [{ title: 'AURORA' }, { title: 'ARCANE' }, { title: 'NOVA' }],
                [{ title: 'ENOSIS' }, { title: 'UNION' }, { title: 'ELYSIUM' }],
                [{ title: 'LUNA' }, { title: 'REBOOT_1' }, { title: 'REBOOT_2' }]
            ]
        },
    },
    created() {
        this.$nuxt.$on('onSuccessSetUser', user => {
            this.$store.dispatch('setUser', user);
            this.$emit('close');
        })
    },
    beforeDestroy() {
        this.$nuxt.$off('onSetUser')
    },
    mounted() {
        this.chosenWorld = this.$store.getters.user.world
        this.nickname = this.$store.getters.user.nickname
    },
    methods: {
        emitIfMaskIsClicked(e) {
            if (e.target.className.includes('modal-wrapper'))
                this.$emit('close');
        },
        resetErrors() {
            this.showErrorWorldRequired = false;
            this.showErrorNickname = {}
        },
        onConfirmChatUser() {
            this.resetErrors();
            this.showErrorWorldRequired = !this.chosenWorld;
            let nicknameError = this.$options.filters.hasNicknameError(this.nickname);
            if (nicknameError) {
                this.showErrorNickname[nicknameError.split("_")[2]] = true
            }
            if (!this.chosenWorld || nicknameError) return;

            let user = {
                nickname: this.nickname,
                world: this.chosenWorld
            }
            if (this.$store.getters.user) {
                user.authToken = this.$store.getters.user.authToken
            }
            this.$nuxt.$emit('requestSetUser', user);
        },
        onSelectWorld(world) {
            this.chosenWorld = world.title;
            let nicknameInputBox = this.$refs['nickname'];
            if (nicknameInputBox) {
                nicknameInputBox.focus();
            }
        }
    }
}
</script>