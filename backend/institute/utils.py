from twilio.rest import Client
from django.conf import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TWILIO_ACCOUNT_SID = "AC98836b5ddd3648eec8b6589f8f9ab47d"
TWILIO_AUTH_TOKEN = "b856bca1d6ae6d78a2538312646b9106"
from_phonenumber = +12564624142


def send_sms(phone_number, message):
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        from_=from_phonenumber,
        to=phone_number,
        body=message,
    )
    return message.sid


def send_email(body):
    sender_email = "querysendersp@gmail.com"
    receiver_email = "sanskarsrdav@gmail.com"
    password = "ijslzduzbpbqciva"

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "StudyPhora Contact Form Queries"

    message.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(sender_email, password)

    server.sendmail(sender_email, receiver_email, message.as_string())

    server.quit()
