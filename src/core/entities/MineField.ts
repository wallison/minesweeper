import {Field} from './Field';

export class MineField {
    fields: Field[][] = [];
    hits = 0;

    constructor() {
        this.generateBoard();
        this.generateMines();
        this.setMinesAround();
    }

    public hit() {
        this.hits++;
    }

    getHits(): number {
        return this.hits;
    }

    public openAround(item: Field): void {
        const indexX = item.X;
        const indexY = item.Y;
        let itemVerify = item;
        if ((indexX || indexX === 0) && (indexY || indexY === 0)) {
            if (indexX > 0) {
                itemVerify = this.fields[indexX-1][indexY];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexX > 0 && indexY > 0) {
                itemVerify = this.fields[indexX-1][indexY-1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexX > 0 && indexY < 9) {
                itemVerify = this.fields[indexX-1][indexY+1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexY > 0) {
                itemVerify = this.fields[indexX][indexY-1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexY < 9) {
                itemVerify = this.fields[indexX][indexY+1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexX < 9) {
                itemVerify = this.fields[indexX+1][indexY];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexX < 9 && indexY > 0) {
                itemVerify = this.fields[indexX+1][indexY-1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
            if (indexX < 9 && indexY < 9) {
                itemVerify = this.fields[indexX+1][indexY+1];
                if (!itemVerify.hasMine) {
                    if (!itemVerify.isOpen) {
                        this.hit();
                    }
                    itemVerify.open();
                }
            }
        }
    }

    private generateBoard() {
        const maxX = 10;
        const maxY = 10;
        for (let i = 0; i < maxX; i++) {
            const line = [];
            for (let j = 0; j < maxY; j++) {
                const item = new Field(i, j);
                line.push(item);
            }
            this.fields.push(line);
        }
    }

    private generateMines() {
        const quantity = 10;
        const mines: string[] = [];
        while (mines.length < quantity) {
            const indexX = Math.floor(Math.random() * 10);
            const indexY = Math.floor(Math.random() * 10);
            const position = `${indexX},${indexY}`;
            if (!mines.includes(position)) {
                mines.push(position);
                if (this.fields[indexX] && this.fields[indexY]) {
                    this.fields[indexX][indexY].hasMine = true;
                }
            }
        }
    }

    private setMinesAround() {
        const maxX = 10;
        const maxY = 10;
        for (let i = 0; i < maxX; i++) {
            for (let j = 0; j < maxY; j++) {
                let num = 0;
                if (i > 0) {
                    if (this.fields[i-1][j].hasMine) {
                        num++;
                    }
                }
                if (i > 0 && j > 0) {
                    if (this.fields[i-1][j-1].hasMine) {
                        num++;
                    }
                }
                if (i > 0 && j < 9) {
                    if (this.fields[i-1][j+1].hasMine) {
                        num++;
                    }
                }
                if (j > 0) {
                    if (this.fields[i][j-1].hasMine) {
                        num++;
                    }
                }
                if (j < 9) {
                    if (this.fields[i][j+1].hasMine) {
                        num++;
                    }
                }
                if (i < 9) {
                    if (this.fields[i+1][j].hasMine) {
                        num++;
                    }
                }
                if (i < 9 && j > 0) {
                    if (this.fields[i+1][j-1].hasMine) {
                        num++;
                    }
                }
                if (i < 9 && j < 9) {
                    if (this.fields[i+1][j+1].hasMine) {
                        num++;
                    }
                }
                this.fields[i][j].setMineAround(num);
            }
        }
    }

    public showAllBombs() {
        for (const line of this.fields) {
            for (const item of line) {
                if (item.hasMine) {
                    item.open();
                }
            }
        }
    }
}
