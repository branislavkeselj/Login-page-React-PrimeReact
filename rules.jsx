
import lang from "./lang.jsx";

export default {
    username:{
        pattern:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        message:lang.rules_username
    },
    password:{
        pattern:/^[a-zA-Z0-9!@#$%^&*_+:?{|}()\[\]~-]{8,20}$/,
        message:lang.rules_password
    }
}