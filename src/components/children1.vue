<template>
    <div class="children1">
        <h1>children1</h1>
        <h3>{{flag==1?"第一":flag==2?"第二":"第三"}}</h3>
    </div >
</template>
<script>
export default {
    name:"children1",
    data() {
        return {
            flag:1
        }
    },
}
</script>