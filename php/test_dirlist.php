<?php
if ($handle = opendir('.')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            echo "$entry\n";
            if ($entry == 'post.html') {
              $a = $entry;
            }
        }
    }
    closedir($handle);
}
?>

<script type="text/javascript">

  console.log($a);

</script>