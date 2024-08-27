import { globalAgent } from "http";
import { IBoard, Move } from "../types";
import globalModel from "../types/model";
import Board from "../components/Board";
import Player from './../components/Player';
const countConsecutive =(board:IBoard,move:Move, dr:number, dc:number, player:number)=> {
    const size = board.grid.length;
    let count = 0;
    const { row, col } = move;
    for (let i = 1; i < 5; i++) {
        const r = row + i * dr;
        const c = col + i * dc;

        if (r < 0 || r >= size || c < 0 || c >= size || board.grid[r][c] !== player) {
            break;
        }

        count++;
    }

    return count;
}
const getAllPossibleMoves=(board:IBoard):Move[]=>{
    const size=board.grid.length;
    let movesArray=[]
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            if(board.grid[i][j]===globalModel.EMPTY){
                movesArray.push({row:i,col:j})
            }
        }
    }
    return movesArray
}
export const checkWin=(board:IBoard, move:Move, player:number)=> {
    const directions = [
        { dr: 0, dc: 1 },  // Hướng hàng ngang (trái - phải)
        { dr: 1, dc: 0 },  // Hướng hàng dọc (trên - dưới)
        { dr: 1, dc: 1 },  // Hướng đường chéo chính (trái trên - phải dưới)
        { dr: 1, dc: -1 }  // Hướng đường chéo phụ (phải trên - trái dưới)
    ];
    for (const { dr, dc } of directions) {
        let count = 1;
        // Kiểm tra một chiều
        count += countConsecutive(board, move, dr, dc, player);
        // Kiểm tra chiều ngược lại
        count += countConsecutive(board, move, -dr, -dc, player);

        if (count >= globalModel.WINNING_LENGTH) {
            return true;  // Có đủ 5 quân liên tiếp
        }
    }

    return false;  // Không có đủ 5 quân liên tiếp
}
export const PositionMoveWin=(board:IBoard,player:number,move:Move):Move[]=>{
  
    const arrayMove=[move]
    const directions = [
        { dr: 0, dc: 1 },  // Hướng hàng ngang (trái - phải)
        { dr: 1, dc: 0 },  // Hướng hàng dọc (trên - dưới)
        { dr: 1, dc: 1 },  // Hướng đường chéo chính (trái trên - phải dưới)
        { dr: 1, dc: -1 }  // Hướng đường chéo phụ (phải trên - trái dưới)
    ];
    for (const { dr, dc } of directions) {
        let count = 1;
        // Kiểm tra một chiều
        const count1 = countConsecutive(board, move, dr, dc, player);
        // Kiểm tra chiều ngược lại
        const count2 = countConsecutive(board, move, -dr, -dc, player);
        count+=count1+count2
        if (count >= globalModel.WINNING_LENGTH) {
           
           for(let i=1;i<=count1;i++){
            const r=move.row+i*dr;
            const c=move.col+i*dc;
            arrayMove.push({row:r,col:c})
           }
           for(let i=1;i<=count2;i++){
            const r=move.row+i*(-dr);
            const c=move.col+i*(-dc);
            arrayMove.push({row:r,col:c})
           }
        }
    }
    return arrayMove

   
}
export const checkPossibleMove=(board:IBoard,move:Move):boolean=>{
    const {row,col}=move
    if(board.grid[row][col]===globalModel.EMPTY){
        return true
    }else{
        return false
    }
}
// Hàm tìm nước đi tốt nhất cho AI
export function aiMove(board: IBoard, player: number): Move {
    let bestMove: Move | null = null;
    let bestScore = -Infinity;
    const possibleMoves=getAllPossibleMoves(board)
    possibleMoves.forEach(element => {
                board.grid[element.row][element.col] = player; // Giả lập nước đi của AI
                const score = evaluateBoard(board, { row: element.row, col: element.col }, player);
                board.grid[element.row][element.col] = globalModel.EMPTY; // Trả lại trạng thái ban đầu
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row: element.row, col: element.col };
                }
    });
    return bestMove!;
}
function evaluateBoard(board: IBoard, move: Move, player: number): number {
    let score = 0;
    const boardSize = board.grid.length;

    // 1. Vị trí trên bàn cờ (center control)
    score += evaluateCenterControl(move, boardSize);

    // 2. Đánh giá các chuỗi quân cờ
    const directions = [
        { dx: 0, dy: 1 },  // Hướng hàng ngang (trái - phải)
        { dx: 1, dy: 0 },  // Hướng hàng dọc (trên - dưới)
        { dx: 1, dy: 1 },  // Hướng đường chéo chính (trái trên - phải dưới)
        { dx: 1, dy: -1 }  // Hướng đường chéo phụ (phải trên - trái dưới)
    ];

    for (const { dx, dy } of directions) {
        const chainScore = evaluateChain(board, move, dx, dy, player);
        score += chainScore;
    }
    for (const { dx, dy } of directions) {
        const option=player===globalModel.PLAYER_1?globalModel.PLAYER_2:globalModel.PLAYER_1
        const chainScore = evaluateChain(board, move, dx, dy, option);
        score += chainScore;
    }
    return score;
}

function evaluateBlockingOpponent(board: IBoard, move: Move, player: number): number {
    const opponent = player === globalModel.PLAYER_1 ? globalModel.PLAYER_2 : globalModel.PLAYER_1;
    const { row, col } = move;
    board.grid[row][col] = opponent; // Đổi lại quân cờ để kiểm tra nếu đối thủ đi nước này
    const opponentScore = evaluateOpenLines(board, move, opponent);
    board.grid[row][col] = globalModel.EMPTY; // Trả lại trạng thái ban đầu
    return opponentScore * 0.5; // Khuyến khích chặn đối thủ nhưng không cao bằng việc tự tạo chuỗi
}


function evaluateChain(board: IBoard, move: Move, dx: number, dy: number, player: number): number {
    let count = 0;
    let openEnds = 0;
    let blockEnds = 0;
    // Kiểm tra hướng forward (tiến)
    for(let i=1;i<=5;i++){
        let nx = move.row +i* dx;
        let ny = move.col +i* dy;
        if(nx >= 0 && nx < board.grid.length && ny >= 0 && ny < board.grid.length && board.grid[nx][ny] === player){
            count++
        }else{
            if (nx >= 0 && nx < board.grid.length && ny >= 0 && ny < board.grid.length && board.grid[nx][ny] === globalModel.EMPTY) {
                openEnds++;
            } else {
                blockEnds++;
            }
            break;
        }
    }
    // Kiểm tra hướng backward (lùi)
    for(let i=1;i<=5;i++){
        let nx = move.row +i* (-dx);
        let ny = move.col +i* (-dy);
        if(nx >= 0 && nx < board.grid.length && ny >= 0 && ny < board.grid.length && board.grid[nx][ny] === player){
            count++
        }else{
            if (nx >= 0 && nx < board.grid.length && ny >= 0 && ny < board.grid.length && board.grid[nx][ny] === globalModel.EMPTY) {
                openEnds++;
            } else {
                blockEnds++;
            }
            break;
        }
    }
    
    // Gán điểm cho chuỗi dựa trên số lượng quân cờ và trạng thái mở/chặn
    if (openEnds === 2) {  // Chuỗi mở
        switch (count) {
            case 0:return 1;
            case 1: return 10;
            case 2: return 50;
            case 3: return 500;
            case 4: return 5000;
            default: return 10000; // Chiến thắng
        }
    } else if (openEnds === 1 && blockEnds === 1) {  // Chuỗi bị chặn một đầu
        switch (count) {
            case 0:return -10;
            case 1: return 1;
            case 2: return 10;
            case 3: return 100;
            case 4: return 1000;
            default: return 0; // Không có giá trị nếu bị chặn cả hai đầu
        }
    }

    return 0; // Chuỗi bị chặn cả hai đầu
}

function evaluateOpenLines(board: IBoard, move: Move, player: number): number {
    let score = 0;
    const directions = [
        { dx: 1, dy: 0 },  // Horizontal
        { dx: 0, dy: 1 },  // Vertical
        { dx: 1, dy: 1 },  // Diagonal /
        { dx: 1, dy: -1 }  // Diagonal \
    ];

    for (const { dx, dy } of directions) {
        score += evaluateLine(board, move, dx, dy, player);
    }

    return score;
}

function evaluateLine(board: IBoard, move: Move, dx: number, dy: number, player: number): number {
    let score = 0;
    let count = 0;
    const opponent = player === globalModel.PLAYER_1 ? globalModel.PLAYER_2 : globalModel.PLAYER_1;
    
    // Đánh giá chuỗi quân cờ trong một hướng
    for (let i = -globalModel.WINNING_LENGTH + 1; i < globalModel.WINNING_LENGTH; i++) {
        const nx = move.row + i * dx;
        const ny = move.col + i * dy;
        if (isInBounds(nx, ny, board.grid.length) && board.grid[nx][ny] !== opponent) {
            count = (board.grid[nx][ny] === player) ? count + 1 : 0;
        } else {
            count = 0;
        }
        if (count === globalModel.WINNING_LENGTH - 1) {
            score += (player === globalModel.PLAYER_1) ? 100 : -100;
        }
    }

    return score;
}
function isInBounds(x: number, y: number, boardSize: number): boolean {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}
function evaluateCenterControl(move:Move, boardSize: number): number {
    const center = Math.floor(boardSize / 2);
    const distanceToCenter = Math.abs(move.row - center) + Math.abs(move.col - center);
    return (boardSize - distanceToCenter) * 10; // Càng gần trung tâm càng tốt
}
function evaluateWinningMove(board: IBoard, move:Move,player:number): number {
    return evaluateOpenLines(board, move,player) * 2; // Khuyến khích mạnh việc hoàn thành chuỗi chiến thắng
}

