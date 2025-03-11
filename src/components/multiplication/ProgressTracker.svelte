<script>
  export let current;
  export let total;
  export let correct;
</script>

<div class="mb-6">
  <div class="flex justify-between mb-3 font-bold">
    <span class="text-lg text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">問題: {current}/{total}</span>
    <span class="text-lg text-green-600 bg-green-50 px-3 py-1 rounded-lg">正解: {correct}/{current - 1}</span>
  </div>
  <div class="w-full h-4 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
    <div class="h-full bg-blue-500 rounded-lg transition-all duration-300 ease-in-out" style="width: {(current / total) * 100}%"></div>
  </div>
</div>
