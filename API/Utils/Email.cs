using System;
using System.IO;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace WebApi_Robotica.Utils
{
    public class Email
    {
        public void SendEmail(string Destinatario)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("SESI.StudyChat@gmail.com"));
            email.To.Add(MailboxAddress.Parse(Destinatario));
            email.Subject = "Bem vindo";

            string arqv = @"C:\Users\Aluno\Desktop\Medina\Robotica\API\WebApi_Robotica\Templates\email.html";
            string texto = "";
            using (StreamReader leitor = new(arqv))
            {
                string linha = "";
                while (linha != null)
                {
                    linha = leitor.ReadLine();
                    texto += linha;
                }
            }

            email.Body = new TextPart(TextFormat.Html) { Text = texto };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("sesi.studychat@gmail.com", "Senai@132");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}