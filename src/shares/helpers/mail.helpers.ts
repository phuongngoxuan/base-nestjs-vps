import nodemailer from 'nodemailer';
import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import * as config from 'config';
const email = config.get<string>('mail.account');
const password = config.get<string>('mail.password');

const access_key_id = config.get<string>('aws_config.aws_access_key_id');
const secret_access_key = config.get<string>('aws_config.aws_secret_access_key');
const region_name = config.get<string>('aws_config.aws_bucket_name');

@Injectable()
export class EmailService {
  async sendEmail(emailAddress: string, subject: string, htmlBody: string, from?: string): Promise<any> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: email, // generated ethereal user
        pass: password, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: from || 'Commerce', // sender address
      to: emailAddress, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world?", // plain text body
      html: htmlBody, // html body
    });

    return info.messageId;
  }
  async SESSendEmail(emailAddress: string, subject: string, htmlBody: string, from?: string): Promise<void> {
    // Amazon SES configuration
    const SESConfig = {
      apiVersion: '2010-12-01',
      accessKeyId: access_key_id,
      secretAccessKey: secret_access_key,
      region: region_name,
    };

    const params = {
      Source: from || email,
      Destination: {
        ToAddresses: [emailAddress],
      },
      // ReplyToAddresses: [
      //   'maciej@zulier.com',
      // ],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };

    new AWS.SES(SESConfig)
      .sendEmail(params)
      .promise()
      .then((res) => {
        console.log(res);
      });
  }
}
