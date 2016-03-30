<?php

$name = strip_tags($_POST['name']);
$mail = strip_tags($_POST['mail']);

$data = '^' . $name .'^' . $mail .'^' . "\r\n";

file_put_contents('../js/json/letters.txt', $data, FILE_APPEND);
// To get
//$array = unserialize(file_get_contents("file.txt"));


//ONE LETTER FOR US
$to = "xenikSeefka@gmail.com, info@atelierkondakova.com, kondakova13@gmail.com, borisovaalina@lenta.ru";
$subject = "[РАССЫЛКА] Новый подписчик";

$message = "
<html>
<head>
<title>Новый подписчик</title>
</head>
<body>
<h2>Новый подписчик!</h2>
<p>Имя: " . $name . "</p><p>Почта: " . $mail . "</p>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$headers .= 'From: <info@atelierkondakova.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";
mail($to,$subject,$message,$headers);



//ANOTHER LETTER FOR USER
$to = $mail;
$subject = "[AtelierKondakova.com] Спасибо за подписку!";

$message = "
<html>
<head>
<title>Спасибо за подписку</title>
</head>
<body>
<h3>Мы выражаем благодарность за подписку на наши новости!</h3>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$headers .= 'From: <info@atelierkondakova.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";
mail($to,$subject,$message,$headers);

?>