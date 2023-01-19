module.exports = {
    darkMode: "class",
    content: ["./components/**/*.{html,vue}"],
    purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                "logo": "36px",
            },
            width: {
                "logo": "36px",
            },
            screens: {
                mobile: "360px",
                tablet: "768px", // equivalent of md:
            },
            colors: {
                black: "rgb(15, 14, 14)",
                purple: "rgb(93, 83, 152)",
                lightblue: "rgb(119, 211, 255)",
                // shades of gray, 1 being lighter and 6 darker
                gray0: "#E1E1E1",
                gray1: "#CFCFCF", //
                gray2: "#A8A8A8",
                gray3: "#777777",
                gray4: "#565656",
                gray5: "#414141",
                gray6: "#2F3338",
                gray7: "#212529", // this shade should be used almost all the time
                gray8: "rgb(60, 66, 74)",
                white: "rgb(243, 242, 242)",
                pureWhite: "#FFFFFF",
                yellow: "#FFC529",
                yellowDarker: "#E0AA00",
                red: "#E5383B",
                redDarker: "#BD181B",
                green: "rgb(58, 165, 37)",
                lightgreen: "rgb(63, 194, 37)",
                cardBlack: "rgb(10, 10, 10)",
                headerWhite: "#FFFFFE",
                headerBlack: "rgb(14, 15, 15)",
            },
            fontFamily: {
                sans: ["Nunito", "sans-serif"],
            },
        },
    },
    plugins: [],
    variants: {
        transitionDuration: ["responsive", "hover", "focus"],
    },
};