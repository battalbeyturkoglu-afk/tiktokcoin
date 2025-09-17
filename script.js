<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Recharge - Demo</title>
<style>
  :root{
    --bg:#f6f7f8;
    --card:#ffffff;
    --accent:#ff2d55;
    --muted:#8e9499;
    --shadow:0 10px 30px rgba(0,0,0,0.08);
    font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  }
  *{box-sizing:border-box}
  body{
    margin:0;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:linear-gradient(#fafafb,#f2f3f5);
    padding:20px;
  }

  .wrap{
    width:420px;
    max-width:96%;
  }

  .header{
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:12px;
    position:relative;
  }
  .header h1{margin:0;font-size:20px;}
  .header .help{position:absolute;right:0;width:30px;height:30px;border-radius:50%;background:#fff;border:1px solid #eee;display:flex;align-items:center;justify-content:center;font-weight:700;color:#666}

  .panel{
    background:var(--card);
    border-radius:14px;
    padding:16px;
    box-shadow:var(--shadow);
  }

  /* Username */
  .row{
    display:flex;
    gap:10px;
    align-items:center;
    margin-bottom:12px;
  }
  .row label{min-width:80px;font-weight:600;color:#333;}
  .row input[type="text"]{
    flex:1;padding:10px;border-radius:10px;border:1px solid #eee;font-size:15px;
  }

  .balance{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:10px;
    color:var(--muted);
  }

  /* coins grid */
  .grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
    margin-bottom:12px;
  }
  .tile{
    background:#fff;border-radius:10px;padding:12px;border:1px solid #eee;cursor:pointer;
    display:flex;flex-direction:column;gap:6px;align-items:flex-start;transition:all .12s ease;
    min-height:68px;
  }
  .tile .amount{font-weight:700}
  .tile .price{font-size:12px;color:var(--muted)}
  .tile.selected{border:2px solid rgba(255,45,85,0.12);transform:translateY(-6px);background:linear-gradient(180deg,#fff,#fff6f7)}

  /* custom row */
  .custom{
    display:flex;gap:8px;margin-bottom:12px;
  }
  .custom input[type="number"]{flex:1;padding:10px;border-radius:10px;border:1px solid #eee}
  .custom button{padding:10px 12px;border-radius:10px;border:0;background:#f1f1f1;cursor:pointer;font-weight:700}

  /* card masked */
  .cardRow{margin-bottom:14px}
  .cardLabel{font-size:13px;color:var(--muted);margin-bottom:6px}
  .cardBox{
    background:#fafafa;border-radius:10px;padding:12px;border:1px dashed #eee;display:flex;justify-content:space-between;align-items:center;
  }
  .cardBox .left{font-weight:700}
  .cardBox .right{font-size:13px;color:var(--muted)}

  /* action */
  .action{display:flex;flex-direction:column;gap:10px}
  .rechargeBtn{
    background:var(--accent);color:#fff;border:0;padding:14px;border-radius:12px;font-weight:800;cursor:pointer;font-size:16px;box-shadow:0 8px 18px rgba(255,45,85,0.12)
  }
  .hint{text-align:center;color:var(--muted);font-size:13px}

  /* history */
  .history{margin-top:12px;display:none}
  .entry{background:#fff;padding:10px;border-radius:10px;border:1px solid #eee;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}

  /* modal (video-like popup) */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:none;align-items:center;justify-content:center;z-index:60}
  .modal{
    width:320px;background:#fff;border-radius:14px;padding:16px;box-shadow:0 20px 50px rgba(0,0,0,0.25);text-align:center;transform:translateY(20px);opacity:0;transition:all .28s ease;
  }
  .modal.show{transform:translateY(0);opacity:1}
  .modal .title{font-weight:800;margin-bottom:8px}
  .modal .desc{color:var(--muted);margin-bottom:12px}
  .spinner{
    width:56px;height:56px;border-radius:50%;border:6px solid #f1f1f1;border-top-color:var(--accent);margin:10px auto 12px;animation:spin 1s linear infinite;
  }
  @keyframes spin{to{transform:rotate(360deg)}}

  .modal .okBtn{margin-top:8px;padding:10px 14px;border-radius:10px;border:0;background:var(--accent);color:#fff;font-weight:700;cursor:pointer}

  /* responsive */
  @media (max-width:420px){ .wrap{padding:0 8px} }
</style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>Recharge</h1>
      <div class="help">?</div>
    </div>

    <div class="panel">
      <div class="row">
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Kullanıcı adını yazın">
      </div>

      <div class="balance">
        <div>Balance</div>
        <div><strong>₺ 18</strong></div>
      </div>

      <div class="grid" id="grid">
        <!-- tiles injected by JS -->
      </div>

      <div class="custom">
        <input id="customInput" type="number" min="1" placeholder="Custom amount (₺)">
        <button id="useCustom">Use</button>
      </div>

      <div class="cardRow">
        <div class="cardLabel">Kart numarası</div>
        <div class="cardBox">
          <div class="left" id="masked">**** **** **** 2678</div>
          <div class="right">Son 4: <span id="last4">2678</span></div>
        </div>
      </div>

      <div class="action">
        <button class="rechargeBtn" id="rechargeBtn">Recharge</button>
        <div class="hint">Try recharging on tiktok.com to avoid in-app service fees.</div>
      </div>

      <div class="history" id="historyArea">
        <div id="historyList"></div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div class="overlay" id="overlay">
    <div class="modal" id="modal">
      <div class="title" id="modalTitle">İşlem yapılıyor</div>
      <div class="desc" id="modalDesc">Lütfen bekleyin...</div>
      <div class="spinner" id="spinner"></div>
      <button class="okBtn" id="modalOk" style="display:none">Tamam</button>
    </div>
  </div>

<script>
  // Predefined options similar to görselindeki düzen
  const opts = [
    {amount:20, price:"$0.29"},
    {amount:130, price:"$1.99"},
    {amount:1120, price:"$16.99"},
    {amount:1799, price:"$26.99"},
    {amount:2905, price:"$39.99"},
    {amount:4955, price:"$69.99"},
    {amount:7265, price:"$109.99"},
    {amount:11230, price:"$169.99"},
    {amount:null, price:"Custom"}
  ];

  const grid = document.getElementById('grid');
  let selectedAmount = null;

  // create tile elements
  opts.forEach((o, i)=>{
    const el = document.createElement('div');
    el.className = 'tile';
    el.dataset.idx = i;
    el.innerHTML = `<div class="amount">${o.amount ? (o.amount.toLocaleString() + ' coins') : 'Custom'}</div>
                    <div class="price">${o.price}</div>`;
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.tile').forEach(t=>t.classList.remove('selected'));
      el.classList.add('selected');
      selectedAmount = o.amount;
      if(selectedAmount === null) document.getElementById('customInput').focus();
      else document.getElementById('customInput').value = '';
    });
    grid.appendChild(el);
  });

  // custom use
  document.getElementById('useCustom').addEventListener('click', ()=>{
    const v = Number(document.getElementById('customInput').value);
    if(!v || v <= 0){ alert('Lütfen geçerli bir miktar girin.'); return; }
    selectedAmount = v;
    document.querySelectorAll('.tile').forEach(t=>t.classList.remove('selected'));
    const custom = Array.from(document.querySelectorAll('.tile')).find(t=> t.querySelector('.amount').textContent.trim()==='Custom');
    if(custom) custom.classList.add('selected');
  });

  // CARD: masked always shows last4 = 2678 per isteğin
  const last4Span = document.getElementById('last4');
  last4Span.textContent = '2678';
  document.getElementById('masked').textContent = '**** **** **** 2678';

  // Recharge behavior -> show modal like videodaki pencere
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const spinner = document.getElementById('spinner');
  const modalOk = document.getElementById('modalOk');
  const historyArea = document.getElementById('historyArea');
  const historyList = document.getElementById('historyList');

  document.getElementById('rechargeBtn').addEventListener('click', ()=>{
    const username = document.getElementById('username').value.trim();
    if(!username){ alert('Lütfen username girin.'); return; }
    if(!selectedAmount){ alert('Lütfen bir paket seçin veya custom tutar girin.'); return; }

    // Show overlay + modal "işlem yapılıyor"
    overlay.style.display = 'flex';
    setTimeout(()=> modal.classList.add('show'), 20);
    modalTitle.textContent = 'İşlem Yapılıyor';
    modalDesc.textContent = `${selectedAmount.toLocaleString()} coins gönderiliyor…`;
    spinner.style.display = 'block';
    modalOk.style.display = 'none';

    // simulate a short flow like videodaki: 1) processing, 2) success modal
    setTimeout(()=>{
      modalTitle.textContent = 'Başarılı';
      modalDesc.textContent = `${selectedAmount.toLocaleString()} coins ${username} için gönderildi.`;
      spinner.style.display = 'none';
      modalOk.style.display = 'inline-block';
      // add to history
      const entry = document.createElement('div');
      entry.className = 'entry';
      const now = new Date().toLocaleString('tr-TR');
      entry.innerHTML = `<div><strong>+ ${selectedAmount.toLocaleString()} coins</strong><div style="font-size:13px;color:${'#666'}">Kullanıcı: ${username}<div style="font-size:12px;color:${'#888'};margin-top:6px">Kart: **** **** **** 2678</div></div></div><div style="text-align:right;color:green;font-weight:700">Gönderildi<div style="font-size:12px;color:#888;margin-top:6px">${now}</div></div>`;
      historyList.prepend(entry);
      historyArea.style.display = 'block';

      // log for debug / backend integration
      console.log('İşlem:', {username, amount:selectedAmount, card_last4:'2678', time: now});
    }, 1000); // 1s simüle

  });

  // close modal
  modalOk.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) closeModal(); });

  function closeModal(){
    modal.classList.remove('show');
    setTimeout(()=> overlay.style.display = 'none', 220);
  }

  // small: prevent selecting non-numeric on custom input negative etc.
  document.getElementById('customInput').addEventListener('input', (e)=>{
    // allow only integers
    e.target.value = e.target.value.replace(/[^\d]/g,'');
  });

  // init: pre-select first option to mimic image
  document.querySelectorAll('.tile')[1].classList.add('selected'); // choose second tile (130) as initial
  selectedAmount = opts[1].amount;

</script>
</body>
</html>