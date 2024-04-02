import nodemailer from "nodemailer";
import nodemailerConfig from "./mail-config";
import pug from "pug";
// import htmlToText from "html-to-text";

export default class Email {
  to: string;
  name: string;
  url?: string;
  from: string;

  constructor(user: { email: string; name: string }, url?: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `"E-Buxury" <no-reply@buxury.ng>`;
  }

  newTransport() {
    return nodemailer.createTransport(nodemailerConfig);
  }

  // Send the actual email
  async send(template: string, subject: string, data?: any) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../emails/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject: subject,
      token: data?.token,
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

  async signup(data: any) {
    await this.send("signup", "Complete Signup", data);
  }

  async sendWelcome() {
    await this.send("send-welcome", "Welcome Onboard");
  }

  async login() {
    await this.send("login", "Login Notification");
  }

  async forgotPassword(data: any) {
    await this.send("forgot-password", "Password Reset", data);
  }
}
