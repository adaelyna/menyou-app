<template>
    <div class="meal-card">
        <div class="meal-card__image">
            <img :src="meal.image" :alt="meal.name" />
        </div>

        <h4 class="meal-card__title">{{ meal.name }}</h4>
        <p class="meal-card__desc">{{ meal.description }}</p>
        <div class="filter-list">
            <div
                v-for="filter of meal.filter_list"
                :key="filter.name"
                class="filter-list__item"
                @click="handleSort(filter.id)"
            >
                {{ filter.name }}
            </div>
        </div>
        <div class="meal-card__more">
            <MButton color="transparent" @click="handleMore">
                <div class="more-btn">Подробнее</div>
            </MButton>
        </div>

        <div class="meal-card__actions">
            <slot name="actions"></slot>
        </div>

        <MModal v-model="modalState.more">
            <div class="product-list">
                <div
                    v-for="product of meal.product_list"
                    :key="product.id"
                    class="product-list__item"
                >
                    <div class="product-list__image">
                        <img :src="product.image" :alt="product.name" />
                    </div>
                    {{ product.name }}
                </div>
            </div>
        </MModal>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import MButton from '../ui/MButton.vue'
import MModal from '../ui/MModal.vue'
import { useMealsStore } from '@/stores/meals'

defineProps({
    meal: { type: Object, required: true }
})

const mealsStore = useMealsStore()

const modalState = reactive({
    more: false,
    sort: false
})

const toggleModal = (key) => {
    modalState[key] = !modalState[key]
}

const handleMore = () => {
    toggleModal('more')
}

const handleSort = (filterId) => {
    mealsStore.sortMealsByFilter(filterId)
}
</script>

<style scoped lang="scss">
.meal-card {
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

    .filter-list {
        display: flex;
        justify-content: flex-start;
        gap: 5px;

        &__item {
            background-color: $gray-light;
            padding: 3px 5px;
            border-radius: 5px;
            color: $dark;
            cursor: pointer;
        }
    }

    .product-list {
        &__item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &__image {
            display: flex;
            width: 45px;
            height: 40px;
            flex: 0 0 45px;

            img {
                display: block;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }
}

.more-btn {
    font-size: 16px;
    line-height: 125%;
    font-size: 14px;
    text-decoration: underline;
    color: $gray;

    &:hover {
        color: $dark;
        text-decoration: none;
    }
}
</style>
