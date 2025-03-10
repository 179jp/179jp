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
  }
  
  .problem {
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .number {
    display: inline-block;
    min-width: 3rem;
    text-align: center;
  }
  
  .operator, .equals {
    color: #666;
  }
  
  .question-mark {
    color: #ff6b6b;
    font-size: 3.5rem;
  }
</style>
