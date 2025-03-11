<script>
  export let startTime;
  export let endTime;
  export let totalProblems;
  export let correctAnswers;
  export let onNewGame;
  
  // 日付フォーマット関数
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }
  
  // 時間フォーマット関数
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  // 学習時間計算（分単位）
  function calculateStudyTime() {
    const diffMs = endTime - startTime;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffSeconds = Math.floor((diffMs % 60000) / 1000);
    return `${diffMinutes}分${diffSeconds}秒`;
  }
  
  // 正答率計算
  function calculateAccuracy() {
    return Math.round((correctAnswers / totalProblems) * 100);
  }
  
  // 日付、時間、学習時間
  const date = formatDate(endTime);
  const startTimeStr = formatTime(startTime);
  const endTimeStr = formatTime(endTime);
  const studyTime = calculateStudyTime();
  const accuracy = calculateAccuracy();
</script>

<div class="certificate">
  <div class="certificate-content">
    <h1 class="certificate-title">修了証書</h1>
    
    <div class="certificate-details">
      <p class="certificate-date">{date}</p>
      
      <div class="certificate-info">
        <p>学習時間: {startTimeStr} 〜 {endTimeStr} （{studyTime}）</p>
        <p>問題数: {totalProblems}問</p>
        <p>正解数: {correctAnswers}問（{accuracy}%）</p>
      </div>
      
      <div class="certificate-message">
        <p>よくがんばりました！</p>
        {#if accuracy >= 90}
          <p class="certificate-grade">評価: とてもよくできました！</p>
        {:else if accuracy >= 70}
          <p class="certificate-grade">評価: よくできました！</p>
        {:else}
          <p class="certificate-grade">評価: がんばりました！</p>
        {/if}
      </div>
    </div>
    
    <div class="certificate-stamp">
      <div class="stamp-circle">
        <span>認定</span>
      </div>
    </div>
  </div>
  
  <button class="new-game-button" on:click={onNewGame}>
    もう一度挑戦する
  </button>
</div>

<style>
  .certificate {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    animation: fadeIn 1s ease-out;
  }
  
  .certificate-content {
    background-color: #fff;
    background-image: linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%, #f8f9fa), 
                      linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%, #f8f9fa);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
    border: 8px double #4dabf7;
    border-radius: 16px;
    padding: 3rem;
    width: 100%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  
  .certificate-title {
    text-align: center;
    font-size: 2.5rem;
    color: #1971c2;
    margin-bottom: 2.5rem;
    border-bottom: 3px solid #4dabf7;
    padding-bottom: 0.75rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .certificate-details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .certificate-date {
    text-align: right;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .certificate-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 1.2rem;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .certificate-message {
    text-align: center;
    margin-top: 2rem;
    font-weight: bold;
    font-size: 1.3rem;
  }
  
  .certificate-grade {
    font-size: 1.5rem;
    color: #1971c2;
    margin-top: 0.75rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 243, 148, 0.3);
    display: inline-block;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
  }
  
  .certificate-stamp {
    position: absolute;
    bottom: 3rem;
    right: 3rem;
  }
  
  .stamp-circle {
    width: 5rem;
    height: 5rem;
    border: 3px solid #e03131;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e03131;
    font-weight: bold;
    font-size: 1.2rem;
    transform: rotate(-15deg);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  .new-game-button {
    margin-top: 3rem;
    padding: 1rem 2rem;
    background-color: #4dabf7;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .new-game-button:hover {
    background-color: #1971c2;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .new-game-button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .certificate-content {
      padding: 2rem;
      border-width: 6px;
    }
    
    .certificate-title {
      font-size: 2rem;
    }
    
    .certificate-info {
      font-size: 1.1rem;
    }
    
    .certificate-grade {
      font-size: 1.3rem;
    }
    
    .stamp-circle {
      width: 4rem;
      height: 4rem;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .certificate-content {
      padding: 1.5rem;
      border-width: 4px;
    }
    
    .certificate-title {
      font-size: 1.8rem;
    }
    
    .certificate-info {
      font-size: 1rem;
      padding: 1rem;
    }
    
    .certificate-grade {
      font-size: 1.2rem;
    }
    
    .stamp-circle {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 0.9rem;
      right: 1.5rem;
      bottom: 1.5rem;
    }
    
    .new-game-button {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
    }
  }
</style>
