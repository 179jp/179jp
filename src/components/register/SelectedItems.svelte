<script>
  // 選択された商品リスト
  export let selectedItems = [];

  // 商品の数量を変更する関数
  function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
      // 数量が0以下の場合は商品を削除
      selectedItems.splice(index, 1);
      selectedItems = [...selectedItems]; // 配列を更新して反応性を維持
    } else {
      // 数量を更新
      selectedItems[index].quantity = newQuantity;
      selectedItems = [...selectedItems]; // 配列を更新して反応性を維持
    }
  }

  // 合計金額を計算
  $: totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // アイテムの総数を計算
  $: totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
</script>

<div class="selected-items">
  <h2 class="font-signature title mb-4">Cart</h2>

  {#if selectedItems.length === 0}
    <p class="text-gray-500">商品が選択されていません</p>
  {:else}
    <div class="mb-4">
      {#each selectedItems as item, index}
        <div class="flex justify-between items-center py-2 border-b">
          <div>
            <div class="font-medium">{item.name}</div>
            <div class="font-din text-gray-500">
              ¥{item.price} × {item.quantity}
            </div>
          </div>
          <div class="flex items-center">
            <button
              class="w-8 h-8 flex items-center justify-center border rounded-l"
              on:click={() => updateQuantity(index, item.quantity - 1)}
            >
              -
            </button>
            <span
              class="w-8 h-8 flex items-center justify-center border-t border-b font-din"
            >
              {item.quantity}
            </span>
            <button
              class="w-8 h-8 flex items-center justify-center border rounded-r"
              on:click={() => updateQuantity(index, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="total font-din text-xl mt-4 pb-4 border-b">
      Total <span class="text-sm">{totalItems}点</span>¥{totalAmount}
    </div>
  {/if}
</div>

<style>
  .selected-items {
    padding: 16px;
  }
</style>
