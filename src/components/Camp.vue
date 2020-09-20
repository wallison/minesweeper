<template>
  <div class="camp">
    <div class="title">Minesweeper</div>
    <div class="emoji" v-on:click="resetGame()">
      <img v-if="gameOver" src="../assets/img/emoji-lost.png" height="30px"/>
      <img v-if="won" src="../assets/img/emoji-won.png" height="30px"/>
      <img v-if="!gameOver && !won" src="../assets/img/emoji-game.png" height="30px"/>
    </div>

    <div class="camp-game">
      <div v-for="(line, index) in getLinesObject()" :key="line.idx">
        <div v-for="column in getColumns(index)" :key="column.idx" class="line">
          <Block v-bind:field="column.block"
                 v-on:game-over="setGameOver()"
                 v-on:open-around="openAround(column.block)"
                 v-on:play="play()"
          ></Block>
        </div>
      </div>
    </div>
    <div class="camp-game-final" v-if="gameOver || won">
      <div class="lost-message" v-if="gameOver">Game Over</div>
      <div class="won-message" v-if="won">You Won!</div>
    </div>

    <button class="reset-button" v-if="gameOver || won" v-on:click="resetGame()">RESTART</button>
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
      MAX_HITS = 90;

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
          this.game.showAllBombs();
          this.gameOver = true;
      }

      resetGame() {
          this.game = new MineField();
          this.gameOver = false;
          this.won = false;
      }

      openAround(item: Field) {
          this.game.hit();
          this.game.openAround(item);
          if (this.game.getHits() === this.MAX_HITS) {
              this.setWonGame();
          }
      }

      setWonGame() {
          this.game.showAllBombs();
          this.won = true;
      }

      play() {
          this.game.hit();
          if (this.game.getHits() === this.MAX_HITS) {
              this.setWonGame();
          }
      }
  }
</script>

<style scoped lang="scss">
  .camp {
    height: 420px;
    overflow-y: hidden;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .emoji {
      height: 30px;
      margin-bottom: 10px;
      cursor: pointer;
    }

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
    .camp-game-final {
      position: relative;
      top: -300px;
      width: 300px;
      height: 300px;

      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.11);
      font-weight: bold;
      font-size: 30px;

      .lost-message {
        background: rgba(220, 220, 220, 0.8);
        padding: 5px;
        border-radius: 5px;
        color: brown;
      }

      .won-message {
        background: rgba(220, 220, 220, 0.8);
        padding: 5px;
        border-radius: 5px;
        color: darkgreen;
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
