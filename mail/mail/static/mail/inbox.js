
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  document.querySelector('#compose-form').onsubmit = function() {
    let receiver = document.querySelector('#compose-recipients').value;
    let subject = document.querySelector('#compose-subject').value;
    let body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: receiver,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        console.log("Sent successfully!");
    });
    return false; // Prevent default form submission
  }
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3 style="color:darkviolet ">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3><hr/>`;
  
   
    fetch(`/emails/${mailbox}`)
      .then(response => response.json())
      .then(emails => {
        // Print emails
        console.log(emails);
        emails.forEach(email => {
          const emailBox = document.createElement('div');
          const buttonStyle = document.createElement('div');
          emailBox.classList.add('email-box');
          buttonStyle.classList.add('button-29');
          const email_view = document.querySelector('#emails-view')
          const sender = document.createElement('div');
          const subject = document.createElement('div');
          const body = document.createElement('div');
          
          const dateTime = document.createElement('div');
          const receiver = document.createElement('div');
          dateTime.innerHTML=`${email.timestamp}`
          sender.innerHTML = `From: <b>${email.sender}</b>`;
          receiver.innerHTML= `To <b>${email.recipients}</b>`;
          subject.innerHTML = `<b>${email.subject}</b>`;

          const viewButton = document.createElement('button');
          const archive_button = document.createElement('button');
          const unarchive_button = document.createElement('button');
          const reply = document.createElement('button');

          viewButton.classList.add('button-29');
          archive_button.classList.add('button-29')
          unarchive_button.classList.add('button-29')
          reply.classList.add('button-29')

          archive_button.innerHTML='Archive';
          unarchive_button.innerHTML = 'Unarchive';
          reply.innerHTML='Reply';
          reply.style.marginLeft='5px';
          unarchive_button.style.marginRight = '5px';
          archive_button.style.marginRight = '5px';
          if(mailbox=='inbox'){
            if(email.read == true){
              emailBox.style.backgroundColor='white';
              console.log("It is working");
            }
          
          emailBox.append(sender, subject);
          email_view.append(archive_button);
          
          //buttonStyle.append(archive_button);
          }
          else if(mailbox=='sent'){
            emailBox.append(receiver,subject)
          }
          else if(mailbox=='archive'){
            emailBox.append(sender, subject);
            email_view.append(unarchive_button);
            //buttonStyle.append(unarchive_button);
          }
          
          viewButton.innerHTML = 'View';
          let counter=0;
          
          viewButton.addEventListener('click',function(){
            if(mailbox=='inbox'){
            console.log("hello")
            fetch(`/emails/${email.id}`,{
              method: 'PUT',
              body : JSON.stringify({
                read : true //Turn this to true
              })
            })
          
                    
          }
            console.log(email.read);
            if(counter==0){
            body.innerHTML = `${email.body}<br><hr/>`;
            emailBox.append(body,dateTime,reply);
            counter++;
            //buttonStyle.append(reply);
            reply.addEventListener('click',function(){
              document.querySelector('#emails-view').style.display = 'none';
              document.querySelector('#compose-view').style.display = 'block';
              let form_for_reply = document.querySelector('#compose-form');
              let recipient = document.querySelector('#compose-recipients');
              recipient.style.display = 'none';
              let subject_for_reply = document.querySelector('#compose-subject')
              subject_for_reply.style.display='none';
              document.querySelector('#compose-body').value = '';
              document.querySelector('#reply_id').innerHTML='Reply Email'
              document.querySelector('#sender-id').style.display = 'none';
              document.querySelector('#div-compose-recipients').style.display = 'none'
              form_for_reply.onsubmit = function() {
                let curerntDateTime = new Date();

                let receiver = email.sender;
                let subject = `Re: ${email.subject}`;
                let body = ` On ${curerntDateTime}, ${email.recipients} wrote :
                <br/>
                ${document.querySelector('#compose-body').value}`;
                
                fetch('/emails', {
                  method: 'POST',
                  body: JSON.stringify({
                    recipients: receiver,
                    subject: subject,
                    body: body
                  })
                })
              }            
              
            })
            }
            else{
                counter--;
                body.remove()
                dateTime.remove()              
              }
          })
          archive_button.addEventListener('click',function(){
            fetch(`/emails/${email.id}`,{
              method: 'PUT',
              body : JSON.stringify({
                archived : true 
              })
            })
          location.reload()
          })
          unarchive_button.addEventListener('click',function(){
            fetch(`/emails/${email.id}`,{
              method: 'PUT',
              body : JSON.stringify({
                archived : false 
              })
            })
          })
      
          email_view.append(viewButton)
          //buttonStyle.append(viewButton);
          email_view.append(emailBox)
      
          document.querySelector('#emails-view').append(emailBox);
          // ... do something else with emails ...
        

        });
      
      });
  }

