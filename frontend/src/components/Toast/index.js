import { toast } from "react-hot-toast";

export const message = {
    success: (message) => {
        return toast.success(message, {
            duration: 3000,
            style: {
                background: "rgb(var(--primary-color))",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 10px 25px rgba(var(--primary-dark-color), 0.35)",
            },
            iconTheme: {
                primary: "#ffffff",
                secondary: "rgb(var(--primary-color))",
            },
        });
    },
    error: (message) => {
        return toast.error(message, {
            duration: 3000,
            style: {
                background: "rgb(var(--primary-color))",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 10px 25px rgba(var(--primary-dark-color), 0.35)",
            },
            iconTheme: {
                primary: "#ffffff",
                secondary: "rgb(var(--primary-color))",
            },
        });
    }
}