const development ={
    name:'development',
    asset_path:'./assets',
    session_cookie_key: 'blahsomething',
    db:'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'trialgamail',    // this is your email or password to send email
            pass: 'scxgayrdxtzgialh'
        }
    },
    google_client_ID: "752317785339-puqihne5m6g48cjprcuk9gptjqmnt86b.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret_key: 'ChatApp'
}

const production = {
    name:'production'
}

module.exports = development;