<template>
    <div class="product-card">
        <div class="product-card__image">
            <img :src="product.image" :alt="product.name" />
        </div>

        <h4 class="product-card__title">{{ product.name }}</h4>
        <p class="product-card__desc">{{ product.description }}</p>

        <div class="product-card__footer">
            <div v-if="!product.in_stock" class="out-of-stock">Нет в наличии</div>

            <div class="product-card__actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    product: { type: Object, required: true }
})
</script>

<style scoped lang="scss">
.product-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__image {
        height: 160px;
        width: 100%;
        overflow: hidden;
        border-radius: 8px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }

        &:hover {
            img {
                transform: scale(1.1);
            }
        }
    }

    &__title {
        font-weight: 500;
        font-size: 20px;
        line-height: 125%;
    }

    &__desc {
        color: $gray;
        font-size: 16px;
        line-height: 125%;
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
    }
}

.out-of-stock {
    border-radius: 12px;
    padding: 4px 12px;
    background-color: $red;
    color: #fff;
    max-width: 150px;
    text-align: center;
}
</style>
