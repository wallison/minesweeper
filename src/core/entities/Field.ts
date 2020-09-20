export class Field {
    hasMine = false;
    isOpen = false;
    alert = false;
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

    toggleAlert() {
        if (!this.isOpen) {
            this.alert = !this.alert;
        }
    }

    isWarned() {
        return this.alert && !this.isOpen;
    }
}
