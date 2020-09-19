export class Field {
    hasMine = false;
    isOpen = false;
    minesAround = 0;
    X: number;
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    setMineAround(num: number) {
        this.minesAround = num;
    }
    open() {
        this.isOpen = true;
    }
}
