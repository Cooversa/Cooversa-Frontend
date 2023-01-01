import sendgrid from '@sendgrid/mail';
import type {MailDataRequired} from '@sendgrid/helpers/classes/mail';
import {PRIVATE_SENDGRID_API_KEY} from "$env/static/private";

sendgrid.setApiKey(PRIVATE_SENDGRID_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
    try {
        const templateId = 'd-82008c977789427ab374033661d83610';
        const msg: MailDataRequired = {
            to: email,
            from: {
                email: 'apply@cooversa.com',
                name: 'Cooversa',
            },
            templateId,
            dynamicTemplateData: {
                name,
            }
        }

        await sendgrid.send(msg);
    } catch (error) {
        console.log(error);
        throw error;
    }
}