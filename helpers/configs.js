const Configs = {
    google: (email, password) => {
        return {        
            imap: {
                user: email,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,                
            }        
        }
    },
    microsoft: (email, password) => {
        return {
            imap: {
                user: email,
                password: password,
                host: 'imap-mail.outlook.com',
                port: 993,
                tls: true,                
            }        
        }
    }
}

module.exports = Configs;