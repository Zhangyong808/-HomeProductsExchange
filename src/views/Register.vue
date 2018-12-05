<template>
    <div class="view register-view">
        <div class="center-container">
            <v-userform/>
        </div>
    </div>
</template>

<script>

import VUserForm from '../components/UserForm';
export default {
    name: 'register',
    components: {
        'v-userform': VUserForm
    },
    data() {
        return {
            
        };
    },
    created() {
        
    },
    methods: {
        
    }
};
</script>
<style lang="stylus">
.register-view {
    display: flex;
    justify-content: center;
    align-items: center;

    .center-container {
        margin: 110px 0 90px;
    }
}
</style>

