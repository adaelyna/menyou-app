<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="col of cols" :key="col.key">{{ col.name }}</th>
                <th>Действия</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="row of rows" :key="row.code">
                <td v-for="col of cols" :key="col.key">{{ row[col.key] }}</td>
                <td>
                    <div class="table__actions">
                        <slot name="actions" :id="row.id"></slot>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    cols: { type: Array, required: false, default: () => [] },
    rows: { type: Array, required: false, default: () => [] }
})
</script>

<style scoped lang="scss">
.table {
    width: 100%;

    thead {
        tr {
            background-color: #ebebeb;
            display: grid;
            border-radius: 6px;
            grid-template-columns: repeat(3, 1fr);

            th {
                padding: 6px 12px;
                text-align: left;
            }
        }
    }

    tbody {
        margin-top: 12px;
        display: block;
        
        tr {
            margin-top: 8px;
            background-color: #fff;
            display: grid;
            align-items: center;
            grid-template-columns: repeat(3, 1fr);
            box-shadow: 1px 1px 15px #ebebeb;
            border-radius: 6px;

            td {
                padding: 10px 12px;
                text-align: left;
            }

            &:first-child {
                margin-top: 0;
            }
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: 16px;

        img {
            display: block;
            width: 24px;
            height: 24px;
        }

        &:deep(.btn) {
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>