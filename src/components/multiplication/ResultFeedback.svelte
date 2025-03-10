<script>
  export let isCorrect;
  export let correctAnswer;
</script>

<div class="result-feedback {isCorrect ? 'correct' : 'incorrect'}">
  {#if isCorrect}
    <div class="feedback-content">
      <div class="icon">✓</div>
      <div class="message">正解！</div>
    </div>
  {:else}
    <div class="feedback-content">
      <div class="icon">✗</div>
      <div class="message">
        <span>不正解</span>
        <span class="correct-answer">正解は {correctAnswer} です</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .result-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2.5rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    z-index: 100;
    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 4px solid white;
  }
  
  .correct {
    background-color: rgba(40, 167, 69, 0.95);
    color: white;
  }
  
  .incorrect {
    background-color: rgba(220, 53, 69, 0.95);
    color: white;
  }
  
  .feedback-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .icon {
    font-size: 4rem;
    font-weight: bold;
    height: 5rem;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: pulse 1s infinite;
  }
  
  .message {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  
  .correct-answer {
    font-size: 1.2rem;
    margin-top: 0.75rem;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
  
  @keyframes popIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  
  @media (max-width: 768px) {
    .result-feedback {
      padding: 2rem;
    }
    
    .icon {
      font-size: 3rem;
      height: 4rem;
      width: 4rem;
    }
    
    .message {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .result-feedback {
      padding: 1.5rem;
      border-width: 3px;
    }
    
    .icon {
      font-size: 2.5rem;
      height: 3.5rem;
      width: 3.5rem;
    }
    
    .message {
      font-size: 1.2rem;
    }
    
    .correct-answer {
      font-size: 1rem;
    }
  }
</style>
