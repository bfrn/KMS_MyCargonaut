<template>
    
    <div>
        <table id="userTable">
            <thead>
                <td>ID</td>
                <td>Usename</td>
                <td>Password</td>   
            </thead>
            <tr v-for="user in data" :key="user._id">
                <td>{{ user._id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.password }}</td>
            </tr>
        </table>
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
    #userTable {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    #userTable td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    #userTable tr:nth-child(even){background-color: #f2f2f2;}

    #userTable tr:hover {background-color: #ddd;}

    #userTable th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
    }
</style>