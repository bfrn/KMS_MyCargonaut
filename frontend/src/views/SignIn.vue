<template>
    <div>
        <p>Let's create a new User !</p>
        <input type="text" placeholder="Email" v-model="item.username" /><br/>
        <input type="test" placeholder="Password" v-model="item.password"><br/>
        <button v-on:click="addUser()" >Register</button><br/>
        <p>{{responseText.success}}</p>
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
                this.axios.post('http://localhost:8080/user/register', this.item).then((response) => {
                    this.responseText=response.data
                });
            }
        }
    }
</script>

<style scoped>
    input{
        margin-bottom: 5px;
    }
</style>
