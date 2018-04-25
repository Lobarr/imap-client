const imaps = require('imap-simple');
const email = require('email-addresses');
const validator = require('email-validator');
const Configs = require('../../helpers/configs');

const EmailService = {
    parseDomain(input){
        return email.parseOneAddress(input).domain
    },
    async thread(from, credential) {
        if(!validator.validate(from)){
            throw new Error("Invalid email address")
        }
        let connection;
        connection = await imaps.connect(Configs.google(credential.email, credential.password));
        // if(this.parseDomain(from).incluudes("gmail")){
        //     connection = await imaps.connect(Configs.google(credential.email, credential.password));
        // } else if (this.parseDomain(from).incluudes("outlook") || this.parseDomain(from).incluudes("hotmail")){
        //     connection = await imaps.connect(Configs.microsoft(credential.email, credential.password));
        // }else{
        //     throw new Error("Domain not supported");
        // }
        const inbox = await connection.openBox('INBOX');
        const searchCriteria = [
            'ALL',
            ['FROM', from],
            ['TO', from]
        ];
        const fetchOptions = {
            bodies: ['HEADER.FIELDS (TO FROM SUBJECT DATE)', 'TEXT'],
        };
        const thread = []
        const messages = await connection.search(searchCriteria, fetchOptions);
        messages.forEach(message => {
            let merge = {};
            message.parts.forEach(part => {
                if (part.which !== 'TEXT'){
                    merge.from = part.body.from;
                    merge.to = part.body.to;
                    merge.subject = part.body.subject;
                    merge.date = part.body.date;       
                } else {
                    merge.body = part.body
                }
                thread.push(merge);
            })
        })
        connection.end()
        return thread
    }
}

module.exports = EmailService;