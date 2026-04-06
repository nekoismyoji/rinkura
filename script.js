// 1. 動画データ
const videoData = [
  { id: 'qKZdg89w7uE', type: 'meets', date: '2023.12.20', title: '藤島 慈 生誕祭！！', members: ['sayaka', 'tsuzuri', 'rurino', 'kaho', 'kozue', 'megumi'] },
  { id: 'uFfPPrVl4Is', type: 'meets', date: '2026.03.28', title: '日野下花帆 最後のWith×MEETS', members: ['kaho'] },
  { id: 'dQw4w9WgXcQ', type: 'fes', date: '2026.03.30', title: 'Bloom Garden Party Fes×LIVE STAGE', members: ['kaho', 'sayaka', 'kozue', 'tsuzuri', 'rurino', 'megumi'] }
];

// 動画を描画する関数
function renderVideos(videosToRender) {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = ''; 
  videosToRender.forEach(video => {
    const card = document.createElement('div');
    card.className = 'archive-card';
    
    // タップした時にサイト内でYouTubeを開くように変更
    card.onclick = () => openVideo(video.id);
    
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">
      <div class="card-info">
        <span style="color:#888;">${video.date}</span><br>
        ${video.title}
      </div>
    `;
    grid.appendChild(card);
  });
}

// モーダルの開閉
function openFilter() { document.getElementById('filter-modal').style.display = 'flex'; }
function closeFilter() { document.getElementById('filter-modal').style.display = 'none'; }

// リセット処理
function resetFilter() {
  document.getElementById('date-start').value = '';
  document.getElementById('date-end').value = '';
  document.querySelectorAll('input[name="member"]').forEach(cb => cb.checked = false);
  document.querySelector('input[name="condition"][value="or"]').checked = true;
  renderVideos(videoData);
  closeFilter();
}

// フィルター適用処理
function applyFilter() {
  const startDate = document.getElementById('date-start').value;
  const endDate = document.getElementById('date-end').value;
  const checkedMembers = Array.from(document.querySelectorAll('input[name="member"]:checked')).map(cb => cb.value);
  const condition = document.querySelector('input[name="condition"]:checked').value;

  const filtered = videoData.filter(video => {
    const vDate = video.date.replace(/\./g, '-');
    if (startDate && vDate < startDate) return false;
    if (endDate && vDate > endDate) return false;

    if (checkedMembers.length > 0) {
      if (condition === 'or') {
        return checkedMembers.some(m => video.members.includes(m));
      } else {
        return checkedMembers.every(m => video.members.includes(m));
      }
    }
    return true; 
  });

  renderVideos(filtered);
  closeFilter();
}

// 画面切り替え
function showArchive() {
  document.getElementById('menu-screen').style.display = 'none';
  document.getElementById('archive-screen').style.display = 'flex';
  renderVideos(videoData); 
}
function showMenu() {
  document.getElementById('menu-screen').style.display = 'flex';
  document.getElementById('archive-screen').style.display = 'none';
}

// 動画を開く
function openVideo(id) {
  document.getElementById('yt-player').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  document.getElementById('video-modal').style.display = 'flex';
}

// 動画を閉じる
function closeVideo() {
  document.getElementById('yt-player').src = ''; 
  document.getElementById('video-modal').style.display = 'none';
}
