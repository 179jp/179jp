<script>
  import { onMount } from 'svelte';
  import Problem from './Problem.svelte';
  import WordProblem from './WordProblem.svelte';
  import AnswerInput from './AnswerInput.svelte';
  import ResultFeedback from './ResultFeedback.svelte';
  import ProgressTracker from './ProgressTracker.svelte';
  import Certificate from './Certificate.svelte';
  import { wordProblems } from '../../data/wordProblems.js';

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
  let selectedOperation = 'multiplication'; // 'addition', 'subtraction', 'multiplication', 'division', 'word_problem'
  let selectedLevel = 1; // 1, 2, 3
  let problemHistory = []; // 問題履歴を保存する配列
  
  // 文章問題用の変数
  let num1Input = '';
  let num2Input = '';
  let selectedOperation4WordProblem = '';
  let selectedWordProblemOperation = '';
  let calculatedAnswer = null;

  // 操作の種類
  const OPERATIONS = {
    ADDITION: 'addition',
    SUBTRACTION: 'subtraction',
    MULTIPLICATION: 'multiplication',
    DIVISION: 'division',
    WORD_PROBLEM: 'word_problem'
  };
  
  // 操作の表示名
  const OPERATION_NAMES = {
    [OPERATIONS.ADDITION]: '足し算',
    [OPERATIONS.SUBTRACTION]: '引き算',
    [OPERATIONS.MULTIPLICATION]: '掛け算',
    [OPERATIONS.DIVISION]: '割り算',
    [OPERATIONS.WORD_PROBLEM]: '文章問題'
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
    [OPERATIONS.DIVISION]: [1, 2],
    [OPERATIONS.WORD_PROBLEM]: [1]
  };
  
  // 問題生成関数
  function generateProblems(operation, level, count = 10) {
    const newProblems = [];
    
    // 文章問題の場合は5問に設定
    if (operation === OPERATIONS.WORD_PROBLEM) {
      count = 5;
    }
    
    for (let i = 0; i < count; i++) {
      let num1, num2, answer, problemText;
      
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
            // レベル2: 3~12 × 3~12 (10を除く)
            // 3~9, 11~12の範囲から数字を生成
            let possibleNumbers = [3, 4, 5, 6, 7, 8, 9, 11, 12];
            let randomIndex1 = Math.floor(Math.random() * possibleNumbers.length);
            let randomIndex2 = Math.floor(Math.random() * possibleNumbers.length);
            num1 = possibleNumbers[randomIndex1];
            num2 = possibleNumbers[randomIndex2];
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
          
        case OPERATIONS.WORD_PROBLEM:
          // 文章問題の場合
          // ランダムに問題を選択
          const randomIndex = Math.floor(Math.random() * wordProblems.length);
          problemText = wordProblems[randomIndex];
          
          // 1~2桁の数字を生成
          num1 = Math.floor(Math.random() * 90) + 10;
          num2 = Math.floor(Math.random() * 90) + 10;
          
          // 初期値として足し算の答えを設定（ユーザーが演算子を選択するため）
          answer = num1 + num2;
          break;
      }
      
      newProblems.push({
        num1,
        num2,
        operation,
        level,
        answer,
        userAnswer: null,
        problemText
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
    if (selectedOperation === OPERATIONS.WORD_PROBLEM) {
      problemHistory.push({ 
        operation: selectedOperation, 
        level: selectedLevel, 
        count: 5
      });
    } else {
      problemHistory.push({ 
        operation: selectedOperation, 
        level: selectedLevel, 
        count: totalProblems 
      });
    }
  }

  // ユーザー入力の更新
  function updateUserAnswer(value) {
    userInput = value;
  }

  // 文章問題の計算
  $: {
    if (num1Input && num2Input && selectedOperation4WordProblem) {
      const num1 = parseInt(num1Input, 10);
      const num2 = parseInt(num2Input, 10);
      
      // 選択された演算子に基づいて計算
      switch(selectedOperation4WordProblem) {
        case OPERATIONS.ADDITION:
          calculatedAnswer = num1 + num2;
          break;
        case OPERATIONS.SUBTRACTION:
          calculatedAnswer = num1 - num2;
          break;
        case OPERATIONS.MULTIPLICATION:
          calculatedAnswer = num1 * num2;
          break;
        case OPERATIONS.DIVISION:
          calculatedAnswer = num1 / num2;
          break;
        default:
          calculatedAnswer = null;
      }
      
      // 計算結果を自動的にuserInputに設定
      if (calculatedAnswer !== null) {
        userInput = calculatedAnswer.toString();
      }
    } else {
      calculatedAnswer = null;
      if (selectedOperation === OPERATIONS.WORD_PROBLEM) {
        userInput = '';
      }
    }
  }
  
  // 回答チェック
  function checkAnswer(answer) {
    const currentProblem = problems[currentProblemIndex];
    
    // 文章問題の場合
    if (currentProblem.operation === OPERATIONS.WORD_PROBLEM) {
      // 入力値のチェック
      if (!num1Input || !num2Input || !selectedOperation4WordProblem) {
        // 入力が不完全な場合は不正解とする
        isCorrect = false;
      } else {
        // 計算結果と入力された回答を比較
        isCorrect = calculatedAnswer !== null && calculatedAnswer === parseInt(answer, 10);
        
        // 選択された演算子を保存（結果画面表示用）
        selectedWordProblemOperation = selectedOperation4WordProblem;
      }
    } else {
      // 通常の問題の場合
      isCorrect = currentProblem.answer === answer;
    }
    
    if (isCorrect) {
      correctAnswers++;
    }
    
    currentProblem.userAnswer = answer;
    showFeedback = true;
    
    // 少し待ってから次の問題へ
    setTimeout(() => {
      showFeedback = false;
      userInput = '';
      
      // 文章問題の場合は入力フィールドをリセット
      if (currentProblem.operation === OPERATIONS.WORD_PROBLEM) {
        num1Input = '';
        num2Input = '';
        selectedOperation4WordProblem = '';
      }
      
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

<div class="w-full">
  {#if appState === 'start'}
    <div class="flex flex-col items-center justify-center gap-4 p-5 sm:p-6 md:p-7 bg-white/95 rounded-lg">
      <h1 class="text-3xl font-bold text-gray-800">計算練習アプリ</h1>
      <p class="text-lg text-gray-600">どの計算に挑戦しますか？</p>
      
      <div class="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
        <!-- 足し算 -->
        <button 
          class="flex flex-col items-center p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.ADDITION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-blue-600">+</span>
          <span class="mt-2 font-bold">足し算</span>
        </button>
        
        <!-- 引き算 -->
        <button 
          class="flex flex-col items-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.SUBTRACTION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-green-600">-</span>
          <span class="mt-2 font-bold">引き算</span>
        </button>
        
        <!-- 掛け算 -->
        <button 
          class="flex flex-col items-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.MULTIPLICATION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-purple-600">×</span>
          <span class="mt-2 font-bold">掛け算</span>
        </button>
        
        <!-- 割り算 -->
        <button 
          class="flex flex-col items-center p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
          on:click={() => { selectedOperation = OPERATIONS.DIVISION; appState = 'select-level'; }}
        >
          <span class="text-4xl font-bold text-orange-600">÷</span>
          <span class="mt-2 font-bold">割り算</span>
        </button>
        
        <!-- 文章問題 -->
        <button 
          class="flex flex-col items-center p-4 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors col-span-2"
          on:click={() => { selectedOperation = OPERATIONS.WORD_PROBLEM; startGame(); }}
        >
          <span class="text-4xl font-bold text-teal-600">📝</span>
          <span class="mt-2 font-bold">文章問題</span>
        </button>
      </div>
    </div>

  {:else if appState === 'select-level'}
    <div class="flex flex-col items-center justify-center gap-4 p-5 sm:p-6 md:p-7 bg-white/95 rounded-lg">
      <h1 class="text-3xl font-bold text-gray-800">{OPERATION_NAMES[selectedOperation]}練習</h1>
      <p class="text-lg text-gray-600">難易度を選んでください</p>
      
      <div class="flex flex-col gap-4 w-full max-w-md mt-4">
        {#each LEVELS[selectedOperation] as level}
          <button 
            class="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xl font-bold"
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
          class="p-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors mt-4"
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
         {#if problems[currentProblemIndex].operation === OPERATIONS.WORD_PROBLEM}
            <WordProblem 
              problemText={problems[currentProblemIndex].problemText}
              bind:num1Input={num1Input}
              bind:num2Input={num2Input}
              bind:selectedOperation={selectedOperation4WordProblem}
              bind:userAnswer={userInput}
            />
          {:else}
            <Problem 
              num1={problems[currentProblemIndex].num1} 
              num2={problems[currentProblemIndex].num2}
              operation={problems[currentProblemIndex].operation}
              userAnswer={userInput}
            />
          {/if}
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
    <div class="flex flex-col items-center gap-6 p-6 sm:p-7 md:p-8 bg-white/95 rounded-xl">
      <h2 class="text-3xl font-bold text-gray-800">
        {#if selectedOperation === OPERATIONS.WORD_PROBLEM}
          {OPERATION_NAMES[selectedOperation]} ({OPERATION_NAMES[selectedWordProblemOperation]})
        {:else}
          {OPERATION_NAMES[selectedOperation]} レベル{selectedLevel}
        {/if}
      </h2>
      <h3 class="text-2xl font-bold text-gray-700">
        {#if selectedOperation === OPERATIONS.WORD_PROBLEM}
          5問終わりました！
        {:else}
          10問終わりました！
        {/if}
      </h3>
      <p class="text-2xl bg-blue-50 px-4 py-2 rounded-lg">正解数: <span class="text-blue-600 font-bold">{correctAnswers}</span>/{problems.length}</p>
      
      <div class="flex gap-6">
        <button 
          class="px-6 py-3 bg-blue-600 text-white text-xl font-bold rounded-xl hover:bg-blue-700 transition-all hover:-translate-y-1 active:translate-y-0"
          on:click={addMoreProblems}
        >
          おかわり
        </button>
        <button 
          class="px-6 py-3 bg-gray-600 text-white text-xl font-bold rounded-xl hover:bg-gray-700 transition-all hover:-translate-y-1 active:translate-y-0"
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
