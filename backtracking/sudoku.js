class Sudoku{
    constructor(board){
        this.board = board
    }

    findEmptyCell(){
        for(let i = 0; i < 9; i ++){
            for(let j = 0; j < 9; j++){
                if(this.board[i][j] === 0) return [i,j];
            }
        }
        return [-1, -1]
    }
    
    check([x,y], value){
        for(let i = 0; i <9; i++){
            if(this.board[i][x] === value) return false;
        }
        for(let i = 0; i < 9; i++){
            if(this.board[y][i] === value) return false;
        }

        const sectionRow = Math.floor(y / 3)
        const sectionCol = Math.floor(x / 3)
        for(let i = (sectionRow * 3); i < ((sectionRow * 3) + 3); i++){
            for(let j = (sectionCol * 3); j < ((sectionCol * 3)+ 3); j++){
                if(y !== i && x !== j && this.board[i][j] === value) return false
            }
        }
        return true
    }
    
    solve(){
        const[y, x] = this.findEmptyCell()
        if( y === -1 && x === -1) return true
        for(let val = 1; val <10; val++){
            if(this.check([y, x], val)){
                this.board[y][x] = val
                if(this.solve()) return true
                this.board[y][x] = 0
            }
        }
        return false
    }

    getSection(row, [start, end]){
        return this.board[row].slice(start, end)
    }

    printBoard(){
        for(let i = 0; i < 9; i++){
            if(i % 3 === 0 && i !== 0) console.log('- - - - - - - - - - - -')
            console.log(
                ...this.getSection(i, [0, 3]), ' | ',
                ...this.getSection(i, [3, 6]), ' | ',
                ...this.getSection(i, [6, 9])
            )
        }
    }
}
function main(){
    const sudokuBoard = new Sudoku([
        [3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ])

    sudokuBoard.printBoard()
    console.log('\n')
    sudokuBoard.solve()

    sudokuBoard.printBoard()
}

main()