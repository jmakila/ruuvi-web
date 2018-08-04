<template lang="pug">
    .display
        .temp {{tagdata.temperature|number}} &deg;C
        .others
            .humidity
                span Ilmankosteus
                span {{tagdata.humidity|number}} %
            .pressure
                span Ilmanpaine
                span {{tagdata.pressure / 100|number}} hPa
</template>
<script>
    export default {
        props: ['id'],
        data () {
            return {
                tagdata: {}
            }
        },
        mounted () {
            this.$options.sockets[this.id] = (data) => {
                this.tagdata = data;
            }
        },
        filters: {
            number (num) {
                let str = num.toString().replace('.', ',');
                return str;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .display {
        font-size: 14px;
        box-sizing: border-box;
        width: 30%;
        float: left;
        border: 2px solid #999;
        margin-right: 3%;
        padding: 1em;

        .temp {
            font-size: 3em;
            text-align: center;
            font-weight: bold;
        }

        .others {
            > div {
                span {
                    display: block;
                    width: 50%;
                    float: left;

                    &:last-child {
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
