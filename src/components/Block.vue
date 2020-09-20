<template>
    <div class="block" v-on:click="stepOn()" v-bind:class="{ 'open-block': field.isOpen }" v-on:contextmenu.prevent="setAlert()">
        <div v-if="showNumber()">
            <div v-if="field.minesAround" v-bind:style="{'color': getColor()}">{{field.minesAround}}</div>
        </div>
        <img v-if="showBomb()" src="../assets/img/bomb.png" width="20px">
        <img v-if="showAlert()" src="../assets/img/flag-alert.png" width="20px">
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
    import {Field} from "../core/entities/Field";

    @Component
    export default class Block extends Vue {
        @Prop() field?: Field;

        showNumber(): boolean {
            return (this.field !== undefined) && this.field.isOpen && !this.field.hasMine;
        }

        showBomb(): boolean {
            return (this.field !== undefined) && this.field.isOpen && this.field.hasMine;
        }

        stepOn() {
            if (this.field && !this.field.isOpen) {
                this.field.open();
                if (this.field.hasMine) {
                    this.emitGameOver();
                } else if (this.field.minesAround == 0) {
                    this.emitOpenAround();
                } else {
                    this.emitPlay();
                }
            }
        }

        setAlert() {
            if (this.field) {
                this.field.toggleAlert();
            }
        }

        showAlert() {
            if (this.field) {
                return this.field.isWarned();
            }
            return false;
        }

        @Emit('game-over')
        emitGameOver() {
            console.log('gameOver');
        }

        @Emit('open-around')
        emitOpenAround() {
            console.log('openAround');
        }

        @Emit('play')
        emitPlay() {
            console.log('play');
        }

        getColor(): string {
            if (this.field) {
                if (this.field.minesAround < 2) {
                    return 'blue';
                } else if (this.field.minesAround === 2) {
                    return 'green';
                } else if (this.field.minesAround > 2) {
                    return 'red';
                }
            }
            return 'blue';
        }
    }
</script>

<style scoped lang="scss">
    .block {
        width: 30px;
        height: 30px;
        background: gray;
        font-size: 12px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: inset 0px 0px 0px 2px rgba(76, 90, 128, 0.97);
    }
    .open-block {
        background: gainsboro;
        box-shadow: inset 0px 0px 0px 1px rgba(76, 90, 128, 0.69);
        font-weight: bold;
    }
</style>
