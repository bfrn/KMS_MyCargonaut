<template>
    <div>
        <p>{{data}}</p>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                data: []
            }
        },
        created: function() {
            this.axios
                .get('http://localhost:8080/user')
                .then(response => (this.data = response.data))
        },
        methods: {
            
        }
    }
</script>

<style scoped>

</style>
