<template>
  <div class="camp">
    <div style="height: 30px;margin-bottom: 10px;">
      <img v-if="gameOver" src="../assets/img/emoji-lost.png" height="30px"/>
      <img v-if="won" src="../assets/img/emoji-won.png" height="30px"/>
      <img v-if="!gameOver && !won" src="../assets/img/emoji-game.png" height="30px"/>
    </div>

    <div class="camp-game">
      <div v-for="(line, index) in getLinesObject()" :key="line.idx">
        <div v-for="column in getColumns(index)" :key="column.idx" class="line">
          <Block v-bind:field="column.block" v-on:game-over="setGameOver()" v-on:open-around="openAround(column.block)"></Block>
        </div>
      </div>
    </div>
    <div class="camp-game-over" v-if="gameOver">
      <div class="lost-message">Game Over</div>
    </div>

    <button class="reset-button" v-if="gameOver" v-on:click="resetGame()">RESET</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {MineField} from "../core/entities/MineField";
  import Block from "./Block.vue";
  import {Field} from "../core/entities/Field";
  @Component({
      components: {Block}
  })
  export default class Camp extends Vue {
      game = new MineField();
      gameOver = false;
      won = false;

      getLinesObject() {
          const lines = [];
          for (let i = 0; i < this.game.fields.length; i++) {
              const line = {idx: `line-${i}`, line: this.game.fields[i]};
              lines.push(line);
          }
          return lines;
      }

      getColumns(line: number) {
          const columns = [];
          for (let i = 0; i < this.game.fields[line].length; i++) {
              const column = {idx: `column-${i}`, block: this.game.fields[line][i]};
              columns.push(column);
          }
          return columns;
      }

      setGameOver() {
          this.gameOver = true;
      }

      resetGame() {
          this.game = new MineField();
          this.gameOver = false;
      }

      openAround(item: Field) {
        this.game.openAround(item);
      }
  }
</script>

<style scoped lang="scss">
  .camp {
    height: 400px;
    overflow-y: hidden;

    .camp-game {
      width: 300px;
      height: 300px;
      background: bisque;
      display: flex;

      .line {
        display: flex;
        flex-direction: row;
      }
    }
    .camp-game-over {
      position: relative;
      top: -300px;
      width: 300px;
      height: 300px;

      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.11);
      color: brown;
      font-weight: bold;
      font-size: 30px;

      .lost-message {
        background: rgba(220, 220, 220, 0.8);
        padding: 5px;
        border-radius: 5px;
      }
    }

    .reset-button {
      margin-top: 10px;
      position: relative;
      top: -300px;
      cursor: pointer;
    }
  }
</style>
