<script>
  export let num1;
  export let num2;
</script>

<div class="problem-container">
  <div class="problem">
    <span class="number">{num1}</span>
    <span class="operator">×</span>
    <span class="number">{num2}</span>
    <span class="equals">=</span>
    <span class="question-mark">?</span>
  </div>
</div>

<style>
  .problem-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    background-color: #f1f8ff;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border: 3px solid #4dabf7;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    50% {
      box-shadow: 0 8px 16px rgba(77, 171, 247, 0.3);
    }
    100% {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
  }
  
  .problem {
    font-size: 4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .number {
    display: inline-block;
    min-width: 4rem;
    text-align: center;
    color: #1971c2;
    background-color: white;
    border-radius: 12px;
    padding: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .operator, .equals {
    color: #495057;
  }
  
  .question-mark {
    color: #ff6b6b;
    font-size: 4.5rem;
    animation: bounce 1s infinite alternate;
  }
  
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
  
  @media (max-width: 768px) {
    .problem {
      font-size: 3rem;
      gap: 1rem;
    }
    
    .number {
      min-width: 3rem;
    }
    
    .question-mark {
      font-size: 3.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .problem {
      font-size: 2.5rem;
      gap: 0.75rem;
    }
    
    .number {
      min-width: 2.5rem;
    }
    
    .question-mark {
      font-size: 3rem;
    }
  }
</style>
