import { TokenLocation } from '@ts-jison/common';
import Statement from './Statement.js';
import Context from '../Context/Context.js';
import EchoStatement from './Echo.js';

export default class BlockStmt implements Statement {
    private stmts: Statement[];
    location: TokenLocation;

    constructor(stmts: Statement[], location: TokenLocation) {
        this.stmts = stmts;
        this.location = location;
    }

    interpret(ctx: Context) {
        const blockContext = new Context();
        blockContext.prev = ctx;
        let output = '';
        for (const stmt of this.stmts) {
          if (stmt instanceof EchoStatement) {
            output += stmt.interpret(blockContext) + '\n';
          } else {
            stmt.interpret(blockContext);
          }
        }
        return output;
      }
}