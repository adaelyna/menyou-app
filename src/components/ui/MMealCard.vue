<template>
    <div class="meal-card">
        <div class="meal-card__image">
            <img :src="meal.image" :alt="meal.name" />
        </div>

        <h4 class="meal-card__title">{{ meal.name }}</h4>
        <p class="meal-card__desc">{{ meal.description }}</p>
        <div class="filter-list">
            <div v-for="filter of meal.filter_list" :key="filter.name" class="filter-list__filters">
                {{ filter.name }}
            </div>
        </div>

        <div class="meal-card__actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    meal: { type: Object, required: true }
})
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

        &__filters {
            background-color: $gray-light;
            padding: 3px 5px;
            border-radius: 5px;
            color: $dark;
        }
    }
}
</style>
