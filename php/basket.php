<?php

$name = strip_tags($_POST['user_name']);
$email = strip_tags($_POST['user_email']);
$phone = strip_tags($_POST['user_phone']);
$comment = strip_tags($_POST['user_comment']);
$cart = $_POST['user_cart'];
$promo = strip_tags($_POST['user_promo']);
$amount = strip_tags($_POST['user_amount']);

$str = "";

foreach ($cart as $item) {
  $str .= "<tr style='border: 1px solid black; padding: 10px;'>";
  foreach ($item as $key => $value) {
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
    if($key == "sales_price"){
      $item_price = $value;
    }
  }
  $str .= "<td style='border: 1px solid black; padding: 10px;'>".$item_artikul."</td>
          <td style='border: 1px solid black; padding: 10px;'>".$item_name."</td>
          <td style='border: 1px solid black; padding: 10px;'>".$item_size."</td>
          <td style='border: 1px solid black; padding: 10px;'>".$item_qty."</td>
          <td style='border: 1px solid black; padding: 10px;'>".$item_price."p</td>
          <td style='border: 1px solid black; padding: 10px;'>".($item_qty * $item_price)."p</td>";
  $str .= "</tr>";
}

$sales_footer = "";

if($promo != "") {
  $sales_footer = "<tr style='border: 1px solid black; padding: 10px;'>
  <td colspan='5' style='border: 1px solid black; padding: 10px;'>Скидка</td>
  <td colspan='2' style='border: 1px solid black; padding: 10px;'>".$promo."p</td>
  </tr>";
}

$to = "xenikSeefka@gmail.com, info@atelierkondakova.com, kondakova13@gmail.com, borisovaalina@lenta.ru, ". $email;
#$to = "xenikSeefka@gmail.com";
$subject = "[AtelierKondakova.com] Ваш заказ оформлен!";

$message = "
<html>
<head>
<title>[AtelierKondakova.com] Ваш заказ оформлен!</title>
</head>
<body>
<h3>Ваши данные:</h3>
  <p>Имя: ". $name ."</p>
  <p>email: " . $email . "</p>
  <p>Телефон:  " . $phone . "</p>
  <p>Комментарий:  " . $comment . "</p>
<br>
<h3>Ваш заказ:</h3>
<table style='border-collapse:collapse;border:1px solid #777;min-width:550px;'>
<thead>
<tr style='border: 1px solid black; padding: 10px;'>
<th style='border: 1px solid black; padding: 10px;'>Артикул</th>
<th style='border: 1px solid black; padding: 10px;'>Название</th>
<th style='border: 1px solid black; padding: 10px;'>Размер</th>
<th style='border: 1px solid black; padding: 10px;'>Количество</th>
<th style='border: 1px solid black; padding: 10px;'>Цена</th>
<th style='border: 1px solid black; padding: 10px;'>Сумма</th>
</tr>
</thead>
<tfoot>" . $sales_footer .
"<tr style='border: 1px solid black; padding: 10px;'>
<td colspan='5' style='border: 1px solid black; padding: 10px;'>Итого</td>
<td colspan='2' style='border: 1px solid black; padding: 10px;'>".$amount."p</td>
</tr></tfoot>
<tbody>
".$str."
</tbody>
</table>
<br><br>
<hr>
<div>
  <p>С уважением,</p>
  <p>ANASTASIA KONDAKOVA TEAM</p>
  <p>+7 (925) 275-49-45</p>
  <p>info@atelierkondakova.com</p>
  <p>http://atelierkondakova.com</p>
</div>
</body>
</html>
";
// echo $message . "\n";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <info@atelierkondakova.com>' . "\r\n";

mail($to,$subject,$message,$headers);
?>