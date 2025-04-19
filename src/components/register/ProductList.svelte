<script>
  import { products } from "../../data/products.js";

  // 選択された商品を管理する配列
  export let selectedItems = [];

  // 商品を選択する関数
  function selectProduct(product) {
    // 既に選択されている商品かチェック
    const existingItem = selectedItems.find((item) => item.id === product.id);

    if (existingItem) {
      // 既に選択されている場合は数量を増やす
      existingItem.quantity += 1;
      selectedItems = [...selectedItems]; // 配列を更新して反応性を維持
    } else {
      // 新しい商品の場合は追加
      selectedItems = [...selectedItems, { ...product, quantity: 1 }];
    }
  }
</script>

<div class="product-list">
  <h2 class="font-signature title mb-4">Items</h2>
  <div class="grid grid-cols-2 gap-4">
    {#each products as product}
      <button
        class="register_item p-4 {product.isSweet
          ? 'bg-slate-100'
          : 'bg-stone-100'}"
        on:click={() => selectProduct(product)}
      >
        <div class="item_name">{product.name}</div>
        <div class="item_price font-din text-gray-600">¥{product.price}</div>
      </button>
    {/each}
  </div>
</div>

<style>
  .product-list {
    padding: 16px;
  }
</style>
