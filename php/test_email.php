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
$cart = $_POST['user_cart'];

//echo $name;
// echo $email;
// echo $phone;
// echo $comment;
//echo $cart;


$str = "";

foreach ($cart as $item) {
  $str .= "<tr>";
//  $str .= $item;
  foreach ($item as $key => $value) {
    //$str .= $item;
//    $str .= "$key ----- $value <br />";
    if($key == "id"){
      $item_artikul = $value;
    }
    if($key == "name"){
      $item_name = $value;
    }
    if($key == "size"){
      $item_size = $value;
    }
    if($key == "qty"){
      $item_qty = $value;
    }
    if($key == "price"){
      $item_price = $value;
    }
  }
  $str .= "<td>".$item_artikul."</td>
          <td>".$item_name."</td>
          <td>".$item_size."</td>
          <td>".$item_qty."</td>
          <td>".$item_price."</td>
          <td>".($item_qty * $item_price)."</td>";
  $str .= "</tr>";
}



//$to = "somebody@example.com, somebodyelse@example.com";
$to = "xenikSeefka@gmail.com, ". $email;
$subject = "HTML email";

$message = "
<html>
<head>
<title>hello world</title>
</head>
<body>
<p>Заказ оформлен!</p>
Имя: ". $name ."<br>
email: " . $email . "<br>
Телефон:  " . $phone . "<br>
Комментарий:  " . $comment . "<br><br><br>
<table>
<tr>
<th>Артикул</th>
<th>Название</th>
<th>Размер</th>
<th>Количество</th>
<th>Цена за штуку</th>
<th>Сумма</th>
</tr>
".$str."
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