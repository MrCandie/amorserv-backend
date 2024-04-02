"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = __importDefault(require("./mail-config"));
const pug_1 = __importDefault(require("pug"));
// import htmlToText from "html-to-text";
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = `"E-Buxury" <no-reply@buxury.ng>`;
    }
    newTransport() {
        return nodemailer_1.default.createTransport(mail_config_1.default);
    }
    // Send the actual email
    async send(template, subject, data) {
        // 1) Render HTML based on a pug template
        const html = pug_1.default.renderFile(`${__dirname}/../emails/${template}.pug`, {
            name: this.name,
            url: this.url,
            subject: subject,
            token: data === null || data === void 0 ? void 0 : data.token,
        });
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            // text: htmlToText.fromString(html),
        };
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async signup(data) {
        await this.send("signup", "Complete Signup", data);
    }
    async sendWelcome() {
        await this.send("send-welcome", "Welcome Onboard");
    }
    async login() {
        await this.send("login", "Login Notification");
    }
    async forgotPassword(data) {
        await this.send("forgot-password", "Password Reset", data);
    }
}
exports.default = Email;
