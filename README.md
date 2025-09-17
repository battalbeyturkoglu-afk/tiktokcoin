<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Giriş Ekranı</title>
  <style>
    body { font-family: Arial, sans-serif; background: #111; color: #fff; display: flex; height: 100vh; justify-content: center; align-items: center; margin:0; }
    #login-box, #site-content { background: #222; padding: 20px; border-radius: 8px; width: 300px; text-align: center; }
    input { width: 90%; padding: 8px; margin: 10px 0; border: none; border-radius: 4px; }
    button { padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:hover { background: #45a049; }
    #site-content { display: none; }
  </style>
</head>
<body>

<div id="login-box">
  <h2>Giriş Yap</h2>
  <input type="text" id="username" placeholder="Kullanıcı adı"><br>
  <input type="password" id="password" placeholder="Şifre"><br>
  <button onclick="login()">Giriş</button>
  <p id="error" style="color:red; display:none;">Hatalı kullanıcı adı veya şifre!</p>
</div>

<div id="site-content">
  <h1>Siteye Hoş Geldin 🎉</h1>
  <p>Bu içerik yalnızca doğru giriş yapanlara görünür.</p>
</div>

<script>
  function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    // Senin belirlediğin giriş bilgileri
    const correctUser = "tiktokdubai";
    const correctPass = "dubaitiktok";

    if (u === correctUser && p === correctPass) {
      document.getElementById("login-box").style.display = "none";
      document.getElementById("site-content").style.display = "block";
    } else {
      document.getElementById("error").style.display = "block";
    }
  }
</script>

</body>
</html>
