import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Restaurant from "@/pages/Restaurant";
import User from "@/pages/User";
import Login from "@/pages/Login";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/restaurant",
            name: "Restaurant",
            component: Restaurant,
        },
        {
            path: "/user",
            name: "LoggedUser",
            component: User,
            meta: { requiresAuth: true },
        },
        {
            path: "/user/:userId",
            name: "User",
            component: User,
        },
        {
            path: "/login",
            name: "Login",
            props: true,
            component: Login,
        },
    ],
});

const Cookies = require("js-cookie");

router.beforeEach(async function (to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (Cookies.get("access_token") != null) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
