<template>
    <div
        v-bind:class="[
            canActivate ? 'alerted' : '',
            type === 'message' ? 'bg-green' : 'bg-red',
        ]"
        class="text-white text-center alert rounded z-50 fixed self-center top-20"
    >
        {{ message }}
    </div>
</template>

<style scoped>
.alert {
    width: 250px;
    right: -300px;
    transition: all 300ms;
}
.alerted {
    animation: toRight 4s cubic-bezier(0.06, 1.03, 0.03, 1.02) 1;
}
@keyframes toRight {
    0% {
        right: -300px;
    }
    50% {
        right: 30px;
    }
    100% {
        right: -300px;
    }
}
</style>

<script>
export default {
    name: "UserAlert",
    props: ["counter", "message", "canActivate", "type"],
    data() {
        return {};
    },
};
</script>
