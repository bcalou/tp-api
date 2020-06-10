<?php
$conn = new mysqli('space.mysql.eu2.frbit.com', 'space', 'qMl+XhaW93Jhtebf1_soreAJ', 'space');
  if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      if (isset($_GET['id'])) {
          $id =$conn->real_escape_string($_GET['id']);
          $sql = $conn->query("SELECT id, videoURL, videoName, descritpion FROM webdocressources WHERE  id='$id'");
          $data = $sql->fetch_assoc();
      } else {
          $data = array();
          $sql = $conn->query("SELECT id, videoURL, videoName, descritpion FROM webdocressources");
          while ($d = $sql->fetch_assoc())
              $data[] = $d;
      }
      exit(json_encode($data));
  } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      echo 'POST';
  } else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
      echo 'PUT';
  } else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
      echo 'DELETE';
  }
?>