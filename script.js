// =================== SAMPLE NEWS DATA ===================
const newsData = [
    {
      title: "Startup lokal memenangkan kompetisi teknologi regional",
      summary: "Perusahaan rintisan teknologi dari Indonesia berhasil membawa pulang penghargaan setelah menampilkan solusi AI ramah pengguna.",
      time: "1 jam lalu",
    },
    {
      title: "Turnamen e-sports menarik ribuan penonton",
      summary: "Gelaran e-sports terbaru memecah rekor penonton dengan sejumlah tim baru yang tampil mengejutkan.",
      time: "10 jam lalu",
    },
    {
      title: "Perubahan jadwal liga lokal karena cuaca ekstrem",
      summary: "Beberapa pertandingan harus ditunda setelah hujan deras melanda kawasan stadion.",
      time: "1 hari lalu",
    },
  ];
  
  const newsContainer = document.getElementById("news-list");
  const searchInput = document.getElementById("search-news");
  
  function displayNews(filter = "") {
    newsContainer.innerHTML = "";
    newsData
      .filter((n) => n.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach((n) => {
        const div = document.createElement("div");
        div.className = "news-item";
        div.innerHTML = `<h3>${n.title}</h3><p>${n.summary}</p><small>${n.time}</small>`;
        newsContainer.appendChild(div);
      });
  }
  
  searchInput.addEventListener("input", () => displayNews(searchInput.value));
  
  displayNews();
  
  // =================== COMMENTS ===================
  const commentInput = document.getElementById("comment-input");
  const commentBtn = document.getElementById("comment-btn");
  const commentList = document.getElementById("comment-list");
  
  let comments = JSON.parse(localStorage.getItem("news_comments") || "[]");
  
  function showComments() {
    commentList.innerHTML = "";
    comments.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = c;
      commentList.appendChild(li);
    });
  }
  
  commentBtn.addEventListener("click", () => {
    if (commentInput.value.trim() === "") return;
    comments.unshift(commentInput.value.trim());
    localStorage.setItem("news_comments", JSON.stringify(comments));
    commentInput.value = "";
    showComments();
  });
  
  showComments();
  
  // =================== TRIVIA GAME ===================
  const questions = [
    { q: "Apa ibu kota Indonesia?", a: ["Jakarta", "Bandung", "Medan", "Surabaya"], c: 0 },
    { q: "Siapa penemu telepon?", a: ["Tesla", "Bell", "Edison", "Marconi"], c: 1 },
    { q: "Apa warna primer?", a: ["Merah, Biru, Kuning", "Hijau, Biru, Ungu", "Hitam, Putih, Abu-abu", "Merah, Hijau, Hitam"], c: 0 },
    { q: "Siapa presiden pertama Indonesia?", a: ["Soekarno", "Soeharto", "Habibie", "Megawati"], c: 0 },
  ];
  
  let current = 0;
  let score = 0;
  
  const gameQuestion = document.getElementById("game-question");
  const gameOptions = document.getElementById("game-options");
  const nextBtn = document.getElementById("next-btn");
  const scoreBox = document.getElementById("score-box");
  
  function loadQuestion() {
    const q = questions[current];
    gameQuestion.textContent = q.q;
    gameOptions.innerHTML = "";
    q.a.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(i);
      gameOptions.appendChild(btn);
    });
  }
  
  function checkAnswer(i) {
    if (i === questions[current].c) score++;
    current++;
    if (current < questions.length) loadQuestion();
    else endGame();
  }
  
  function endGame() {
    scoreBox.textContent = `Skor kamu: ${score}/${questions.length}`;
    gameQuestion.textContent = "Permainan selesai!";
    gameOptions.innerHTML = "";
    nextBtn.style.display = "block";
  }
  
  nextBtn.addEventListener("click", () => {
    current = 0;
    score = 0;
    nextBtn.style.display = "none";
    scoreBox.textContent = "";
    loadQuestion();
  });
  
  loadQuestion();
  