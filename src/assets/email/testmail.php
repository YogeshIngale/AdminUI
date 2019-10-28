<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
 
$to = $_GET["to"];
$title = $_GET["title"];
$body = $_GET["body"];

echo $title;

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.scienceindiafest.org';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'noreply@scienceindiafest.org';                 // SMTP username
    $mail->Password = 'Narmware@11';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('noreply@scienceindiafest.org');
    $mail->addAddress($to);     // Add a recipient

    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $title;
    $mail->Body = $body;
//    $mail->Body    = "Hello Sir/Madam,<br>Your VVM registration is successful.<br>Your credentials are as follows:<br> Username :<br> <br>Thank You,<img src='VVM-Logo.png' height='50px' width='50px'><br><br>VVM Team.";
    $mail->AltBody = 'You are successfully registered';

    if (!$mail->send()) 
    {
      echo "Mailer Error: " . $mail->ErrorInfo;
    }
    else 
    {
      echo "Message sent!";
    }
 $mailflag=1;
} catch (Exception $e) {
   $mailflag=0;
}


   

?>
  