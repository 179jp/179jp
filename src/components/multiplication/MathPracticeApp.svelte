<script>
  import { onMount } from 'svelte';
  import Problem from './Problem.svelte';
  import AnswerInput from './AnswerInput.svelte';
  import ResultFeedback from './ResultFeedback.svelte';
  import ProgressTracker from './ProgressTracker.svelte';
  import Certificate from './Certificate.svelte';

  // アプリの状態
  let appState = 'start'; // start, select-level, problem, result, certificate
  let problems = [];
  let currentProblemIndex = 0;
  let correctAnswers = 0;
  let userInput = '';
  let isCorrect = false;
  let showFeedback = false;
  let totalProblems = 10;
  let startTime = null;
  let endTime = null;
  
  // 操作と難易度の選択
  let selectedOperation = 'multiplication'; // 'addition', 'subtraction', 'multiplication', 'division'
  let selectedLevel = 1; // 1, 2, 3
  let problemHistory = []; // 問題履歴を保存する配列

  // 操作の種類
  const OPERATIONS = {
    ADDITION: 'addition',
    SUBTRACTION: 'subtraction',
    MULTIPLICATION: 'multiplication',
    DIVISION: 'division'
  };
  
  // 操作の表示名
  const OPERATION_NAMES = {
    [OPERATIONS.ADDITION]: '足し算',
    [OPERATIONS.SUBTRACTION]: '引き算',
    [OPERATIONS.MULTIPLICATION]: '掛け算',
    [OPERATIONS.DIVISION]: '割り算'
  };
  
  // 操作の記号
  const OPERATION_SYMBOLS = {
    [OPERATIONS.ADDITION]: '+',
    [OPERATIONS.SUBTRACTION]: '-',
    [OPERATIONS.MULTIPLICATION]: '×',
    [OPERATIONS.DIVISION]: '÷'
  };
  
  // 難易度の定義
  const LEVELS = {
    [OPERATIONS.ADDITION]: [1, 2, 3],
    [OPERATIONS.SUBTRACTION]: [1, 2, 3],
    [OPERATIONS.MULTIPLICATION]: [1, 2, 3],
    [OPERATIONS.DIVISION]: [1, 2]
  };
  
  // 問題生成関数
  function generateProblems(operation, level, count = 10) {
    const newProblems = [];
    
    for (let i = 0; i < count; i++) {
      let num1, num2, answer;
      
      switch (operation) {
        case OPERATIONS.ADDITION:
          // 足し算の問題生成
          if (level === 1) {
            // レベル1: 1桁 + 1桁
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
          } else if (level === 2) {
            // レベル2: 2桁 + 1~2桁
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 99) + 1;
          } else {
            // レベル3: 2~3桁 + 1~3桁
            num1 = Math.floor(Math.random() * 900) + 10;
            num2 = Math.floor(Math.random() * 999) + 1;
          }
          answer = num1 + num2;
          break;
          
        case OPERATIONS.SUBTRACTION:
          // 引き算の問題生成（マイナスにならないように）
          if (level === 1) {
            // レベル1: 1桁 - 1桁
            num2 = Math.floor(Math.random() * 9) + 1;
            num1 = Math.floor(Math.random() * (9 - num2 + 1)) + num2; // num1 >= num2 を保証
          } else if (level === 2) {
            // レベル2: 2桁 - 1~2桁
            num2 = Math.floor(Math.random() * 99) + 1;
            num1 = Math.floor(Math.random() * 90) + 10;
            if (num1 < num2) {
              [num1, num2] = [num2, num1]; // 大きい方を num1 にする
            }
          } else {
            // レベル3: 2~3桁 - 1~3桁
            num2 = Math.floor(Math.random() * 999) + 1;
            num1 = Math.floor(Math.random() * 900) + 100;
            if (num1 < num2) {
              [num1, num2] = [num2, num1]; // 大きい方を num1 にする
            }
          }
          answer = num1 - num2;
          break;
          
        case OPERATIONS.MULTIPLICATION:
          // 掛け算の問題生成
          if (level === 1) {
            // レベル1: 1桁 × 1桁
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
          } else if (level === 2) {
            // レベル2: 3~12 × 3~12
            num1 = Math.floor(Math.random() * 10) + 3; // 3から12までの数
            num2 = Math.floor(Math.random() * 10) + 3; // 3から12までの数
          } else {
            // レベル3: 1~2桁 × 1~2桁
            num1 = Math.floor(Math.random() * 99) + 1;
            num2 = Math.floor(Math.random() * 99) + 1;
          }
          answer = num1 * num2;
          break;
          
        case OPERATIONS.DIVISION:
          // 割り算の問題生成（割り切れるように）
          if (level === 1) {
            // レベル1: 1桁 ÷ 1桁
            num2 = Math.floor(Math.random() * 9) + 1;
            answer = Math.floor(Math.random() * 9) + 1;
            num1 = num2 * answer; // 割り切れる数を生成
          } else {
            // レベル2: 1~2桁 ÷ 1~2桁
            num2 = Math.floor(Math.random() * 99) + 1;
            answer = Math.floor(Math.random() * 9) + 1;
            num1 = num2 * answer; // 割り切れる数を生成
          }
          break;
      }
      
      newProblems.push({
        num1,
        num2,
        operation,
        level,
        answer,
        userAnswer: null
      });
    }
    
    return newProblems;
  }

  // ゲーム開始
  function startGame() {
    problems = generateProblems(selectedOperation, selectedLevel, totalProblems);
    currentProblemIndex = 0;
    correctAnswers = 0;
    userInput = '';
    appState = 'problem';
    startTime = new Date();
    
    // 問題履歴に追加
    problemHistory.push({ operation: selectedOperation, level: selectedLevel, count: totalProblems });
  }

  // ユーザー入力の更新
  function updateUserAnswer(value) {
    userInput = value;
  }

  // 回答チェック
  function checkAnswer(answer) {
    const currentProblem = problems[currentProblemIndex];
    isCorrect = currentProblem.answer === answer;
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    currentProblem.userAnswer = answer;
    showFeedback = true;
    
    // 少し待ってから次の問題へ
    setTimeout(() => {
      showFeedback = false;
      userInput = '';
      
      if (currentProblemIndex < problems.length - 1) {
        currentProblemIndex++;
      } else {
        if (problems.length >= 50) {
          finishGame();
        } else {
          appState = 'result';
        }
      }
    }, 1000);
  }

  // おかわり（追加の問題）
  function addMoreProblems() {
    const additionalProblems = generateProblems(selectedOperation, selectedLevel, 10);
    problems = [...problems, ...additionalProblems];
    appState = 'problem';
  }

  // ゲーム終了
  function finishGame() {
    endTime = new Date();
    appState = 'certificate';
  }

  // 新しいゲームを開始
  function newGame() {
    appState = 'start';
  }

  onMount(() => {
    // コンポーネントがマウントされたときの処理
  });
</script>

<div class="w-full max-w-3xl mx-auto bg-white/90 rounded-xl shadow-lg p-3 sm:p-4 md:p-5 lg:p-6">
  {#if appState === 'start'}
    <div class="flex flex-col items-center justify-center gap-4 p-5 sm:p-6 md:p-7 bg-white/95 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-800">計算練習アプリ</h1>
      <p class="text-lg text-gray-600">どの計算に挑戦しますか？</p>
      
      <div class="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
        <!-- 足し算 -->
        <button 
          class="flex flex-col items-center p-4 bg-blue-100 rounded-lg shadow hover:bg-blue-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.ADDITION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-blue-600">+</span>
          <span class="mt-2 font-bold">足し算</span>
        </button>
        
        <!-- 引き算 -->
        <button 
          class="flex flex-col items-center p-4 bg-green-100 rounded-lg shadow hover:bg-green-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.SUBTRACTION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-green-600">-</span>
          <span class="mt-2 font-bold">引き算</span>
        </button>
        
        <!-- 掛け算 -->
        <button 
          class="flex flex-col items-center p-4 bg-purple-100 rounded-lg shadow hover:bg-purple-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.MULTIPLICATION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-purple-600">×</span>
          <span class="mt-2 font-bold">掛け算</span>
        </button>
        
        <!-- 割り算 -->
        <button 
          class="flex flex-col items-center p-4 bg-orange-100 rounded-lg shadow hover:bg-orange-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.DIVISION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-orange-600">÷</span>
          <span class="mt-2 font-bold">割り算</span>
        </button>
      </div>
    </div>
  {:else if appState === 'select-level'}
    <div class="flex flex-col items-center justify-center gap-4 p-5 sm:p-6 md:p-7 bg-white/95 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-800">{OPERATION_NAMES[selectedOperation]}練習</h1>
      <p class="text-lg text-gray-600">難易度を選んでください</p>
      
      <div class="flex flex-col gap-4 w-full max-w-md mt-4">
        {#each LEVELS[selectedOperation] as level}
          <button 
            class="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors text-xl font-bold"
            on:click={() => { selectedLevel = level; startGame(); }}
          >
            レベル {level}
            {#if selectedOperation === OPERATIONS.ADDITION}
              {#if level === 1}
                <span class="block text-sm mt-1">1桁 + 1桁</span>
              {:else if level === 2}
                <span class="block text-sm mt-1">2桁 + 1~2桁</span>
              {:else}
                <span class="block text-sm mt-1">2~3桁 + 1~3桁</span>
              {/if}
            {:else if selectedOperation === OPERATIONS.SUBTRACTION}
              {#if level === 1}
                <span class="block text-sm mt-1">1桁 - 1桁</span>
              {:else if level === 2}
                <span class="block text-sm mt-1">2桁 - 1~2桁</span>
              {:else}
                <span class="block text-sm mt-1">2~3桁 - 1~3桁</span>
              {/if}
            {:else if selectedOperation === OPERATIONS.MULTIPLICATION}
              {#if level === 1}
                <span class="block text-sm mt-1">1桁 × 1桁</span>
              {:else if level === 2}
                <span class="block text-sm mt-1">3~12 × 3~12</span>
              {:else}
                <span class="block text-sm mt-1">1~2桁 × 1~2桁</span>
              {/if}
            {:else if selectedOperation === OPERATIONS.DIVISION}
              {#if level === 1}
                <span class="block text-sm mt-1">1桁 ÷ 1桁</span>
              {:else}
                <span class="block text-sm mt-1">1~2桁 ÷ 1~2桁</span>
              {/if}
            {/if}
          </button>
        {/each}
        
        <button 
          class="p-3 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors mt-4"
          on:click={() => { appState = 'start'; }}
        >
          戻る
        </button>
      </div>
    </div>
  {:else if appState === 'problem'}
    <div class="w-full">
      <ProgressTracker 
        current={currentProblemIndex + 1} 
        total={problems.length} 
        correct={correctAnswers} 
      />
      
      <div class="lg:flex lg:items-start lg:gap-4">
        <div class="lg:flex-1">
          <Problem 
            num1={problems[currentProblemIndex].num1} 
            num2={problems[currentProblemIndex].num2}
            operation={problems[currentProblemIndex].operation}
            userAnswer={userInput}
          />
        </div>
        
        <div class="lg:flex-1">
          <AnswerInput 
            onAnswer={checkAnswer}
            updateUserAnswer={updateUserAnswer}
          />
        </div>
      </div>
      
      {#if showFeedback}
        <ResultFeedback isCorrect={isCorrect} correctAnswer={problems[currentProblemIndex].answer} />
      {/if}
    </div>
  {:else if appState === 'result'}
    <div class="flex flex-col items-center gap-6 p-6 sm:p-7 md:p-8 bg-white/95 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800">{OPERATION_NAMES[selectedOperation]} レベル{selectedLevel}</h2>
      <h3 class="text-2xl font-bold text-gray-700">10問終わりました！</h3>
      <p class="text-2xl bg-blue-50 px-4 py-2 rounded-lg shadow-sm">正解数: <span class="text-blue-600 font-bold">{correctAnswers}</span>/{problems.length}</p>
      
      <div class="flex gap-6">
        <button 
          class="px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
          on:click={addMoreProblems}
        >
          おかわり
        </button>
        <button 
          class="px-6 py-3 bg-gray-600 text-white text-xl font-bold rounded-xl shadow-md hover:bg-gray-700 transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
          on:click={finishGame}
        >
          終了する
        </button>
      </div>
    </div>
  {:else if appState === 'certificate'}
    <Certificate 
      startTime={startTime}
      endTime={endTime}
      totalProblems={problems.length}
      correctAnswers={correctAnswers}
      problemHistory={problemHistory}
      onNewGame={newGame}
    />
  {/if}
</div>
