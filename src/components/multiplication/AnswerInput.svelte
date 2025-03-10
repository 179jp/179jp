<script>
  export let onAnswer;
  
  let answers = [];
  
  // 回答選択肢を生成（1〜81の範囲）
  function generateAnswers() {
    const options = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        options.push(i * j);
      }
    }
    return [...new Set(options)].sort((a, b) => a - b);
  }
  
  // コンポーネント初期化時に回答選択肢を生成
  answers = generateAnswers();
</script>

<div class="answer-input">
  <div class="answer-grid">
    {#each answers as answer}
      <button 
        class="answer-button" 
        on:click={() => onAnswer(answer)}
      >
        {answer}
      </button>
    {/each}
  </div>
</div>

<style>
  .answer-input {
    margin: 2rem 0;
    width: 100%;
  }
  
  .answer-grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .answer-button {
    background-color: white;
    border: 2px solid #4dabf7;
    border-radius: 12px;
    padding: 0.75rem 0.5rem;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    color: #1971c2;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  
  .answer-button:hover {
    background-color: #e7f5ff;
    transform: scale(1.08);
    box-shadow: 0 5px 10px rgba(77, 171, 247, 0.3);
  }
  
  .answer-button:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    .answer-grid {
      grid-template-columns: repeat(5, 1fr);
      gap: 0.6rem;
    }
    
    .answer-button {
      font-size: 1.2rem;
      padding: 0.6rem 0.4rem;
    }
  }
  
  @media (max-width: 480px) {
    .answer-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      padding: 0.75rem;
    }
    
    .answer-button {
      font-size: 1.1rem;
      padding: 0.5rem 0.3rem;
    }
  }
</style>
