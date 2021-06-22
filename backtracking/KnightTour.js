class OpenKnightTour{
    constructor(size){
        this.board = new Array(size).fill(0).map(() => new Array(size).fill(0))
        this.size = size
    }
    getMoves([i, j]){
        
        const moves = [
            [i + 2, j - 1],
      [i + 2, j + 1],
      [i - 2, j - 1],
      [i - 2, j + 1],
      [i + 1, j - 2],
      [i + 1, j + 2],
      [i - 1, j - 2],
      [i - 1, j + 2]
        ]

        return moves.filter(([x, y]) => y => 0 && y < this.size && x >= 0 && x < this.size)
    }

    isComplete(){
        return this.board.map(row => row.includes(0)).includes(true)
    }

    solve(){
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(this.solveHelper([i, j], 0)) return true
            }
        }
        return false
    }

    solveHelper(){
        if(this.isComplete()) return true
        for(const [y, x] of this.getMoves([i, j])){
            if(this.board[y][x] === 0){
                this.board[y][x] = curr + 1
                if(this.solveHelper([x, y], curr + 1)) return true

                //backtraking
                this.board[y][x] = 0
            }
        }
        return false
    }
    
    printBoard(){
        for(const row of this.board){
            let string = '';
            for(const elem of row){
                string += elem + '\t'
            }
            console.log(string)
        }
    }
}

function main(){
    const board = new OpenKnightTour(5)
    
    board.printBoard()
    console.log('\n')
    board.solve()
    board.printBoard()   
}
main()