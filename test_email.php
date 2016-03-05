<?php

 echo 'sending email...';

// $_SESSION['post-data'] = $_POST;

// $name = strip_tags($_POST['user_name']);
// $email = strip_tags($_POST['user_email']);
// $phone = strip_tags($_POST['user_phone']);
// $comment = strip_tags($_POST['user_comment']);

// if ($_POST["submit"]) {
//   $result='<div class="alert alert-success">adasdas qwdw qq </div>';

//     unset($_SESSION['post-data']['user_name']);
//     unset($_SESSION['post-data']['user_email']);
//     unset($_SESSION['post-data']['user_phone']);
//     unset($_SESSION['post-data']['user_comment']);
//     session_destroy();

// } else {
//   $result='<div class="alert alert-danger">Sorry, there was
//             an error sending your message. Please try again later.</div>';
// }

$name = strip_tags($_POST['user_name']);
$email = strip_tags($_POST['user_email']);
$phone = strip_tags($_POST['user_phone']);
$comment = strip_tags($_POST['user_comment']);

//echo $name;
echo $email;
echo $phone;
echo $comment;


//$to = "somebody@example.com, somebodyelse@example.com";
$to = "xenikSeefka@gmail.com";
$subject = "HTML email";

$message = "
<html>
<head>
<title>hello world</title>
</head>
<body>
<p>This email contains HTML Tags!</p>
name: ". $name ."
email: " . $email . "
phone:  " . $phone . "
comment:  " . $comment . "
<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>
<tr>
<td>John</td>
<td>Doe</td>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <info@atelierkondakova.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";

mail($to,$subject,$message,$headers);

echo 'sent email...';
?>