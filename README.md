# Welcome to Mail
Mail is a website build using Javascript,django framework of python,HTNL abd CSS.
It includes almost every feature you know so far if you have used any mailing website or app.Those features are listed as follows:
- Every user's account is secured by a password,of which no other user has access to.
- If user doesn't have any account,user can create it and login into his/her account.
- User has access to multiple boxes like:
     - Inbox
     - Archived
     - Sent
- User can send mail to anyone he/she wants(If that email id also exists).
- User can "view" mail and also reply to it(Any replied mail will have subject beginning with string "Re:" and body with beginning with "On {date},{user} wrote:").
- Each mail has time at which the mail was sent,with respect to user's timezone.
To run the website,you should have django installed on your computer.After downloading,strictly in the give order,in the terminal, type:
     - py manage.py makemigrations mail
     - py manage.py migrate
     - py manage.py runserver
