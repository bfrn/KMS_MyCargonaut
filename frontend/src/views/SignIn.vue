<template>
    <div>
        <p>Let's create a new account !</p>
        <input type="text" placeholder="Email" v-model="item.username" /><br/>
        <input type="test" placeholder="Password" v-model="item.password"><br/>
        <button v-on:click="addUser()" >Sign Up</button><br/>
        <p>{{responseText}}<p>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                item: { },
                responseText: ''
            }
        },
        methods: {
            addUser() {
                this.axios.post('localhost:8080/user/register', this.item).then((response) => {
                    console.log(response.data)
                });
            }
        }
    }
</script>

<style scoped>

</style>
